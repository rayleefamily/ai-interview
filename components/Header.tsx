import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold">
          <span className="inline-block h-3 w-3 rounded-full bg-accent" aria-hidden />
          面試模擬器
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/#features" className="hidden text-muted hover:text-foreground sm:block">
            特色
          </Link>
          <Link href="/#how" className="hidden text-muted hover:text-foreground sm:block">
            流程
          </Link>
          <Link href="/settings" className="text-muted hover:text-foreground">
            設定
          </Link>
          <Link
            href="/interview"
            className="rounded-full bg-foreground px-4 py-2 font-medium text-background transition hover:bg-accent hover:text-accent-ink"
          >
            開始練習
          </Link>
        </nav>
      </div>
    </header>
  );
}
