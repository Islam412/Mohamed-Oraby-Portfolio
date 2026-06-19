import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaYoutube, FaClock, FaEye, FaThumbsUp } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

const VideosManager = () => {
  const { siteData, addVideo, updateVideo, deleteVideo } = useApp();
  const [editingVideo, setEditingVideo] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    duration: '',
    category: 'نحو',
    youtubeId: '',
    teacher: 'محمد عرلبي',
  });

  const categories = ['نحو', 'بلاغة', 'إملاء'];

  const handleAddVideo = () => {
    if (newVideo.title && newVideo.youtubeId) {
      addVideo({
        ...newVideo,
        views: '٠',
        likes: '٠',
        date: new Date().toISOString().split('T')[0],
      });
      setNewVideo({
        title: '',
        description: '',
        duration: '',
        category: 'نحو',
        youtubeId: '',
        teacher: 'محمد عرلبي',
      });
      setShowAddForm(false);
      alert('تم إضافة الفيديو بنجاح!');
    }
  };

  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا الفيديو؟')) {
      deleteVideo(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-premium calligraphy">إدارة الفيديوهات</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-300"
        >
          <FaPlus />
          إضافة فيديو
        </button>
      </div>

      {/* نموذج الإضافة */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 rounded-2xl glass-premium border border-gold/10 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-textMuted mb-1">عنوان الفيديو</label>
                <input
                  type="text"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-textMuted mb-1">رابط YouTube</label>
                <input
                  type="text"
                  value={newVideo.youtubeId}
                  onChange={(e) => setNewVideo({ ...newVideo, youtubeId: e.target.value })}
                  placeholder="dQw4w9WgXcQ"
                  className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-textMuted mb-1">المدة</label>
                <input
                  type="text"
                  value={newVideo.duration}
                  onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                  placeholder="٢٠:٣٠"
                  className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-textMuted mb-1">التصنيف</label>
                <select
                  value={newVideo.category}
                  onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-textMuted mb-1">الوصف</label>
                <textarea
                  value={newVideo.description}
                  onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                  rows="2"
                  className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white outline-none resize-y"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAddVideo}
                className="px-6 py-2 rounded-xl bg-gold text-black font-bold hover:shadow-xl hover:shadow-gold/20 transition-all duration-300"
              >
                إضافة
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 rounded-xl bg-white/5 text-textMuted hover:bg-white/10 transition-all duration-300"
              >
                إلغاء
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* قائمة الفيديوهات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {siteData.videos.map((video) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl glass-premium border border-white/5"
          >
            <div className="flex items-start gap-4">
              <div className="w-24 h-16 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                <FaYoutube className="text-3xl text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-white text-sm truncate">{video.title}</h4>
                <p className="text-xs text-textMuted truncate">{video.description}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-textMuted">
                  <span className="flex items-center gap-1">
                    <FaClock className="text-gold/50" />
                    {video.duration}
                  </span>
                  <span>{video.category}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(video.id)}
                  className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300"
                >
                  <FaTrash className="text-sm" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {siteData.videos.length === 0 && (
        <div className="text-center py-12 text-textMuted">
          <FaYoutube className="text-6xl mx-auto mb-4 opacity-30" />
          <p>لا توجد فيديوهات حالياً</p>
          <p className="text-sm">اضغط على "إضافة فيديو" لإضافة أول فيديو</p>
        </div>
      )}
    </div>
  );
};

export default VideosManager;