"use client";

import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#060606] text-gray-400">
      <div className="container mx-auto px-6 py-10 md:py-14 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Section */}
        <div className="flex flex-col items-start space-y-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="Logo" width={28} height={28} />
            <span className="text-lg font-semibold text-white">Pulse</span>
          </div>

          {/* YC Badge */}
          <div className="rounded-md border border-gray-700 bg-white px-3 py-1 text-xs font-medium text-black">
            Backed by <span className="font-semibold">Y Combinator</span>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-3 pt-2">
            <Link
              href="https://linkedin.com"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            >
              <Linkedin className="w-4 h-4 text-white" />
            </Link>
            <Link
              href="https://twitter.com"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            >
              <Twitter className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-col md:items-center">
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/terms" className="hover:text-white transition">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/contact-sales" className="hover:text-white transition">
                Contact Sales
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col md:items-center">
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/careers" className="hover:text-white transition">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/security" className="hover:text-white transition">
                Security
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Pulse Software, Corp. All rights reserved.
      </div>
    </footer>
  );
}
