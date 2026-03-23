"use client";

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { IWork } from '@/src/types/works';
import { WorkDetailModal } from './work-detail-modal';
import { WorkStatusToggle } from './work-status-toggle';
import { Calendar, User, Search, X } from 'lucide-react';
import { Input } from '@/src/components/ui/input';

interface WorksListProps {
  initialWorks: any[];
}

type StatusFilter = 'all' | 'active' | 'completed';

export default function WorksList({ initialWorks }: WorksListProps) {
  const [selectedWork, setSelectedWork] = useState<IWork | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [startDateFrom, setStartDateFrom] = useState('');
  const [startDateTo, setStartDateTo] = useState('');

  const filteredWorks = useMemo(() => {
    return initialWorks.filter((work) => {
      // 작업명 / 연락처명 텍스트 검색
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = work.title?.toLowerCase().includes(q);
        const matchContact = work.contacts?.name?.toLowerCase().includes(q);
        if (!matchTitle && !matchContact) return false;
      }

      // 상태 필터
      if (statusFilter === 'active' && work.endDate) return false;
      if (statusFilter === 'completed' && !work.endDate) return false;

      // 시작일 범위
      if (startDateFrom && work.startDate < startDateFrom) return false;
      if (startDateTo && work.startDate > startDateTo) return false;

      return true;
    });
  }, [initialWorks, searchQuery, statusFilter, startDateFrom, startDateTo]);

  const hasFilter = searchQuery || statusFilter !== 'all' || startDateFrom || startDateTo;

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setStartDateFrom('');
    setStartDateTo('');
  };

  const handleWorkClick = (work: any) => {
    setSelectedWork(work);
    setIsDetailOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 필터 영역 */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          {/* 작업명 / 연락처 검색 */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="작업명 또는 연락처 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* 상태 필터 */}
          <div className="flex gap-1.5 rounded-lg border border-border p-1">
            {(['all', 'active', 'completed'] as StatusFilter[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="rounded-md px-3 py-1.5 text-xs font-medium transition-colors
                  data-[active=true]:bg-primary data-[active=true]:text-primary-foreground
                  data-[active=false]:text-muted-foreground data-[active=false]:hover:text-foreground"
                data-active={statusFilter === s}
              >
                {s === 'all' ? '전체' : s === 'active' ? '진행 중' : '완료'}
              </button>
            ))}
          </div>

          {/* 시작일 범위 */}
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={startDateFrom}
              onChange={(e) => setStartDateFrom(e.target.value)}
              className="w-36 text-sm"
            />
            <span className="text-xs text-muted-foreground">~</span>
            <Input
              type="date"
              value={startDateTo}
              onChange={(e) => setStartDateTo(e.target.value)}
              className="w-36 text-sm"
            />
          </div>

          {/* 필터 초기화 */}
          {hasFilter && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              초기화
            </button>
          )}
        </div>

        {hasFilter && (
          <p className="mt-2 text-xs text-muted-foreground">
            {filteredWorks.length}개 / 전체 {initialWorks.length}개
          </p>
        )}
      </div>

      {/* 리스트 */}
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
              {filteredWorks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-muted-foreground">
                    {hasFilter ? '검색 결과가 없습니다.' : '기록된 작업이 없습니다.'}
                  </td>
                </tr>
              ) : (
                filteredWorks.map((work: any) => {
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
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <WorkStatusToggle
                          workId={work.id}
                          isCompleted={!!work.endDate}
                          contactId={work.contacts?.id}
                        />
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
          {filteredWorks.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-muted-foreground">
              {hasFilter ? '검색 결과가 없습니다.' : '기록된 작업이 없습니다.'}
            </div>
          ) : (
            filteredWorks.map((work: any) => {
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
                    <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                      <WorkStatusToggle
                        workId={work.id}
                        isCompleted={!!work.endDate}
                        contactId={work.contacts?.id}
                      />
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
      </div>

      <WorkDetailModal
        work={selectedWork}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
}
