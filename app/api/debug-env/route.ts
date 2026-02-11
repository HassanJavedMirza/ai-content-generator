import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        has_hf_key: !!process.env.HUGGINGFACE_API_KEY,
        hf_key_prefix: process.env.HUGGINGFACE_API_KEY ? process.env.HUGGINGFACE_API_KEY.substring(0, 5) + "..." : "none",
        node_env: process.env.NODE_ENV,
        instructions: "If has_hf_key is false, you must add HUGGINGFACE_API_KEY to your Vercel/Hosting Provider settings and REDEPLOY."
    });
}
