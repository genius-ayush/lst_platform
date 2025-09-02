import { StakeTabs } from "./StakeTab";


export default function Body() {
  return (
    <main className="min-h-dvh w-full text-foreground">
      <section className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="mb-8 flex items-end justify-between">
          <div>
            <nav aria-label="Stake navigation" className="mb-2">
              {/* The tabs below handle the main content; this is just a label area */}
              {/* <h2 className="sr-only">Stake navigation</h2> */}
            </nav>
            <h1 className="text-pretty text-3xl font-semibold tracking-tight md:text-5xl">Get JitoSOL</h1>
          </div>

          <aside className="text-right">
            <p className="text-sm text-muted-foreground">APY</p>
            <p className="text-4xl font-bold text-primary md:text-5xl">6.73%</p>
          </aside>
        </header>

        <StakeTabs/>
      </section>
    </main>
  )
}
