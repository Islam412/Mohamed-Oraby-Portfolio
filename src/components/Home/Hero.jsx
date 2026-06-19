import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Hero = () => {
  const socialLinks = [
    { icon: FaWhatsapp, url: 'https://wa.me/201140739030', color: '#25D366', label: 'واتساب' },
    { icon: FaPhone, url: 'tel:+201140739030', color: '#c9a84c', label: 'اتصال' },
    { icon: FaFacebook, url: 'https://www.facebook.com/share/18pihwFGkc/', color: '#1877F2', label: 'فيسبوك' },
    { icon: FaInstagram, url: 'https://www.instagram.com/mohamedahmedebrahiem', color: '#E4405F', label: 'انستجرام' },
    { icon: FaYoutube, url: '#', color: '#FF0000', label: 'يوتيوب' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-accent/3 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-right">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 border border-accent/30 rounded-full text-accent text-sm mb-4 animate-glow">
                مرحباً بك في عالم اللغة العربية
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              <span className="gradient-text">محمد عرلبي</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-2"
            >
              مدرس لغة عربية للمرحلة الإعدادية
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 max-w-xl mr-auto mb-8 leading-relaxed"
            >
              أهلاً بكم في موقعي التعليمي. هنا ستجدون كل ما تحتاجونه لإتقان اللغة العربية من شروحات، ملازم، وفيديوهات تعليمية متميزة.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-2 px-4 py-2 rounded-full glass-effect hover:scale-105 transition-all duration-300"
                >
                  <social.icon className="text-xl transition-colors duration-300 group-hover:text-[#c9a84c]" />
                  <span className="text-sm">{social.label}</span>
                </a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-8"
            >
              <div>
                <div className="text-2xl font-bold gradient-text">+٥٠٠</div>
                <div className="text-xs text-gray-500">طالب</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">+١٠٠</div>
                <div className="text-xs text-gray-500">فيديو شرح</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">+٥</div>
                <div className="text-xs text-gray-500">سنوات خبرة</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex justify-center lg:justify-start"
          >
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-accent/20 blur-2xl group-hover:bg-accent/30 transition-all duration-500" />
              
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-accent/30 group-hover:border-accent/60 transition-all duration-500 bg-gradient-to-br from-accent/10 to-primary">
                <div className="w-full h-full flex items-center justify-center text-6xl text-accent/50">
                  👨‍🏫
                </div>
              </div>
              
              <div className="absolute -inset-4 rounded-full border border-accent/10 animate-spin-slow" />
              <div className="absolute -inset-8 rounded-full border border-accent/5 animate-spin-slow-reverse" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;