"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { FaHome, FaInfoCircle, FaTachometerAlt, FaMagic, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Fallback avatar if no image (using UI Avatars)
    const userImage = session?.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.name || "User")}&background=random`;

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                            <img src="/logo.jpeg" alt="Logo" className="h-8 w-8 rounded-full" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                content.AI
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1">
                            <FaHome className="text-lg" />
                            Home
                        </Link>
                        <Link href="/about" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1">
                            <FaInfoCircle className="text-lg" />
                            About
                        </Link>

                        {session ? (
                            <>
                                <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1">
                                    <FaTachometerAlt className="text-lg" />
                                    Dashboard
                                </Link>
                                <Link href="/generate" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1">
                                    <FaMagic className="text-lg" />
                                    Generate
                                </Link>

                                {/* Profile Dropdown Trigger (Simplified for now) */}
                                <div className="relative ml-3 flex items-center gap-2">
                                    <Link href="/profile" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600">
                                        <img
                                            className="h-8 w-8 rounded-full border border-gray-200"
                                            src={userImage}
                                            alt=""
                                        />
                                        <span className="text-sm font-medium">{session.user?.name}</span>
                                    </Link>
                                    <button
                                        onClick={() => signOut({ callbackUrl: "/" })}
                                        className="ml-4 px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-md hover:bg-red-50"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link href="/login" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Login
                                </Link>
                                <Link href="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/" className="block text-gray-700 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium flex items-center gap-2">
                            <FaHome />
                            Home
                        </Link>
                        <Link href="/about" className="block text-gray-700 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium flex items-center gap-2">
                            <FaInfoCircle />
                            About
                        </Link>

                        {session ? (
                            <>
                                <Link href="/dashboard" className="block text-gray-700 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium flex items-center gap-2">
                                    <FaTachometerAlt />
                                    Dashboard
                                </Link>
                                <Link href="/generate" className="block text-gray-700 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium flex items-center gap-2">
                                    <FaMagic />
                                    Generate
                                </Link>
                                <Link href="/profile" className="block text-gray-700 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full overflow-hidden border border-gray-200">
                                        <img src={userImage} alt="" className="h-full w-full object-cover" />
                                    </div>
                                    My Profile
                                </Link>
                                <button
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="w-full text-left block text-red-600 hover:bg-red-50 px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
                                >
                                    <FaSignOutAlt />
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <div className="pt-4 pb-2 border-t border-gray-200">
                                <Link href="/login" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">
                                    Login
                                </Link>
                                <Link href="/register" className="block text-indigo-600 font-bold px-3 py-2 rounded-md text-base">
                                    Create Account
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
