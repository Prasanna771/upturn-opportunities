import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Mail, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-white text-gray-900 py-8 px-4 sm:px-6 lg:px-8 z-10 relative border-t border-gray-200">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left items-center">
        
        {/* Left Corner: Company Logo */}
        <div className="flex justify-center md:justify-start">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo2.jpg"
              alt="Upturn Opportunities Logo"
              width={180}
              height={50} // Corrected height
              priority
            />
          </Link>
        </div>

        {/* Middle: Quick Links */}
        <nav className="w-full">
          <ul className="flex justify-center items-center gap-6 text-sm font-medium">
            <li>
              <Link href="/about" className="hover:text-blue-600 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-600 transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/jobs" className="hover:text-blue-600 transition-colors">
                Jobs
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Corner: Social & Contact Icons */}
        <div className="flex justify-center md:justify-end">
          <div className="flex items-center gap-5">
            <a 
              href="https://www.linkedin.com/company/upturnopportunities-pvt-ltd/about/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn" 
              className="hover:text-blue-600 transition-colors"
            >
              <Linkedin size={22} />
            </a>
            <a 
              href="mailto:rakesh@uptrunops.com" 
              aria-label="Email" 
              className="hover:text-blue-600 transition-colors"
            >
              <Mail size={22} />
            </a>
            {/* <a 
              href="https://www.instagram.com/bommidi_prasanna" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram" 
              className="hover:text-blue-600 transition-colors"
            >
              <Instagram size={22} />
            </a> */}
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-8 text-xs border-t border-gray-200 pt-6">
        © 2019 Upturn Opportunities Pvt Ltd. All Rights Reserved.
      </div>
    </footer>
  );
}