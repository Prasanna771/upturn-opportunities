import type { Metadata } from "next";
import { Montserrat, Poppins } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

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
    // This tells Google to use your favicon
    icon: "/favicon-32x32.png", 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body>
        
        {/* THIS IS THE NEW CODE THAT FIXES YOUR SITE NAME */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Upturn Opportunities",
            "url": "https://www.upturnops.com",
          })}}
        />
        {/* END OF NEW CODE */}

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
