import type { Metadata } from "next";
import { Space_Mono, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Toni Adekola",
  alternateName: "Adekola Oluwatoniloba",
  url: "https://toniloba.vercel.app",
  jobTitle: "Frontend Engineer",
  worksFor: { "@type": "Organization", name: "NITHUB" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  sameAs: [
    "https://github.com/AdekolaToniloba",
    "https://linkedin.com/in/adekola-toniloba-424224179",
    "https://x.com/atoniloba",
    "https://theadekolaexperience.hashnode.dev",
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Framer Motion",
    "Web3",
    "Tailwind CSS",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://toniloba.vercel.app"),
  title: "Toni Adekola — Frontend Engineer, Lagos",
  description:
    "Frontend engineer based in Lagos building fintech, Web3, and civic tech products. Next.js, TypeScript, Framer Motion.",
  keywords: [
    "frontend engineer",
    "Next.js developer",
    "Lagos developer",
    "Nigeria tech",
    "React developer",
    "TypeScript",
    "Framer Motion",
    "Web3 developer",
  ],
  authors: [{ name: "Toni Adekola", url: "https://toniloba.vercel.app" }],
  creator: "Toni Adekola",
  openGraph: {
    type: "website",
    url: "https://toniloba.vercel.app",
    title: "Toni Adekola — Frontend Engineer",
    description:
      "I turn ideas into products people can actually use. Fintech, Web3, civic tech. Based in Lagos.",
    siteName: "Toni Adekola Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Toni Adekola — Frontend Engineer, Lagos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toni Adekola — Frontend Engineer",
    description:
      "I turn ideas into products people can actually use. Fintech, Web3, civic tech. Based in Lagos.",
    creator: "@atoniloba",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://toniloba.vercel.app" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceMono.variable}`}>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <div className="grid-overlay" aria-hidden="true" />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
