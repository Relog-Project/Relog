'use server';

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { revalidatePath } from 'next/cache';
import { updateWork } from '../services/update-work';

export async function updateWorkStatusAction(
  workId: string | number,
  isCompleted: boolean,
  contactId?: string | number
): Promise<{ error?: string; success?: boolean }> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { error: '인증이 필요합니다.' };
  }

  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  try {
    // 완료로 변경하면 오늘 날짜를, 진행 중으로 변경하면 null을 설정
    const endDate = isCompleted ? new Date().toISOString().split('T')[0] : null;
    
    await updateWork(supabase, workId, { endDate });

    // 관련 페이지 캐시 갱신
    revalidatePath('/dashboard');
    revalidatePath('/works');
    if (contactId) {
      revalidatePath(`/contacts/${contactId}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Update work status error:', error);
    return { error: '상태 변경에 실패했습니다.' };
  }
}
