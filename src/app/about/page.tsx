import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Web Developer Abhijeet Shinde | Systems Engineer",
  description: "Learn more about Abhijeet Shinde, a web developer from Mumbai focusing on scalable systems, backend architecture, and robust web applications.",
  keywords: ["About Web Developer Abhijeet", "Backend Engineer Mumbai", "Freelance Developer India", "Systems Design Expert", "Hire React Developer"],
  openGraph: {
    title: "About Web Developer Abhijeet Shinde",
    description: "Learn more about Abhijeet Shinde, a web developer from Mumbai focusing on scalable systems and backend architecture.",
    url: "https://profitable-azure.vercel.app/about",
    siteName: "Abhijeet Shinde",
    type: "profile",
    images: [
      {
        url: "/Image/cognidesk-cover.png",
        width: 1200,
        height: 630,
        alt: "About Abhijeet Shinde | Web Developer in Mumbai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Web Developer Abhijeet Shinde",
    description: "Learn more about Abhijeet Shinde, a web developer from Mumbai focusing on scalable systems and backend architecture.",
    images: ["/Image/cognidesk-cover.png"],
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Abhijeet Shinde",
  "url": "https://profitable-azure.vercel.app/about",
  "mainEntity": {
    "@type": "Person",
    "name": "Abhijeet Shinde",
    "jobTitle": "Systems Engineer & Web Developer",
    "url": "https://profitable-azure.vercel.app"
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <AboutClient />
    </>
  );
}
