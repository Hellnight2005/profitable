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
    images: [
      {
        url: "/brgrounf_less.png",
        width: 1200,
        height: 630,
        alt: "Blog | Abhijeet Shinde",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Abhijeet Shinde",
    description: "Read my latest thoughts on web development, backend systems, and building scalable applications.",
    images: ["/brgrounf_less.png"],
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Abhijeet Shinde's Blog",
  "url": "https://profitable-azure.vercel.app/blog",
  "description": "Writings on web development, systems engineering, and more.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      {children}
    </>
  );
}
