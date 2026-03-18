import { SupabaseClient } from '@supabase/supabase-js';

export const getContactsQueryBuilder = (
  supabaseClient: SupabaseClient,
  userId: string
) => {
  return supabaseClient
    .from('contacts')
    .select('*')
    .eq('user_id', userId) // 내 연락처만 조회
    .order('created_at', { ascending: false });
};

export const getContactByIdQueryBuilder = (
  supabaseClient: SupabaseClient,
  id: string,
  userId: string
) => {
  return supabaseClient
    .from('contacts')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId) // 내 연락처인지 한 번 더 검증
    .single();
};
