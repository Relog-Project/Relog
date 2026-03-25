import { SupabaseClient } from '@supabase/supabase-js';
import { deleteContactQueryBuilder } from '../query-builder/delete-contact.builder';

export const deleteContact = async (
  supabaseClient: SupabaseClient,
  id: string,
  userId: string,
) => {
  const { error } = await deleteContactQueryBuilder(supabaseClient, id, userId);

  if (error) {
    throw new Error(`연락처 삭제에 실패했습니다: ${error.message}`);
  }
};
