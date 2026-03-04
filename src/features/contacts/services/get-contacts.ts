import { SupabaseClient } from '@supabase/supabase-js';
import {
  getContactsQueryBuilder,
  getContactByIdQueryBuilder,
} from '../query-builder/get-contacts.builder';

export const getContacts = async (supabaseClient: SupabaseClient) => {
  const { data: contacts, error } = await getContactsQueryBuilder(
    supabaseClient,
  );

  if (error) {
    throw new Error(`연락처를 가져오는데 실패했습니다: ${error.message}`);
  }

  return contacts;
};

export const getContactById = async (supabaseClient: SupabaseClient, id: string) => {
  const { data: contact, error } = await getContactByIdQueryBuilder(
    supabaseClient,
    id,
  );

  if (error) {
    throw new Error(`연락처 정보를 가져오는데 실패했습니다: ${error.message}`);
  }

  return contact;
};
