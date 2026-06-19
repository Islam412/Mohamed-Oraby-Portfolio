import { motion } from 'framer-motion';
import { FaBook, FaGraduationCap, FaChalkboardTeacher, FaStar, FaBookOpen, FaPenFancy } from 'react-icons/fa';

const Courses = () => {
  const courses = [
    {
      title: 'النحو والصرف',
      description: 'قواعد اللغة العربية الأساسية والمتقدمة',
      icon: FaBook,
      iconBg: 'from-amber-500/20 to-amber-600/10',
      borderColor: 'border-amber-500/30',
      hoverBorder: 'group-hover:border-amber-500/60',
      gradient: 'from-amber-400 to-amber-600',
    },
    {
      title: 'البلاغة',
      description: 'أساليب البلاغة والبيان وأسرار التعبير القرآني',
      icon: FaGraduationCap,
      iconBg: 'from-emerald-500/20 to-emerald-600/10',
      borderColor: 'border-emerald-500/30',
      hoverBorder: 'group-hover:border-emerald-500/60',
      gradient: 'from-emerald-400 to-emerald-600',
    },
    {
      title: 'الإملاء والخط',
      description: 'قواعد الإملاء والكتابة الصحيحة وتحسين الخط العربي',
      icon: FaPenFancy,
      iconBg: 'from-purple-500/20 to-purple-600/10',
      borderColor: 'border-purple-500/30',
      hoverBorder: 'group-hover:border-purple-500/60',
      gradient: 'from-purple-400 to-purple-600',
    },
  ];

  return (
    <section id="courses" className="py-24 relative overflow-hidden pattern-bg">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary/50 to-primary" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-gold/3 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-20 w-80 h-80 bg-gold/3 rounded-full blur-3xl" />
      
      {/* زخارف عربية */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-gold/5 text-4xl font-amiri">﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾</div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-16 h-px bg-gradient-to-l from-gold/30 to-transparent" />
            <FaBookOpen className="text-gold text-2xl" />
            <div className="w-16 h-px bg-gradient-to-r from-gold/30 to-transparent" />
          </div>
          <h2 className="heading-primary text-4xl md:text-5xl font-bold gradient-premium mb-3 calligraphy">
            الدورات التعليمية
          </h2>
          <p className="text-textSecondary text-lg max-w-2xl mx-auto">
            نقدم لك أفضل الدورات في اللغة العربية لتتقنها بكل سهولة ويسر
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full mt-4" />
        </motion.div>

        {/* بطاقات الدورات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Card Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/20 via-transparent to-gold/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Card Content */}
              <div className={`relative p-8 rounded-2xl glass-premium border ${course.borderColor} ${course.hoverBorder} transition-all duration-500 overflow-hidden`}>
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${course.iconBg} opacity-0 group-hover:opacity-100 transition-all duration-700`} />
                
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gold/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Icon Container */}
                <div className="relative">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${course.iconBg} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-gold/10`}>
                    <course.icon className="text-4xl text-gold group-hover:text-goldLight transition-all duration-300" />
                  </div>
                  
                  {/* Decorative Ring */}
                  <div className="absolute -inset-1 rounded-2xl border border-gold/5 group-hover:border-gold/20 transition-all duration-500 animate-spin-slow" style={{ animationDuration: '15s' }} />
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold text-center mb-3 group-hover:text-gold transition-all duration-300 bg-gradient-to-r ${course.gradient} bg-clip-text text-transparent`}>
                  {course.title}
                </h3>
                
                {/* Description */}
                <p className="text-textSecondary text-center leading-relaxed group-hover:text-textPrimary transition-all duration-300">
                  {course.description}
                </p>

                {/* Decorative Line */}
                <div className="w-12 h-0.5 bg-gradient-to-r from-gold/0 via-gold/50 to-gold/0 mx-auto mt-4 group-hover:w-20 transition-all duration-500" />

                {/* Hover Bottom Border */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-all duration-500" />

                {/* Floating Stars */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <FaStar className="text-gold/20 text-xs animate-pulse" />
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <FaStar className="text-gold/20 text-xs animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-premium border border-gold/10">
            <FaStar className="text-gold text-sm animate-pulse" />
            <span className="text-textSecondary text-sm">
              انضم إلينا وابدأ رحلتك في تعلم اللغة العربية
            </span>
            <FaStar className="text-gold text-sm animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;