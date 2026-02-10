import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div className="flex flex-col items-start gap-4">
                        <div className="flex items-center gap-2">
                            <img src="/logo.jpeg" alt="Logo" className="h-8 w-8 rounded-full" />
                            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                content.AI
                            </h3>
                        </div>
                        <p className="text-gray-400 text-sm max-w-xs">
                            Create professional blog posts, social media content, and emails in
                            seconds using advanced AI technology.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-200">Connect</h4>
                        <ul className="flex space-x-6 text-2xl text-gray-400">
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/hassan-javed-116381247/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-400 transition-colors"
                                    title="LinkedIn"
                                >
                                    <FaLinkedin />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/HassanJavedMirza"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-gray-100 transition-colors"
                                    title="GitHub"
                                >
                                    <FaGithub />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:hj1888371@gmail.com"
                                    className="hover:text-red-400 transition-colors"
                                    title="Gmail"
                                >
                                    <FaEnvelope />
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
