import { confirmPaymentAction } from '@/src/features/pricing/actions/confirm-payment';
import { DashboardHeader } from '@/src/components/layout/dashboard/dashboad-header';
import { CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

interface SuccessPageProps {
  searchParams: Promise<{
    paymentKey?: string;
    orderId?: string;
    amount?: string;
  }>;
}

export default async function PaymentSuccessPage({ searchParams }: SuccessPageProps) {
  const { paymentKey, orderId, amount } = await searchParams;

  if (!paymentKey || !orderId || !amount) {
    return <ErrorView message="잘못된 접근입니다." />;
  }

  const result = await confirmPaymentAction({
    paymentKey,
    orderId,
    amount: Number(amount),
  });

  if (result.error) {
    return <ErrorView message={result.error} />;
  }

  return (
    <div>
      <DashboardHeader title="결제 완료" description="프로 플랜으로 업그레이드되었습니다." />
      <div className="flex min-h-[60vh] items-center justify-center p-8">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">결제 완료!</h2>
          <p className="mt-3 text-muted-foreground">
            프로 플랜이 활성화되었습니다. <br />
            이제 연락처를 무제한으로 등록할 수 있어요.
          </p>

          <div className="mt-6 rounded-xl border border-border bg-card p-4 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">주문번호</span>
              <span className="font-mono text-xs text-foreground">{orderId}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">결제 금액</span>
              <span className="font-semibold text-foreground">₩{Number(amount).toLocaleString()}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">플랜</span>
              <span className="font-semibold text-primary">프로</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <Button asChild className="rounded-xl">
              <Link href="/dashboard">대시보드로 이동</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/upgrade">요금제 확인</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorView({ message }: { message: string }) {
  return (
    <div>
      <DashboardHeader title="결제 실패" description="결제 처리 중 문제가 발생했습니다." />
      <div className="flex min-h-[60vh] items-center justify-center p-8">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <XCircle className="h-10 w-10 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">결제 오류</h2>
          <p className="mt-3 text-muted-foreground">{message}</p>
          <Button asChild className="mt-6 rounded-xl">
            <Link href="/upgrade">다시 시도하기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
