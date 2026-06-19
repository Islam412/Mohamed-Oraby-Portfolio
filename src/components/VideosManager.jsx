import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  FaPlay, FaClock, FaEye, FaThumbsUp, FaShare, 
  FaVideo, FaCalendarAlt, FaUser, FaStar,
  FaYoutube, FaFilm, FaPlayCircle, FaExpand
} from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

const Videos = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('الكل');

  const videos = [
    { 
      id: 1, 
      title: 'شرح درس النحو - الجملة الاسمية',
      description: 'تعلم قواعد الجملة الاسمية في النحو العربي مع أمثلة تطبيقية',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '٢٠:٣٠',
      views: '١.٢٥٠',
      likes: '٨٩',
      category: 'نحو',
      date: '٢٠٢٤-٠١-١٥',
      youtubeId: 'dQw4w9WgXcQ',
      teacher: 'محمد عرلبي',
    },
    { 
      id: 2, 
      title: 'شرح درس البلاغة - التشبيه',
      description: 'فهم أنواع التشبيه وأركانه مع تطبيقات من القرآن الكريم',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '١٨:٤٥',
      views: '٩٨٠',
      likes: '٦٧',
      category: 'بلاغة',
      date: '٢٠٢٤-٠١-٢٠',
      youtubeId: 'dQw4w9WgXcQ',
      teacher: 'محمد عرلبي',
    },
    { 
      id: 3, 
      title: 'شرح درس الإملاء - الهمزة',
      description: 'قواعد كتابة الهمزة في مختلف مواضع الكلمة',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '١٥:٢٠',
      views: '١.١٠٠',
      likes: '٧٨',
      category: 'إملاء',
      date: '٢٠٢٤-٠١-٢٥',
      youtubeId: 'dQw4w9WgXcQ',
      teacher: 'محمد عرلبي',
    },
    { 
      id: 4, 
      title: 'شرح درس النحو - المعرب والمبني',
      description: 'تعرف على الفرق بين الأسماء المعربة والمبنية مع أمثلة',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '٢٢:١٠',
      views: '٧٥٠',
      likes: '٥٦',
      category: 'نحو',
      date: '٢٠٢٤-٠٢-٠١',
      youtubeId: 'dQw4w9WgXcQ',
      teacher: 'محمد عرلبي',
    },
    { 
      id: 5, 
      title: 'شرح درس البلاغة - الاستعارة',
      description: 'فهم الاستعارة وأنواعها مع تطبيقات من الأدب العربي',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '١٩:٤٠',
      views: '٨٢٠',
      likes: '٦٣',
      category: 'بلاغة',
      date: '٢٠٢٤-٠٢-٠٥',
      youtubeId: 'dQw4w9WgXcQ',
      teacher: 'محمد عرلبي',
    },
    { 
      id: 6, 
      title: 'شرح درس الإملاء - التاء المربوطة والتاء المفتوحة',
      description: 'تعلم الفرق بين التاء المربوطة والمفتوحة مع تدريبات تطبيقية',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '١٦:٥٠',
      views: '٩٣٠',
      likes: '٧١',
      category: 'إملاء',
      date: '٢٠٢٤-٠٢-١٠',
      youtubeId: 'dQw4w9WgXcQ',
      teacher: 'محمد عرلبي',
    },
  ];

  const categories = ['الكل', ...new Set(videos.map(v => v.category))];

  const filteredVideos = activeCategory === 'الكل' 
    ? videos 
    : videos.filter(v => v.category === activeCategory);

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'نحو': return '📖';
      case 'بلاغة': return '🎭';
      case 'إملاء': return '✍️';
      default: return '📚';
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'نحو': return 'from-amber-500/20 to-amber-600/10 border-amber-500/30';
      case 'بلاغة': return 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30';
      case 'إملاء': return 'from-purple-500/20 to-purple-600/10 border-purple-500/30';
      default: return 'from-gold/20 to-gold/10 border-gold/30';
    }
  };

  const openVideo = (video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <section id="videos" className="py-24 relative overflow-hidden">
      {isDark ? (
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary/50 to-primary" />
      ) : (
        <div className="absolute inset-0 bg-white" />
      )}
      <div className={`absolute top-40 left-20 w-80 h-80 rounded-full blur-3xl ${isDark ? 'bg-gold/3' : 'bg-gold/5'}`} />
      <div className={`absolute bottom-40 right-20 w-80 h-80 rounded-full blur-3xl ${isDark ? 'bg-gold/3' : 'bg-gold/5'}`} />
      
      <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 text-4xl font-amiri ${isDark ? 'text-gold/5' : 'text-gold/10'}`}>
        ﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾
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
            <FaVideo className="text-gold text-2xl" />
            <div className="w-16 h-px bg-gradient-to-r from-gold/30 to-transparent" />
          </div>
          <h2 className="heading-primary text-4xl md:text-5xl font-bold gradient-premium mb-3 calligraphy">
            فيديوهات الشرح
          </h2>
          <p className="text-theme-secondary text-lg max-w-2xl mx-auto">
            مجموعة من الفيديوهات التعليمية لتسهيل فهم اللغة العربية
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gold text-black shadow-lg shadow-gold/20'
                  : isDark 
                    ? 'glass-premium text-textSecondary hover:text-white hover:border-gold/30'
                    : 'bg-white/80 text-theme-secondary hover:text-theme-primary hover:border-gold/30 border border-gold/10'
              }`}
            >
              {category === 'الكل' ? '📚 الكل' : `${getCategoryIcon(category)} ${category}`}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredVideo(video.id)}
              onMouseLeave={() => setHoveredVideo(null)}
              onClick={() => openVideo(video)}
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-gold/20 via-transparent to-gold/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 ${isDark ? '' : 'opacity-30 group-hover:opacity-80'}`} />
              
              <div className={`relative rounded-2xl overflow-hidden border border-white/5 group-hover:border-gold/30 transition-all duration-500 ${
                isDark ? 'glass-premium' : 'bg-white shadow-md hover:shadow-xl'
              }`}>
                <div className="relative aspect-video overflow-hidden bg-secondary">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(video.title)}&size=400&background=1a1a1a&color=c9a84c`;
                    }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-all duration-500 group-hover:bg-gold/30 border-2 border-gold/50 group-hover:border-gold">
                      <FaPlay className="text-gold text-xl md:text-2xl mr-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg glass-premium text-xs text-gold border border-gold/20">
                    <FaClock className="inline ml-1" />
                    {video.duration}
                  </div>

                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-lg glass-premium text-xs text-gold border ${getCategoryColor(video.category)} opacity-0 group-hover:opacity-100 transition-all duration-500`}>
                    {video.category}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className={`font-bold text-sm md:text-base line-clamp-2 group-hover:text-gold transition-all duration-300 ${isDark ? 'text-white' : 'text-theme-primary'}`}>
                    {video.title}
                  </h3>
                  <p className={`text-theme-muted text-xs mt-1 line-clamp-2`}>
                    {video.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-3 text-xs text-theme-muted">
                      <span className="flex items-center gap-1">
                        <FaEye className="text-gold/50" />
                        {video.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaThumbsUp className="text-gold/50" />
                        {video.likes}
                      </span>
                    </div>
                    <span className="text-xs text-theme-muted">
                      {video.date}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-theme-muted">لا توجد فيديوهات في هذا التصنيف</p>
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
            <FaVideo className="text-gold" />
            <span className="text-theme-secondary">عدد الفيديوهات: <span className="font-bold text-theme-primary">{videos.length}</span></span>
          </div>
          <div className={`flex items-center gap-3 px-6 py-3 rounded-full border border-gold/10 ${
            isDark ? 'glass-premium' : 'bg-white shadow-md'
          }`}>
            <FaFilm className="text-gold" />
            <span className="text-theme-secondary">إجمالي المشاهدات: <span className="font-bold text-theme-primary">٥.٩٣٠</span></span>
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
              onClick={closeVideo}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute -top-12 right-0 text-white/70 hover:text-white text-2xl transition-all duration-300 hover:rotate-90"
                  onClick={closeVideo}
                >
                  ✕
                </button>

                <div className="relative rounded-2xl overflow-hidden bg-secondary aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                    title={selectedVideo.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="mt-4 p-4 rounded-2xl glass-premium border border-gold/10">
                  <h3 className="text-xl font-bold text-white">{selectedVideo.title}</h3>
                  <p className="text-textSecondary text-sm mt-1">{selectedVideo.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-textMuted">
                    <span className="flex items-center gap-1">
                      <FaUser className="text-gold/50" />
                      {selectedVideo.teacher}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock className="text-gold/50" />
                      {selectedVideo.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaEye className="text-gold/50" />
                      {selectedVideo.views} مشاهدة
                    </span>
                    <span className="flex items-center gap-1">
                      <FaThumbsUp className="text-gold/50" />
                      {selectedVideo.likes} إعجاب
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Videos;