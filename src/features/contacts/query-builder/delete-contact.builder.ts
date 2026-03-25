import { SupabaseClient } from '@supabase/supabase-js';

export const deleteContactQueryBuilder = (
  supabaseClient: SupabaseClient,
  id: string,
  userId: string,
) => {
  return supabaseClient
    .from('contacts')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
};
