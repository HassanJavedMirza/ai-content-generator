import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    return NextResponse.json({
        vercel_project_name: process.env.VERCEL_PROJECT_NAME || "local/unknown",
        git_branch: process.env.VERCEL_GIT_COMMIT_REF || "unknown",
        vercel_env: process.env.VERCEL_ENV || "unknown",
        has_any_hf_key: !!(process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN || process.env.HF_API_KEY),
        all_detected_keys: Object.keys(process.env).sort(),
        time: new Date().toISOString(),
        instructions: "CRITICAL: Compare 'vercel_project_name' with the name you see in the top-left of your Vercel Dashboard. If they don't match, you are editing the wrong project's settings!"
    });
}
