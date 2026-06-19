import { motion } from 'framer-motion';
import { 
  FaWhatsapp, FaPhone, FaFacebook, FaInstagram, FaYoutube, 
  FaStar, FaBookOpen, FaUsers 
} from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

const Hero = () => {
  const { theme, siteData } = useApp();
  const isDark = theme === 'dark';
  
  const hero = siteData.hero || {};
  const settings = siteData.settings || {};
  const socialLinks = settings.socialLinks || {};
  
  const socialButtons = [
    { icon: FaWhatsapp, url: socialLinks.whatsapp || 'https://wa.me/201140739030', color: '#25D366', label: 'واتساب' },
    { icon: FaPhone, url: socialLinks.phone || 'tel:+201140739030', color: '#c9a84c', label: 'اتصال' },
    { icon: FaFacebook, url: socialLinks.facebook || 'https://www.facebook.com/share/18pihwFGkc/', color: '#1877F2', label: 'فيسبوك' },
    { icon: FaInstagram, url: socialLinks.instagram || 'https://www.instagram.com/mohamedahmedebrahiem', color: '#E4405F', label: 'انستجرام' },
    { icon: FaYoutube, url: socialLinks.youtube || '#', color: '#FF0000', label: 'يوتيوب' },
  ];

  const heroStats = hero.stats || [
    { icon: FaUsers, value: '+٥٠٠', label: 'طالب' },
    { icon: FaBookOpen, value: '+١٠٠', label: 'فيديو شرح' },
    { icon: FaStar, value: '+٥', label: 'سنوات خبرة' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pattern-bg">
      <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl animate-pulse ${isDark ? 'bg-gold/5' : 'bg-gold/8'}`} />
      <div className={`absolute bottom-10 right-0 w-[600px] h-[600px] rounded-full blur-2xl ${isDark ? 'bg-gold/3' : 'bg-gold/6'}`} />
      <div className={`absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full blur-2xl ${isDark ? 'bg-gold/2' : 'bg-gold/5'}`} />
      
      <div className={`absolute top-20 right-20 text-4xl font-amiri ${isDark ? 'text-gold/10' : 'text-gold/15'}`}>﷽</div>
      <div className={`absolute bottom-20 left-20 text-4xl font-amiri ${isDark ? 'text-gold/10' : 'text-gold/15'}`}>ﷺ</div>

      <div className="container mx-auto px-4 md:px-8 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-right">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className={`inline-flex items-center gap-3 px-6 py-2.5 border border-gold/30 rounded-full text-gold text-sm font-semibold bg-gold/5 backdrop-blur-sm animate-glow ${
                isDark ? '' : 'bg-white/80 shadow-sm'
              }`}>
                <FaStar className="text-xs" />
                مرحباً بك في عالم اللغة العربية
                <FaStar className="text-xs" />
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hero-title gradient-premium mb-4"
            >
              {hero.title || 'محمد أحمد عرابى'}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-3xl text-gold font-semibold mb-4 calligraphy"
            >
              {hero.subtitle || 'مدرس لغة عربية للمرحلة الإعدادية'}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`text-theme-secondary max-w-xl mr-auto mb-10 leading-relaxed text-base md:text-lg`}
            >
              {hero.description || 'أهلاً بكم في موقعي التعليمي. هنا ستجدون كل ما تحتاجونه لإتقان اللغة العربية من شروحات، ملازم، وفيديوهات تعليمية متميزة.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              {socialButtons.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-btn flex items-center gap-2.5 px-5 py-2.5 text-sm font-medium ${
                    isDark 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-theme-secondary hover:text-theme-primary bg-white/80 hover:bg-white border-gold/20'
                  }`}
                >
                  <social.icon className="text-lg" style={{ color: social.color }} />
                  <span>{social.label}</span>
                </a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-8 flex-wrap"
            >
              {heroStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className={`stat-card text-center ${isDark ? '' : 'bg-white/90 border-gold/20 shadow-sm'}`}>
                    <div className="flex items-center justify-center gap-2 mb-1">
                      {IconComponent && <IconComponent className="text-gold/50" />}
                      <span className="text-3xl font-bold gradient-premium">{stat.value}</span>
                    </div>
                    <div className={`text-sm ${isDark ? 'text-textMuted' : 'text-theme-muted'}`}>{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex justify-center lg:justify-start"
          >
            <div className="profile-ring group">
              <div className={`absolute inset-0 rounded-full blur-3xl group-hover:bg-gold/30 transition-all duration-700 ${isDark ? 'bg-gold/20' : 'bg-gold/25'}`} />
              
              <div className={`relative w-80 h-80 md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-4 border-gold/30 group-hover:border-gold/60 transition-all duration-500 shadow-2xl shadow-gold/10 ${
                isDark ? '' : 'bg-white'
              }`}>
                <img
                  src="/assets/images/profile.jpg"
                  alt="محمد أحمد عرابى"
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-all duration-700"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=محمد+أحمد+عرابى&size=400&background=1a1a1a&color=c9a84c`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
              
              <div className="absolute -inset-4 rounded-full border border-gold/10 animate-spin-slow" />
              <div className="absolute -inset-8 rounded-full border border-gold/5 animate-spin-slow-reverse" />
              <div className="absolute -inset-12 rounded-full border border-gold/3 animate-spin-slow" style={{ animationDuration: '25s' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;