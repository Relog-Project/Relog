'use server';

import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { revalidatePath } from 'next/cache';

export async function deleteMeetingNoteAction(
  noteId: string,
  contactId: string,
): Promise<{ error?: string; success?: boolean }> {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) return { error: '인증이 필요합니다.' };

  const supabase = createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { error } = await supabase
    .from('meeting_notes')
    .delete()
    .eq('id', noteId)
    .eq('user_id', userId);

  if (error) return { error: '회의록 삭제에 실패했습니다.' };

  revalidatePath(`/contacts/${contactId}`);
  return { success: true };
}
