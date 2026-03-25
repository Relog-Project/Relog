'use server';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { deleteContact } from '../services/delete-contact';

export async function deleteContactAction(
  id: string,
): Promise<{ error?: string }> {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) {
    return { error: '인증이 필요합니다.' };
  }

  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  try {
    await deleteContact(supabaseAdmin, id, userId);
  } catch (error) {
    console.error('Delete contact action error:', error);
    return { error: '연락처 삭제에 실패했습니다.' };
  }

  redirect('/contacts');
}
