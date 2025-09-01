'use client'
import Image from 'next/image';
import React from 'react'
import { InteractiveGridPattern } from '../magicui/interactive-grid-pattern';
import { cn } from '../../lib/utils';

export const roadmap = [
  {
    id: "0",
    title: "Stake & Earn Effortlessly",
    text: "Stake your SOL in just a few clicks and start earning staking rewards instantly — no complex setup or lock-ups required.",
    status: "done",
    colorful: true,
  },
  {
    id: "1",
    title: "Liquidity Without Compromise",
    text: "Receive liquid staking tokens (LSTs) that stay usable across DeFi while your assets continue generating rewards.",
    status: "progress",
  },
  {
    id: "2",
    title: "DeFi Integrations",
    text: "Put your LSTs to work — trade, lend, or provide liquidity across leading DeFi protocols without missing staking rewards.",
    status: "done",
  },
  {
    id: "3",
    title: "Secure & Transparent",
    text: "Built with audited smart contracts and a community-first approach to ensure safety, transparency, and reliability.",
    status: "progress",
  }
]

function Features() {
  return (
    <section id="features" className='flex justify-center'>
      <div className="container md:pb-10">
      <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-[#060606] dark:text-white">
            Powerful Features for Modern Stakers
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light">
            Unlock liquidity, earn rewards, and explore DeFi — all while your assets keep growing securely.
          </p>
        </div>

        <div className="relative grid gap-6 md:grid-cols-2 md:gap-4 md:pb-[7rem] mt-10 ">
          {roadmap.map((item) => {
            const status = item.status === "done" ? "Done" : "In progress";

            return (
              <div
                className={`md:flex even:md:translate-y-[7rem] p-0.25 }   rounded-[2.5rem] dark:bg-gray-600`}
                key={item.id}
              >
                <div className="relative p-6  rounded-[2.5rem]  overflow-hidden xl:p-15 bg-background">
                  <InteractiveGridPattern
                    className={cn(
                      "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                      "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                    )}
                  />
                  <div className="relative z-1">

                    <h4 className="font-semibold mb-4 text-[#8473f7]">{item.title}</h4>
                    <p className="font-extralight">{item.text}</p>
                  </div>
                </div>

              </div>
            );
          })}

        </div>


      </div>

    </section>
  )
}







export default Features