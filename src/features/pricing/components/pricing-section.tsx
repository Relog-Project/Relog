import { Check, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

const plans = [
  {
    name: '무료',
    nameEn: 'Free',
    price: '0',
    description: '처음 시작하는 프리랜서와 소규모 팀을 위해',
    highlight: false,
    cta: '무료로 시작하기',
    ctaHref: '/signup',
    features: [
      { text: '연락처 최대 3개', included: true },
      { text: '연락처별 작업 이력 무제한', included: true },
      { text: '대시보드 통계', included: true },
      { text: '진행 상태 관리', included: true },
      { text: '연락처 무제한 등록', included: false },
      { text: '우선 고객 지원', included: false },
    ],
  },
  {
    name: '프로',
    nameEn: 'Pro',
    price: '9,900',
    description: '영업팀, 외주 개발팀, 활발하게 거래처를 늘리는 분들을 위해',
    highlight: true,
    cta: '프로 시작하기',
    ctaHref: '/signup?plan=pro',
    badge: '가장 인기',
    features: [
      { text: '연락처 무제한 등록', included: true },
      { text: '연락처별 작업 이력 무제한', included: true },
      { text: '대시보드 통계', included: true },
      { text: '진행 상태 관리', included: true },
      { text: '우선 고객 지원', included: true },
      { text: '신규 기능 우선 제공', included: true },
    ],
  },
];

export function PricingSection() {
  return (
    <section className="relative px-6 py-24">
      {/* 배경 */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/6 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl">
        {/* 헤더 */}
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Pricing
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            심플한 요금제
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            숨겨진 요금 없이, 필요한 만큼만.
          </p>
        </div>

        {/* 플랜 카드 */}
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-200 ${
                plan.highlight
                  ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10'
                  : 'border-border bg-card'
              }`}
            >
              {/* 뱃지 */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1 text-xs font-semibold text-primary-foreground shadow-md">
                    <Zap className="h-3 w-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* 플랜명 */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-foreground">{plan.name}</span>
                  <span className="text-xs text-muted-foreground">/ {plan.nameEn}</span>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* 가격 */}
              <div className="mb-8 flex items-end gap-1">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  ₩{plan.price}
                </span>
                <span className="mb-1 text-sm text-muted-foreground">/ 월</span>
              </div>

              {/* CTA */}
              <Button
                asChild
                size="lg"
                variant={plan.highlight ? 'default' : 'outline'}
                className={`mb-8 h-11 rounded-xl font-semibold ${
                  plan.highlight ? 'shadow-md shadow-primary/20' : 'bg-transparent'
                }`}
              >
                <Link href={plan.ctaHref}>{plan.cta}</Link>
              </Button>

              {/* 구분선 */}
              <div className="mb-6 border-t border-border" />

              {/* 기능 목록 */}
              <ul className="flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-3">
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        feature.included
                          ? 'bg-primary/15 text-primary'
                          : 'bg-muted text-muted-foreground/40'
                      }`}
                    >
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </div>
                    <span
                      className={`text-sm ${
                        feature.included ? 'text-foreground' : 'text-muted-foreground/50 line-through'
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 하단 안내 */}
        <div className="mt-12 rounded-2xl border border-border bg-card/60 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            구독은 언제든지 취소할 수 있습니다. 결제 후 환불은{' '}
            <span className="font-medium text-foreground">7일 이내</span> 가능합니다.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            팀 플랜이나 기업 문의는{' '}
            <a
              href="mailto:contact@relog.io"
              className="font-medium text-primary hover:opacity-80 transition-opacity"
            >
              contact@relog.io
            </a>
            로 연락해 주세요.
          </p>
        </div>
      </div>
    </section>
  );
}
