'use client';

import { useState, useEffect } from 'react';
import { IWork } from '@/src/types/works';
import { WorkDetailModal } from '@/src/features/works/components/work-detail-modal';

interface IContactWorkHistoryProps {
  contactWorks: IWork[];
}

export default function ContactWorkHistory({
  contactWorks,
}: IContactWorkHistoryProps) {
  const [works, setWorks] = useState<IWork[]>(contactWorks);
  const [selectedWork, setSelectedWork] = useState<IWork | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    setWorks(contactWorks);
  }, [contactWorks]);

  const handleStatusChange = (workId: string | number, isCompleted: boolean) => {
    const today = new Date().toISOString().split('T')[0];
    setWorks(prev =>
      prev.map(w =>
        String(w.id) === String(workId)
          ? { ...w, endDate: isCompleted ? today : null }
          : w,
      ),
    );
    setSelectedWork(prev =>
      prev && String(prev.id) === String(workId)
        ? { ...prev, endDate: isCompleted ? today : null }
        : prev,
    );
  };

  const handleWorkClick = (work: IWork) => {
    setSelectedWork(work);
    setIsDetailOpen(true);
  };

  return (
    <div className="lg:col-span-2">
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-base font-semibold text-card-foreground">
            작업 이력
          </h2>
        </div>
        {works.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-muted-foreground">
            아직 기록된 작업이 없습니다.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {[...works]
              .sort(
                (a, b) =>
                  new Date(b.startDate).getTime() -
                  new Date(a.startDate).getTime(),
              )
              .map((work) => (
                <div 
                  key={work.id} 
                  className="group px-6 py-5 hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => handleWorkClick(work)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors">
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
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {work.description}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>

      <WorkDetailModal
        work={selectedWork}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
