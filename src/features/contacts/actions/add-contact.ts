'use server';

import { revalidatePath } from 'next/cache';
import { addContact } from '../services/add-contact';
import { AddContactInput } from '../query-builder/add-contact.builder';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const FREE_PLAN_CONTACT_LIMIT = 3;

export async function addContactAction(
  data: AddContactInput,
): Promise<{ error?: string; success?: boolean }> {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) {
    return { error: '인증이 필요합니다.' };
  }

  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  // 플랜과 연락처 수를 동시에 조회
  const [{ data: userRecord }, { count }] = await Promise.all([
    supabaseAdmin.from('users').select('plan').eq('id', userId).single(),
    supabaseAdmin
      .from('contacts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId),
  ]);

  if (userRecord?.plan !== 'pro' && (count ?? 0) >= FREE_PLAN_CONTACT_LIMIT) {
    return {
      error: `무료 플랜은 연락처를 최대 ${FREE_PLAN_CONTACT_LIMIT}개까지 등록할 수 있습니다. 프로 플랜으로 업그레이드하세요.`,
    };
  }

  try {
    await addContact(supabaseAdmin, { ...data, user_id: userId });
  } catch (error) {
    console.error('Add contact action error:', error);
    return { error: '연락처 저장에 실패했습니다.' };
  }

  revalidatePath('/contacts');
  return { success: true };
}
