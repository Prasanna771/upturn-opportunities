import type { Metadata } from "next";
import { Montserrat, Poppins } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// REMOVED: ThemeProvider import

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

export const metadata: Metadata = {
  title: "Upturn Opportunities",
  description: "Connecting skilled IT professionals with top U.S. companies. Empower your career with trusted opportunities and expert guidance.",
  icons: {
    icon: "/favicon-32x32.png", 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
      {/* THIS IS THE FIX: Added bg-white to the body */}
      <body className="bg-white">
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Upturn Opportunities",
            "url": "https://www.upturnops.com",
          })}}
        />
        
        <Navbar />
        <main>{children}</main>
        <Footer />
        
      </body>
    </html>
  );
}