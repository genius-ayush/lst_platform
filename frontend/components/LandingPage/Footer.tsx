// components/landingPage/Footer.tsx
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter, Wind } from "lucide-react";
import { TextHoverEffect } from "../ui/text-hover-effect";

export default function Footer() {
  return (
    <footer className="w-full  dark:border-gray-800 py-10 px-6 lg:px-12 bg-white dark:bg-[#17191c]" id="contact">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10 mb-2 pb-5 border-b-2 ">

        {/* Left Section */}
        <div className="flex flex-col items-start gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Wind />
            <span className="font-medium text-lg dark:text-white">Drift</span>
          </div>



          {/* Social Icons */}
          <div className="flex gap-3">
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center"
            >
              <Linkedin className="text-white dark:text-black w-4 h-4" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center"
            >
              <Twitter className="text-white dark:text-black w-4 h-4" />
            </Link>
          </div>



        </div>

        {/* Right Section */}
        <div className="flex gap-16">
          {/* Product Links */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-sm text-gray-900 dark:text-white">
              Product
            </h3>
            <Link href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
              Contact Sales
            </Link>
            <Link href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
              Contact Us
            </Link>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-sm text-gray-900 dark:text-white">
              Company
            </h3>
            <Link href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
              Careers
            </Link>
            <Link href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
              Blog
            </Link>
            <Link href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
              Security
            </Link>
          </div>
        </div>
      </div>
      

      <div className="h-[30rem] xl:flex items-center justify-center hidden ">
        <TextHoverEffect text="DRIFT" />
      </div>

      <div className="text-center flex justify-center"><p className="text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Drift, Corp. All Rights Reserved
      </p></div>
    </footer>
  );
}
