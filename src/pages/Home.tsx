import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // 우리가 만든 연결 도구 가져오기
import { Shield, Scale, Users, FileCheck, HardHat, Building2, Phone, Mail, MapPin, Send, Menu, X, ChevronLeft, ChevronRight, Settings, Upload, Image as ImageIcon, Type, Lock } from 'lucide-react';

// --- [데이터 정의] ---
const CONTACT_DATA = {
  phone: "010-8625-0299",
  email: "guddn2740@naver.com",
  address: "경기도 광명시 덕안로 77번길 5, 지웰에스테이트 910호"
};

const SERVICE_DATA = [
  { icon: FileCheck, title: "설계 및 입찰 지원", desc: "투명한 입찰 서류 작성", details: ["정확한 도면/시방서", "물량 산출", "계약 검토"] },
  { icon: HardHat, title: "비상주 감리", desc: "시공 품질 현장 관리", details: ["설계 기준 준수", "정품 자재 확인", "설계변경 방지"] },
  { icon: Building2, title: "주요 공사 분야", desc: "공동주택 유지보수 전문", details: ["재도장/방수", "지하주차장", "보도블럭/아스콘"] }
];

const ABOUT_DATA = [
  { icon: Shield, title: "공인된 법적 전문성", desc: "과학기술정보통신부 등록\n정식 기술사사무소" },
  { icon: Scale, title: "검증된 기술력 (T-5)", desc: "NICE평가정보 기술평가\n우수기업 인증 획득" },
  { icon: Users, title: "확실한 비용 절감", desc: "평균 10~15%의 실질적인\n공사비 절감 효과 보장" }
];

