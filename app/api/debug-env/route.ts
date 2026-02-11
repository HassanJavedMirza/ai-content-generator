import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    return NextResponse.json({
        all_detected_keys: Object.keys(process.env).sort(),
        has_any_hf_key: !!(process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN || process.env.HF_API_KEY),
        node_env: process.env.NODE_ENV,
        time: new Date().toISOString(),
        build_id: process.env.NEXT_PUBLIC_VERCEL_URL || "production",
        instructions: "Look at 'all_detected_keys'. If HUGGINGFACE_API_KEY is not in that list, Vercel is strictly not passing it to this specific build. If you see it there, check for trailing spaces or typos."
    });
}
