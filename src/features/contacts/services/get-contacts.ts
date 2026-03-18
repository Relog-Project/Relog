import { SupabaseClient } from '@supabase/supabase-js';
import {
  getContactByIdQueryBuilder,
  getContactsQueryBuilder,
} from '../query-builder/get-contacts.builder';

export const getContacts = async (
  supabaseClient: SupabaseClient,
  userId: string
) => {
  const { data: contacts, error } = await getContactsQueryBuilder(
    supabaseClient,
    userId
  );

  if (error) {
    throw new Error(`연락처를 불러오는 데 실패했습니다: ${error.message}`);
  }

  return contacts;
};

export const getContactById = async (
  supabaseClient: SupabaseClient,
  id: string,
  userId: string
) => {
  const { data: contact, error } = await getContactByIdQueryBuilder(
    supabaseClient,
    id,
    userId
  );

  if (error) {
    throw new Error(`연락처 정보를 불러오는 데 실패했습니다: ${error.message}`);
  }

  return contact;
};
