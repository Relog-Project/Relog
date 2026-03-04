import { createClient } from '@/src/utils/supabase/server';
import { getWorks } from '@/src/features/works/services/get-works';
import Link from 'next/link';

export default async function WorksList() {
  const supabase = await createClient();
  const works = await getWorks(supabase);

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                작업명
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                연락처
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                시작일
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                종료일
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                상태
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {works?.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-muted-foreground">
                  기록된 작업이 없습니다.
                </td>
              </tr>
            ) : (
              works?.map((work: any) => {
                const contact = work.contacts;
                return (
                  <tr
                    key={work.id}
                    className="transition-colors hover:bg-muted/50"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-foreground">
                        {work.title}
                      </span>
                      <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                        {work.description}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {contact && (
                        <Link
                          href={`/contacts/${contact.id}`}
                          className="font-medium text-foreground hover:underline"
                        >
                          {contact.name}
                        </Link>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(work.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {work.endDate ? new Date(work.endDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4">
                      {work.endDate ? (
                        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                          완료
                        </span>
                      ) : (
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          진행 중
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
