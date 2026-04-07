import { IWork } from "../types/works";

export const works: IWork[] = [
  {
    id: "w1",
    contactId: "1",
    title: "관리자 대시보드 개발",
    startDate: "2025-09-01",
    endDate: "2025-12-15",
    description:
      "React 기반 관리자 대시보드 프론트엔드 외주 개발. 데이터 시각화 및 사용자 관리 기능 포함.",
    amount: null,
    is_paid: false,
    paid_at: null,
  },
  {
    id: "w2",
    contactId: "1",
    title: "API 서버 리팩토링",
    startDate: "2026-01-10",
    endDate: null,
    description:
      "기존 Express 서버를 Next.js API Routes로 마이그레이션. 성능 최적화 포함.",
    amount: null,
    is_paid: false,
    paid_at: null,
  },
  {
    id: "w3",
    contactId: "2",
    title: "서비스 리브랜딩 디자인",
    startDate: "2025-11-01",
    endDate: "2026-01-20",
    description:
      "전체 서비스 UI/UX 리디자인. 디자인 시스템 구축 및 프로토타입 제작.",
    amount: null,
    is_paid: false,
    paid_at: null,
  },
  {
    id: "w4",
    contactId: "3",
    title: "클라우드 인프라 구축",
    startDate: "2025-10-15",
    endDate: "2026-01-05",
    description:
      "AWS 기반 서버리스 아키텍처 설계 및 구축. CI/CD 파이프라인 포함.",
    amount: null,
    is_paid: false,
    paid_at: null,
  },
  {
    id: "w5",
    contactId: "5",
    title: "결제 시스템 연동",
    startDate: "2025-08-01",
    endDate: "2025-11-30",
    description: "PG사 결제 모듈 연동 및 정산 시스템 개발. 보안 인증 포함.",
    amount: null,
    is_paid: false,
    paid_at: null,
  },
  {
    id: "w6",
    contactId: "6",
    title: "교육 플랫폼 MVP",
    startDate: "2025-06-01",
    endDate: "2025-10-31",
    description:
      "온라인 교육 플랫폼 MVP 개발. 강의 관리, 수강생 관리, 결제 기능.",
    amount: null,
    is_paid: false,
    paid_at: null,
  },
];
