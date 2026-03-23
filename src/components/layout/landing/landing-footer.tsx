import Link from 'next/link';

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card/50 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-primary-foreground">
            R
          </div>
          <span className="text-sm font-semibold text-foreground">Relog</span>
        </div>
        <p className="text-xs text-muted-foreground">
          관계와 작업 이력을 함께 기록하는 B2B CRM
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <Link href="/login" className="hover:text-foreground transition-colors">로그인</Link>
          <Link href="/signup" className="hover:text-foreground transition-colors">회원가입</Link>
          <span>&copy; 2026 Relog</span>
        </div>
      </div>
    </footer>
  );
}
