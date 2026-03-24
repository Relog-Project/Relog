'use server';

import { createClient } from '@supabase/supabase-js';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';

interface ConfirmPaymentParams {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export async function confirmPaymentAction({ paymentKey, orderId, amount }: ConfirmPaymentParams) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { error: '로그인이 필요합니다.' };
  }

  const secretKey = process.env.TOSS_SECRET_KEY!;
  const encoded = Buffer.from(`${secretKey}:`).toString('base64');

  // 1. 토스페이먼츠 결제 확인 API 호출
  const tossRes = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${encoded}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  });

  if (!tossRes.ok) {
    const errorData = await tossRes.json();
    return { error: errorData.message || '결제 확인에 실패했습니다.' };
  }

  // 2. 결제 확인 성공 → 유저 plan을 'pro'로 업데이트
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { error: updateError } = await supabaseAdmin
    .from('users')
    .update({ plan: 'pro' })
    .eq('email', session.user.email);

  if (updateError) {
    return { error: '플랜 업데이트에 실패했습니다.' };
  }

  return { success: true };
}
