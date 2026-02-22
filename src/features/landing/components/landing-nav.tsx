import Link from "next/link";
import { Button } from "../../../components/ui/button";

export function LandingNav() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground"
        >
          Relog
        </Link>
        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">로그인</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">무료로 시작하기</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