// --- [메인 컴포넌트] ---
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // --- [관리자 모드 상태] ---
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // Supabase에서 가져올 데이터들
  const [infoId, setInfoId] = useState<number | null>(null); // 데이터 위치 ID
  const [companyName, setCompanyName] = useState("로딩 중...");
  const [logoImg, setLogoImg] = useState<string | null>(null);
  const [heroBg, setHeroBg] = useState("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80");
  const [portfolioData, setPortfolioData] = useState<any[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<{type: 'logo' | 'hero' | 'portfolio', id?: number} | null>(null);

  // 1. 사이트 켜지면 Supabase에서 데이터 가져오기!
  useEffect(() => {
    setIsVisible(true);
    fetchSiteData();
  }, []);

  const fetchSiteData = async () => {
    // 1) 회사 정보 가져오기
    const { data: infoData } = await supabase.from('site_info').select('*').single();
    if (infoData) {
      setInfoId(infoData.id);
      setCompanyName(infoData.company_name);
      if (infoData.logo_img) setLogoImg(infoData.logo_img);
      if (infoData.hero_bg) setHeroBg(infoData.hero_bg);
    }

    // 2) 포트폴리오 가져오기
    const { data: pfData } = await supabase.from('portfolio').select('*').order('id');
    if (pfData) {
      setPortfolioData(pfData);
    }
  };

  // 2. 텍스트 변경 시 저장 (회사명)
  const updateCompanyName = async (newName: string) => {
    setCompanyName(newName); // 화면 먼저 바꾸고
    if (infoId) {
      await supabase.from('site_info').update({ company_name: newName }).eq('id', infoId);
    }
  };

  // 3. 이미지 업로드 & 저장 함수 (핵심!)
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !uploadTarget) return;

    // A. Supabase 저장소에 파일 업로드
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage.from('images').upload(fileName, file);

    if (error) {
      alert("이미지 업로드 실패: " + error.message);
      return;
    }

    // B. 업로드된 파일의 인터넷 주소(URL) 가져오기
    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName);

    // C. DB에 주소 저장하고 화면 갱신
    if (uploadTarget.type === 'logo') {
      setLogoImg(publicUrl);
      if (infoId) await supabase.from('site_info').update({ logo_img: publicUrl }).eq('id', infoId);
    } 
    else if (uploadTarget.type === 'hero') {
      setHeroBg(publicUrl);
      if (infoId) await supabase.from('site_info').update({ hero_bg: publicUrl }).eq('id', infoId);
    } 
    else if (uploadTarget.type === 'portfolio' && uploadTarget.id) {
      setPortfolioData(prev => prev.map(item => item.id === uploadTarget.id ? { ...item, img: publicUrl } : item));
      await supabase.from('portfolio').update({ img: publicUrl }).eq('id', uploadTarget.id);
    }

    // 초기화
    if (fileInputRef.current) fileInputRef.current.value = '';
    setUploadTarget(null);
    alert("저장 완료!");
  };

  const handleAdminAccess = () => {
    const password = prompt("관리자 비밀번호를 입력하세요:");
    if (password === "1234") setIsAdminOpen(true);
    else if (password !== null) alert("비밀번호가 틀렸습니다.");
  };

  const triggerUpload = (type: 'logo' | 'hero' | 'portfolio', id?: number) => {
    setUploadTarget({ type, id });
    fileInputRef.current?.click();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const amount = 350;
      current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full overflow-hidden font-sans text-gray-900 bg-white relative">
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />

      {/* 관리자 버튼 */}
      <button onClick={handleAdminAccess} className="fixed bottom-6 right-6 z-[40] bg-gray-800/80 backdrop-blur text-white px-4 py-3 rounded-full shadow-2xl font-bold flex items-center gap-2 hover:bg-gray-900 transition-transform hover:scale-105">
        <Lock size={16}/> 관리자 설정
      </button>

      {/* 관리자 패널 */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsAdminOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto animate-slide-in-right">
            <div className="p-6 bg-blue-900 text-white flex justify-between items-center sticky top-0 z-10">
              <h2 className="text-xl font-bold flex items-center gap-2"><Settings className="w-5 h-5"/> 관리자 모드</h2>
              <button onClick={() => setIsAdminOpen(false)} className="hover:bg-blue-800 p-1 rounded"><X size={24}/></button>
            </div>
            <div className="p-6 space-y-8">
              <div className="space-y-4 pb-6 border-b border-gray-200">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2"><Type size={18}/> 기본 정보 설정</h3>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">회사명 (로고 텍스트)</label>
                  <input type="text" value={companyName} onChange={(e) => updateCompanyName(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"/>
                </div>
              </div>
              <div className="space-y-4 pb-6 border-b border-gray-200">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2"><ImageIcon size={18}/> 이미지 설정</h3>
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <span className="text-sm font-medium">회사 로고</span>
                  <button onClick={() => triggerUpload('logo')} className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm hover:bg-gray-100 flex items-center gap-2"><Upload size={14}/> 파일 선택</button>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <span className="text-sm font-medium">메인 배너 배경</span>
                  <button onClick={() => triggerUpload('hero')} className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm hover:bg-gray-100 flex items-center gap-2"><Upload size={14}/> 파일 선택</button>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2"><Building2 size={18}/> 수행 실적 이미지</h3>
                <div className="space-y-3">
                  {portfolioData.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-3">
                        <img src={item.img} alt="thumb" className="w-10 h-10 rounded object-cover bg-gray-200"/>
                        <span className="text-sm font-medium truncate w-32">{item.title}</span>
                      </div>
                      <button onClick={() => triggerUpload('portfolio', item.id)} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded text-xs font-bold hover:bg-blue-100">사진 변경</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4 bg-green-50 p-4 rounded text-xs text-green-800 font-bold">
                ✨ 이제 사진을 바꾸면 서버에 영구 저장됩니다! <br/>새로고침해도 사라지지 않습니다.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 상단 네비게이션 */}
      <nav className="fixed w-full z-30 bg-blue-900/95 backdrop-blur-sm text-white border-b border-white/10 shadow-lg transition-all duration-300">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer relative group" onClick={scrollToTop}>
            {logoImg ? <img src={logoImg} alt="Logo" className="h-10 w-auto object-contain" /> : <div className="w-10 h-10 bg-yellow-500 rounded flex items-center justify-center font-bold text-blue-900 text-xl">DA</div>}
            <span className="font-bold text-lg tracking-wide">{companyName}</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#hero" className="hover:text-yellow-400 transition font-medium">홈</a>
            <a href="#about" className="hover:text-yellow-400 transition font-medium">회사소개</a>
            <a href="#services" className="hover:text-yellow-400 transition font-medium">기술소개</a>
            <a href="#portfolio" className="hover:text-yellow-400 transition font-medium">실적</a>
            <a href="#contact" className="px-5 py-2 bg-yellow-500 text-blue-900 font-bold rounded hover:bg-yellow-400 transition shadow-md">상담신청</a>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
        </div>
        {isMenuOpen && <div className="md:hidden bg-blue-950 border-t border-white/10"><div className="flex flex-col p-4 space-y-4">{['홈', '회사소개', '기술소개', '실적', '상담신청'].map((item, idx) => <a key={idx} href={`#${['hero', 'about', 'services', 'portfolio', 'contact'][idx]}`} className="hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}>{item}</a>)}</div></div>}
      </nav>

      {/* 1. 메인 배너 */}
      <section id="hero" className="relative h-screen flex items-center justify-center bg-blue-900 overflow-hidden">
        <div className={`absolute inset-0 z-0 transition-transform duration-[10s] ease-out ${isVisible ? 'scale-110' : 'scale-100'}`}>
            <img src={heroBg} alt="Background" className="w-full h-full object-cover opacity-40"/>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent z-10"></div>
        <div className={`relative z-20 container mx-auto px-6 text-center text-white transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-block px-4 py-1 border border-yellow-500/50 rounded-full text-yellow-400 text-sm mb-6 animate-pulse font-medium tracking-wider">Professional Engineer Office</div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 whitespace-pre-line leading-tight drop-shadow-lg">공사비 걱정은 덜고,<br/>아파트의 가치는 올립니다.</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 whitespace-pre-line max-w-2xl mx-auto leading-relaxed">설계부터 감리까지 ONE-STOP SERVICE.<br/>국가공인 기술사가 직접 책임지는 투명하고 확실한 솔루션.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4"><a href="#contact" className="px-8 py-4 bg-yellow-500 text-blue-900 font-bold rounded-lg hover:bg-yellow-400 transition transform hover:scale-105 shadow-xl">무료 상담 신청하기</a><a href="#portfolio" className="px-8 py-4 bg-white/10 border border-white/30 text-white font-medium rounded-lg hover:bg-white/20 transition backdrop-blur-sm">주요 실적 보기</a></div>
        </div>
      </section>

      {/* 2. 회사 소개 */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-left mb-16 border-l-4 border-yellow-500 pl-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-blue-950">왜 {companyName}인가?</h2>
            <p className="text-gray-600">법적으로 공인된 최고의 기술 전문가 그룹이 귀하의 자산을 보호합니다.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ABOUT_DATA.map((item, idx) => (
              <div key={idx} className="p-8 bg-slate-50 rounded-2xl hover:shadow-xl transition duration-300 group text-left border border-slate-100">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-blue-900 transition-colors duration-300"><item.icon className="w-7 h-7 text-blue-900 group-hover:text-yellow-400 transition-colors duration-300" /></div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 서비스 */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-left mb-16 border-l-4 border-yellow-500 pl-6"><h2 className="text-3xl md:text-4xl font-bold mb-3 text-blue-950">핵심 보유 기술</h2><p className="text-gray-600">공동주택 유지보수에 최적화된 전문 기술을 제공합니다.</p></div>
          <div className="grid md:grid-cols-3 gap-6">{SERVICE_DATA.map((service, idx) => (<div key={idx} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"><service.icon className="w-10 h-10 text-yellow-500 mb-6" /><h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3><p className="text-gray-600 mb-6 font-medium">{service.desc}</p><ul className="space-y-3 border-t border-gray-100 pt-6">{service.details.map((d, i) => (<li key={i} className="flex items-center text-sm text-gray-500"><div className="w-1.5 h-1.5 bg-blue-900 rounded-full mr-3"></div>{d}</li>))}</ul></div>))}</div>
        </div>
      </section>

      {/* 4. 수행 실적 */}
      <section id="portfolio" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div className="text-left border-l-4 border-yellow-500 pl-6"><h2 className="text-3xl md:text-4xl font-bold mb-3 text-blue-950">주요 수행 실적</h2><p className="text-gray-600">성공적인 프로젝트 수행 경험이 실력을 증명합니다.</p></div>
            <div className="flex gap-2"><button onClick={() => scroll('left')} className="p-3 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-600 transition shadow-sm"><ChevronLeft className="w-5 h-5" /></button><button onClick={() => scroll('right')} className="p-3 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-600 transition shadow-sm"><ChevronRight className="w-5 h-5" /></button></div>
          </div>
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {portfolioData.map((item) => (
              <div key={item.id} className="min-w-[320px] md:min-w-[400px] snap-center rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group border border-gray-100 relative bg-white">
                <div className="h-64 overflow-hidden relative">
                   <img src={item.img} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                   <div className="absolute top-4 left-4"><span className="text-blue-900 text-xs font-bold px-3 py-1 bg-white/90 backdrop-blur rounded-full shadow-sm">{item.category}</span></div>
                </div>
                <div className="p-6 text-left"><h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3><p className="text-blue-600 font-medium text-sm flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span>성과: {item.result}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 상담 신청 */}
      <section id="contact" className="py-24 bg-blue-900 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="text-white text-left">
              <div className="border-l-4 border-yellow-500 pl-6 mb-10"><h2 className="text-3xl md:text-4xl font-bold mb-4">전문가의 도움이<br/>필요하신가요?</h2><p className="text-blue-200 text-lg">구조 안전 진단, 내진 설계, VE 제안 등<br/>건축 기술과 관련된 모든 고민을 해결해 드립니다.</p></div>
              <div className="space-y-6">
                <div className="flex items-center gap-5"><div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20"><Phone className="w-6 h-6 text-yellow-400" /></div><div><div className="text-sm text-blue-300 mb-1">전화 문의</div><div className="text-xl font-bold">{CONTACT_DATA.phone}</div></div></div>
                <div className="flex items-center gap-5"><div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20"><Mail className="w-6 h-6 text-yellow-400" /></div><div><div className="text-sm text-blue-300 mb-1">이메일</div><div className="text-xl font-bold">{CONTACT_DATA.email}</div></div></div>
                <div className="flex items-center gap-5 cursor-pointer group" onClick={() => window.open(`https://map.naver.com/v5/search/${CONTACT_DATA.address}`, '_blank')}><div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20 group-hover:bg-yellow-500/20 transition"><MapPin className="w-6 h-6 text-yellow-400" /></div><div><div className="text-sm text-blue-300 mb-1">오시는 길</div><div className="text-lg font-bold group-hover:text-yellow-400 transition">{CONTACT_DATA.address}</div></div></div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-blue-950">무료 상담 신청</h3>
              <form onSubmit={(e) => {e.preventDefault(); alert("데모입니다!")}} className="space-y-5">
                <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-bold text-gray-700 mb-1">성함</label><input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none bg-gray-50" /></div><div><label className="block text-sm font-bold text-gray-700 mb-1">연락처</label><input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none bg-gray-50" /></div></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-1">문의 내용</label><textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none resize-none bg-gray-50"></textarea></div>
                <button type="submit" className="w-full py-4 bg-yellow-500 text-blue-900 font-bold rounded-lg hover:bg-yellow-400 transition flex items-center justify-center gap-2 shadow-lg">상담 신청하기<Send className="w-5 h-5" /></button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-blue-950 text-slate-500 py-12 text-center text-sm border-t border-white/5"><div className="container mx-auto px-6"><p className="mb-2">상호명: {companyName} | 대표: 이형우 | 사업자등록번호: 000-00-00000</p><p>© 2025 DA Engineering Office. All rights reserved.</p></div></footer>
    </div>
  );
}