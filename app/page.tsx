import Link from "next/link";

const features = [
  {
    n: "01",
    title: "為職缺量身出題",
    body: "貼上任何職缺描述,面試官會依照職責與技能要求,混合技術、情境與行為題,難度循序漸進。",
  },
  {
    n: "02",
    title: "每題即時評分",
    body: "每次回答後立刻得到 1–10 分的評價,清楚知道這一題做得如何。",
  },
  {
    n: "03",
    title: "具體改進建議",
    body: "不只是分數,還會指出可以補充的重點與更好的表達方式,下一題就能用上。",
  },
];

const steps = [
  { title: "貼上職缺描述", body: "從任何求職網站複製你想應徵的職缺內容。" },
  { title: "回答面試官的問題", body: "像真的面試一樣,用自己的話寫下回答。" },
  { title: "獲得評分與建議", body: "立即看到評分、評語與下一題,持續練習到有信心。" },
];

function CtaButton({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href="/interview"
      className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-medium text-accent-ink transition hover:scale-[1.03]"
    >
      {children}
      <span className="transition group-hover:translate-x-1" aria-hidden>
        →
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent opacity-20 blur-3xl"
          aria-hidden
        />
        <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div className="rise">
            <p className="mb-6 inline-block rounded-full border border-line px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted">
              AI Mock Interview
            </p>
            <h1 className="font-serif text-5xl font-bold leading-[1.15] sm:text-6xl">
              面試前,
              <br />
              先<span className="text-accent">練習</span>一遍。
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              貼上你想應徵的職缺,AI 面試官會為你量身出題,逐題評分,並告訴你下一次可以怎麼答得更好。
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <CtaButton>立即開始模擬面試</CtaButton>
              <span className="text-sm text-muted">免註冊 · 貼上就能開始</span>
            </div>
          </div>

          {/* Mock conversation */}
          <div
            className="rise flex flex-col gap-3 self-center lg:rotate-1"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="rounded-2xl border border-line bg-card p-5 shadow-[6px_6px_0_var(--line)]">
              <p className="font-mono text-xs text-muted">面試官 · 第 2 題</p>
              <p className="mt-2 leading-relaxed">
                在 React 中,你會如何決定一個狀態該放在元件內,還是提升到上層?
              </p>
            </div>
            <div className="ml-10 rounded-2xl bg-foreground p-5 text-background">
              <p className="leading-relaxed">
                看有多少元件需要共用它。如果只有單一元件使用就放在本地,否則提升到共同的父層。
              </p>
            </div>
            <div className="rounded-2xl border-2 border-accent bg-card p-5">
              <p className="font-serif text-3xl font-bold text-accent">
                8<span className="text-base text-muted"> / 10</span>
              </p>
              <p className="mt-1 text-sm leading-relaxed">
                判斷準則清楚。建議補充 Context 或狀態管理工具的使用時機。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-16 border-y border-line bg-card">
        <div className="mx-auto w-full max-w-6xl px-5 py-20">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">
            不只是題庫,是你的專屬面試官
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {features.map((f) => (
              <div key={f.n} className="bg-card p-8 transition hover:bg-background">
                <p className="font-mono text-sm text-accent">{f.n}</p>
                <h3 className="mt-4 font-serif text-xl font-bold">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-16">
        <div className="mx-auto w-full max-w-6xl px-5 py-20">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">三步驟,開始練習</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="font-serif text-7xl font-bold text-line">{i + 1}</span>
                <h3 className="-mt-3 font-serif text-xl font-bold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 pb-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 rounded-3xl bg-foreground p-10 text-background sm:p-16">
          <h2 className="max-w-xl font-serif text-3xl font-bold leading-snug sm:text-4xl">
            下一場面試,你已經練習過了。
          </h2>
          <CtaButton>開始我的第一場模擬面試</CtaButton>
        </div>
      </section>
    </main>
  );
}
