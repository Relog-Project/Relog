import { DashboardHeader } from '@/src/components/layout/dashboard/dashboad-header';
import { contacts } from '@/src/mocks/contacts';
import { works } from '@/src/mocks/works';
import Link from 'next/link';

export default function WorksPage() {
  const sortedWorks = [...works].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  return (
    <div>
      <DashboardHeader
        title="Works"
        description="모든 작업 이력을 확인하세요."
      />
      <div className="p-8">
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
                {sortedWorks.map((work) => {
                  const contact = contacts.find((c) => c.id === work.contactId);
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
                            href={`/dashboard/contacts/${contact.id}`}
                            className="text-sm text-primary hover:underline"
                          >
                            {contact.name}
                          </Link>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {work.startDate}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {work.endDate || '-'}
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
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
