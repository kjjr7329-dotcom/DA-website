import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';

const Footer: React.FC = () => {
  const { companyInfo } = useApp();
  
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
          
          {/* Company Identity & Info */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-white mb-3">{companyInfo.name}</h2>
            <div className="text-sm text-slate-500 space-y-1 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
              <span>{companyInfo.address}</span>
              <span className="hidden md:inline text-slate-700">|</span>
              <span>T. {companyInfo.phone}</span>
              <span className="hidden md:inline text-slate-700">|</span>
              <span>E. {companyInfo.email}</span>
            </div>
          </div>

          {/* Utility Links */}
          <div className="flex items-center space-x-6 text-xs font-medium text-slate-600">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">개인정보처리방침</span>
            <NavLink to="/admin" className="hover:text-slate-300 transition-colors">관리자 로그인</NavLink>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800/50 text-center md:text-left text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;