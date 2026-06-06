import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });

export const metadata: Metadata = {
  title: "NeoVision Health Care - Pharmaceutical Distribution Excellence",
  description: "Your trusted partner in pharmaceutical distribution since 2007. Precision, safety, and efficiency in every delivery across global networks.",
  keywords: "pharmaceutical distribution, cold chain logistics, medical supplies, healthcare",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${openSans.variable}`} suppressHydrationWarning>
      <body className="bg-[#f9f9ff] text-[#121c2c] font-[family-name:var(--font-open-sans)] antialiased" suppressHydrationWarning>
        <Preloader />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
