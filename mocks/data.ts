export interface Work {
  id: string
  contactId: string
  title: string
  startDate: string
  endDate: string | null
  description: string
}

export interface Contact {
  id: string
  name: string
  company: string
  title: string
  email: string
  phone: string
  lastContactDate: string
  notes: string
}

export const contacts: Contact[] = [
  {
    id: "1",
    name: "김민수",
    company: "테크스타트",
    title: "CTO",
    email: "minsu@techstart.kr",
    phone: "010-1234-5678",
    lastContactDate: "2026-02-01",
    notes: "React/Next.js 전문 개발사. 장기 파트너십 가능성 높음.",
  },
  {
    id: "2",
    name: "이서윤",
    company: "디자인랩",
    title: "대표",
    email: "seoyun@designlab.kr",
    phone: "010-2345-6789",
    lastContactDate: "2026-01-28",
    notes: "UI/UX 디자인 외주 협력. 포트폴리오 공유 완료.",
  },
  {
    id: "3",
    name: "박지훈",
    company: "클라우드웨어",
    title: "PM",
    email: "jihun@cloudware.io",
    phone: "010-3456-7890",
    lastContactDate: "2026-01-15",
    notes: "AWS 인프라 구축 프로젝트 논의 중.",
  },
  {
    id: "4",
    name: "정하늘",
    company: "마케팅플러스",
    title: "마케팅 이사",
    email: "haneul@mktplus.kr",
    phone: "010-4567-8901",
    lastContactDate: "2026-01-10",
    notes: "B2B SaaS 마케팅 캠페인 진행 경험 있음.",
  },
  {
    id: "5",
    name: "최유진",
    company: "핀테크코리아",
    title: "개발팀장",
    email: "yujin@fintechkorea.com",
    phone: "010-5678-9012",
    lastContactDate: "2025-12-20",
    notes: "결제 시스템 연동 프로젝트 완료. 후속 논의 필요.",
  },
  {
    id: "6",
    name: "한도현",
    company: "에듀테크랩",
    title: "CEO",
    email: "dohyun@edutechlab.kr",
    phone: "010-6789-0123",
    lastContactDate: "2025-12-05",
    notes: "교육 플랫폼 MVP 개발 완료. 2차 계약 검토 중.",
  },
]

export const works: Work[] = [
  {
    id: "w1",
    contactId: "1",
    title: "관리자 대시보드 개발",
    startDate: "2025-09-01",
    endDate: "2025-12-15",
    description: "React 기반 관리자 대시보드 프론트엔드 외주 개발. 데이터 시각화 및 사용자 관리 기능 포함.",
  },
  {
    id: "w2",
    contactId: "1",
    title: "API 서버 리팩토링",
    startDate: "2026-01-10",
    endDate: null,
    description: "기존 Express 서버를 Next.js API Routes로 마이그레이션. 성능 최적화 포함.",
  },
  {
    id: "w3",
    contactId: "2",
    title: "서비스 리브랜딩 디자인",
    startDate: "2025-11-01",
    endDate: "2026-01-20",
    description: "전체 서비스 UI/UX 리디자인. 디자인 시스템 구축 및 프로토타입 제작.",
  },
  {
    id: "w4",
    contactId: "3",
    title: "클라우드 인프라 구축",
    startDate: "2025-10-15",
    endDate: "2026-01-05",
    description: "AWS 기반 서버리스 아키텍처 설계 및 구축. CI/CD 파이프라인 포함.",
  },
  {
    id: "w5",
    contactId: "5",
    title: "결제 시스템 연동",
    startDate: "2025-08-01",
    endDate: "2025-11-30",
    description: "PG사 결제 모듈 연동 및 정산 시스템 개발. 보안 인증 포함.",
  },
  {
    id: "w6",
    contactId: "6",
    title: "교육 플랫폼 MVP",
    startDate: "2025-06-01",
    endDate: "2025-10-31",
    description: "온라인 교육 플랫폼 MVP 개발. 강의 관리, 수강생 관리, 결제 기능.",
  },
]
