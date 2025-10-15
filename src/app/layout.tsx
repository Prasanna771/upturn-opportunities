import type { Metadata } from "next";
import { Montserrat, Poppins } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Initialize fonts and assign them to CSS variables
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
  icons: {
    icon: "/favicon-32x32.png",
  },
  description: "Connecting skilled IT professionals with top U.S. companies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // The <html> and <body> tags are required here
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}