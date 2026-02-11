"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const contentTypes = [
  { value: "blog", label: "Blog Post" },
  { value: "twitter", label: "Twitter Thread" },
  { value: "email", label: "Email Newsletter" },
  { value: "product", label: "Product Description" },
  { value: "ad", label: "Advertisement" },
  { value: "story", label: "Short Story" }
];

const tones = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "funny", label: "Funny" },
  { value: "persuasive", label: "Persuasive" },
  { value: "educational", label: "Educational" },
  { value: "inspirational", label: "Inspirational" }
];

const lengths = [
  { value: "short", label: "Short (200-300 words)" },
  { value: "medium", label: "Medium (500-600 words)" },
  { value: "long", label: "Long (800-1000 words)" }
];

export default function GeneratePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [userCredits, setUserCredits] = useState(0);
  const [formData, setFormData] = useState({
    prompt: "",
    type: "blog",
    tone: "professional",
    length: "medium"
  });

  const [imageLoading, setImageLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");

  const handleGenerateImage = async () => {
    if (!generatedContent) return;
    setImageLoading(true);
    try {
      const resp = await fetch("/api/generate/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: formData.prompt }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Failed to generate image");
      setGeneratedImage(data.image);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setImageLoading(false);
    }
  };

  // Check authentication
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user) {
      setUserCredits((session.user as any).credits || 0);
    }
  }, [status, session, router]);

  // Redirect if not authenticated
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect in useEffect
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userCredits <= 0) {
      alert("You don't have enough credits. Please upgrade your plan.");
      return;
    }

    if (!formData.prompt.trim()) {
      alert("Please enter a prompt");
      return;
    }

    setLoading(true);
    setGeneratedContent("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate content");
      }

      setGeneratedContent(data.content);
      setUserCredits(data.credits); // Update credits count

    } catch (error: any) {
      console.error("Generation error:", error);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    alert("Copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `generation-${new Date().getTime()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      {/* Header */}

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Generate New Content
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Prompt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What do you want to create?
              </label>
              <textarea
                value={formData.prompt}
                onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-900"
              />
              <p className="mt-2 text-sm text-gray-500">
                Be specific for better results!
              </p>
            </div>

            {/* Content Type, Tone, Length */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                >
                  {contentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tone
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                >
                  {tones.map((tone) => (
                    <option key={tone.value} value={tone.value}>
                      {tone.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Length
                </label>
                <select
                  value={formData.length}
                  onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                >
                  {lengths.map((length) => (
                    <option key={length.value} value={length.value}>
                      {length.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || userCredits <= 0}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Generating...
                </>
              ) : (
                `Generate Content (Uses 1 Credit)`
              )}
            </button>

            {userCredits <= 0 && (
              <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg text-center">
                <p>You have no credits left!</p>
                <Link href="/upgrade" className="font-semibold underline ml-1">
                  Upgrade your plan
                </Link>
              </div>
            )}
          </form>
        </div>

        {/* Right Panel - Results */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Generated Content
            </h2>

            {generatedContent && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleGenerateImage}
                  disabled={imageLoading}
                  className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 flex items-center gap-2 disabled:opacity-50"
                  title="Generate an AI Image for this"
                >
                  {imageLoading ? "🎨..." : "🎨 Image"}
                </button>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 flex items-center gap-2"
                  title="Download as .txt"
                >
                  <span>💾</span> Save
                </button>
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 flex items-center gap-2"
                >
                  <span>📋</span> Copy
                </button>
              </div>
            )}
          </div>

          <div className="h-[600px] overflow-y-auto border border-gray-200 rounded-lg p-6 bg-gray-50 shadow-inner">
            {generatedContent ? (
              <div className="prose max-w-none text-gray-900 font-sans">
                {generatedImage && (
                  <div className="mb-6 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                    <img src={generatedImage} alt="AI Generated Graphic" className="w-full h-auto" />
                  </div>
                )}

                <div className="whitespace-pre-wrap leading-relaxed text-lg" style={{ color: "#1a202c" }}>{generatedContent}</div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <div className="text-6xl mb-4">✨</div>
                <p className="text-lg font-medium">Your content will appear here</p>
                <p className="text-sm mt-2">
                  Fill out the form and click "Generate Content"
                </p>
                <div className="mt-8 text-left text-sm text-gray-500 max-w-md">
                  <p className="font-medium mb-2">Tips for better results:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Be specific about your topic</li>
                    <li>Include target audience if relevant</li>
                    <li>Mention key points you want to cover</li>
                    <li>Specify the desired call-to-action</li>
                  </ul>
                </div>
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">AI is generating your content...</p>
                  <p className="text-sm text-gray-500">This usually takes 10-30 seconds</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-6xl mx-auto mt-8">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600 text-center">
            💡 <strong>Pro Tip:</strong> You can edit the generated content directly and use it for your blogs, social media, or emails.
          </p>
        </div>
      </div>
    </div>
  );
}
