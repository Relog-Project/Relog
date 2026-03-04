import { SupabaseClient } from '@supabase/supabase-js';

export interface AddContactData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  notes?: string;
}

export const addContactQueryBuilder = (
  supabaseClient: SupabaseClient,
  data: AddContactData,
) => {
  const query = supabaseClient.from('contacts').insert(data).select().single();
  return query;
};
