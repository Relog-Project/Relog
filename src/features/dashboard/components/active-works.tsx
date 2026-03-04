import { contacts } from '@/src/mocks/contacts';
import { works } from '@/src/mocks/works';

export default function ActiveWorks() {
  const activeWorks = works.filter((w) => !w.endDate);

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
          activeWorks.map((work) => {
            const contact = contacts.find((c) => c.id === work.contactId);
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
                  {contact?.name} · {contact?.company} · {work.startDate}
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
