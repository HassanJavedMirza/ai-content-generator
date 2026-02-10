export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Empowering Creativity with AI
                    </h1>
                    <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                        We build tools that help you generate high-quality content faster, so you can focus on what matters most.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="prose prose-lg mx-auto text-gray-600">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                    <p className="mb-8">
                        At AI Content Generator, we believe that artificial intelligence should be a partner in the creative process, not a replacement. Our mission is to democratize access to powerful writing assistants, enabling entrepreneurs, marketers, and writers to scale their voice without compromising quality.
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
                    <p className="mb-8">
                        Our platform leverages state-of-the-art language models to understand your intent and generate tailored content. Whether you need a catchy blog post, a persuasive email, or an engaging social media caption, our AI adapts to your tone and style preferences.
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet the Developer</h2>
                    <div className="flex items-center gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100 not-prose">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Hassan Javed</h3>
                            <p className="text-gray-600 mb-4">
                                Full Stack Developer passionate about building intuitive and scalable web applications.
                            </p>
                            <a
                                href="https://www.linkedin.com/in/hassan-javed-116381247/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 font-medium hover:text-indigo-800"
                            >
                                Connect on LinkedIn →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
