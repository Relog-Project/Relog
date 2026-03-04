import { SupabaseClient } from '@supabase/supabase-js';

export const getWorksQueryBuilder = (supabaseClient: SupabaseClient) => {
  return supabaseClient
    .from('works')
    .select('*, contacts(*)')
    .order('startDate', { ascending: false });
};

export const getWorksByContactIdQueryBuilder = (
  supabaseClient: SupabaseClient,
  contactId: string,
) => {
  // contactId를 숫자로 변환하여 DB의 int8 타입과 맞춤
  const id = Number(contactId);
  return supabaseClient
    .from('works')
    .select('*')
    .eq('contactId', id)
    .order('startDate', { ascending: false });
};
