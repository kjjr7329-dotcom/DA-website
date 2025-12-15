import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminPanel from './pages/Admin/AdminPanel';
import { AppProvider } from './contexts/AppContext';

// ScrollToTop component to ensure pages start at top on navigation
const ScrollToTop = () => {
  const { pathname } = React.useMemo(() => window.location, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen font-sans text-slate-900 bg-white">
          <Routes>
            {/* Admin Routes - No Navbar/Footer usually, or custom one */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminPanel />} />
            
            {/* Public Routes */}
            <Route path="*" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </HashRouter>
    </AppProvider>
  );
};

export default App;