import { getContacts } from '@/src/features/contacts/services/get-contacts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { ArrowRight, UserPlus } from 'lucide-react';

const AVATAR_COLORS = [
  'bg-blue-500',
  'bg-violet-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
];

export default async function RecentContacts() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) return null;

  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const contacts = await getContacts(supabaseAdmin, userId);

  const recentContacts = (contacts || [])
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h2 className="text-sm font-semibold text-card-foreground">최근 추가된 연락처</h2>
          <p className="text-xs text-muted-foreground mt-0.5">가장 최근에 추가한 5명</p>
        </div>
        <Link
          href="/contacts"
          className="flex items-center gap-1 text-xs font-medium text-primary hover:opacity-80 transition-opacity"
        >
          전체 보기
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="flex-1 divide-y divide-border">
        {recentContacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <UserPlus className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">아직 추가된 연락처가 없습니다.</p>
            <Link href="/contacts" className="text-xs font-medium text-primary hover:opacity-80">
              첫 연락처 추가하기 →
            </Link>
          </div>
        ) : (
          recentContacts.map((contact, i) => (
            <Link
              key={contact.id}
              href={`/contacts/${contact.id}`}
              className="flex items-center justify-between px-6 py-3.5 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold text-white ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">{contact.company || '소속 없음'}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(contact.created_at).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
