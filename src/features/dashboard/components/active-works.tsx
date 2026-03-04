import { createClient } from '@/src/utils/supabase/server';
import { getWorks } from '@/src/features/works/services/get-works';

export default async function ActiveWorks() {
  const supabase = await createClient();
  const works = await getWorks(supabase);
  const activeWorks = (works || []).filter((w: any) => !w.endDate);

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-base font-semibold text-card-foreground">
          진행 중 작업
        </h2>
      </div>
      <div className="divide-y divide-border">
        {activeWorks.length === 0 ? (
          <div className="px-6 py-8 text-center text-sm text-muted-foreground">
            진행 중인 작업이 없습니다.
          </div>
        ) : (
          activeWorks.map((work: any) => {
            const contact = work.contacts;
            return (
              <div key={work.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-card-foreground">
                    {work.title}
                  </p>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    진행 중
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {contact?.name} · {contact?.company || '-'} · {new Date(work.startDate).toLocaleDateString()}
                  부터
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
