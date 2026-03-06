"use client";

import Link from 'next/link';
import { useState } from 'react';
import { IWork } from '@/src/types/works';
import { WorkDetailModal } from './work-detail-modal';
import { Calendar, User } from 'lucide-react';

interface WorksListProps {
  initialWorks: any[];
}

export default function WorksList({ initialWorks }: WorksListProps) {
  const [selectedWork, setSelectedWork] = useState<IWork | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleWorkClick = (work: any) => {
    setSelectedWork(work);
    setIsDetailOpen(true);
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                작업명
              </th>
              <th className="px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                연락처
              </th>
              <th className="px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                시작일
              </th>
              <th className="px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                종료일
              </th>
              <th className="px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                상태
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {initialWorks.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-muted-foreground">
                  기록된 작업이 없습니다.
                </td>
              </tr>
            ) : (
              initialWorks.map((work: any) => {
                const contact = work.contacts;
                return (
                  <tr
                    key={work.id}
                    className="group transition-colors hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleWorkClick(work)}
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {work.title}
                      </span>
                      <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                        {work.description}
                      </p>
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      {contact && (
                        <Link
                          href={`/contacts/${contact.id}`}
                          className="text-sm font-medium text-foreground hover:underline"
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

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-border">
        {initialWorks.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-muted-foreground">
            기록된 작업이 없습니다.
          </div>
        ) : (
          initialWorks.map((work: any) => {
            const contact = work.contacts;
            return (
              <div
                key={work.id}
                className="p-4 active:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleWorkClick(work)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {work.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {work.description}
                    </p>
                  </div>
                  <div className="shrink-0">
                    {work.endDate ? (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        완료
                      </span>
                    ) : (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                        진행 중
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {contact && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground" onClick={(e) => e.stopPropagation()}>
                      <User className="h-3.5 w-3.5" />
                      <Link
                        href={`/contacts/${contact.id}`}
                        className="font-medium text-foreground hover:underline"
                      >
                        {contact.name}
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {new Date(work.startDate).toLocaleDateString()}
                      {work.endDate && ` - ${new Date(work.endDate).toLocaleDateString()}`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <WorkDetailModal 
        work={selectedWork}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
}
