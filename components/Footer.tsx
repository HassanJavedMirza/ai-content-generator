export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            AI Content Generator
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Create professional blog posts, social media content, and emails in
                            seconds using advanced AI technology.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-200">Connect</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/hassan-javed-116381247/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <span className="text-blue-400">Linked</span>In
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:hj1888371@gmail.com"
                                    className="hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <span className="text-red-400">Gmail</span>: hj1888371@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} Hassan Javed. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
