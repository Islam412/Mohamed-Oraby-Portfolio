import { motion } from 'framer-motion';
import { 
  FaGraduationCap, FaChalkboardTeacher, FaCertificate, 
  FaAward, FaBook, FaQuran, FaUser 
} from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { useApp } from '../../context/AppContext';

const About = () => {
  const { theme, siteData } = useApp();
  const isDark = theme === 'dark';
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const about = siteData.about || {};
  const profileImage = about.profileImage || 'https://ui-avatars.com/api/?name=محمد+أحمد+عرابى&size=400&background=1a1a1a&color=c9a84c';
  
  // إحصائيات المدرس من السياق
  const stats = about.stats || [
    { icon: FaGraduationCap, label: 'المؤهل', value: 'ليسانس آداب - قسم اللغة العربية' },
    { icon: FaChalkboardTeacher, label: 'الخبرة', value: '٥ سنوات في تدريس المرحلة الإعدادية' },
    { icon: FaCertificate, label: 'الشهادات', value: 'دبلوم تربوي - متخصص في المناهج' },
    { icon: FaAward, label: 'الإنجازات', value: 'حاصل على جائزة أفضل معلم لعام ٢٠٢٤' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden pattern-bg">
      {isDark ? (
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary/50 to-primary" />
      ) : (
        <div className="absolute inset-0 bg-white" />
      )}
      
      <div className={`absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-gold/3' : 'bg-gold/5'}`} />
      <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-gold/3' : 'bg-gold/5'}`} />
      
      <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 text-6xl font-amiri ${isDark ? 'text-gold/5' : 'text-gold/10'}`}>
        بسم الله الرحمن الرحيم
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-16 h-px bg-gradient-to-l from-gold/30 to-transparent" />
            <FaBook className="text-gold text-2xl" />
            <div className="w-16 h-px bg-gradient-to-r from-gold/30 to-transparent" />
          </div>
          <h2 className="heading-primary text-4xl md:text-5xl font-bold gradient-premium mb-3 calligraphy">
            عن المدرس
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="col-span-2 rounded-2xl overflow-hidden gold-border relative group">
              <img
                src={profileImage}
                alt={about.name || 'المدرس'}
                className="w-full h-64 object-cover group-hover:scale-105 transition-all duration-500"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(about.name || 'محمد أحمد عرابى')}&size=600&background=1a1a1a&color=c9a84c`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4">
                <span className="text-gold font-semibold text-sm">{about.title || 'مدرس لغة عربية'}</span>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden gold-border relative">
              <img
                src="https://ui-avatars.com/api/?name=تدريس+النحو&size=400&background=1a1a1a&color=c9a84c&font-size=0.3"
                alt="تدريس النحو"
                className="w-full h-48 object-cover hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-all duration-300 flex items-end p-3">
                <span className="text-xs text-gold font-semibold">تدريس النحو</span>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden gold-border relative">
              <img
                src="https://ui-avatars.com/api/?name=اللغة+العربية&size=400&background=1a1a1a&color=c9a84c&font-size=0.3"
                alt="اللغة العربية"
                className="w-full h-48 object-cover hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-all duration-300 flex items-end p-3">
                <span className="text-xs text-gold font-semibold">اللغة العربية</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-right"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaQuran className="text-gold text-2xl" />
              <h3 className="heading-secondary text-3xl md:text-4xl font-bold calligraphy text-theme-primary">
                {about.name || 'محمد أحمد عرابى'}
              </h3>
            </div>
            <p className="text-theme-secondary text-base md:text-lg leading-relaxed mb-8">
              {about.description || 'معلم لغة عربية متخصص في تدريس المرحلة الإعدادية. أؤمن بأن اللغة العربية هي هويتنا ووسيلة التواصل الحضاري، وأسعى دائماً لتقديم محتوى تعليمي متميز يجمع بين الأصالة والمعاصرة.'}
            </p>

            <div className="space-y-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon || FaUser;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                      isDark 
                        ? 'glass-premium group' 
                        : 'bg-white/90 border-gold/20 shadow-sm hover:shadow-md group'
                    }`}
                  >
                    <div className="p-3 rounded-lg bg-gold/10 group-hover:bg-gold/20 transition-all duration-300">
                      <IconComponent className="text-2xl text-gold" />
                    </div>
                    <div>
                      <div className={`text-sm ${isDark ? 'text-textMuted' : 'text-theme-muted'}`}>
                        {stat.label}
                      </div>
                      <div className="font-semibold text-theme-primary">{stat.value}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;