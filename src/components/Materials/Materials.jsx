import { motion } from 'framer-motion';
import { FaFilePdf, FaDownload } from 'react-icons/fa';

const Materials = () => {
  const materials = [
    { id: 1, title: 'ملزمة النحو - الجزء الأول', size: '٥ ميجابايت' },
    { id: 2, title: 'ملزمة البلاغة - الجزء الأول', size: '٤ ميجابايت' },
    { id: 3, title: 'ملزمة الإملاء - الجزء الأول', size: '٣ ميجابايت' },
  ];

  return (
    <section id="materials" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">الملازم</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-4">
          {materials.map((material, index) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl glass-effect glow-border group"
            >
              <div className="flex items-center gap-3">
                <FaFilePdf className="text-2xl text-red-500" />
                <div>
                  <h4 className="font-semibold">{material.title}</h4>
                  <span className="text-xs text-gray-500">{material.size}</span>
                </div>
              </div>
              <button className="p-2 rounded-full hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                <FaDownload className="text-accent" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Materials;