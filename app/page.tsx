import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-600">AI Content Generator</div>
        <div className="flex gap-4">
          <Link 
            href="/login" 
            className="px-6 py-2 text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Sign In
          </Link>
          <Link 
            href="/register" 
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Generate Amazing Content
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              With AI Power
            </span>
          </h1>
          
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Create blog posts, social media content, emails, and more in seconds. 
            Powered by advanced AI for professional-quality results.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all text-lg"
            >
              Start Generating Free
            </Link>
            <Link 
              href="/login" 
              className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl border-2 border-indigo-200 hover:border-indigo-300 transition-all text-lg"
            >
              Try Demo
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
            <p className="text-gray-600">
              Generate high-quality content in seconds, not hours. Perfect for busy creators.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered</h3>
            <p className="text-gray-600">
              Advanced AI models trained on millions of documents for professional results.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Multiple Formats</h3>
            <p className="text-gray-600">
              Blog posts, tweets, emails, product descriptions, and more. All in one place.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200 text-center text-gray-600">
        <p>© 2024 AI Content Generator. All rights reserved.</p>
        <p className="mt-2 text-sm">Start with 10 free credits. No credit card required.</p>
      </footer>
    </div>
  );
}
