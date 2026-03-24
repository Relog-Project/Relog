import { DashboardHeader } from '@/src/components/layout/dashboard/dashboad-header';
import { XCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

interface FailPageProps {
  searchParams: Promise<{
    code?: string;
    message?: string;
    orderId?: string;
  }>;
}

export default async function PaymentFailPage({ searchParams }: FailPageProps) {
  const { code, message, orderId } = await searchParams;

  const errorMessage = message || '결제가 취소되었거나 오류가 발생했습니다.';

  return (
    <div>
      <DashboardHeader title="결제 실패" description="결제가 완료되지 않았습니다." />
      <div className="flex min-h-[60vh] items-center justify-center p-8">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <XCircle className="h-10 w-10 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">결제 실패</h2>
          <p className="mt-3 text-muted-foreground">{errorMessage}</p>

          {(code || orderId) && (
            <div className="mt-6 rounded-xl border border-border bg-card p-4 text-left">
              {code && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">오류 코드</span>
                  <span className="font-mono text-xs text-foreground">{code}</span>
                </div>
              )}
              {orderId && (
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">주문번호</span>
                  <span className="font-mono text-xs text-foreground">{orderId}</span>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-2">
            <Button asChild className="rounded-xl">
              <Link href="/upgrade">다시 시도하기</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard">대시보드로 이동</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
