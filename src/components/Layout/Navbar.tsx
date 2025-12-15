import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 스크롤하면 메뉴바 모양이 살짝 바뀌는 효과
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-primary shadow-lg py-2' : 'bg-primary/90 py-4'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          
          {/* 로고 영역 */}
          <div className="flex items-center space-x-2">
            {/* 안전모 아이콘 */}
            <div className="w-10 h-10 bg-secondary rounded flex items-center justify-center">
               <span className="text-primary font-bold text-xl">DA</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-xl tracking-wide">DA 기술사사무소</span>
              <span className="text-gray-300 text-xs tracking-widest">Professional Engineer Office</span>
            </div>
          </div>

          {/* PC 버전 메뉴 */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-200 hover:text-secondary font-medium transition-colors">홈</a>
            <a href="#about" className="text-gray-200 hover:text-secondary font-medium transition-colors">회사소개</a>
            <a href="#services" className="text-gray-200 hover:text-secondary font-medium transition-colors">기술소개</a>
            <a href="#portfolio" className="text-gray-200 hover:text-secondary font-medium transition-colors">실적</a>
            <a href="#contact" className="px-6 py-2 bg-secondary text-primary font-bold rounded hover:bg-yellow-300 transition-colors">
              상담 신청
            </a>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* 모바일 드롭다운 메뉴 */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4 mt-4">
              <a href="#" className="text-gray-200 hover:text-secondary">홈</a>
              <a href="#about" className="text-gray-200 hover:text-secondary">회사소개</a>
              <a href="#services" className="text-gray-200 hover:text-secondary">기술소개</a>
              <a href="#portfolio" className="text-gray-200 hover:text-secondary">실적</a>
              <a href="#contact" className="text-secondary font-bold">상담 신청</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}