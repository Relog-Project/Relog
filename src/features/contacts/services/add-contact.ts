import { SupabaseClient } from '@supabase/supabase-js';
import { addContactQueryBuilder, AddContactData } from '../query-builder/add-contact.builder';

export const addContact = async (
  supabaseClient: SupabaseClient,
  data: AddContactData,
) => {
  const { data: contact, error } = await addContactQueryBuilder(
    supabaseClient,
    data,
  );

  if (error) {
    throw new Error(`연락처 저장에 실패했습니다: ${error.message}`);
  }

  return contact;
};
