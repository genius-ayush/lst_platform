"use client"

import { Tabs as AnimatedTabs } from "@/components/ui/tabs"
import { StakeForm } from "./Stakeform"
import { Unstackform } from "./Unstackform"

export function StakeTabs() {
  const tabs = [
    {
      title: "Stake",
      value: "stake",
      content: <StakeForm  />,
    },
    {
      title: "Unstake",
      value: "unstake",
      content: <Unstackform/>,
    },
  ]

  return (
    <AnimatedTabs
      tabs={tabs}
      containerClassName="border-b border-border pb-2"
      activeTabClassName="bg-secondary"
      tabClassName="px-5 py-2 text-sm font-medium text-foreground/80 hover:text-foreground mb-5"
      contentClassName="mt-8"
    />
  )
}
