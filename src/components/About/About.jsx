import { motion } from 'framer-motion';
import { FaGraduationCap, FaChalkboardTeacher, FaCertificate, FaAward } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { icon: FaGraduationCap, label: 'المؤهل', value: 'ليسانس آداب - قسم اللغة العربية' },
    { icon: FaChalkboardTeacher, label: 'الخبرة', value: '٥ سنوات في تدريس المرحلة الإعدادية' },
    { icon: FaCertificate, label: 'الشهادات', value: 'دبلوم تربوي - متخصص في المناهج' },
    { icon: FaAward, label: 'الإنجازات', value: 'حاصل على جائزة أفضل معلم لعام ٢٠٢٤' },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary/50 to-primary" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">عن المدرس</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="col-span-2 rounded-2xl overflow-hidden glow-border">
              <img
                src="/assets/images/teacher-1.jpg"
                alt="المدرس"
                className="w-full h-64 object-cover hover:scale-105 transition-all duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden glow-border">
              <img
                src="/assets/images/teacher-2.jpg"
                alt="المدرس"
                className="w-full h-48 object-cover hover:scale-105 transition-all duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden glow-border">
              <img
                src="/assets/images/teacher-3.jpg"
                alt="المدرس"
                className="w-full h-48 object-cover hover:scale-105 transition-all duration-500"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-right"
          >
            <h3 className="text-2xl font-bold mb-4">محمد أحمد عرلبي</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              معلم لغة عربية متخصص في تدريس المرحلة الإعدادية. أؤمن بأن اللغة العربية هي هويتنا
              ووسيلة التواصل الحضاري، وأسعى دائماً لتقديم محتوى تعليمي متميز يجمع بين الأصالة
              والمعاصرة.
            </p>

            <div className="space-y-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl glass-effect hover:glow-border transition-all duration-300"
                >
                  <stat.icon className="text-2xl text-accent" />
                  <div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                    <div className="font-semibold">{stat.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;