'use server';

import { createClient } from '@/src/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { addContact } from '../services/add-contact';
import { AddContactData } from '../query-builder/add-contact.builder';

export async function addContactAction(
  data: AddContactData,
): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createClient();

  // 현재 로그인한 사용자 ID 가져오기 (테이블 정책에 따라 필요할 수 있음)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: '인증이 필요합니다.' };
  }

  try {
    // user_id가 테이블 구조에 포함되어야 할 경우를 대비해 추가할 수도 있음
    await addContact(supabase, {
      ...data,
      // user_id: user.id, // 테이블 컬럼명에 맞춰 추가
    });
  } catch (error) {
    console.error('Add contact action error:', error);
    return { error: '연락처 저장에 실패했습니다.' };
  }

  revalidatePath('/contacts');
  return { success: true };
}
