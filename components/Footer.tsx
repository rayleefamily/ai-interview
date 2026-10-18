import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-lg font-bold text-foreground">面試模擬器</p>
          <p className="mt-1">在真正的面試之前,先練習過一遍。</p>
        </div>
        <nav className="flex gap-6">
          <Link href="/#features" className="hover:text-foreground">特色</Link>
          <Link href="/#how" className="hover:text-foreground">流程</Link>
          <Link href="/interview" className="hover:text-foreground">開始練習</Link>
        </nav>
        <p>© {new Date().getFullYear()} AI Interview</p>
      </div>
    </footer>
  );
}
