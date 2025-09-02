"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

const faqs = [
  {
    question: "What is Drift?",
    answer: "Drift is a Liquid Staking Token (LST) platform that lets you stake your SOL, earn rewards, and receive liquid tokens that can be used across the DeFi ecosystem."
  },
  {
    question: "How does liquid staking work?",
    answer: "When you stake SOL with Drift, you continue earning staking rewards while also receiving a liquid token that represents your staked assets. This token can be traded, lent, or used in DeFi protocols without un-staking.",
  },
  {
    question: "Is my staked SOL safe?",
    answer:
      "Yes. Drift partners with trusted validators on Solana to ensure your assets remain secure while generating staking rewards.",
  },
  {
    question: "What are the benefits of using Drift over regular staking?",
    answer:
      "With Drift, you don’t have to lock your SOL. You earn rewards and still have a liquid token you can use across DeFi, unlocking more flexibility and opportunities.",
  },
  {
    question: "How often are rewards distributed?",
    answer:
      "Staking rewards are accrued continuously and reflected in the value of your liquid staking token.",
  },
  {
    question: "Can I unstake my SOL anytime?",
    answer:
      "Yes. You can unstake at any time, but depending on the withdrawal method, there may be an unbonding period or a small liquidity fee.",
  },
  {
    question: "Does Drift charge any fees?",
    answer:
      "Drift charges a small protocol fee on staking rewards to maintain the platform and support development.",
  },
  {
    question: "Who can use Drift?",
    answer:
      "Drift is designed for everyone — from individual stakers and DeFi users to DAOs and institutions looking to maximize their capital efficiency.",
  },
];

export default function FAQ() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <section className="w-full max-w-3xl mx-auto py-20 px-4 text-center">
      {/* Heading */}
      <h2 className="text-3xl font-medium tracking-tight dark:text-white">
        Frequently Asked Questions
      </h2>
      <p className="mt-2 text-gray-400">
        Your question not answered here?{" "}
        <a
          href="mailto:hello@drift.so"
          className="text-blue-400 hover:underline"
        >
          Email Us
        </a>
      </p>

      {/* Accordion */}
      <div className="mt-10 text-left">
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4"
          onValueChange={(val) => setActiveItem(val)}
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={`rounded-xl border dark:bg-zinc-900 transition-colors ${
                activeItem === `item-${index}`
                  ? "border-[#8174ff]"
                  : "border-zinc-800"
              }`}
            >
              <AccordionTrigger className="px-4 py-3 dark:text-white hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 dark:text-gray-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
