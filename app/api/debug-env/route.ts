import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    // Search for any key that has a value starting with 'hf_'
    const anyHfKey = Object.keys(process.env).find(k =>
        process.env[k]?.startsWith("hf_")
    );

    return NextResponse.json({
        vercel_project_name: process.env.VERCEL_PROJECT_NAME || "local/unknown",
        all_detected_keys: Object.keys(process.env).sort(),
        found_key_via_value_search: anyHfKey || "none",
        has_any_hf_key: !!(process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN || process.env.HF_API_KEY),
        time: new Date().toISOString(),
        instructions: "If 'found_key_via_value_search' is 'none' but you see other keys like OPENAI_API_KEY, Vercel is strictly not passing the HF key. ACTION: Delete the key in Vercel and re-add it with the name HF_TOKEN (all caps, no spaces) and REDEPLOY."
    });
}
