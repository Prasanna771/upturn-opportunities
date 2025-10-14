import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
//import Footer from "@/components/Footer";

//const inter = ({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Upturn Opportunities",
  icons: {
    icon: "/favicon-32x32.png",
  },
  description: "Connecting skilled IT professionals with top U.S. companies",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main> {/* It's good practice to wrap children in a <main> tag */}
      </body>
    </html>
  );
}
