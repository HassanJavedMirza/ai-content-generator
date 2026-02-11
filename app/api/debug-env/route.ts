import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const hKeys = Object.keys(process.env).filter(k => k.startsWith("H")).reduce((acc, k) => {
        acc[k] = process.env[k] ? process.env[k]!.substring(0, 4) + "..." : "empty";
        return acc;
    }, {} as any);

    return NextResponse.json({
        has_any_hf_key: !!(process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN || process.env.HF_API_KEY),
        detected_h_keys: hKeys,
        node_env: process.env.NODE_ENV,
        time: new Date().toISOString(),
        build_id: process.env.NEXT_PUBLIC_VERCEL_URL || "production",
        instructions: "Check 'detected_h_keys'. If the name you added to Vercel isn't there, Vercel is NOT passing it. If it IS there but has_any_hf_key is false, you probably named it something unusual. Let me know the name you see!"
    });
}
