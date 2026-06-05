import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Abhijeet Shinde",
  description: "Read my latest thoughts on web development, backend systems, and building scalable applications.",
  openGraph: {
    title: "Blog | Abhijeet Shinde",
    description: "Read my latest thoughts on web development, backend systems, and building scalable applications.",
    url: "https://profitable-azure.vercel.app/blog",
    type: "website",
    siteName: "Abhijeet Shinde",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Abhijeet Shinde",
    description: "Read my latest thoughts on web development, backend systems, and building scalable applications.",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Abhijeet Shinde's Blog",
  "url": "https://profitable-azure.vercel.app/blog",
  "description": "Writings on web development, systems engineering, and more.",
  "dateModified": new Date().toISOString(),
  "author": {
    "@type": "Person",
    "name": "Abhijeet Shinde"
  }
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
