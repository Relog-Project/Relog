import { SupabaseClient } from '@supabase/supabase-js';

export interface AddWorkInput {
  contactId?: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string | null;
  amount?: number | null;
}

export interface AddWorkData extends AddWorkInput {
  user_id: string;
}

export const addWorkQueryBuilder = (
  supabaseClient: SupabaseClient,
  data: AddWorkData,
) => {
  const query = supabaseClient.from('works').insert(data).select().single();
  return query;
};
