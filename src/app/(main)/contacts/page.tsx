import { DashboardHeader } from '@/src/components/layout/dashboard/dashboad-header';
import ContactsClientWrapper from '@/src/features/contacts/components/contacts-client-wrapper';
import ContactList from '@/src/features/contacts/components/contanct-list';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export default async function ContactsPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  let isAtFreeLimit = false;

  if (userId) {
    const supabaseAdmin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const [{ data: userRecord }, { count }] = await Promise.all([
      supabaseAdmin.from('users').select('plan').eq('id', userId).single(),
      supabaseAdmin
        .from('contacts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId),
    ]);

    if (userRecord?.plan !== 'pro') {
      isAtFreeLimit = (count ?? 0) >= 3;
    }
  }

  return (
    <div>
      <ContactsClientWrapper isAtFreeLimit={isAtFreeLimit}>
        <DashboardHeader
          title="Contacts"
          description="관계를 기록하고 관리하세요."
        >
          {/* This button is part of the client wrapper now */}
        </DashboardHeader>
      </ContactsClientWrapper>

      <div className="p-8">
        <ContactList />
      </div>
    </div>
  );
}
