import React, { createContext, useContext, useState, useEffect } from 'react';
import { CompanyInfo, PortfolioItem, Inquiry, HeroContent, ServiceItem, AboutContent } from '../types';
import { 
  COMPANY_INFO as INITIAL_COMPANY_INFO, 
  PORTFOLIO_ITEMS as INITIAL_PORTFOLIO,
  HERO_CONTENT_DEFAULT,
  SERVICES_DEFAULT,
  ABOUT_CONTENT_DEFAULT
} from '../constants';

interface AppContextType {
  companyInfo: CompanyInfo;
  updateCompanyInfo: (info: CompanyInfo) => void;
  
  heroContent: HeroContent;
  updateHeroContent: (content: HeroContent) => void;

  aboutContent: AboutContent;
  updateAboutContent: (content: AboutContent) => void;

  services: ServiceItem[];
  updateServices: (services: ServiceItem[]) => void;

  portfolioItems: PortfolioItem[];
  addPortfolioItem: (item: PortfolioItem) => void;
  updatePortfolioItem: (item: PortfolioItem) => void;
  deletePortfolioItem: (id: string) => void;
  
  inquiries: Inquiry[];
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  deleteInquiry: (id: string) => void;

  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or constants
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    const saved = localStorage.getItem('da_company_info');
    return saved ? JSON.parse(saved) : INITIAL_COMPANY_INFO;
  });

  const [heroContent, setHeroContent] = useState<HeroContent>(() => {
    const saved = localStorage.getItem('da_hero_content');
    return saved ? JSON.parse(saved) : HERO_CONTENT_DEFAULT;
  });

  const [aboutContent, setAboutContent] = useState<AboutContent>(() => {
    const saved = localStorage.getItem('da_about_content');
    return saved ? JSON.parse(saved) : ABOUT_CONTENT_DEFAULT;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('da_services');
    return saved ? JSON.parse(saved) : SERVICES_DEFAULT;
  });

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem('da_portfolio');
    return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('da_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('da_auth') === 'true';
  });

  // Persist changes
  useEffect(() => localStorage.setItem('da_company_info', JSON.stringify(companyInfo)), [companyInfo]);
  useEffect(() => localStorage.setItem('da_hero_content', JSON.stringify(heroContent)), [heroContent]);
  useEffect(() => localStorage.setItem('da_about_content', JSON.stringify(aboutContent)), [aboutContent]);
  useEffect(() => localStorage.setItem('da_services', JSON.stringify(services)), [services]);
  useEffect(() => localStorage.setItem('da_portfolio', JSON.stringify(portfolioItems)), [portfolioItems]);
  useEffect(() => localStorage.setItem('da_inquiries', JSON.stringify(inquiries)), [inquiries]);
  useEffect(() => localStorage.setItem('da_auth', String(isAuthenticated)), [isAuthenticated]);

  // Actions
  const updateCompanyInfo = (info: CompanyInfo) => setCompanyInfo(info);
  const updateHeroContent = (content: HeroContent) => setHeroContent(content);
  const updateAboutContent = (content: AboutContent) => setAboutContent(content);
  const updateServices = (newServices: ServiceItem[]) => setServices(newServices);

  const addPortfolioItem = (item: PortfolioItem) => {
    setPortfolioItems(prev => [item, ...prev]);
  };

  const updatePortfolioItem = (updatedItem: PortfolioItem) => {
    setPortfolioItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const deletePortfolioItem = (id: string) => {
    setPortfolioItems(prev => prev.filter(item => item.id !== id));
  };

  const addInquiry = (data: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...data,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'new'
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(item => item.id !== id));
  };

  const login = (password: string) => {
    if (password === 'admin1234') { // Simple demo password
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AppContext.Provider value={{
      companyInfo, updateCompanyInfo,
      heroContent, updateHeroContent,
      aboutContent, updateAboutContent,
      services, updateServices,
      portfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem,
      inquiries, addInquiry, updateInquiryStatus, deleteInquiry,
      isAuthenticated, login, logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};