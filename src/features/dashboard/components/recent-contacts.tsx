import { getContacts } from '@/src/features/contacts/services/get-contacts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export default async function RecentContacts() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) return null;

  // 서버 사이드에서 RLS를 우회하기 위해 service_role 클라이언트 사용
  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const contacts = await getContacts(supabaseAdmin, userId);

  const recentContacts = (contacts || [])
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-base font-semibold text-card-foreground">
          최근 추가된 연락처
        </h2>
      </div>
      <div className="divide-y divide-border">
        {recentContacts.length === 0 ? (
          <div className="px-6 py-8 text-center text-sm text-muted-foreground">
            최근 추가된 연락처가 없습니다.
          </div>
        ) : (
          recentContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between px-6 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    {contact.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {contact.company || '-'}
                  </p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(contact.created_at).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
