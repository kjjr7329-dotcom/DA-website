import { Scale, Shield, Users, Building2, FileCheck, HardHat } from "lucide-react";

// 1. 기본 정보 설정
export const COMPANY_NAME = "DA 기술사사무소";
export const CEO_NAME = "이형우";
export const CONTACT_PHONE = "010-8625-0299";
export const CONTACT_EMAIL = "guddn2740@naver.com";
export const OFFICE_ADDRESS = "경기도 광명시 덕안로 77번길 5, 지웰에스테이트 910호";

// 2. 브랜드 컬러 설정 (네이비 & 골드)
export const theme = {
  colors: {
    primary: "#1e3a8a",   // 짙은 네이비 (신뢰)
    secondary: "#fbbf24", // 골드 옐로우 (강조)
    accent: "#2563eb",    // 밝은 블루
    text: {
      primary: "#111827",
      secondary: "#4b5563",
      light: "#9ca3af",
    },
    background: {
      primary: "#ffffff",
      secondary: "#f8fafc",
      dark: "#1e293b",
    }
  }
};

// 3. 네비게이션 메뉴
export const NAV_ITEMS = [
  { label: "홈", path: "/" },
  { label: "회사소개", path: "#about" },
  { label: "핵심기술", path: "#services" },
  { label: "실적", path: "#portfolio" },
  { label: "상담신청", path: "#contact" },
];

// 4. 메인 배너 데이터
export const HERO_CONTENT_DEFAULT = {
  title: "공사비 걱정은 덜고,\n아파트의 가치는 올립니다.",
  description: "설계부터 감리까지 ONE-STOP SERVICE.\n국가공인 기술사가 직접 책임지는 투명하고 확실한 솔루션.",
  primaryButtonText: "무료 상담 신청하기",
  secondaryButtonText: "주요 실적 보기"
};

// 5. 홈 섹션 구성 데이터
export const HOME_SECTIONS_DEFAULT = [
  { id: "hero", label: "메인", isEnabled: true },
  { id: "about", label: "회사소개", isEnabled: true },
  { id: "services", label: "기술소개", isEnabled: true },
  { id: "portfolio", label: "수행실적", isEnabled: true },
  { id: "contact", label: "상담신청", isEnabled: true },
];

// ★ 6. 회사 소개 데이터 (안전장치: 이름표 2개 부착)
const aboutData = {
  title: "왜 DA 기술사사무소인가?",
  description: "법적으로 공인된 최고의 기술 전문가 그룹이 귀하의 자산을 보호합니다.",
  features: [
    {
      icon: Shield,
      title: "공인된 법적 전문성",
      description: "과학기술정보통신부에 등록된 정식 기술사사무소입니다."
    },
    {
      icon: Scale,
      title: "검증된 기술력 (T-5)",
      description: "NICE평가정보 기술평가 우수기업 인증(T-5) 획득."
    },
    {
      icon: Users,
      title: "확실한 비용 절감",
      description: "평균 10~15%의 실질적인 공사비 절감 효과 보장."
    }
  ],
  stats: [
    { label: "공사비 절감율", value: "15%" },
    { label: "기술 등급", value: "특급" },
    { label: "프로젝트 수행", value: "100+" },
    { label: "고객 만족도", value: "98%" }
  ]
};
export const ABOUT_CONTENT_DEFAULT = aboutData;
export const WHY_US_DEFAULT = aboutData; // 시스템이 'WHY_US'를 찾아도 연결됨

// ★ 7. 서비스 소개 데이터 (안전장치: 이름표 2개 부착)
const serviceData = [
  {
    id: "design-supervision",
    title: "설계 및 입찰 지원",
    description: "투명하고 공정한 입찰을 위한 서류 작성",
    details: ["정확한 도면/시방서 작성", "물량 산출로 과다 비용 방지", "독소조항 없는 계약 검토"],
    iconName: "FileCheck"
  },
  {
    id: "construction-manage",
    title: "비상주 감리",
    description: "시공 품질 확보를 위한 현장 관리",
    details: ["설계 기준 준수 관리", "정품 자재 확인", "부당한 설계변경 방지"],
    iconName: "HardHat"
  },
  {
    id: "repair-maintenance",
    title: "주요 공사 분야",
    description: "공동주택 시설물 유지보수 전문",
    details: ["재도장/방수", "지하주차장 에폭시", "보도블럭/아스콘 포장"],
    iconName: "Building2"
  }
];
export const SERVICE_ITEMS = serviceData;
export const SERVICES_DEFAULT = serviceData; // 시스템이 'DEFAULT'를 찾아도 연결됨

// ★ 8. 포트폴리오 데이터 (안전장치: 이름표 2개 부착)
const portfolioData = [
  {
    id: "1",
    title: "송도 웰카운티 1단지 재도장",
    category: "재도장/방수",
    description: "외벽 균열 보수 및 재도장 공사 감리",
    solution: "최적 도료 선정 및 시공 관리",
    result: "주민 만족도 최상, 하자 0건",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80"
  },
  {
    id: "2",
    title: "의정부 신일유토빌 지붕개량",
    category: "지붕공사",
    description: "노후 아스팔트 슁글 교체",
    solution: "내풍압 강화 이중 슁글 적용",
    result: "태풍 피해 예방 효과",
    imageUrl: "https://images.unsplash.com/photo-1628744876497-eb30460be9f6?auto=format&fit=crop&q=80"
  },
  {
    id: "3",
    title: "고척 대우아파트 보도블럭",
    category: "토목/조경",
    description: "보행자 도로 전면 교체",
    solution: "투수성 블럭 적용으로 물고임 해결",
    result: "보행 안전 확보",
    imageUrl: "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?auto=format&fit=crop&q=80"
  }
];
export const PORTFOLIO_ITEMS = portfolioData;
export const PORTFOLIO_DEFAULT = portfolioData; // 시스템이 'DEFAULT'를 찾아도 연결됨

// ★ 9. 연락처 데이터 (안전장치: 이름표 2개 부착)
const contactData = {
  phone: CONTACT_PHONE,
  email: CONTACT_EMAIL,
  address: OFFICE_ADDRESS,
  businessHours: "평일 09:00 - 18:00"
};
export const CONTACT_INFO = contactData;
export const COMPANY_INFO = contactData; // 시스템이 'COMPANY'를 찾아도 연결됨