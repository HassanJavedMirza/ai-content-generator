import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

// Initialize OpenAI with error handling
let openai: OpenAI;
try {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} catch (error) {
  console.error("OpenAI initialization error:", error);
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in first." },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found. Please log in again." },
        { status: 404 }
      );
    }

    // Check credits
    if (user.credits <= 0) {
      return NextResponse.json(
        { 
          error: "You're out of credits! You have 0 credits remaining.",
          credits: 0
        },
        { status: 403 }
      );
    }

    // Parse request body
    const { prompt, type, tone, length } = await request.json();

    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: "Please enter a prompt to generate content." },
        { status: 400 }
      );
    }

    // Check if OpenAI is initialized
    if (!openai) {
      return NextResponse.json(
        { error: "AI service is not configured. Please check OpenAI API key." },
        { status: 500 }
      );
    }

    // Prepare system prompt
    const systemPrompt = `You are a professional content writer. Generate ${type || "blog"} content in a ${tone || "professional"} tone. 
    Make it ${length || "medium"} length. Be creative, engaging, and informative. 
    Format the response with proper paragraphs and structure.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Use gpt-3.5-turbo for lower cost
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      max_tokens: length === "short" ? 300 : length === "medium" ? 600 : 1000,
      temperature: 0.7,
    });

    const generatedContent = completion.choices[0]?.message?.content || "";

    // Save generation to database
    await prisma.generation.create({
      data: {
        title: prompt.substring(0, 50) + (prompt.length > 50 ? "..." : ""),
        content: generatedContent,
        type: type || "blog",
        tone: tone || "professional",
        length: length || "medium",
        userId: user.id,
      }
    });

    // Deduct credit
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { credits: { decrement: 1 } }
    });

    return NextResponse.json({
      content: generatedContent,
      credits: updatedUser.credits,
      message: "Content generated successfully!",
      length: generatedContent.length
    });

  } catch (error: any) {
    console.error("Generation API error:", error);
    
    // Provide helpful error messages
    if (error.code === "insufficient_quota") {
      return NextResponse.json(
        { error: "OpenAI API quota exceeded. Please check your billing." },
        { status: 500 }
      );
    }
    
    if (error.code === "invalid_api_key") {
      return NextResponse.json(
        { error: "Invalid OpenAI API key. Please check your .env.local file." },
        { status: 500 }
      );
    }

    if (error.message?.includes("API key")) {
      return NextResponse.json(
        { error: "Missing OpenAI API key. Please add OPENAI_API_KEY to .env.local" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: `Failed to generate content: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}