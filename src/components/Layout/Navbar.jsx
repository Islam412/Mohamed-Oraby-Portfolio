import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, FaTimes, FaHome, FaUser, FaBook, FaVideo, 
  FaFilePdf, FaImages, FaClipboardList, FaGraduationCap,
  FaStar, FaMoon, FaSun
} from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // تحديث القسم النشط بناءً على التمرير
      const sections = ['home', 'about', 'courses', 'videos', 'materials', 'gallery', 'exams'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: FaHome },
    { id: 'about', label: 'عن المدرس', icon: FaUser },
    { id: 'courses', label: 'الدورات', icon: FaBook },
    { id: 'videos', label: 'الفيديوهات', icon: FaVideo },
    { id: 'materials', label: 'الملازم', icon: FaFilePdf },
    { id: 'gallery', label: 'المعرض', icon: FaImages },
    { id: 'exams', label: 'الامتحانات', icon: FaClipboardList },
  ];

  return (
    <nav 
      className={`fixed top-0 right-0 w-full z-50 transition-all duration-700 ${
        scrolled 
          ? 'glass-premium py-3 shadow-2xl shadow-black/20 border-b border-gold/10' 
          : 'bg-transparent py-5'
      }`}
    >
      {/* شريط زخرفي علوي */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-700 ${
        scrolled ? 'opacity-100' : 'opacity-0'
      }`} />

      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveSection('home');
          }}
        >
          {/* أيقونة الدوراد */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-all duration-500 group-hover:scale-110">
              <FaGraduationCap className="text-gold text-lg" />
            </div>
            <div className="absolute -inset-1 rounded-full border border-gold/20 group-hover:border-gold/40 transition-all duration-500 animate-pulse" />
          </div>
          
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold gradient-premium leading-none">
              محمد أحمد عرابى
            </span>
            <span className="text-[10px] text-textMuted hidden sm:block">
              مدرس لغة عربية
            </span>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                activeSection === item.id 
                  ? 'text-gold bg-gold/10' 
                  : 'text-textSecondary hover:text-white hover:bg-white/5'
              }`}
              onClick={() => {
                setActiveSection(item.id);
                setIsOpen(false);
              }}
            >
              <span className="flex items-center gap-2">
                <item.icon className={`text-sm transition-all duration-300 ${
                  activeSection === item.id ? 'text-gold' : 'text-textMuted group-hover:text-gold'
                }`} />
                {item.label}
              </span>
              
              {/* Active Indicator */}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gold rounded-full"
                  transition={{ duration: 0.3 }}
                />
              )}
              
              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </motion.a>
          ))}

          {/* زر التبديل بين الوضعين */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-xl text-textMuted hover:text-gold hover:bg-gold/10 transition-all duration-300"
          >
            {isDark ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-10 h-10 rounded-xl glass-premium flex items-center justify-center text-white border border-white/10 hover:border-gold/30 transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <FaTimes className="text-gold" /> : <FaBars />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:hidden overflow-hidden glass-premium border-t border-gold/10"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                      activeSection === item.id 
                        ? 'bg-gold/10 text-gold border border-gold/20' 
                        : 'text-textSecondary hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                    onClick={() => {
                      setIsOpen(false);
                      setActiveSection(item.id);
                    }}
                  >
                    <item.icon className={`text-sm ${
                      activeSection === item.id ? 'text-gold' : 'text-textMuted'
                    }`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.a>
                ))}
              </div>
              
              {/* قسم التواصل في الموبايل */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-textMuted">تواصل سريع:</span>
                  <div className="flex gap-2">
                    <a 
                      href="https://wa.me/201140739030" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all duration-300"
                    >
                      <FaWhatsapp className="text-sm" />
                    </a>
                    <a 
                      href="tel:+201140739030" 
                      className="p-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-300"
                    >
                      <FaPhone className="text-sm" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;