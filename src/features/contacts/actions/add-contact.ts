'use server';

import { revalidatePath } from 'next/cache';
import { addContact } from '../services/add-contact';
import { AddContactInput } from '../query-builder/add-contact.builder';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export async function addContactAction(
  data: AddContactInput,
): Promise<{ error?: string; success?: boolean }> {
  const session = await getServerSession(authOptions);

  // NextAuth 세션에서 사용자 ID 가져오기
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
    const insertData = {
      ...data,
      user_id: userId,
    };
    
    // 관리자 권한으로 연락처 저장
    const result = await addContact(supabaseAdmin, insertData);
    console.log('Contact added successfully:', result);
  } catch (error) {
    console.error('Add contact action error:', error);
    return { error: '연락처 저장에 실패했습니다.' };
  }

  revalidatePath('/contacts');
  return { success: true };
}
