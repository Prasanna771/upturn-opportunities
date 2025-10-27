import type { Metadata } from "next";
import { Montserrat, Poppins } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// --- Fonts ---
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '700'],
  variable: '--font-poppins',
});

// --- SEO Metadata ---
export const metadata: Metadata = {
  title: "Upturn Opportunities – Bridging Tech Talent and Global Growth",
  description:
    "Upturn Opportunities helps skilled tech talent grow globally — connecting India’s brightest with leading U.S. organizations.",
  icons: {
    icon: "/favicon-32x32.png",
  },
  openGraph: {
    title: "Upturn Opportunities – Bridging Tech Talent and Global Growth",
    description:
      "Connecting skilled IT professionals with top U.S. companies. Empower your career with trusted consulting and staffing solutions.",
    url: "https://www.upturnops.com",
    siteName: "Upturn Opportunities",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Upturn Opportunities – Global IT Consulting",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

// --- Root Layout ---
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
      <body className="bg-white">
        {/* --- Schema.org JSON-LD (Organization) --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Upturn Opportunities",
              "url": "https://www.upturnops.com",
              "logo": "https://www.upturnops.com/logo.png",
              "description":
                "Upturn Opportunities connects skilled IT professionals with top U.S. companies through trusted consulting and staffing services.",
              "sameAs": [
                "https://www.linkedin.com/company/upturn-opportunities/",
                "https://twitter.com/upturnops",
              ],
            }),
          }}
        />

        {/* --- Navbar, Main Content, Footer --- */}
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
