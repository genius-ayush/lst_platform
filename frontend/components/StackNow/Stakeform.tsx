"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type StakeFormProps = {
  mode: "stake" | "unstake"
}

type Token = "SOL" | "JitoSOL"

export function StakeForm({ mode }: StakeFormProps) {
  const [fromToken, setFromToken] = React.useState<Token>(mode === "stake" ? "SOL" : "JitoSOL")
  const [toToken, setToToken] = React.useState<Token>(mode === "stake" ? "JitoSOL" : "SOL")
  const [amount, setAmount] = React.useState<string>("")
  const [method, setMethod] = React.useState<"direct" | "jupiter">("direct")
  const [priorityFee, setPriorityFee] = React.useState<boolean>(false)
  const [tipsActive, setTipsActive] = React.useState<"off" | "low" | "high">("low")
  const [slippage, setSlippage] = React.useState<"0.1" | "0.3" | "1.0">("0.3")

  // Simple mock conversion rate and fee to show interactivity
  const parsed = Number.parseFloat(amount || "0") || 0
  const rate = mode === "stake" ? 0.998 : 1.0 // pretend mint fee or redemption
  const receive = parsed * rate

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
      {/* From Card */}
      <Card className="bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/60 border border-border/60 rounded-[var(--radius)]">
        <div className="flex items-center justify-between p-5">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{mode === "stake" ? "You're staking" : "You're unstaking"}</p>
            <div className="flex items-center gap-3">
              <TokenSelect
                value={fromToken}
                onValueChange={(v) => setFromToken(v as Token)}
                tokens={["SOL", "JitoSOL"]}
              />
            </div>
          </div>

          <div className="min-w-[160px]">
            <Input
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="h-14 rounded-full bg-secondary/40 text-right text-2xl font-semibold"
              aria-label="Amount"
            />
            <div className="mt-2 text-right text-xs text-muted-foreground">Balance: 0.00 {fromToken}</div>
          </div>
        </div>
      </Card>

      {/* To Card */}
      <Card className="bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/60 border border-border/60 rounded-[var(--radius)]">
        <div className="p-5">
          <div className="mb-6 flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">To receive</p>
              <div className="flex items-center gap-3">
                <TokenStatic value={toToken} />
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-muted-foreground">Price Impact</p>
              <p className="text-sm font-medium">0%</p>
            </div>
          </div>

          {/* Method Toggle Row */}
          <div className="mb-5 grid grid-cols-2 gap-3">
            <SegmentedButton
              label="Direct Mint"
              active={method === "direct"}
              onClick={() => setMethod("direct")}
              description={mode === "stake" ? "Mint via Stake Pool contract" : "Redeem via Stake Pool"}
            />
            <SegmentedButton
              label="via Jupiter"
              active={method === "jupiter"}
              onClick={() => setMethod("jupiter")}
              description={mode === "stake" ? "Swap for JitoSOL via Jupiter" : "Swap back to SOL via Jupiter"}
            />
          </div>

          <Button className="w-full h-12 rounded-full text-base font-semibold bg-primary text-primary-foreground hover:opacity-95">
            Connect Wallet
          </Button>

          {/* Fine Controls */}
          <div className="mt-6 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            <div className="space-y-2">
              <KeyValue label="1 JitoSOL" value={`≈ ${formatNumber(1)} SOL`} />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span>Priority fee active</span>
                  <InfoTip>Enable to speed up confirmation at a higher network fee.</InfoTip>
                </div>
                <Switch checked={priorityFee} onCheckedChange={setPriorityFee} aria-label="Priority fee" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span>Tips Active</span>
                  <InfoTip>Optional tip to validators or services.</InfoTip>
                </div>
                <RadioGroup
                  className="flex items-center gap-2"
                  value={tipsActive}
                  onValueChange={(v) => setTipsActive(v as typeof tipsActive)}
                >
                  <RadioPill value="off" label="Off" />
                  <RadioPill value="low" label="Low" />
                  <RadioPill value="high" label="High" />
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-2">
              <KeyValue label={`You will receive (${toToken})`} value={`${formatNumber(receive)} ${toToken}`} />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span>Slippage</span>
                  <InfoTip>Max price movement allowed before the txn reverts.</InfoTip>
                </div>
                <RadioGroup
                  className="flex items-center gap-2"
                  value={slippage}
                  onValueChange={(v) => setSlippage(v as typeof slippage)}
                >
                  <RadioPill value="0.1" label="0.1%" />
                  <RadioPill value="0.3" label="0.3%" />
                  <RadioPill value="1.0" label="1.0%" />
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Arrow between cards on desktop */}
      <div aria-hidden className="hidden md:block" />
      <div aria-hidden className="hidden items-center justify-center md:flex">
        <ArrowRight />
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
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[160px] rounded-full bg-secondary/40">
        <div className="flex items-center gap-2">
          <img src={`/placeholder.svg?height=24&width=24&query=token`} alt="" className="h-6 w-6 rounded-full" />
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

function TokenStatic({ value }: { value: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-secondary/40 px-4 py-2">
      <img
        src={`/abstract-geometric-shapes.png?height=24&width=24&query=${value}`}
        alt=""
        className="h-6 w-6 rounded-full"
      />
      <span className="font-medium">{value}</span>
    </div>
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

function RadioPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-1">
      <RadioGroupItem id={`rg-${value}`} value={value} className="sr-only" />
      <Label
        htmlFor={`rg-${value}`}
        className="cursor-pointer rounded-full border border-border/60 px-3 py-1 text-xs hover:bg-secondary/40 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        // This data-state style is handled via sibling, so we just keep consistent class names
      >
        {label}
      </Label>
    </div>
  )
}

function InfoTip({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 cursor-help text-muted-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path d="M12 17h.01M12 13a4 4 0 1 0-4-4" strokeLinecap="round" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-xs">{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
