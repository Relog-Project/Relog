import { SupabaseClient } from '@supabase/supabase-js';
import {
  getWorksQueryBuilder,
  getWorksByContactIdQueryBuilder,
} from '../query-builder/get-works.builder';

export const getWorks = async (supabaseClient: SupabaseClient) => {
  const { data: works, error } = await getWorksQueryBuilder(supabaseClient);

  if (error) {
    throw new Error(`작업 정보를 가져오는데 실패했습니다: ${error.message}`);
  }

  return works;
};

export const getWorksByContactId = async (
  supabaseClient: SupabaseClient,
  contactId: string,
) => {
  const { data: works, error } = await getWorksByContactIdQueryBuilder(
    supabaseClient,
    contactId,
  );

  if (error) {
    throw new Error(`연락처의 작업 이력을 가져오는데 실패했습니다: ${error.message}`);
  }

  return works;
};
