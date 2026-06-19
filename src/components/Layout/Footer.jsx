import { FaWhatsapp, FaPhone, FaFacebook, FaInstagram, FaYoutube, FaCode, FaHeart, FaBook, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
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
      {/* خلفية متحركة */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      {/* زخارف */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gold/5 to-transparent" />
      <div className="absolute top-20 right-20 w-40 h-40 bg-gold/3 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gold/3 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* القسم العلوي - شبكة المعلومات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-white/5">
          {/* العمود 1: معلومات المدرس */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-right"
          >
            <h4 className="text-2xl font-bold gradient-premium mb-3 calligraphy">
              محمد أحمد عرابى
            </h4>
            <p className="text-sm text-textSecondary mb-2">
              مدرس لغة عربية للمرحلة الإعدادية
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-textMuted">
              <FaBook className="text-gold/50" />
              <span>خبرة ٥ سنوات في تدريس اللغة العربية</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-textMuted mt-1">
              <FaClock className="text-gold/50" />
              <span>دروس يومية - متابعة مستمرة</span>
            </div>
          </motion.div>

          {/* العمود 2: روابط سريعة */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center md:text-right"
          >
            <h5 className="text-sm font-bold text-gold mb-4">روابط سريعة</h5>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-textMuted hover:text-gold transition-all duration-300 hover:pr-2 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* العمود 3: التواصل */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <h5 className="text-sm font-bold text-gold mb-4">تواصل معنا</h5>
            <div className="space-y-3">
              <a
                href="https://wa.me/201140739030"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-3 text-sm text-textMuted hover:text-gold transition-all duration-300 group"
              >
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-all duration-300">
                  <FaWhatsapp className="text-gold" />
                </div>
                <span>واتساب</span>
              </a>
              <a
                href="tel:+201140739030"
                className="flex items-center justify-center md:justify-start gap-3 text-sm text-textMuted hover:text-gold transition-all duration-300 group"
              >
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-all duration-300">
                  <FaPhone className="text-gold" />
                </div>
                <span>اتصال: +20 11 4073 9030</span>
              </a>
              <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-textMuted">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                  <FaEnvelope className="text-gold" />
                </div>
                <span>تواصل عبر وسائل التواصل</span>
              </div>
            </div>
          </motion.div>

          {/* العمود 4: وسائل التواصل الاجتماعي */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <h5 className="text-sm font-bold text-gold mb-4">تابعنا</h5>
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
                  <div className="w-12 h-12 rounded-full glass-premium flex items-center justify-center border border-white/5 hover:border-gold/30 transition-all duration-300 group-hover:scale-110">
                    <social.icon
                      className="text-xl transition-all duration-300 group-hover:text-gold"
                      style={{ color: groupHover => groupHover ? '#c9a84c' : 'currentColor' }}
                    />
                  </div>
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] text-textMuted opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* القسم السفلي - حقوق النشر والمطور */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-textMuted text-center md:text-right">
            <span>  جميع الحقوق محفوظة ©</span>
            <span>محمد أحمد عرابى</span>
            <span className="hidden md:inline mx-2">{currentYear} •</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-textMuted">تم التطوير بواسطة</span>
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

        {/* شريط زخرفي سفلي */}
        <div className="relative h-0.5 w-full">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;