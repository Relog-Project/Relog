import { createClient } from '@/src/utils/supabase/server';
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
  console.log('Fetching detail for contact ID:', id);
  const supabase = await createClient();
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

  console.log('Fetched works for this contact:', contactWorks?.length || 0);

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
