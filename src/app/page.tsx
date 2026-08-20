import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Abhijeet Shinde | Software Engineer & Systems Builder",
  description: "Software engineer exploring backend systems, developer tools, AI applications, storage, and infrastructure. Building projects and documenting system design publically.",
  keywords: [
    "Software Engineer",
    "Backend Systems",
    "Go Engineer",
    "Rust Developer",
    "Distributed Systems",
    "Storage Systems",
    "Developer Tools",
    "AI Infrastructure",
    "RAG",
    "Abhijeet Shinde"
  ],
  openGraph: {
    title: "Abhijeet Shinde | Software Engineer & Systems Builder",
    description: "Software engineer exploring backend systems, developer tools, AI applications, storage, and infrastructure.",
    type: "website",
    url: "https://profitable-azure.vercel.app",
    siteName: "Abhijeet Shinde",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Abhijeet Shinde | Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhijeet Shinde | Software Engineer & Systems Builder",
    description: "Software engineer exploring backend systems, developer tools, AI applications, storage, and infrastructure.",
    images: ["/icon.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "Abhijeet Shinde",
    "url": "https://profitable-azure.vercel.app",
    "jobTitle": "Software Engineer",
    "knowsAbout": [
      "Backend Systems",
      "Storage Architecture",
      "Distributed Infrastructure",
      "Developer Tools",
      "AI Systems",
      "Go",
      "Rust",
      "TypeScript"
    ],
    "sameAs": [
      "https://github.com/Hellnight2005",
      "https://hashnode.com/@abhijeet2005",
      "https://www.linkedin.com/in/abhi2005jeet/"
    ]
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <HomeClient />
    </>
  );
}
