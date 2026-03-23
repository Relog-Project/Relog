import { getWorks } from '@/src/features/works/services/get-works';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { ArrowRight, Briefcase } from 'lucide-react';

function getDaysElapsed(startDate: string) {
  const start = new Date(startDate);
  const now = new Date();
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return '오늘 시작';
  return `${diff}일째 진행`;
}

export default async function ActiveWorks() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) return null;

  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const works = await getWorks(supabaseAdmin, userId);
  const activeWorks = (works || []).filter((w: any) => !w.endDate).slice(0, 5);

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h2 className="text-sm font-semibold text-card-foreground">진행 중 작업</h2>
          <p className="text-xs text-muted-foreground mt-0.5">완료되지 않은 작업 목록</p>
        </div>
        <Link
          href="/works"
          className="flex items-center gap-1 text-xs font-medium text-primary hover:opacity-80 transition-opacity"
        >
          전체 보기
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="flex-1 divide-y divide-border">
        {activeWorks.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">진행 중인 작업이 없습니다.</p>
          </div>
        ) : (
          activeWorks.map((work: any) => {
            const contact = work.contacts;
            return (
              <div key={work.id} className="flex items-start justify-between gap-4 px-6 py-3.5 hover:bg-muted/40 transition-colors">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                    <Briefcase className="h-3.5 w-3.5 text-amber-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-card-foreground truncate">{work.title}</p>
                    {contact && (
                      <Link
                        href={`/contacts/${contact.id}`}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        {contact.name}
                        {contact.company ? ` · ${contact.company}` : ''}
                      </Link>
                    )}
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600">
                  {getDaysElapsed(work.startDate)}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
