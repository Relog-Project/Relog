import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
      <div className="mb-6 inline-flex items-center rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground">
        B2B 관계 관리의 새로운 기준
      </div>
      <h1 className="text-balance text-5xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl">
        연락처가 아니라 <span className="text-primary">관계</span>를 기록하세요
      </h1>
      <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
        단순한 명함 관리가 아닌, 사람과 회사와의 작업 이력을 함께 기록하는 관계
        중심 CRM. 외주 개발팀, 영업 담당자, 프리랜서를 위해 만들었습니다.
      </p>
      <div className="mt-10 flex items-center gap-4">
        <Button asChild size="lg" className="h-12 px-8 text-base">
          <Link href="/signup">
            무료로 시작하기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="h-12 px-8 text-base bg-transparent"
        >
          <Link href="/login">로그인</Link>
        </Button>
      </div>
    </section>
  );
}
