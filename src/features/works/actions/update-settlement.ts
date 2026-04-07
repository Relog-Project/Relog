'use server';

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { revalidatePath } from 'next/cache';

export async function updateSettlementAction(
  workId: string | number,
  isPaid: boolean,
  contactId?: string | number,
): Promise<{ error?: string; success?: boolean }> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { error: '인증이 필요합니다.' };
  }

  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { error } = await supabase
    .from('works')
    .update({
      is_paid: isPaid,
      paid_at: isPaid ? new Date().toISOString() : null,
    })
    .eq('id', workId);

  if (error) {
    return { error: '수금 상태 변경에 실패했습니다.' };
  }

  revalidatePath('/dashboard');
  revalidatePath('/works');
  if (contactId) {
    revalidatePath(`/contacts/${contactId}`);
  }

  return { success: true };
}
