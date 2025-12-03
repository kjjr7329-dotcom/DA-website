import { Building2, Ruler, ShieldCheck, Activity, HardHat, FileText } from 'lucide-react';
import { NavItem, ServiceItem, PortfolioItem, CompanyInfo, HeroContent, AboutContent } from './types';

export const COMPANY_INFO: CompanyInfo = {
  name: "디에이기술사사무소",
  address: "서울특별시 강남구 테헤란로 123, DA타워 15층",
  phone: "02-1234-5678",
  email: "contact@da-eng.com",
  ceo: "김이박"
};

export const NAV_ITEMS: NavItem[] = [
  { label: '홈', path: '/' },
  { label: '회사소개', path: '/about' },
  { label: '기술소개', path: '/services' },
  { label: '실적', path: '/portfolio' },
];

export const HERO_CONTENT_DEFAULT: HeroContent = {
  headline: "건축의 본질을 꿰뚫는\n기술사적 솔루션",
  subheadline: "안전과 효율, 그 완벽한 균형을 설계합니다.\n디에이기술사사무소는 대한민국 건축 기술의 새로운 기준을 제시합니다.",
  ctaPrimary: "프로젝트 문의하기",
  ctaSecondary: "실적 둘러보기",
  bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
};

export const ABOUT_CONTENT_DEFAULT: AboutContent = {
  heroTitle: "회사소개",
  heroDescription: "정직한 기술력으로 건축물의 가치를 높이는 파트너,\n디에이기술사사무소입니다.",
  heroImage: "https://picsum.photos/id/433/1920/600",
  philosophyTitle: "\"안전은 타협의 대상이 아닙니다.\"",
  philosophyDesc1: "디에이기술사사무소는 2010년 설립 이래, 수백 건의 구조 설계 및 안전 진단 프로젝트를 성공적으로 수행해왔습니다. 우리는 단순히 도면을 그리는 것이 아니라, 건축물이 직면할 수 있는 모든 물리적 위험을 예측하고 예방합니다.",
  philosophyDesc2: "클라이언트에게는 최적의 경제성을, 사용자에게는 절대적인 안전을 제공하는 것. 이것이 기술사로서 우리가 지키는 불변의 원칙입니다.",
  philosophyImage: "https://picsum.photos/id/1/800/600",
  statYears: "15+",
  statProjects: "500+",
  statSafeRate: "100%",
  expertiseText: "우리는 건축 구조 기술사(Professional Engineer) 자격을 보유한 전문가 집단입니다. 최신 내진 설계 기준(KDS 41)을 완벽히 숙지하며, MIDAS Gen 등 전문 해석 프로그램을 활용한 데이터 기반의 엔지니어링 서비스를 제공합니다. 복잡한 도심지 굴토 공사부터 초고층 빌딩까지, 어떤 난이도의 프로젝트도 해결할 수 있는 역량을 갖추고 있습니다."
};

