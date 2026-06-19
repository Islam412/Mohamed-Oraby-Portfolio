import { useState } from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Layout/Navbar';
import ParticlesBackground from './components/Layout/Particles';
import Hero from './components/Home/Hero';
import About from './components/About/About';
import Courses from './components/Courses/Courses';
import Videos from './components/Videos/Videos';
import Materials from './components/Materials/Materials';
import Gallery from './components/Gallery/Gallery';
import Exams from './components/Exams/Exams';
import Footer from './components/Layout/Footer';
import AdminDashboard from './admin/AdminDashboard';
import AdminLogin from './admin/AdminLogin';
import { FaCog } from 'react-icons/fa';
import './styles/globals.css';

function App() {
  const { isAdmin, theme } = useApp();
  const isDark = theme === 'dark';
  const [view, setView] = useState('site');

  if (view === 'admin' && isAdmin) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-dark-primary' : 'bg-light-primary'}`}>
        <AdminDashboard onBack={() => setView('site')} />
      </div>
    );
  }

  if (view === 'login') {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-dark-primary' : 'bg-light-primary'}`}>
        <AdminLogin 
          onSuccess={() => setView('admin')} 
          onCancel={() => setView('site')}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-primary' : 'bg-light-primary'} text-theme-primary relative transition-colors duration-500`}>
      <ParticlesBackground />
      <Navbar />
      <Hero />
      <About />
      <Courses />
      <Videos />
      <Materials />
      <Gallery />
      <Exams />
      <Footer />
      
      {/* زر لوحة التحكم - تصميم بارز */}
      <button
        onClick={() => setView('login')}
        className="fixed bottom-6 left-6 z-50 group flex items-center gap-3 px-5 py-3 rounded-2xl bg-gold/10 backdrop-blur-xl border border-gold/30 hover:border-gold/60 text-gold hover:text-goldLight transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gold/20"
      >
        <FaCog className="text-lg group-hover:rotate-90 transition-all duration-500" />
        <span className="text-sm font-bold">لوحة التحكم</span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full animate-pulse" />
      </button>
    </div>
  );
}

export default App;