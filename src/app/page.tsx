import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Abhijeet Shinde | Web Developer in Mumbai",
  description: "Experienced Web Developer in Mumbai specializing in backend architecture, DevOps, and scalable systems. Get a free website audit or hire me for your next project.",
  keywords: ["Web Developer in Mumbai", "Backend Developer", "Systems Engineer", "Freelance Web Developer Mumbai", "React Developer", "Next.js Specialist", "Hire Developer"],
  openGraph: {
    title: "Abhijeet Shinde | Web Developer in Mumbai",
    description: "Experienced Web Developer in Mumbai specializing in backend architecture, DevOps, and scalable systems.",
    type: "website",
    url: "https://profitable-azure.vercel.app",
    siteName: "Abhijeet Shinde",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Abhijeet Shinde | Web Developer in Mumbai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhijeet Shinde | Web Developer in Mumbai",
    description: "Experienced Web Developer in Mumbai specializing in backend architecture, DevOps, and scalable systems.",
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
    "jobTitle": "Web Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "sameAs": [
      "https://hashnode.com/@abhijeet2005"
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
