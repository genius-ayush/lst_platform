"use client";
import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import CallToAction from "./CallToAction";
import Footer from "./Footer";
import { Header } from "./Header";
import Image from "next/image";
import FAQ from "./FAQ";

function Landing() {
  return (
    <div className="relative dark:bg-black bg-[#f2f0ef] overflow-hidden">
      {/* Background image - hidden on small screens */}
      

      {/* Main content */}
      <div className="relative z-10">
        <Header />
        <main className="px-4 sm:px-6 lg:px-12">
          <Hero />
          <Features />
          <FAQ/>
          <CallToAction />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Landing;
