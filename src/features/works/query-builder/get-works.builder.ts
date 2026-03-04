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
  return supabaseClient
    .from('works')
    .select('*')
    .eq('contactId', contactId)
    .order('startDate', { ascending: false });
};
