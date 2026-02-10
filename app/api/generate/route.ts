import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import { useSession } from "next-auth/react"

export const runtime = "nodejs"; // REQUIRED for OpenAI

export async function POST(request: NextRequest) {
  try {
    // 🔐 Auth check
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in first." },
        { status: 401 }
      );
    }

    // 👤 User lookup
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found. Please log in again." },
        { status: 404 }
      );
    }

    if (user.credits <= 0) {
      return NextResponse.json(
        { error: "You're out of credits!", credits: 0 },
        { status: 403 }
      );
    }

    // 📥 Request body
    const { prompt, type, tone, length } = await request.json();

    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: "Please enter a prompt." },
        { status: 400 }
      );
    }

    // ✅ Initialize OpenAI AT RUNTIME
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key is missing on server." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `You are a professional content writer. Generate ${type || "blog"} content in a ${tone || "professional"} tone. 
Make it ${length || "medium"} length. Be creative, engaging, and informative.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      max_tokens:
        length === "short" ? 300 : length === "medium" ? 600 : 1000,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content ?? "";

    // 💾 Save result
    await prisma.generation.create({
      data: {
        title: prompt.slice(0, 50),
        content,
        type: type || "blog",
        tone: tone || "professional",
        length: length || "medium",
        userId: user.id,
      },
    });

    // 💳 Deduct credit
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { credits: { decrement: 1 } },
    });

    return NextResponse.json({
      content,
      credits: updatedUser.credits,
      message: "Content generated successfully",
    });
  } catch (error: any) {
    console.error("Generation API error:", error);

    return NextResponse.json(
      { error: error.message || "Failed to generate content" },
      { status: 500 }
    );
  }
}
