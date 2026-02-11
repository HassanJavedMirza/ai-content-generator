import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { HfInference } from "@huggingface/inference";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { prompt } = await request.json();
        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        if (!process.env.HUGGINGFACE_API_KEY) {
            return NextResponse.json({ error: "API Key missing" }, { status: 500 });
        }

        const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

        // Using FLUX.1-schnell for fast, high-quality images
        const imageBlob = await hf.textToImage({
            model: "black-forest-labs/FLUX.1-schnell",
            inputs: prompt,
            parameters: {
                num_inference_steps: 4,
            }
        });

        const buffer = Buffer.from(await (imageBlob as any).arrayBuffer());
        const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;

        return NextResponse.json({ image: base64Image });
    } catch (error: any) {
        console.error("Image generation error:", error);
        if (error.status === 429) {
            return NextResponse.json({ error: "Rate limit hit. Try again later." }, { status: 429 });
        }
        return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
    }
}
