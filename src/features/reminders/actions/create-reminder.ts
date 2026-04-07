'use server';

import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { revalidatePath } from 'next/cache';

export interface CreateReminderInput {
  contactId: string;
  contactName: string;
  title: string;
  remindAt: string; // ISO string
}

export async function createReminderAction(
  input: CreateReminderInput,
): Promise<{ error?: string; success?: boolean }> {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) return { error: '인증이 필요합니다.' };

  const supabase = createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { error } = await supabase.from('reminders').insert({
    user_id: userId,
    contact_id: input.contactId,
    contact_name: input.contactName,
    title: input.title,
    remind_at: input.remindAt,
  });

  if (error) return { error: '리마인더 저장에 실패했습니다.' };

  revalidatePath(`/contacts/${input.contactId}`);
  return { success: true };
}
