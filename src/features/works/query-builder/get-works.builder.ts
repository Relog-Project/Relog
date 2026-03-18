import { SupabaseClient } from '@supabase/supabase-js';

export const getWorksQueryBuilder = (supabaseClient: SupabaseClient, userId: string) => {
  return supabaseClient
    .from('works')
    .select('*, contacts(*)')
    .eq('user_id', userId)
    .order('startDate', { ascending: false });
};

export const getWorksByContactIdQueryBuilder = (
  supabaseClient: SupabaseClient,
  contactId: string,
  userId: string
) => {
  // contactId를 숫자로 변환하여 DB의 int8 타입과 맞춤
  const id = Number(contactId);
  return supabaseClient
    .from('works')
    .select('*')
    .eq('contactId', id)
    .eq('user_id', userId)
    .order('startDate', { ascending: false });
};
