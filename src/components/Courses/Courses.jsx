import { motion } from 'framer-motion';
import { FaBook, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';

const Courses = () => {
  const courses = [
    {
      title: 'النحو والصرف',
      description: 'قواعد اللغة العربية الأساسية والمتقدمة',
      icon: FaBook,
    },
    {
      title: 'البلاغة',
      description: 'أساليب البلاغة والبيان',
      icon: FaGraduationCap,
    },
    {
      title: 'الإملاء',
      description: 'قواعد الإملاء والكتابة الصحيحة',
      icon: FaChalkboardTeacher,
    },
  ];

  return (
    <section id="courses" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">الدورات التعليمية</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-2xl glass-effect glow-border text-center group"
            >
              <div className="text-4xl text-accent mb-4 inline-block group-hover:scale-110 transition-all duration-300">
                <course.icon />
              </div>
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-400">{course.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;