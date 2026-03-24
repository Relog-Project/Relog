'use client';

import { Check, Zap, Crown } from 'lucide-react';
import { Button } from '@/src/components/ui/button';

interface UpgradeSectionProps {
  currentPlan: 'free' | 'pro';
  userEmail: string;
}

const proFeatures = [
  '연락처 무제한 등록',
  '연락처별 작업 이력 무제한',
  '대시보드 통계',
  '진행 상태 관리',
  '우선 고객 지원',
  '신규 기능 우선 제공',
];

const freeFeatures = [
  '연락처 최대 3개',
  '연락처별 작업 이력 무제한',
  '대시보드 통계',
  '진행 상태 관리',
];

export function UpgradeSection({ currentPlan, userEmail }: UpgradeSectionProps) {
  const isPro = currentPlan === 'pro';

  return (
    <div className="mx-auto max-w-2xl space-y-6">

      {/* 현재 플랜 상태 카드 */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-center gap-3 border-b border-border px-6 py-4">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isPro ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'}`}>
            {isPro ? <Crown size={16} /> : <Zap size={16} />}
          </div>
          <div>
            <h2 className="text-sm font-semibold text-card-foreground">현재 플랜</h2>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-foreground">
                {isPro ? '프로' : '무료'} 플랜
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                isPro
                  ? 'bg-amber-500/10 text-amber-600'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {isPro ? 'PRO' : 'FREE'}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {isPro
                ? '모든 기능을 제한 없이 사용 중입니다.'
                : '연락처를 최대 3개까지 등록할 수 있습니다.'}
            </p>
          </div>
          {isPro && (
            <button className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors">
              구독 관리
            </button>
          )}
        </div>

        {/* 현재 플랜 기능 목록 */}
        <div className="border-t border-border px-6 py-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            포함된 기능
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {(isPro ? proFeatures : freeFeatures).map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </div>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 프로 업그레이드 카드 (무료 플랜인 경우만 표시) */}
      {!isPro && (
        <div className="relative rounded-2xl border border-primary bg-primary/5 overflow-hidden">
          {/* 상단 하이라이트 바 */}
          <div className="h-1 w-full bg-gradient-to-r from-primary via-violet-500 to-primary" />

          <div className="px-6 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-amber-500" />
                  <span className="text-lg font-bold text-foreground">프로 플랜으로 업그레이드</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  연락처 제한을 없애고 모든 기능을 무제한으로 사용하세요.
                </p>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-2xl font-bold text-foreground">₩9,900</div>
                <div className="text-xs text-muted-foreground">/ 월</div>
              </div>
            </div>

            {/* 프로 기능 목록 */}
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {proFeatures.map((f, i) => {
                const isNew = !freeFeatures.includes(f);
                return (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                      isNew ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                    }`}>
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </div>
                    <span className={isNew ? 'font-medium text-foreground' : 'text-muted-foreground'}>
                      {f}
                    </span>
                    {isNew && (
                      <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                        NEW
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" className="h-11 rounded-xl px-8 font-semibold shadow-md shadow-primary/20 sm:w-auto w-full">
                <Zap className="mr-1.5 h-4 w-4" />
                프로로 업그레이드
              </Button>
              <p className="text-xs text-muted-foreground">
                언제든 취소 가능 · 7일 환불 보장
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 프로인 경우 — 혜택 안내 */}
      {isPro && (
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 px-6 py-5">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-semibold text-foreground">프로 멤버 혜택</span>
          </div>
          <p className="text-sm text-muted-foreground">
            신규 기능이 출시되면 가장 먼저 이용하실 수 있습니다. 문의 사항은{' '}
            <a href="mailto:contact@relog.io" className="text-primary underline underline-offset-2">
              contact@relog.io
            </a>
            로 연락 주세요.
          </p>
        </div>
      )}

    </div>
  );
}
