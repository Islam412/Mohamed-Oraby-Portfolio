import { FaWhatsapp, FaPhone, FaFacebook, FaInstagram, FaYoutube, FaCode, FaHeart, FaBook, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const Footer = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaWhatsapp, url: 'https://wa.me/201140739030', label: 'واتساب', color: '#25D366' },
    { icon: FaPhone, url: 'tel:+201140739030', label: 'اتصال', color: '#c9a84c' },
    { icon: FaFacebook, url: 'https://www.facebook.com/share/18pihwFGkc/', label: 'فيسبوك', color: '#1877F2' },
    { icon: FaInstagram, url: 'https://www.instagram.com/mohamedahmedebrahiem', label: 'انستجرام', color: '#E4405F' },
    { icon: FaYoutube, url: '#', label: 'يوتيوب', color: '#FF0000' },
  ];

  const quickLinks = [
    { label: 'الرئيسية', href: '#home' },
    { label: 'عن المدرس', href: '#about' },
    { label: 'الدورات', href: '#courses' },
    { label: 'الفيديوهات', href: '#videos' },
    { label: 'الملازم', href: '#materials' },
    { label: 'المعرض', href: '#gallery' },
    { label: 'الامتحانات', href: '#exams' },
  ];

  return (
    <footer className="relative overflow-hidden">
      {isDark ? (
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary" />
      ) : (
        <div className="absolute inset-0 bg-white" />
      )}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent`} />
      
      <div className={`absolute bottom-0 left-0 right-0 h-32 ${isDark ? 'bg-gold/5' : 'bg-gold/5'}`} />
      <div className={`absolute top-20 right-20 w-40 h-40 rounded-full blur-2xl ${isDark ? 'bg-gold/3' : 'bg-gold/5'}`} />
      <div className={`absolute bottom-20 left-20 w-40 h-40 rounded-full blur-2xl ${isDark ? 'bg-gold/3' : 'bg-gold/5'}`} />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 ${isDark ? 'border-b border-white/5' : 'border-b border-gold/10'}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-right"
          >
            <h4 className="text-2xl font-bold gradient-premium mb-3 calligraphy">
              محمد أحمد عرابى
            </h4>
            <p className={`text-sm mb-2 ${isDark ? 'text-textSecondary' : 'text-theme-secondary'}`}>
              مدرس لغة عربية للمرحلة الإعدادية
            </p>
            <div className={`flex items-center justify-center md:justify-start gap-2 text-xs ${isDark ? 'text-textMuted' : 'text-theme-muted'}`}>
              <FaBook className="text-gold/50" />
              <span>خبرة ٥ سنوات في تدريس اللغة العربية</span>
            </div>
            <div className={`flex items-center justify-center md:justify-start gap-2 text-xs ${isDark ? 'text-textMuted' : 'text-theme-muted'} mt-1`}>
              <FaClock className="text-gold/50" />
              <span>دروس يومية - متابعة مستمرة</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center md:text-right"
          >
            <h5 className={`text-sm font-bold text-gold mb-4`}>روابط سريعة</h5>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className={`text-sm transition-all duration-300 hover:pr-2 inline-block ${
                      isDark ? 'text-textMuted hover:text-gold' : 'text-theme-muted hover:text-gold'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <h5 className={`text-sm font-bold text-gold mb-4`}>تواصل معنا</h5>
            <div className="space-y-3">
              <a
                href="https://wa.me/201140739030"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center md:justify-start gap-3 text-sm transition-all duration-300 group ${
                  isDark ? 'text-textMuted hover:text-gold' : 'text-theme-muted hover:text-gold'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-all duration-300">
                  <FaWhatsapp className="text-gold" />
                </div>
                <span>واتساب</span>
              </a>
              <a
                href="tel:+201140739030"
                className={`flex items-center justify-center md:justify-start gap-3 text-sm transition-all duration-300 group ${
                  isDark ? 'text-textMuted hover:text-gold' : 'text-theme-muted hover:text-gold'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-all duration-300">
                  <FaPhone className="text-gold" />
                </div>
                <span>اتصال: +20 11 4073 9030</span>
              </a>
              <div className={`flex items-center justify-center md:justify-start gap-3 text-sm ${isDark ? 'text-textMuted' : 'text-theme-muted'}`}>
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                  <FaEnvelope className="text-gold" />
                </div>
                <span>تواصل عبر وسائل التواصل</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <h5 className={`text-sm font-bold text-gold mb-4`}>تابعنا</h5>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  aria-label={social.label}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border border-white/5 hover:border-gold/30 transition-all duration-300 group-hover:scale-110 ${
                    isDark ? 'glass-premium' : 'bg-white shadow-md hover:shadow-lg'
                  }`}>
                    <social.icon
                      className="text-xl transition-all duration-300 group-hover:text-gold"
                      style={{ color: groupHover => groupHover ? '#c9a84c' : 'currentColor' }}
                    />
                  </div>
                  <span className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap ${
                    isDark ? 'text-textMuted' : 'text-theme-muted'
                  }`}>
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className={`text-xs text-center md:text-right ${isDark ? 'text-textMuted' : 'text-theme-muted'}`}>
            <span> جميع الحقوق محفوظة ©</span>
            <span>محمد أحمد عرابى</span>
            <span className="hidden md:inline mx-2">{currentYear} •</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className={`${isDark ? 'text-textMuted' : 'text-theme-muted'}`}>تم التطوير بواسطة</span>
            <a
              href="https://islam-portfolio-phi.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-gold hover:text-goldLight transition-all duration-300"
            >
              <FaCode className="text-xs group-hover:rotate-12 transition-all duration-300" />
              <span className="font-semibold">إسلام حمدى</span>
              <FaHeart className="text-[10px] text-gold/50 group-hover:text-gold group-hover:scale-110 transition-all duration-300 animate-pulse" />
            </a>
          </div>
        </div>

        <div className="relative h-0.5 w-full">
          <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent`} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;