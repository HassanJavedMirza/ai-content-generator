import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const envKeys = Object.keys(process.env).filter(k =>
        k.includes("HF") || k.includes("HUGGING") || k.includes("OPENAI") || k.includes("DATABASE")
    );

    return NextResponse.json({
        has_hf_key: !!process.env.HUGGINGFACE_API_KEY,
        hf_key_prefix: process.env.HUGGINGFACE_API_KEY ? process.env.HUGGINGFACE_API_KEY.substring(0, 5) + "..." : "none",
        detected_keys: envKeys,
        node_env: process.env.NODE_ENV,
        time: new Date().toISOString(),
        instructions: "If has_hf_key is false, but detected_keys shows the key, there is a spelling mismatch. If detected_keys is empty, Vercel is NOT passing the variables to this build."
    });
}
