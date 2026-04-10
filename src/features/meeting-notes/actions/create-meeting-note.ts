'use server';

import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { revalidatePath } from 'next/cache';

export async function createMeetingNoteAction(input: {
  contactId: string;
  content: string;
  metAt: string;
}): Promise<{ error?: string; data?: any }> {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) return { error: '인증이 필요합니다.' };

  const supabase = createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data, error } = await supabase
    .from('meeting_notes')
    .insert({
      user_id: userId,
      contact_id: input.contactId,
      content: input.content,
      met_at: input.metAt,
    })
    .select()
    .single();

  if (error) return { error: '회의록 저장에 실패했습니다.' };

  revalidatePath(`/contacts/${input.contactId}`);
  return { data };
}
