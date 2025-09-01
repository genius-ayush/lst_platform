import Image from "next/image";
import { Button } from "../ui/button";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

// components/landingPage/Hero.tsx
export default function Hero() {
  return (
    <section className="relative w-full md:min-h-screen flex flex-col md:mt-20 items-center px-4 sm:px-6 lg:px-12 pt-28 pb-16">
      {/* Hero Content */}
      <div className="absolute inset-0 h-1/2 hidden md:block">
        <Image
          src="/herocircle.png"
          width={5000}
          height={5000}
          alt="spiral background"
          priority
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-100 
           w-[1200px] md:w-[1600px] lg:w-[2000px] 
           max-w-none pointer-events-none select-none 
           opacity-30 dark:opacity-40"

        />
      </div>
      <div className="relative z-10 text-center dark:text-white max-w-4xl">
        
        {/* Announcement Tag */}
        <div className="mb-6 flex justify-center">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-4 py-2 text-sm sm:text-base"
          >
            <span>🎉 Introducing Drift – a LST Platform</span>
          </HoverBorderGradient>
        </div>

        {/* Heading */}
        <h1 className="relative z-10 font-medium md:font-light text-[#17191c] dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-tight">
          Drift into the Future of Staking
        </h1>

        {/* Subtext */}
        <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-800 dark:text-gray-200 font-light max-w-2xl mx-auto">
          Stake your SOL, earn rewards, and receive liquid tokens you can use across DeFi — all while your assets keep growing.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button className="px-6 py-3 rounded-full text-base sm:text-lg bg-[#8174ff]">
            Try For Free
          </Button>
        </div>
      </div>
    </section>
  );
}
