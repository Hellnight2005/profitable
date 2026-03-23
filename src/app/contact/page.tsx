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
  }
};

export default function Page() {
  return <ContactClient />;
}
