'use server';

import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';

export async function getRemindersAction(contactId: string) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) return { data: [] };

  const supabase = createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data } = await supabase
    .from('reminders')
    .select('*')
    .eq('user_id', userId)
    .eq('contact_id', contactId)
    .order('remind_at', { ascending: true });

  return { data: data ?? [] };
}
