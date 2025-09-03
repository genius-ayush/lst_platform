"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useWallet } from "@solana/wallet-adapter-react"




type Token = "SOL" | "driftSOL"

export function Unstackform() {
  const {connected} = useWallet() ; 
  const [fromToken, setFromToken] = React.useState<Token>("driftSOL")
  const [amount, setAmount] = React.useState<string>("")
  const [method, setMethod] = React.useState<"direct" | "jupiter">("direct")

  // Simple mock conversion rate and fee to show interactivity
  const parsed = Number.parseFloat(amount || "0") || 0
  const rate = 1.2 // pretend mint fee or redemption
  const receive = parsed * rate

  return (
    <div className="flex flex-col">
  <header className="mb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
    <div>
      <h1 className="text-pretty text-3xl font-semibold tracking-tight md:text-5xl">
        Unstack
      </h1>
    </div>
    <aside className="text-left md:text-right">
      <p className="text-sm text-muted-foreground">APY</p>
      <p className="text-4xl font-bold text-primary md:text-5xl">6.73%</p>
    </aside>
  </header>

  {/* Cards section */}
  <div className=" grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
    {/* From Card */}
    <Card className="bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/60 border border-border/60 rounded-[var(--radius)] p-5 w-full">
      <p className="text-2xl font-light mb-4">{"You're Unstacking"}</p>
      <div className="flex items-center justify-between gap-4">
        <TokenSelect
          value={fromToken}
          onValueChange={(v) => setFromToken(v as Token)}
          tokens={["driftSOL"]}
        />
        <Input
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          className="h-16 flex-1 rounded-full bg-card/60 border-0 shadow-none text-right text-2xl font-semibold focus-visible:ring-0 focus-visible:outline-none"
          aria-label="Amount"
        />
      </div>
    </Card>

    {/* Arrow */}
    <div aria-hidden className="hidden md:flex items-center justify-center">
      <ArrowRight />
    </div>

    <Card className="bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/60 border border-border/60 rounded-[var(--radius)] p-5 w-full">
      <p className="text-2xl font-light mb-4">{"To receive"}</p>
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2 items-center">
          <img src={`/Solana_logo.png`} alt="" className="h-10 w-10 rounded-full" />
          <span className="font-bold">SOL</span>
        </div>
        <Input
          inputMode="decimal"
          value={formatNumber(receive)}
          placeholder=""
          className="h-16 flex-1 rounded-full bg-card/60 border-0 shadow-none text-right text-2xl font-semibold focus-visible:ring-0 focus-visible:outline-none"
          aria-label="Amount"
          readOnly
        />
      </div>
    </Card>
    
  </div>

  {/* Controls below */}
  <div className="mt-10">
    <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-3">
      <SegmentedButton
        label="Immediately via Jupiter"
        active={method === "direct"}
        onClick={() => setMethod("direct")}
        description="0.08% below Fair Value"
      />
      <SegmentedButton
        label="Delayed in 1 day"
        active={method === "jupiter"}
        onClick={() => setMethod("jupiter")}
        description="0.1% Unstake Fee"
      />
    </div>

    {connected ?  (<Button className="w-full h-12 rounded-full text-base font-semibold bg-primary text-primary-foreground hover:opacity-95">
      Unstack SOL
    </Button>) : (<Button className="w-full h-12 rounded-full text-base font-semibold bg-primary text-primary-foreground hover:opacity-95">
      Connect Wallet
    </Button>)}

    {/* Fine Controls */}
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <KeyValue label="1 driftSOL" value={`≈ ${formatNumber(1)} SOL`} />
    </div>
  </div>
</div>

  )
}

function formatNumber(n: number) {
  return Intl.NumberFormat(undefined, { maximumFractionDigits: 6 }).format(n)
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TokenSelect({
  value,
  onValueChange,
  tokens,
}: {
  value: string
  onValueChange: (v: string) => void
  tokens: string[]
}) {
  return (
    <Select value={value} onValueChange={onValueChange} >
      <SelectTrigger className="w-[160px] rounded-full border-0 ">
        <div className="flex items-center gap-2">
          <img src={`/Solana_logo.png`} alt="" className="h-10 w-10  rounded-full" />
          <SelectValue placeholder="Select token" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {tokens.map((t) => (
          <SelectItem key={t} value={t}>
            {t}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}



function SegmentedButton({
  label,
  description,
  active,
  onClick,
}: {
  label: string
  description?: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl border p-4 text-left transition-colors",
        active
          ? "border-transparent bg-primary/80 text-primary-foreground"
          : "border-border/60 bg-transparent hover:bg-secondary/30",
      )}
      aria-pressed={active}
    >
      <div className="text-sm font-semibold">{label}</div>
      {description ? (
        <div className={cn("mt-1 text-xs", active ? "text-primary-foreground/80" : "text-muted-foreground")}>
          {description}
        </div>
      ) : null}

      
    </button>
  )
}

function KeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/50 bg-secondary/20 px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}




