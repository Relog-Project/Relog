'use server';

import { revalidatePath } from 'next/cache';
import { addWork } from '../services/add-work';
import { AddWorkInput } from '../query-builder/add-work.builder';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export async function addWorkAction(
  data: AddWorkInput,
): Promise<{ error?: string; success?: boolean; data?: any }> {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) {
    return { error: '인증이 필요합니다.' };
  }

  // RLS를 우회하기 위해 service_role 키를 사용하는 관리자 클라이언트 생성
  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const result = await addWork(supabaseAdmin, {
      ...data,
      user_id: userId,
    });
    
    revalidatePath('/dashboard');
    revalidatePath('/works');
    if (data.contactId) {
      revalidatePath(`/contacts/${data.contactId}`);
    }
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Add work action error:', error);
    return { error: '작업 저장에 실패했습니다.' };
  }
}
