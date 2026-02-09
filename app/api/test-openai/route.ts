import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not set in .env.local" },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Simple test request
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say 'Hello, World!'" }],
      max_tokens: 10,
    });

    return NextResponse.json({
      success: true,
      message: completion.choices[0]?.message?.content || "No response",
      model: completion.model
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      code: error.code,
      type: error.type
    }, { status: 500 });
  }
}