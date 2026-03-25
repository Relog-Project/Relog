'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { updateContact } from '../services/update-contact';
import { UpdateContactData } from '../query-builder/update-contact.builder';

export async function updateContactAction(
  id: string,
  data: UpdateContactData,
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

  try {
    await updateContact(supabaseAdmin, id, userId, data);
  } catch (error) {
    console.error('Update contact action error:', error);
    return { error: '연락처 수정에 실패했습니다.' };
  }

  revalidatePath('/contacts');
  revalidatePath(`/contacts/${id}`);
  return { success: true };
}
