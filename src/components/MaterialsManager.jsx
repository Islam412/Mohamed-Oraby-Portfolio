import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaFilePdf, FaDownload, FaBook, FaStar, FaSearch, 
  FaFileAlt, FaFile, FaFileArchive, FaCheckCircle,
  FaClock, FaEye
} from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

const Materials = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const materials = [
    { 
      id: 1, 
      title: 'ملزمة النحو - الجزء الأول', 
      size: '٥ ميجابايت',
      category: 'نحو',
      icon: FaFilePdf,
      color: 'from-red-500/20 to-red-600/10',
      borderColor: 'border-red-500/30',
      date: '٢٠٢٤-٠١-١٥',
      downloads: 250,
    },
    { 
      id: 2, 
      title: 'ملزمة النحو - الجزء الثاني', 
      size: '٦ ميجابايت',
      category: 'نحو',
      icon: FaFilePdf,
      color: 'from-red-500/20 to-red-600/10',
      borderColor: 'border-red-500/30',
      date: '٢٠٢٤-٠٢-٠١',
      downloads: 180,
    },
    { 
      id: 3, 
      title: 'ملزمة البلاغة - الجزء الأول', 
      size: '٤ ميجابايت',
      category: 'بلاغة',
      icon: FaFileAlt,
      color: 'from-emerald-500/20 to-emerald-600/10',
      borderColor: 'border-emerald-500/30',
      date: '٢٠٢٤-٠١-٢٠',
      downloads: 200,
    },
    { 
      id: 4, 
      title: 'ملزمة البلاغة - الجزء الثاني', 
      size: '٥ ميجابايت',
      category: 'بلاغة',
      icon: FaFileAlt,
      color: 'from-emerald-500/20 to-emerald-600/10',
      borderColor: 'border-emerald-500/30',
      date: '٢٠٢٤-٠٢-١٠',
      downloads: 150,
    },
    { 
      id: 5, 
      title: 'ملزمة الإملاء - الجزء الأول', 
      size: '٣ ميجابايت',
      category: 'إملاء',
      icon: FaFile,
      color: 'from-purple-500/20 to-purple-600/10',
      borderColor: 'border-purple-500/30',
      date: '٢٠٢٤-٠١-٢٥',
      downloads: 320,
    },
    { 
      id: 6, 
      title: 'ملزمة الإملاء - الجزء الثاني', 
      size: '٤ ميجابايت',
      category: 'إملاء',
      icon: FaFile,
      color: 'from-purple-500/20 to-purple-600/10',
      borderColor: 'border-purple-500/30',
      date: '٢٠٢٤-٠٢-١٥',
      downloads: 210,
    },
  ];

  const categories = ['الكل', ...new Set(materials.map(m => m.category))];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.includes(searchTerm);
    const matchesCategory = selectedCategory === 'الكل' || material.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'نحو': return '📖';
      case 'بلاغة': return '🎭';
      case 'إملاء': return '✍️';
      default: return '📚';
    }
  };

  const handleDownload = (material) => {
    const downloadBtn = document.createElement('a');
    downloadBtn.href = `/assets/pdfs/${material.title.replace(/ /g, '_')}.pdf`;
    downloadBtn.download = `${material.title}.pdf`;
    downloadBtn.click();
  };

  return (
    <section id="materials" className="py-24 relative overflow-hidden">
      {isDark ? (
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary/50 to-primary" />
      ) : (
        <div className="absolute inset-0 bg-white" />
      )}
      <div className={`absolute top-40 right-20 w-80 h-80 rounded-full blur-3xl ${isDark ? 'bg-gold/3' : 'bg-gold/5'}`} />
      <div className={`absolute bottom-40 left-20 w-80 h-80 rounded-full blur-3xl ${isDark ? 'bg-gold/3' : 'bg-gold/5'}`} />
      
      <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 text-4xl font-amiri ${isDark ? 'text-gold/5' : 'text-gold/10'}`}>
        ﴿ اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ﴾
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-16 h-px bg-gradient-to-l from-gold/30 to-transparent" />
            <FaBook className="text-gold text-2xl" />
            <div className="w-16 h-px bg-gradient-to-r from-gold/30 to-transparent" />
          </div>
          <h2 className="heading-primary text-4xl md:text-5xl font-bold gradient-premium mb-3 calligraphy">
            الملازم التعليمية
          </h2>
          <p className="text-theme-secondary text-lg max-w-2xl mx-auto">
            مجموعة متكاملة من الملازم لمساعدتك في إتقان اللغة العربية
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-10"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="ابحث عن ملزمة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-5 py-3 pr-12 rounded-xl border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary placeholder-textMuted outline-none ${
                  isDark ? 'glass-premium' : 'bg-white shadow-sm'
                }`}
              />
              <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-theme-muted" />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gold text-black shadow-lg shadow-gold/20'
                      : isDark 
                        ? 'glass-premium text-textSecondary hover:text-white hover:border-gold/30'
                        : 'bg-white/80 text-theme-secondary hover:text-theme-primary hover:border-gold/30 border border-gold/10'
                  }`}
                >
                  {category === 'الكل' ? '📚 الكل' : `${getCategoryIcon(category)} ${category}`}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMaterials.map((material, index) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-gold/20 via-transparent to-gold/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 ${isDark ? '' : 'opacity-30 group-hover:opacity-80'}`} />
              
              <div className={`relative p-5 rounded-2xl border ${material.borderColor} transition-all duration-500 overflow-hidden ${
                isDark ? 'glass-premium' : 'bg-white shadow-md hover:shadow-xl'
              }`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${material.color} opacity-0 group-hover:opacity-100 transition-all duration-700`} />
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${material.color} flex items-center justify-center group-hover:scale-110 transition-all duration-500`}>
                      <material.icon className="text-2xl text-gold" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-bold text-sm md:text-base truncate group-hover:text-gold transition-all duration-300 ${isDark ? 'text-white' : 'text-theme-primary'}`}>
                        {material.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <span className="text-xs text-theme-muted flex items-center gap-1">
                          <FaFileArchive className="text-[10px]" />
                          {material.size}
                        </span>
                        <span className="text-xs text-theme-muted flex items-center gap-1">
                          <FaClock className="text-[10px]" />
                          {material.date}
                        </span>
                        <span className="text-xs text-theme-muted flex items-center gap-1">
                          <FaEye className="text-[10px]" />
                          {material.downloads} تحميل
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownload(material)}
                      className="relative p-3 rounded-xl bg-gold/10 hover:bg-gold/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gold/10"
                    >
                      <FaDownload className="text-gold text-sm" />
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full animate-ping" />
                    </button>
                  </div>
                </div>

                <div className={`absolute top-3 right-3 px-2 py-1 rounded-lg glass-premium text-[10px] text-gold border ${material.borderColor} opacity-0 group-hover:opacity-100 transition-all duration-500`}>
                  {material.category}
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📚</div>
            <p className="text-theme-muted">لا توجد ملازم تطابق بحثك</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12"
        >
          <div className={`flex items-center gap-3 px-6 py-3 rounded-full border border-gold/10 ${
            isDark ? 'glass-premium' : 'bg-white shadow-md'
          }`}>
            <FaBook className="text-gold" />
            <span className="text-theme-secondary">عدد الملازم: <span className="font-bold text-theme-primary">{materials.length}</span></span>
          </div>
          <div className={`flex items-center gap-3 px-6 py-3 rounded-full border border-gold/10 ${
            isDark ? 'glass-premium' : 'bg-white shadow-md'
          }`}>
            <FaCheckCircle className="text-gold" />
            <span className="text-theme-secondary">متوفر للتحميل: <span className="font-bold text-theme-primary">جميع الملازم</span></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Materials;