export const SERVICES_DEFAULT: ServiceItem[] = [
  {
    id: 'struct-design',
    title: "구조 설계 (Structural Design)",
    description: "경제성과 안전성을 동시에 확보하는 최적의 구조 시스템을 제안합니다.",
    details: ["초고층 건물 구조 설계", "특수 구조물 해석", "내진/제진 설계 최적화"],
    iconName: "Building2"
  },
  {
    id: 'safety-diag',
    title: "정밀 안전 진단",
    description: "건축물의 현재 상태를 과학적으로 분석하여 잠재적 위험을 제거합니다.",
    details: ["구조 안전성 평가", "시설물 유지관리 진단", "보수/보강 설계"],
    iconName: "ShieldCheck"
  },
  {
    id: 've-consulting',
    title: "VE (Value Engineering)",
    description: "불필요한 공사비를 절감하고 성능을 극대화하는 가치 공학 솔루션.",
    details: ["설계 단계별 VE", "시공성 향상 검토", "생애주기비용(LCC) 분석"],
    iconName: "Activity"
  },
  {
    id: 'tech-consulting',
    title: "기술 자문 및 심의",
    description: "복잡한 인허가 과정과 기술적 난제를 해결하는 전문가 자문 서비스.",
    details: ["건축 심의 지원", "현장 기술 지원", "분쟁 해결 기술 자문"],
    iconName: "FileText"
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p1',
    title: "강남 S타워 신축 구조설계",
    category: "구조설계",
    description: "지하 5층, 지상 20층 규모의 복합 업무 시설. 불규칙한 대지 조건과 인접 건물 간섭 문제 발생.",
    solution: "탑다운(Top-Down) 공법 적용 및 전이보(Transfer Girder) 시스템 최적화를 통해 공기 단축 및 공간 효율성 확보.",
    result: "공사비 15% 절감 및 내진 성능 특등급 확보.",
    imageUrl: "https://picsum.photos/id/122/800/600"
  },
  {
    id: 'p2',
    title: "D제조 공장 정밀안전진단",
    category: "안전진단",
    description: "30년 경과된 노후 공장 시설의 균열 발생 및 처짐 현상으로 인한 붕괴 우려.",
    solution: "3D 스캐닝 및 비파괴 검사를 통한 정밀 분석 수행. 탄소섬유 보강 공법 제안.",
    result: "안전 등급 C등급 → B등급 상향, 시설물 수명 20년 연장.",
    imageUrl: "https://picsum.photos/id/195/800/600"
  },
  {
    id: 'p3',
    title: "H주상복합 내진성능평가",
    category: "성능평가",
    description: "강화된 내진 설계 기준에 미달하는 기존 고층 주거 시설의 법적 리스크.",
    solution: "비선형 동적 해석(Non-linear Analysis)을 통한 정밀 성능 평가 및 제진 댐퍼 설치.",
    result: "거주민 퇴거 없이 보강 공사 완료, 자산 가치 상승 기여.",
    imageUrl: "https://picsum.photos/id/233/800/600"
  },
  {
    id: 'p4',
    title: "K-오피스 리모델링 구조보강",
    category: "구조설계",
    description: "용도 변경에 따른 하중 증가로 기존 기둥 및 보의 내력 부족 발생.",
    solution: "철골 브레이스 보강 및 단면 증설 공법을 적용하여 사용성 확보.",
    result: "구조 안전성 100% 확보 및 임대 면적 손실 최소화.",
    imageUrl: "https://picsum.photos/id/48/800/600"
  },
  {
    id: 'p5',
    title: "평택 스마트 물류센터",
    category: "구조설계",
    description: "대형 스판(Long Span)이 요구되는 PC(Precast Concrete) 구조의 물류 창고.",
    solution: "PC 부재 접합부 디테일 개선 및 시공 시뮬레이션을 통한 오차 최소화.",
    result: "공기 2개월 단축 및 균열 제어 우수성 입증.",
    imageUrl: "https://picsum.photos/id/1076/800/600"
  },
  {
    id: 'p6',
    title: "공공청사 내진보강 공사",
    category: "안전진단",
    description: "지진 재난에 대비하기 위한 노후 공공 건축물의 내진 성능 확보 필요.",
    solution: "외부 프레임 보강 공법을 적용하여 내부 업무 중단 없이 공사 진행.",
    result: "내진 특등급 확보 및 건물 외관 디자인 개선 효과.",
    imageUrl: "https://picsum.photos/id/531/800/600"
  }
];

export const WHY_US = [
  {
    title: "기술사 직접 수행",
    description: "모든 프로젝트는 담당 기술사가 직접 검토하고 서명하여 책임을 집니다.",
    icon: HardHat
  },
  {
    title: "데이터 기반 엔지니어링",
    description: "경험에만 의존하지 않고, 최신 해석 프로그램과 데이터로 입증합니다.",
    icon: Ruler
  },
  {
    title: "신속한 의사결정",
    description: "복잡한 기술적 문제도 핵심을 파악하여 클라이언트의 시간을 아껴드립니다.",
    icon: Activity
  }
];