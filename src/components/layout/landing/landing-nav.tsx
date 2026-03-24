import Link from 'next/link';
import { Button } from '../../ui/button';

export function LandingNav() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
            R
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">Relog</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Link href="/pricing">요금제</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Link href="/login">로그인</Link>
          </Button>
          <Button asChild size="sm" className="rounded-full px-5">
            <Link href="/signup">무료로 시작하기</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
