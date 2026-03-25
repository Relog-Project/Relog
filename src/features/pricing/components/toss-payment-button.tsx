'use client';

import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { useState } from 'react';
import { Button } from '@/src/components/ui/button';
import { Zap } from 'lucide-react';

interface TossPaymentButtonProps {
  userEmail: string;
  userName: string;
}

const CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;
const AMOUNT = 9900;
const ORDER_NAME = 'Relog 프로 플랜';

function generateOrderId() {
  return `relog-pro-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// 이메일을 토스 customerKey 규칙(영문/숫자/_-=.@ 2~50자)에 맞게 변환
function toCustomerKey(email: string) {
  return email.replace(/[^a-zA-Z0-9_\-=.@]/g, '_').slice(0, 50);
}

export function TossPaymentButton({ userEmail, userName }: TossPaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const tossPayments = await loadTossPayments(CLIENT_KEY);
      const payment = tossPayments.payment({ customerKey: toCustomerKey(userEmail) });

      await payment.requestPayment({
        method: 'CARD',
        amount: { currency: 'KRW', value: AMOUNT },
        orderId: generateOrderId(),
        orderName: ORDER_NAME,
        successUrl: `${window.location.origin}/upgrade/success`,
        failUrl: `${window.location.origin}/upgrade/fail`,
        customerEmail: userEmail,
        customerName: userName || '사용자',
        card: {
          useEscrow: false,
          flowMode: 'DEFAULT',
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });
    } catch (error: any) {
      // 사용자가 결제창을 닫은 경우 무시
      if (error?.code !== 'USER_CANCEL') {
        console.error('결제 오류:', error);
        alert('결제 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      className="h-11 rounded-xl px-8 font-semibold shadow-md shadow-primary/20 sm:w-auto w-full"
      onClick={handlePayment}
      disabled={isLoading}
    >
      <Zap className="mr-1.5 h-4 w-4" />
      {isLoading ? '결제창 열는 중...' : '프로로 업그레이드'}
    </Button>
  );
}
