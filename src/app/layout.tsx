import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "techai.pk - Learn It. Build It. Automate It.",
  description: "Personal brand website for Abdul Wahab - Online Tutor, AI Automation Specialist, Web Developer, Consultant & Tech Speaker",
  keywords: ["web development", "AI automation", "tutoring", "tech speaker", "consulting"],
  authors: [{ name: "Abdul Wahab" }],
  openGraph: {
    title: "techai.pk",
    description: "Learn It. Build It. Automate It.",
    type: "website",
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-primary-bg text-text-primary">
        {children}
      </body>
    </html>
  );
}
