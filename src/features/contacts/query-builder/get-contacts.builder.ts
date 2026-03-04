import { SupabaseClient } from '@supabase/supabase-js';

export const getContactsQueryBuilder = (supabaseClient: SupabaseClient) => {
  return supabaseClient
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });
};

export const getContactByIdQueryBuilder = (
  supabaseClient: SupabaseClient,
  id: string,
) => {
  return supabaseClient.from('contacts').select('*').eq('id', id).single();
};
