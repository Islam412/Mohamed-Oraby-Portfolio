import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaFacebook, FaInstagram, FaYoutube, FaStar, FaBookOpen, FaUsers } from 'react-icons/fa';

const Hero = () => {
  const socialLinks = [
    { icon: FaWhatsapp, url: 'https://wa.me/201140739030', color: '#25D366', label: 'واتساب' },
    { icon: FaPhone, url: 'tel:+201140739030', color: '#c9a84c', label: 'اتصال' },
    { icon: FaFacebook, url: 'https://www.facebook.com/share/18pihwFGkc/', color: '#1877F2', label: 'فيسبوك' },
    { icon: FaInstagram, url: 'https://www.instagram.com/mohamedahmedebrahiem', color: '#E4405F', label: 'انستجرام' },
    { icon: FaYoutube, url: '#', color: '#FF0000', label: 'يوتيوب' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pattern-bg">
      {/* تأثيرات ضوئية عربية */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-[900px] h-[900px] bg-gold/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-gold/3 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gold/2 rounded-full blur-2xl" />
      
      {/* زخارف عربية */}
      <div className="absolute top-20 right-20 text-gold/10 text-4xl font-amiri">﷽</div>
      <div className="absolute bottom-20 left-20 text-gold/10 text-4xl font-amiri">ﷺ</div>

      <div className="container mx-auto px-4 md:px-8 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* المحتوى */}
          <div className="flex-1 text-right">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-3 px-6 py-2.5 border border-gold/30 rounded-full text-gold text-sm font-semibold bg-gold/5 backdrop-blur-sm animate-glow">
                <FaStar className="text-xs" />
                مرحباً بك في عالم اللغة العربية
                <FaStar className="text-xs" />
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4"
            >
              <h1 className="hero-title gradient-premium">
                محمد عرلبي
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-3xl text-gold font-semibold mb-4 calligraphy"
            >
              مدرس لغة عربية للمرحلة الإعدادية
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-textSecondary max-w-xl mr-auto mb-10 leading-relaxed text-base md:text-lg"
            >
              أهلاً بكم في موقعي التعليمي. هنا ستجدون كل ما تحتاجونه لإتقان اللغة العربية من شروحات، ملازم، وفيديوهات تعليمية متميزة.
            </motion.p>

            {/* أزرار التواصل */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn flex items-center gap-2.5 px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white"
                >
                  <social.icon className="text-lg" style={{ color: social.color }} />
                  <span>{social.label}</span>
                </a>
              ))}
            </motion.div>

            {/* الإحصائيات */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-8"
            >
              <div className="stat-card text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <FaUsers className="text-gold/50" />
                  <span className="text-3xl font-bold gradient-premium">+٥٠٠</span>
                </div>
                <div className="text-sm text-textMuted">طالب</div>
              </div>
              <div className="stat-card text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <FaBookOpen className="text-gold/50" />
                  <span className="text-3xl font-bold gradient-premium">+١٠٠</span>
                </div>
                <div className="text-sm text-textMuted">فيديو شرح</div>
              </div>
              <div className="stat-card text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <FaStar className="text-gold/50" />
                  <span className="text-3xl font-bold gradient-premium">+٥</span>
                </div>
                <div className="text-sm text-textMuted">سنوات خبرة</div>
              </div>
            </motion.div>
          </div>

          {/* صورة البروفايل */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex justify-center lg:justify-start"
          >
            <div className="profile-ring group">
              <div className="absolute inset-0 rounded-full bg-gold/20 blur-3xl group-hover:bg-gold/30 transition-all duration-700" />
              
              <div className="relative w-80 h-80 md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-4 border-gold/30 group-hover:border-gold/60 transition-all duration-500 shadow-2xl shadow-gold/10">
                <img
                  src="https://ui-avatars.com/api/?name=محمد+عرلبي&size=400&background=c9a84c&color=fff&font-size=0.5&bold=true"
                  alt="محمد عرلبي"
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-all duration-700"
                />
                {/* Islamic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
              
              {/* حلقات زخرفية */}
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