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
  }
};

export default function Page() {
  return <AboutClient />;
}
