import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaHome, FaUser, FaBook, FaVideo, FaFilePdf, FaImages, FaClipboardList } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
    <nav className={`fixed top-0 right-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'glass-effect py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <span className="text-2xl font-bold gradient-text">محمد عرلبي</span>
          <span className="text-xs text-gray-400 hidden sm:inline">| مدرس لغة عربية</span>
        </motion.div>

        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-sm transition-all duration-300 hover:text-accent relative ${
                activeSection === item.id ? 'text-accent' : 'text-gray-300'
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="flex items-center gap-1">
                <item.icon className="text-xs" />
                {item.label}
              </span>
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 right-0 w-full h-0.5 bg-accent"
                  transition={{ duration: 0.3 }}
                />
              )}
            </a>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white text-2xl"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className={`lg:hidden glass-effect overflow-hidden ${isOpen ? 'block' : 'hidden'}`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-sm transition-all duration-300 hover:text-accent flex items-center gap-3 p-2 rounded-lg ${
                activeSection === item.id ? 'text-accent bg-accent/10' : 'text-gray-300'
              }`}
              onClick={() => {
                setIsOpen(false);
                setActiveSection(item.id);
              }}
            >
              <item.icon className="text-accent" />
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;