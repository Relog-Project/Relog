import { SupabaseClient } from '@supabase/supabase-js';
import { UpdateContactData, updateContactQueryBuilder } from '../query-builder/update-contact.builder';

export const updateContact = async (
  supabaseClient: SupabaseClient,
  id: string,
  userId: string,
  data: UpdateContactData,
) => {
  const { error } = await updateContactQueryBuilder(supabaseClient, id, userId, data);

  if (error) {
    throw new Error(`연락처 수정에 실패했습니다: ${error.message}`);
  }
};
