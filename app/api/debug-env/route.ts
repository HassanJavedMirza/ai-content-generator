import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    return NextResponse.json({
        all_detected_keys: Object.keys(process.env).sort(),
        git_branch: process.env.VERCEL_GIT_COMMIT_REF || "unknown",
        vercel_env: process.env.VERCEL_ENV || "unknown",
        has_any_hf_key: !!(process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN || process.env.HF_API_KEY),
        node_env: process.env.NODE_ENV,
        time: new Date().toISOString(),
        instructions: "Verify 'git_branch' is correct. If 'all_detected_keys' still lacks HUGGINGFACE_API_KEY, please try renaming it in Vercel to HF_TOKEN and REDEPLOY."
    });
}
