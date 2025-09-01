"use client";
import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import CallToAction from "./CallToAction";
import Footer from "./Footer";
import { Header } from "./Header";
import Image from "next/image";

function Landing() {
  return (
    <div className="relative dark:bg-black bg-[#f2f0ef] overflow-hidden">
      {/* Background image - hidden on small screens */}
      <div className="absolute inset-0 h-1/2 hidden md:block">
        <Image
          src="/herocircle.png"
          width={5000}
          height={5000}
          alt="spiral background"
          priority
          className="absolute bottom-0 left-1/2 -translate-x-1/2 
                     w-[1200px] md:w-[1600px] lg:w-[2000px] 
                     max-w-none pointer-events-none select-none 
                     opacity-30 dark:opacity-40"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Header />
        <main className="px-4 sm:px-6 lg:px-12">
          <Hero />
          <Features />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Landing;
