"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function CallToAction() {
  const router = useRouter()
  return (
    <section className="bg-backgrond py-20 text-center flex flex-col items-center">
      
      <div className="mb-6">
        <Image
          src="/callToAction.svg" // replace with your svg path
          alt="Drift CTA Icon"
          width={300}
          height={300}
        />
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-lg dark:text-white max-w-2xl">
        Unlock more with your staked SOL through Drift
      </h2>

      {/* Subheading */}
      <p className="mt-4 text-lg text-gray-400">
        Designed for DeFi users, creators, and enterprises alike
      </p>

      {/* Button */}
      <div className="mt-8">
      <Button className="px-6 py-3 rounded-full text-base sm:text-lg bg-[#8174ff]" onClick={()=>router.push("/stacknow")}>
            Start Stacking
          </Button>
      </div>
    </section>
  );
}

export default CallToAction;
