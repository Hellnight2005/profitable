import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Script from "next/script";
import AnalyticsTracker from "@/hooks/useAnalytics";
import WebMCPInitializer from "@/components/WebMCPInitializer";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://profitable-azure.vercel.app"),
  title: {
    default: "Abhijeet Shinde | Web Developer in Mumbai",
    template: "%s | Abhijeet Shinde",
  },
  description: "Experienced Web Developer in Mumbai specializing in backend architecture, DevOps, and scalable systems. Get a free website audit or hire me for your next project.",
  verification: {
    google: "xzapu7V0XUQkAi0kmCM7xfMSaFxoOL0zRc5GRu3766I",
  },
  icons: {
    icon: "/icon.jpg",
    shortcut: "/icon.jpg",
    apple: "/icon.jpg",
  },
  openGraph: {
    title: "Abhijeet Shinde | Web Developer in Mumbai",
    description: "Experienced Web Developer in Mumbai specializing in backend architecture, DevOps, and scalable systems.",
    url: "https://profitable-azure.vercel.app",
    siteName: "Abhijeet Shinde",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/brgrounf_less.png",
        width: 1200,
        height: 630,
        alt: "Abhijeet Shinde - Web Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhijeet Shinde | Web Developer in Mumbai",
    description: "Experienced Web Developer in Mumbai specializing in backend architecture, DevOps, and scalable systems.",
    images: ["/brgrounf_less.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmMono.variable} ${playfairDisplay.variable}`}>
      <head>
        <link rel="webmcp-manifest" href="/.well-known/webmcp.json" />
      </head>
      <body>
        <AnalyticsTracker />
        <WebMCPInitializer />
        <Loader />
        <Cursor />
        <Navbar />
        <main style={{ marginTop: "64px", minHeight: "100vh" }}>
          {children}
        </main>
        <Footer />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LWESM1V5Q0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-LWESM1V5Q0');
          `}
        </Script>
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xpu4f6o2f2");
            window.clarity("consent", false);
          `}
        </Script>
      </body>
    </html>
  );
}
