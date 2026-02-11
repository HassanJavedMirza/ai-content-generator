import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const allKeys = Object.keys(process.env);

    // Fuzzy search for any key that looks like Hugging Face
    const fuzzyMatches = allKeys.filter(k => {
        const upper = k.toUpperCase().trim();
        return upper.includes("HUGGING") || upper.includes("HF") || upper.includes("AI_TOKEN");
    });

    const hfFallback = process.env.HUGGINGFACE_API_KEY ||
        process.env.HF_TOKEN ||
        process.env.HF_API_KEY ||
        process.env.AI_TOKEN;

    return NextResponse.json({
        vercel_project_name: process.env.VERCEL_PROJECT_NAME || "local/unknown",
        fuzzy_matches_found: fuzzyMatches,
        has_any_hf_key: !!hfFallback,
        all_detected_keys: allKeys.sort(),
        time: new Date().toISOString(),
        instructions: "If 'fuzzy_matches_found' is empty, Vercel is NOT passing the key. ACTION: Try adding the key with the name AI_TOKEN (all caps) to Vercel and REDEPLOY."
    });
}
