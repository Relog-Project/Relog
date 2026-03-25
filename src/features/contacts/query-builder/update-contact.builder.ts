import { SupabaseClient } from '@supabase/supabase-js';

export interface UpdateContactData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  notes?: string;
}

export const updateContactQueryBuilder = (
  supabaseClient: SupabaseClient,
  id: string,
  userId: string,
  data: UpdateContactData,
) => {
  return supabaseClient
    .from('contacts')
    .update(data)
    .eq('id', id)
    .eq('user_id', userId);
};
