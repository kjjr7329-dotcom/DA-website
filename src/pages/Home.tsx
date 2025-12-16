import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Shield, Scale, Users, FileCheck, HardHat, Building2, Phone, Mail, MapPin, Send, Menu, X, ChevronLeft, ChevronRight, Settings, Save, Plus, Trash2, Camera, MessageSquare, Lock, LogIn } from 'lucide-react';

const DEFAULT_HERO = {
  badge: "Professional Engineer Office",
  title: "공사비 걱정은 덜고,\n아파트의 가치는 올립니다.",
  desc: "설계부터 감리까지 ONE-STOP SERVICE.\n국가공인 기술사가 직접 책임지는 투명하고 확실한 솔루션.",
  bg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
};

export default function Home() {
  // --- UI 상태 ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // [NEW] 세련된 로그인을 위한 상태 변수
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const [activeTab, setActiveTab] = useState<'edit' | 'messages'>('edit');

  // --- 데이터 상태 ---
  const [infoId, setInfoId] = useState<number | null>(null);
  const [companyName, setCompanyName] = useState("DA기술사사무소");
  const [logoImg, setLogoImg] = useState<string | null>(null);
  const [heroData, setHeroData] = useState(DEFAULT_HERO);
  
  const [contactInfo, setContactInfo] = useState({
    title: "전문가의 도움이\n필요하신가요?",
    desc: "구조 안전 진단, 내진 설계, VE 제안 등\n건축 기술과 관련된 모든 고민을 해결해 드립니다.",
    phone: "010-8625-0299",
    email: "guddn2740@naver.com",
    address: "경기도 광명시 덕안로 77번길 5, 지웰에스테이트 910호"
  });

  const [portfolioData, setPortfolioData] = useState<any[]>([]);
  const [aboutData, setAboutData] = useState<any[]>([]);
  const [serviceData, setServiceData] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<{type: string, id?: number} | null>(null);

  useEffect(() => { setIsVisible(true); fetchSiteData(); }, []);

  const fetchSiteData = async () => {
    try {
      const { data: info } = await supabase.from('site_info').select('*').single();
      if (info) {
        setInfoId(info.id);
        setCompanyName(info.company_name || "DA기술사사무소");
        setLogoImg(info.logo_img);
        setHeroData({
          badge: info.hero_badge || DEFAULT_HERO.badge,
          title: info.hero_title || DEFAULT_HERO.title,
          desc: info.hero_desc || DEFAULT_HERO.desc,
          bg: info.hero_bg || DEFAULT_HERO.bg
        });
        setContactInfo({
          title: info.contact_title || contactInfo.title,
          desc: info.contact_desc || contactInfo.desc,
          phone: info.phone || contactInfo.phone,
          email: info.email || contactInfo.email,
          address: info.address || contactInfo.address
        });
      }
      const { data: pf } = await supabase.from('portfolio').select('*').order('id'); if (pf) setPortfolioData(pf);
      const { data: ab } = await supabase.from('about_section').select('*').order('sort_order'); if (ab) setAboutData(ab);
      const { data: sv } = await supabase.from('service_section').select('*').order('sort_order'); if (sv) setServiceData(sv);
      fetchConsultations();
    } catch (e) { console.error(e); }
  };

  const fetchConsultations = async () => {
    const { data } = await supabase.from('consultations').select('*').order('created_at', { ascending: false });
    if (data) setConsultations(data);
  };

  // --- [수정된 저장 로직] 모든 테이블을 확실하게 업데이트 ---
  const handleSaveChanges = async () => {
    if (!infoId) return;
    if (!window.confirm("모든 변경사항을 저장하시겠습니까?")) return;

    try {
      // 1. 기본 정보 저장
      await supabase.from('site_info').update({
        company_name: companyName,
        hero_badge: heroData.badge,
        hero_title: heroData.title,
        hero_desc: heroData.desc,
        contact_title: contactInfo.title,
        contact_desc: contactInfo.desc,
        phone: contactInfo.phone,
        email: contactInfo.email,
        address: contactInfo.address
      }).eq('id', infoId);
      
      // 2. 포트폴리오 저장
      for (const item of portfolioData) {
        await supabase.from('portfolio').update({ 
          title: item.title, 
          category: item.category, 
          result: item.result 
        }).eq('id', item.id);
      }

      // 3. '왜 DA인가'(About) 섹션 저장 (이 부분이 중요!)
      for (const item of aboutData) {
        await supabase.from('about_section').update({ 
          title: item.title, 
          description: item.description 
        }).eq('id', item.id);
      }

      // 4. '핵심 기술'(Service) 섹션 저장 (이 부분도 중요!)
      for (const item of serviceData) {
        await supabase.from('service_section').update({ 
          title: item.title, 
          description: item.description, 
          details: item.details 
        }).eq('id', item.id);
      }
      
      alert("✅ 모든 섹션이 완벽하게 저장되었습니다!");
      setIsEditMode(false);
    } catch (e) { alert("저장 중 오류 발생: " + e); }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !uploadTarget) return;
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from('images').upload(fileName, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName);

      if (uploadTarget.type === 'logo') { setLogoImg(publicUrl); if (infoId) await supabase.from('site_info').update({ logo_img: publicUrl }).eq('id', infoId); }
      else if (uploadTarget.type === 'hero') { setHeroData(prev => ({ ...prev, bg: publicUrl })); if (infoId) await supabase.from('site_info').update({ hero_bg: publicUrl }).eq('id', infoId); }
      else if (uploadTarget.type === 'portfolio') { setPortfolioData(prev => prev.map(item => item.id === uploadTarget.id ? { ...item, img: publicUrl } : item)); await supabase.from('portfolio').update({ img: publicUrl }).eq('id', uploadTarget.id!); }
      else if (uploadTarget.type === 'about') { setAboutData(prev => prev.map(item => item.id === uploadTarget.id ? { ...item, icon_img: publicUrl } : item)); await supabase.from('about_section').update({ icon_img: publicUrl }).eq('id', uploadTarget.id!); }
      else if (uploadTarget.type === 'service') { setServiceData(prev => prev.map(item => item.id === uploadTarget.id ? { ...item, icon_img: publicUrl } : item)); await supabase.from('service_section').update({ icon_img: publicUrl }).eq('id', uploadTarget.id!); }
      alert("이미지 변경 완료!");
    } catch (err) { alert("업로드 실패: " + err); }
    setUploadTarget(null);
    if(fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerUpload = (type: string, id?: number) => { setUploadTarget({ type, id }); fileInputRef.current?.click(); };
  
  // [NEW] 관리자 로그인 처리
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "1234") {
      setIsEditMode(true);
      setShowLoginModal(false);
      setPasswordInput("");
      setActiveTab('edit');
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const toggleEditMode = () => { 
    if (isEditMode) {
      setIsEditMode(false); 
    } else {
      setShowLoginModal(true); // 기존 prompt 대신 모달 띄우기
    }
  };

  const handleConsultSubmit = async (e: React.FormEvent) => { e.preventDefault(); const form = e.target as HTMLFormElement; const { error } = await supabase.from('consultations').insert([{ name: form.name.value, contact: form.contact.value, content: form.content.value }]); if (!error) { alert("신청 완료!"); form.reset(); fetchConsultations(); } };
  const deleteItem = async (table: string, id: number, setter: React.Dispatch<React.SetStateAction<any[]>>) => { if(window.confirm("삭제?")) { await supabase.from(table).delete().eq('id', id); setter(prev => prev.filter(item => item.id !== id)); } };
  const addItem = async (table: string, defaults: object, setter: React.Dispatch<React.SetStateAction<any[]>>) => { const { data } = await supabase.from(table).insert([defaults]).select(); if(data) setter(prev => [...prev, data[0]]); };
  const addPortfolio = () => addItem('portfolio', { title: "새 프로젝트", category: "카테고리", result: "성과 입력", img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80" }, setPortfolioData);

  return (
    <div className="w-full overflow-hidden font-sans text-gray-900 bg-white relative">
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />

      {/* --- [NEW] 세련된 관리자 로그인 모달 --- */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-900 to-yellow-500"></div>
            <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-900">
                <Lock size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">관리자 접속</h2>
              <p className="text-sm text-gray-500 mt-1">인가된 사용자만 접근 가능합니다.</p>
            </div>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="비밀번호를 입력하세요" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition"
                autoFocus
              />
              <button type="submit" className="w-full py-3 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800 transition shadow-lg flex items-center justify-center gap-2">
                접속하기 <LogIn size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 관리자 패널 (메시지함) */}
      {isEditMode && activeTab === 'messages' && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto animate-slide-in-right">
             <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold flex items-center gap-2"><MessageSquare/> 상담 내역</h2><button onClick={() => setActiveTab('edit')}>닫기</button></div>
             {consultations.map((msg) => (
               <div key={msg.id} className="bg-gray-50 p-4 rounded-lg border mb-3 relative"><div className="font-bold">{msg.name} ({msg.contact})</div><div className="text-sm text-gray-600 my-2">{msg.content}</div><button onClick={() => deleteItem('consultations', msg.id, setConsultations)} className="absolute top-2 right-2 text-red-400"><Trash2 size={16}/></button></div>
             ))}
          </div>
        </div>
      )}

      {/* 네비게이션 */}
      <nav className="fixed w-full z-40 bg-blue-900/95 backdrop-blur-sm text-white border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 relative">
            <div className="relative">{logoImg ? <img src={logoImg} alt="Logo" className="h-10 w-auto object-contain" /> : <div className="w-10 h-10 bg-yellow-500 rounded flex items-center justify-center font-bold text-blue-900 text-xl">DA</div>}{isEditMode && <button onClick={() => triggerUpload('logo')} className="absolute -bottom-2 -right-2 bg-red-500 p-1 rounded-full shadow-lg hover:bg-red-600"><Camera size={12} /></button>}</div>
            {isEditMode ? <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="bg-white text-black px-2 py-1 rounded border-2 border-yellow-500 font-bold text-lg w-48 shadow-lg" /> : <span className="font-bold text-lg tracking-wide cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{companyName}</span>}
          </div>
          <div className="hidden md:flex items-center space-x-8">{['홈', '회사소개', '기술소개', '실적', '상담신청'].map((t, i) => <a key={i} href={`#${['hero', 'services', 'about', 'portfolio', 'contact'][i]}`} className="hover:text-yellow-400 font-medium">{t}</a>)}</div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
        </div>
        {isMenuOpen && <div className="md:hidden bg-blue-950 border-t border-white/10 p-4 space-y-4 flex flex-col">{['홈', '회사소개', '기술소개', '실적', '상담신청'].map((t, i) => <a key={i} href={`#${['hero', 'services', 'about', 'portfolio', 'contact'][i]}`} onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-400">{t}</a>)}</div>}
      </nav>

      {/* 1. 메인 배너 */}
      <section id="hero" className="relative h-screen flex items-center justify-center bg-blue-900 overflow-hidden">
        <div className={`absolute inset-0 z-0 transition-transform duration-[10s] ease-out ${isVisible ? 'scale-110' : 'scale-100'}`}><img src={heroData.bg} alt="bg" className="w-full h-full object-cover opacity-40"/></div>
        {isEditMode && <button onClick={() => triggerUpload('hero')} className="absolute top-24 right-6 z-30 bg-white/90 text-blue-900 px-4 py-2 rounded-full font-bold shadow-xl flex items-center gap-2 hover:bg-white"><Camera size={18} /> 배경 변경</button>}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent z-10"></div>
        <div className={`relative z-20 container mx-auto px-6 text-center text-white transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {isEditMode ? (<div className="flex flex-col items-center w-full"><input type="text" value={heroData.badge} onChange={(e) => setHeroData({...heroData, badge: e.target.value})} className="bg-white/90 text-black text-center text-sm font-medium mb-4 rounded px-2 w-64 shadow-lg"/><textarea value={heroData.title} onChange={(e) => setHeroData({...heroData, title: e.target.value})} className="bg-white/90 text-black text-center text-4xl md:text-6xl lg:text-7xl font-bold mb-4 rounded w-full max-w-4xl shadow-lg" rows={2}/><textarea value={heroData.desc} onChange={(e) => setHeroData({...heroData, desc: e.target.value})} className="bg-white/90 text-black text-center text-lg md:text-xl rounded w-full max-w-2xl shadow-lg" rows={3}/></div>) : (
            <>
              <div className="inline-block px-4 py-1 border border-yellow-500/50 rounded-full text-yellow-400 text-sm mb-6 animate-pulse font-medium tracking-wider">{heroData.badge}</div>
              <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 whitespace-pre-line leading-tight drop-shadow-lg break-keep">{heroData.title}</h1>
              <p className="text-lg md:text-xl text-gray-200 mb-10 whitespace-pre-line max-w-2xl mx-auto leading-relaxed break-keep">{heroData.desc}</p>
            </>
          )}
          <div className="flex justify-center gap-4 mt-8"><a href="#contact" className="px-8 py-4 bg-yellow-500 text-blue-900 font-bold rounded-lg hover:bg-yellow-400 shadow-xl">무료 상담 신청하기</a></div>
        </div>
      </section>

      {/* 2. 회사소개 */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-left mb-16 border-l-4 border-yellow-500 pl-6"><h2 className="text-3xl md:text-4xl font-bold mb-3 text-blue-950">왜 {companyName}인가?</h2><p className="text-gray-600">법적으로 공인된 최고의 기술 전문가 그룹이 귀하의 자산을 보호합니다.</p></div>
          <div className="grid md:grid-cols-3 gap-8">
            {aboutData.map((item) => (
              <div key={item.id} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 relative">{item.icon_img ? <img src={item.icon_img} alt="icon" className="w-8 h-8 object-contain"/> : <Shield className="w-7 h-7 text-blue-900" />}{isEditMode && <button onClick={() => triggerUpload('about', item.id)} className="absolute -bottom-2 -right-2 bg-black/50 text-white rounded-full p-1"><Camera size={10}/></button>}</div>
                {isEditMode ? (<><input type="text" value={item.title} onChange={(e) => setAboutData(prev => prev.map(p => p.id === item.id ? { ...p, title: e.target.value } : p))} className="w-full font-bold text-xl mb-2 bg-white border p-1"/><textarea value={item.description} onChange={(e) => setAboutData(prev => prev.map(p => p.id === item.id ? { ...p, description: e.target.value } : p))} className="w-full text-sm text-gray-600 bg-white border p-1" rows={3}/><button onClick={() => deleteItem('about_section', item.id, setAboutData)} className="absolute top-2 right-2 text-red-400"><Trash2 size={16}/></button></>) : (
                  <>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base">{item.description}</p>
                  </>
                )}
              </div>
            ))}
            {isEditMode && <button onClick={() => addItem('about_section', { title: '새 항목', description: '내용 입력' }, setAboutData)} className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 hover:border-blue-500 hover:text-blue-500"><Plus size={32}/> 항목 추가</button>}
          </div>
        </div>
      </section>

      {/* 3. 기술소개 */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-left mb-16 border-l-4 border-yellow-500 pl-6"><h2 className="text-3xl md:text-4xl font-bold mb-3 text-blue-950">핵심 보유 기술</h2><p className="text-gray-600">공동주택 유지보수에 최적화된 전문 기술을 제공합니다.</p></div>
          <div className="grid md:grid-cols-3 gap-6">
            {serviceData.map((item) => (
              <div key={item.id} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm relative">
                <div className="relative w-fit mb-6">{item.icon_img ? <img src={item.icon_img} alt="icon" className="w-10 h-10 object-contain"/> : <FileCheck className="w-10 h-10 text-yellow-500" />}{isEditMode && <button onClick={() => triggerUpload('service', item.id)} className="absolute -bottom-2 -right-2 bg-black/50 text-white rounded-full p-1"><Camera size={10}/></button>}</div>
                {isEditMode ? (<><input type="text" value={item.title} onChange={(e) => setServiceData(prev => prev.map(p => p.id === item.id ? { ...p, title: e.target.value } : p))} className="w-full font-bold text-2xl mb-2 border p-1"/><input type="text" value={item.description} onChange={(e) => setServiceData(prev => prev.map(p => p.id === item.id ? { ...p, description: e.target.value } : p))} className="w-full font-medium text-gray-600 mb-4 border p-1"/><textarea value={item.details} onChange={(e) => setServiceData(prev => prev.map(p => p.id === item.id ? { ...p, details: e.target.value } : p))} className="w-full text-sm text-gray-500 border p-1" rows={3}/><button onClick={() => deleteItem('service_section', item.id, setServiceData)} className="absolute top-2 right-2 text-red-400"><Trash2 size={16}/></button></>) : (<><h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3><p className="text-gray-600 mb-6 font-medium">{item.description}</p><ul className="space-y-3 border-t border-gray-100 pt-6">{(item.details || "").split(',').map((d: string, i: number) => <li key={i} className="flex items-center text-sm text-gray-500"><div className="w-1.5 h-1.5 bg-blue-900 rounded-full mr-3"></div>{d}</li>)}</ul></>)}
              </div>
            ))}
            {isEditMode && <button onClick={() => addItem('service_section', { title: '새 기술', description: '설명', details: '상세1,상세2' }, setServiceData)} className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 hover:border-blue-500 hover:text-blue-500"><Plus size={32}/> 기술 추가</button>}
          </div>
        </div>
      </section>

      {/* 4. 실적 */}
      <section id="portfolio" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12"><div className="text-left border-l-4 border-yellow-500 pl-6"><h2 className="text-3xl md:text-4xl font-bold mb-3 text-blue-950">주요 수행 실적</h2><p className="text-gray-600">성공적인 프로젝트 수행 경험이 실력을 증명합니다.</p></div><div className="flex items-center gap-4">{isEditMode && (<button onClick={addPortfolio} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-md"><Plus size={18}/> 추가</button>)}<div className="flex gap-2"><button onClick={() => scrollRef.current?.scrollBy({left: -350, behavior: 'smooth'})} className="p-3 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-600"><ChevronLeft/></button><button onClick={() => scrollRef.current?.scrollBy({left: 350, behavior: 'smooth'})} className="p-3 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-600"><ChevronRight/></button></div></div></div>
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {portfolioData.map((item) => (
              <div key={item.id} className="min-w-[320px] md:min-w-[400px] snap-center rounded-xl overflow-hidden shadow-md relative bg-white border border-gray-100">
                <div className="h-64 overflow-hidden relative"><img src={item.img} alt={item.title} className="w-full h-full object-cover"/>{isEditMode && <button onClick={() => triggerUpload('portfolio', item.id)} className="absolute inset-0 bg-black/40 flex items-center justify-center text-white"><Camera size={32}/></button>}<div className="absolute top-4 left-4 z-20">{isEditMode ? <input type="text" value={item.category} onChange={(e) => setPortfolioData(prev => prev.map(p => p.id === item.id ? { ...p, category: e.target.value } : p))} className="text-xs font-bold px-2 py-1 bg-white/90 rounded text-blue-900 w-24"/> : <span className="text-blue-900 text-xs font-bold px-3 py-1 bg-white/90 backdrop-blur rounded-full">{item.category}</span>}</div></div>
                <div className="p-6 text-left relative">{isEditMode ? (<div className="space-y-2"><input type="text" value={item.title} onChange={(e) => setPortfolioData(prev => prev.map(p => p.id === item.id ? { ...p, title: e.target.value } : p))} className="text-xl font-bold w-full border-b"/><input type="text" value={item.result} onChange={(e) => setPortfolioData(prev => prev.map(p => p.id === item.id ? { ...p, result: e.target.value } : p))} className="text-sm text-blue-600 w-full border-b"/><button onClick={() => deleteItem('portfolio', item.id, setPortfolioData)} className="absolute bottom-6 right-6 text-red-400"><Trash2 size={20}/></button></div>) : (<><h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3><p className="text-blue-600 font-medium text-sm">성과: {item.result}</p></>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 연락처 & 상담 */}
      <section id="contact" className="py-24 bg-blue-900 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-start">
             <div className="text-white text-left">
               <div className="border-l-4 border-yellow-500 pl-6 mb-10">{isEditMode ? <><textarea value={contactInfo.title} onChange={(e) => setContactInfo({...contactInfo, title: e.target.value})} className="w-full bg-white/90 text-black text-3xl font-bold mb-2 p-2 rounded shadow-lg" rows={2}/><textarea value={contactInfo.desc} onChange={(e) => setContactInfo({...contactInfo, desc: e.target.value})} className="w-full bg-white/90 text-black text-lg p-2 rounded shadow-lg" rows={3}/></> : <><h2 className="text-3xl md:text-4xl font-bold mb-4 whitespace-pre-line">{contactInfo.title}</h2><p className="text-blue-200 text-lg whitespace-pre-line">{contactInfo.desc}</p></>}</div>
               <div className="space-y-6">{[{icon: Phone, label: "전화", key: "phone"}, {icon: Mail, label: "이메일", key: "email"}, {icon: MapPin, label: "주소", key: "address"}].map((c, i) => (<div key={i} className="flex items-center gap-5"><div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20"><c.icon className="w-6 h-6 text-yellow-400" /></div><div className="w-full"><div className="text-sm text-blue-300 mb-1">{c.label}</div>{isEditMode ? <input type="text" value={contactInfo[c.key as keyof typeof contactInfo]} onChange={(e) => setContactInfo({...contactInfo, [c.key]: e.target.value})} className="bg-white/90 text-black font-bold p-1 rounded w-full shadow-lg"/> : <div className="text-lg font-bold">{contactInfo[c.key as keyof typeof contactInfo]}</div>}</div></div>))}</div>
             </div>
             <div className="bg-white rounded-2xl p-8 shadow-2xl"><h3 className="text-2xl font-bold mb-6 text-blue-950">무료 상담 신청</h3><form className="space-y-5" onSubmit={handleConsultSubmit}><div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-bold text-gray-700 mb-1">성함</label><input name="name" required className="w-full px-4 py-3 rounded-lg border bg-gray-50"/></div><div><label className="block text-sm font-bold text-gray-700 mb-1">연락처</label><input name="contact" required className="w-full px-4 py-3 rounded-lg border bg-gray-50"/></div></div><div><label className="block text-sm font-bold text-gray-700 mb-1">문의 내용</label><textarea name="content" required rows={4} className="w-full px-4 py-3 rounded-lg border resize-none bg-gray-50"></textarea></div><button className="w-full py-4 bg-yellow-500 text-blue-900 font-bold rounded-lg flex items-center justify-center gap-2">상담 신청하기 <Send size={20}/></button></form></div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 text-sm">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-center mb-8">
             <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">{companyName}</h2>
             <div className="flex gap-6"><span className="hover:text-white transition cursor-pointer">개인정보처리방침</span><span className="hover:text-white transition cursor-pointer">이용약관</span></div>
           </div>
           <hr className="border-slate-800 mb-8" />
           <div className="flex flex-col md:flex-row justify-between gap-6">
             <div className="space-y-2"><p className="font-bold text-white">{contactInfo.address}</p><p className="text-slate-400">T. {contactInfo.phone} | E. {contactInfo.email}</p></div>
             <div className="text-slate-500 text-xs md:text-right"><p>대표: 이형우 | 사업자등록번호: 000-00-00000</p><p className="mt-1">© 2025 {companyName}. All rights reserved.</p></div>
           </div>
        </div>
        
        {/* 우측 하단 툴바 */}
        <div className="fixed bottom-6 right-6 flex gap-3 z-50">
          {isEditMode && (<><button onClick={() => setActiveTab('messages')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg hover:bg-blue-700 transition"><MessageSquare size={16}/> 상담</button><button onClick={handleSaveChanges} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow-lg hover:bg-green-700 transition animate-bounce"><Save size={16}/> 저장</button></>)}
          <button onClick={toggleEditMode} className={`p-3 rounded-full shadow-xl transition-all hover:scale-110 ${isEditMode ? 'bg-red-500 text-white' : 'bg-slate-800/80 backdrop-blur text-white hover:bg-slate-900'}`}>{isEditMode ? <Lock size={20} /> : <Settings size={20} />}</button>
        </div>
      </footer>
    </div>
  );
}