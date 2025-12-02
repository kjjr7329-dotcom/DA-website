import React, { useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Award, Users, ThumbsUp } from 'lucide-react';

const About: React.FC = () => {
  const { companyInfo } = useApp();

  useEffect(() => {
    document.title = `${companyInfo.name} | 회사소개`;
  }, [companyInfo.name]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header - Dark Hero Style */}
      <section className="bg-slate-900 text-white pt-24 pb-16 md:pt-32 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <img src="https://picsum.photos/id/433/1920/600" alt="Team meeting" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-900/40"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">회사소개</h1>
          <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            정직한 기술력으로 건축물의 가치를 높이는 파트너,<br/>
            {companyInfo.name}입니다.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Our Philosophy</span>
              <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mt-2 mb-6 leading-tight">
                "안전은 타협의 대상이 아닙니다."
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6">
                디에이기술사사무소는 2010년 설립 이래, 수백 건의 구조 설계 및 안전 진단 프로젝트를 성공적으로 수행해왔습니다.
                우리는 단순히 도면을 그리는 것이 아니라, 건축물이 직면할 수 있는 모든 물리적 위험을 예측하고 예방합니다.
              </p>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                클라이언트에게는 <strong>최적의 경제성</strong>을, 사용자에게는 <strong>절대적인 안전</strong>을 제공하는 것. 
                이것이 기술사로서 우리가 지키는 불변의 원칙입니다.
              </p>
            </div>
            <div className="relative px-4 md:px-0">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full z-0 hidden md:block"></div>
              <img 
                src="https://picsum.photos/id/1/800/600" 
                alt="Engineer working" 
                className="relative z-10 rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="py-12 md:py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="p-6">
              <div className="flex justify-center mb-4 text-blue-600">
                <Award size={48} />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">15+</h3>
              <p className="text-slate-600 font-medium">년의 업계 경력</p>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4 text-blue-600">
                <Users size={48} />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">500+</h3>
              <p className="text-slate-600 font-medium">완료된 프로젝트</p>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4 text-blue-600">
                <ThumbsUp size={48} />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">100%</h3>
              <p className="text-slate-600 font-medium">안전 사고율 Zero</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas Text Only */}
      <section className="py-16 md:py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10">우리의 전문성</h2>
           <p className="text-base md:text-lg text-slate-600 leading-7 md:leading-8">
             우리는 건축 구조 기술사(Professional Engineer) 자격을 보유한 전문가 집단입니다. <br className="hidden md:block"/>
             최신 내진 설계 기준(KDS 41)을 완벽히 숙지하며, MIDAS Gen 등 전문 해석 프로그램을 활용한 
             데이터 기반의 엔지니어링 서비스를 제공합니다. 복잡한 도심지 굴토 공사부터 초고층 빌딩까지, 
             어떤 난이도의 프로젝트도 해결할 수 있는 역량을 갖추고 있습니다.
           </p>
        </div>
      </section>
    </div>
  );
};

export default About;