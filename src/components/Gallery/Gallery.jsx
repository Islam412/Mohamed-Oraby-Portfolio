import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaTimes, FaImages, FaCamera, FaSearch, FaExpand, FaHeart } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

const Gallery = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  
  const images = [
    { id: 1, src: '/assets/images/with-students/1.jpg', title: 'مع الطلاب', category: 'طلاب', date: '٢٠٢٤' },
    { id: 2, src: '/assets/images/with-students/2.jpg', title: 'في الفصل', category: 'تدريس', date: '٢٠٢٤' },
    { id: 3, src: '/assets/images/with-students/3.jpg', title: 'ورشة عمل', category: 'ورش', date: '٢٠٢٣' },
    { id: 4, src: '/assets/images/with-students/4.jpg', title: 'تكريم', category: 'إنجازات', date: '٢٠٢٤' },
    { id: 5, src: '/assets/images/with-students/5.jpg', title: 'رحلة تعليمية', category: 'رحلات', date: '٢٠٢٣' },
    { id: 6, src: '/assets/images/with-students/6.jpg', title: 'يوم التميز', category: 'إنجازات', date: '٢٠٢٤' },
  ];

  const categories = ['الكل', ...new Set(images.map(img => img.category))];
  const [activeCategory, setActiveCategory] = useState('الكل');

  const filteredImages = activeCategory === 'الكل' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden">
      {isDark ? (
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary/50 to-primary" />
      ) : (
        <div className="absolute inset-0 bg-white" />
      )}
      <div className={`absolute top-40 left-20 w-80 h-80 rounded-full blur-3xl ${isDark ? 'bg-gold/3' : 'bg-gold/5'}`} />
      <div className={`absolute bottom-40 right-20 w-80 h-80 rounded-full blur-3xl ${isDark ? 'bg-gold/3' : 'bg-gold/5'}`} />
      
      <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 text-4xl font-amiri ${isDark ? 'text-gold/5' : 'text-gold/10'}`}>
        ﴿ وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ ﴾
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
            <FaImages className="text-gold text-2xl" />
            <div className="w-16 h-px bg-gradient-to-r from-gold/30 to-transparent" />
          </div>
          <h2 className="heading-primary text-4xl md:text-5xl font-bold gradient-premium mb-3 calligraphy">
            معرض الصور
          </h2>
          <p className="text-theme-secondary text-lg max-w-2xl mx-auto">
            لحظات مميزة من رحلتنا التعليمية
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gold text-black shadow-lg shadow-gold/20'
                  : isDark 
                    ? 'glass-premium text-textSecondary hover:text-white hover:border-gold/30'
                    : 'bg-white/80 text-theme-secondary hover:text-theme-primary hover:border-gold/30 border border-gold/10'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="relative group cursor-pointer rounded-2xl overflow-hidden"
              onClick={() => setSelectedImage(image)}
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-gold/20 via-transparent to-gold/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 ${isDark ? '' : 'opacity-30 group-hover:opacity-80'}`} />
              
              <div className={`relative aspect-square bg-gradient-to-br from-gold/5 to-primary overflow-hidden rounded-2xl ${
                isDark ? '' : 'shadow-md hover:shadow-xl'
              }`}>
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(image.title)}&size=400&background=1a1a1a&color=c9a84c`;
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="text-center transform group-hover:scale-105 transition-all duration-500">
                    <div className="w-14 h-14 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/30 transition-all duration-300">
                      <FaSearch className="text-gold text-xl" />
                    </div>
                    <h4 className="text-white font-bold text-lg">{image.title}</h4>
                    <span className="text-gold text-sm">{image.category}</span>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <span className="text-xs text-textMuted">{image.date}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-3 right-3 px-3 py-1 rounded-full glass-premium text-xs text-gold border border-gold/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500">
                  {image.category}
                </div>

                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <FaHeart className="text-gold/50 text-sm hover:text-gold transition-colors duration-300" />
                </div>

                <div className="absolute top-3 left-3 px-2 py-1 rounded-md glass-premium text-xs text-textMuted opacity-0 group-hover:opacity-100 transition-all duration-500">
                  {index + 1}/{filteredImages.length}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📸</div>
            <p className="text-theme-muted">لا توجد صور في هذا التصنيف</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-16"
        >
          <div className={`flex items-center gap-3 px-6 py-3 rounded-full border border-gold/10 ${
            isDark ? 'glass-premium' : 'bg-white shadow-md'
          }`}>
            <FaImages className="text-gold" />
            <span className="text-theme-secondary">عدد الصور: <span className="font-bold text-theme-primary">{images.length}</span></span>
          </div>
          <div className={`flex items-center gap-3 px-6 py-3 rounded-full border border-gold/10 ${
            isDark ? 'glass-premium' : 'bg-white shadow-md'
          }`}>
            <FaCamera className="text-gold" />
            <span className="text-theme-secondary">عدد التصنيفات: <span className="font-bold text-theme-primary">{categories.length - 1}</span></span>
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute -top-14 right-0 text-white/70 hover:text-white text-2xl transition-all duration-300 hover:rotate-90"
                  onClick={() => setSelectedImage(null)}
                >
                  <FaTimes />
                </button>

                <div className="relative rounded-2xl overflow-hidden bg-secondary">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="w-full max-h-[85vh] object-contain"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedImage.title)}&size=600&background=1a1a1a&color=c9a84c`;
                    }}
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-xl font-bold text-white">{selectedImage.title}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gold">{selectedImage.category}</span>
                      <span className="text-xs text-textMuted">{selectedImage.date}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <button
                    onClick={() => {
                      const currentIndex = images.findIndex(img => img.id === selectedImage.id);
                      const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
                      setSelectedImage(images[prevIndex]);
                    }}
                    className="w-12 h-12 rounded-full glass-premium flex items-center justify-center text-white hover:bg-gold/20 transition-all duration-300 border border-white/10 hover:border-gold/30"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <button
                    onClick={() => {
                      const currentIndex = images.findIndex(img => img.id === selectedImage.id);
                      const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
                      setSelectedImage(images[nextIndex]);
                    }}
                    className="w-12 h-12 rounded-full glass-premium flex items-center justify-center text-white hover:bg-gold/20 transition-all duration-300 border border-white/10 hover:border-gold/30"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-textMuted text-sm">
                  {images.findIndex(img => img.id === selectedImage.id) + 1} / {images.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;