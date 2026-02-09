import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";  // This line is important!

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Content Generator",
  description: "Generate amazing content with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>  {/* This line is important! */}
      </body>
    </html>
  );
}