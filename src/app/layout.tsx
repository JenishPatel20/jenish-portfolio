import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jenishpatel.vercel.app"),
  title: {
    default: "Jenish Patel — AI/ML, Backend & Software Engineer",
    template: "%s | Jenish Patel",
  },
  description:
    "Jenish Patel is an M.S. Computer Science student at Rutgers graduating December 2026, building applied AI/ML, backend systems, data pipelines, and software projects.",
  keywords: [
    "Jenish Patel",
    "AI Engineer",
    "Machine Learning Engineer",
    "Backend Engineer",
    "Software Engineer",
    "Rutgers Computer Science",
    "FastAPI",
    "PyTorch",
    "WebGPU",
  ],
  authors: [{ name: "Jenish Patel" }],
  creator: "Jenish Patel",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Jenish Patel — AI/ML, Backend & Software Engineer",
    description:
      "Applied AI/ML, backend systems, and software engineering portfolio. Rutgers M.S. CS · December 2026.",
    siteName: "Jenish Patel Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jenish Patel — AI/ML, Backend & Software Engineer",
    description:
      "Applied AI/ML, backend systems, and software engineering portfolio. Rutgers M.S. CS · December 2026.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-pg-bg text-pg-text-1">
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
