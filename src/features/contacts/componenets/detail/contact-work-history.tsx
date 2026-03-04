import { IWork } from '@/src/types/works';

interface IContactWorkHistoryProps {
  contactWorks: IWork[];
}

export default function ContactWorkHistory({
  contactWorks,
}: IContactWorkHistoryProps) {
  return (
    <div className="lg:col-span-2">
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-base font-semibold text-card-foreground">
            작업 이력
          </h2>
        </div>
        {contactWorks.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-muted-foreground">
            아직 기록된 작업이 없습니다.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {contactWorks
              .sort(
                (a, b) =>
                  new Date(b.startDate).getTime() -
                  new Date(a.startDate).getTime(),
              )
              .map((work) => (
                <div key={work.id} className="px-6 py-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-card-foreground">
                        {work.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {work.startDate} ~ {work.endDate || '진행 중'}
                      </p>
                    </div>
                    {!work.endDate && (
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        진행 중
                      </span>
                    )}
                    {work.endDate && (
                      <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                        완료
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {work.description}
                  </p>
                  <div className="mt-3 border-l-2 border-border pl-3">
                    <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
