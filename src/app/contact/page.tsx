import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Abhijeet Shinde | Web Developer in Mumbai",
  description: "Get in touch with Abhijeet Shinde for freelance web development, backend architecture, and technical consulting. Request a free audit or hire for a project.",
  keywords: ["Contact Web Developer", "Hire Developer in Mumbai", "Freelance Software Engineer", "Tech Consultant India", "Abhijeet Shinde Contact"],
  openGraph: {
    title: "Contact Abhijeet Shinde | Web Developer in Mumbai",
    description: "Get in touch with Abhijeet Shinde for freelance web development and technical consulting.",
    url: "https://profitable-azure.vercel.app/contact",
    siteName: "Abhijeet Shinde",
    images: [
      {
        url: "/Image/cognidesk-cover.png",
        width: 1200,
        height: 630,
        alt: "Contact Abhijeet Shinde",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Abhijeet Shinde | Web Developer in Mumbai",
    description: "Get in touch with Abhijeet Shinde for freelance web development and technical consulting.",
    images: ["/Image/cognidesk-cover.png"],
  }
};

export default function Page() {
  return <ContactClient />;
}
