import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';
import { getContactById } from '@/src/features/contacts/services/get-contacts';
import { getWorksByContactId } from '@/src/features/works/services/get-works';
import ContactDetailClient from '@/src/features/contacts/components/detail/contact-detail-client';
import { getCurrentUserAction } from '@/src/features/users/actions/get-user';

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  const result = await getCurrentUserAction();
  const userId = result.data?.id;

  if (!userId) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">로그인이 필요합니다.</p>
      </div>
    );
  }

  const [contact, contactWorks] = await Promise.all([
    getContactById(supabase, id, userId),
    getWorksByContactId(supabase, id, userId),
  ]);


  if (!contact) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">연락처를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <ContactDetailClient contact={contact} initialWorks={contactWorks || []} />
  );
}
