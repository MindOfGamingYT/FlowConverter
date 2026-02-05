import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConvertAll - Universal Local File Converter",
  description: "Convert images, videos, and audio files directly in your browser. No file uploads needed, privacy-first conversion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 min-h-screen text-slate-900`}>
        <Navbar />
        <main className="pt-24 pb-12 px-4 max-w-5xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
