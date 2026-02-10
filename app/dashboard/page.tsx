"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Generation {
  id: string;
  title: string | null;
  type: string;
  tone: string;
  length: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [generations, setGenerations] = useState<Generation[]>([]);

  // Check authentication
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Load real data
  useEffect(() => {
    async function fetchGenerations() {
      try {
        const response = await fetch("/api/user/generations");
        if (response.ok) {
          const data = await response.json();
          setGenerations(data);
        }
      } catch (error) {
        console.error("Failed to fetch generations", error);
      } finally {
        setLoading(false);
      }
    }

    if (session?.user) {
      fetchGenerations();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // Calculate stats
  const totalGenerations = generations.length;
  const recentGenerations = generations.filter(g =>
    new Date(g.createdAt) > new Date(Date.now() - 7 * 86400000)
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              My Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your generated content
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/generate"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Generate New
            </Link>

            <button
              onClick={() => router.push("/api/auth/signout")}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              {totalGenerations}
            </div>
            <div className="text-gray-600">Total Generations</div>
            <div className="text-sm text-gray-500 mt-2">
              All your created content
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {recentGenerations}
            </div>
            <div className="text-gray-600">Last 7 Days</div>
            <div className="text-sm text-gray-500 mt-2">
              Recent activity
            </div>
          </div>
        </div>

        {/* Recent Generations */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Your Content
            </h2>
            <Link
              href="/generate"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              + Create New
            </Link>
          </div>

          {generations.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-600 mb-4">No content generated yet</p>
              <Link
                href="/generate"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Create Your First Content
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {generations.map((gen) => (
                <div key={gen.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {gen.title || "Untitled"}
                      </h3>
                      <div className="flex gap-2 mt-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded capitalize">
                          {gen.type}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded capitalize">
                          {gen.tone}
                        </span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded capitalize">
                          {gen.length}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Created: {new Date(gen.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/generate?edit=${gen.id}`)}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Delete this content?")) {
                            setGenerations(generations.filter(g => g.id !== gen.id));
                          }
                        }}
                        className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Account Information
          </h2>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-500">Email</div>
              <div className="font-medium text-gray-900">
                {session.user?.email}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Plan</div>
              <div className="font-medium text-gray-900">
                Free Plan
              </div>
            </div>
            <div className="pt-4">
              <Link
                href="/generate"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 inline-block"
              >
                Start Generating
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}