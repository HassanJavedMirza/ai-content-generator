import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

export async function GET() {
  try {
    if (!process.env.HUGGINGFACE_API_KEY) {
      return NextResponse.json(
        { error: "HUGGINGFACE_API_KEY is not configured in environment variables." },
        { status: 500 }
      );
    }

    const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

    // Simple test request
    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [{ role: "user", content: "Say 'Hello from Hugging Face!'" }],
      max_tokens: 20,
    });

    return NextResponse.json({
      success: true,
      message: response.choices[0]?.message?.content || "No response",
      model: "Mistral-7B-Instruct-v0.2"
    });
  } catch (error: any) {
    console.error("HF Test Error:", error);
    return NextResponse.json({
      error: error.message,
      type: error.constructor.name
    }, { status: 500 });
  }
}