import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, FaBook, FaVideo, FaFilePdf, 
  FaImages, FaClipboardList, FaCog, FaSignOutAlt,
  FaBars, FaTimes, FaMoon, FaSun, FaUsers, 
  FaGraduationCap, FaArrowRight, FaSave, FaPlus, 
  FaTrash, FaYoutube, FaClock, FaDownload, FaEye, 
  FaWhatsapp, FaPhone, FaFacebook, FaInstagram, FaGlobe,
  FaHome, FaChalkboardTeacher, FaPenFancy, FaBookOpen
} from 'react-icons/fa';
import { useApp } from '../context/AppContext';

// ============================================
// COMPONENT: DashboardStats
// ============================================
const DashboardStats = () => {
  const { siteData } = useApp();

  const stats = [
    { icon: FaBook, label: 'الدورات', value: siteData.courses?.length || 0, color: 'from-amber-500/20 to-amber-600/10' },
    { icon: FaVideo, label: 'الفيديوهات', value: siteData.videos?.length || 0, color: 'from-blue-500/20 to-blue-600/10' },
    { icon: FaFilePdf, label: 'الملازم', value: siteData.materials?.length || 0, color: 'from-red-500/20 to-red-600/10' },
    { icon: FaImages, label: 'الصور', value: siteData.gallery?.length || 0, color: 'from-purple-500/20 to-purple-600/10' },
    { icon: FaClipboardList, label: 'الامتحانات', value: siteData.exams?.length || 0, color: 'from-emerald-500/20 to-emerald-600/10' },
    { icon: FaUsers, label: 'إجمالي الطلاب', value: '+٥٠٠', color: 'from-gold/20 to-gold/10' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold gradient-premium mb-6 calligraphy">لوحة المعلومات</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 rounded-2xl glass-premium border border-gold/10">
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
              <stat.icon className="text-2xl text-gold" />
            </div>
            <div className="text-2xl font-bold text-theme-primary">{stat.value}</div>
            <div className="text-sm text-theme-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-2xl glass-premium border border-gold/10">
        <h3 className="font-bold mb-4 text-theme-primary">إجراءات سريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-white/5 text-center text-sm text-theme-muted">
            <FaUser className="text-gold mx-auto mb-2" /> تعديل المحتوى
          </div>
          <div className="p-4 rounded-xl bg-white/5 text-center text-sm text-theme-muted">
            <FaVideo className="text-gold mx-auto mb-2" /> إضافة فيديو
          </div>
          <div className="p-4 rounded-xl bg-white/5 text-center text-sm text-theme-muted">
            <FaFilePdf className="text-gold mx-auto mb-2" /> رفع ملزمة
          </div>
          <div className="p-4 rounded-xl bg-white/5 text-center text-sm text-theme-muted">
            <FaClipboardList className="text-gold mx-auto mb-2" /> إضافة امتحان
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// COMPONENT: ContentManager
// ============================================
const ContentManager = () => {
  const { siteData, updateAbout, updateHero, addCourse, deleteCourse } = useApp();
  const [showAddCourse, setShowAddCourse] = useState(false);

  const [aboutData, setAboutData] = useState({
    name: siteData.about?.name || '',
    title: siteData.about?.title || '',
    description: siteData.about?.description || '',
  });

  const [heroData, setHeroData] = useState({
    title: siteData.hero?.title || '',
    subtitle: siteData.hero?.subtitle || '',
    description: siteData.hero?.description || '',
  });

  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    icon: 'FaBook',
    color: 'from-amber-500/20 to-amber-600/10',
    borderColor: 'border-amber-500/30',
    gradient: 'from-amber-400 to-amber-600',
  });

  const iconOptions = ['FaBook', 'FaGraduationCap', 'FaPenFancy', 'FaBookOpen', 'FaChalkboardTeacher'];

  const handleSaveAbout = () => {
    updateAbout(aboutData);
    alert('تم حفظ معلومات المدرس بنجاح!');
  };

  const handleSaveHero = () => {
    updateHero(heroData);
    alert('تم حفظ معلومات الرئيسية بنجاح!');
  };

  const handleAddCourse = () => {
    if (newCourse.title && newCourse.description) {
      addCourse(newCourse);
      setNewCourse({
        title: '',
        description: '',
        icon: 'FaBook',
        color: 'from-amber-500/20 to-amber-600/10',
        borderColor: 'border-amber-500/30',
        gradient: 'from-amber-400 to-amber-600',
      });
      setShowAddCourse(false);
      alert('تم إضافة الدورة بنجاح!');
    }
  };

  const handleDeleteCourse = (id) => {
    if (confirm('هل أنت متأكد من حذف هذه الدورة؟')) {
      deleteCourse(id);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold gradient-premium calligraphy">إدارة المحتوى</h2>

      <div className="p-6 rounded-2xl glass-premium border border-gold/10">
        <h3 className="text-lg font-bold mb-4 text-theme-primary">معلومات المدرس</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-theme-muted">الاسم</label>
            <input
              type="text"
              value={aboutData.name}
              onChange={(e) => setAboutData({ ...aboutData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-theme-muted">اللقب</label>
            <input
              type="text"
              value={aboutData.title}
              onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-theme-muted">الوصف</label>
            <textarea
              value={aboutData.description}
              onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
              rows="4"
              className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none resize-y"
            />
          </div>
          <button
            onClick={handleSaveAbout}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-300"
          >
            <FaSave /> حفظ
          </button>
        </div>
      </div>

      <div className="p-6 rounded-2xl glass-premium border border-gold/10">
        <h3 className="text-lg font-bold mb-4 text-theme-primary">معلومات الرئيسية</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-theme-muted">العنوان الرئيسي</label>
            <input
              type="text"
              value={heroData.title}
              onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-theme-muted">العنوان الفرعي</label>
            <input
              type="text"
              value={heroData.subtitle}
              onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
              className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-theme-muted">الوصف</label>
            <textarea
              value={heroData.description}
              onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
              rows="3"
              className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none resize-y"
            />
          </div>
          <button
            onClick={handleSaveHero}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-300"
          >
            <FaSave /> حفظ
          </button>
        </div>
      </div>

      <div className="p-6 rounded-2xl glass-premium border border-gold/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-theme-primary">الدورات ({siteData.courses?.length || 0})</h3>
          <button
            onClick={() => setShowAddCourse(!showAddCourse)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-300"
          >
            <FaPlus /> إضافة دورة
          </button>
        </div>

        {showAddCourse && (
          <div className="mb-4 p-4 rounded-xl bg-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-theme-muted">عنوان الدورة</label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-theme-muted">الوصف</label>
                <input
                  type="text"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-theme-muted">الأيقونة</label>
                <select
                  value={newCourse.icon}
                  onChange={(e) => setNewCourse({ ...newCourse, icon: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAddCourse}
                className="px-6 py-2 rounded-xl bg-gold text-black font-bold hover:shadow-xl hover:shadow-gold/20 transition-all duration-300"
              >
                إضافة
              </button>
              <button
                onClick={() => setShowAddCourse(false)}
                className="px-6 py-2 rounded-xl bg-white/5 text-theme-muted hover:bg-white/10 transition-all duration-300"
              >
                إلغاء
              </button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {siteData.courses?.map((course) => (
            <div key={course.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div>
                <h4 className="font-bold text-theme-primary">{course.title}</h4>
                <p className="text-sm text-theme-muted">{course.description}</p>
              </div>
              <button
                onClick={() => handleDeleteCourse(course.id)}
                className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// COMPONENT: VideosManager
// ============================================
const VideosManager = () => {
  const { siteData, addVideo, deleteVideo } = useApp();
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
          <FaPlus /> إضافة فيديو
        </button>
      </div>

      {showAddForm && (
        <div className="p-6 rounded-2xl glass-premium border border-gold/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-theme-muted">عنوان الفيديو</label>
              <input
                type="text"
                value={newVideo.title}
                onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-theme-muted">رابط YouTube</label>
              <input
                type="text"
                value={newVideo.youtubeId}
                onChange={(e) => setNewVideo({ ...newVideo, youtubeId: e.target.value })}
                placeholder="dQw4w9WgXcQ"
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-theme-muted">المدة</label>
              <input
                type="text"
                value={newVideo.duration}
                onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                placeholder="٢٠:٣٠"
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-theme-muted">التصنيف</label>
              <select
                value={newVideo.category}
                onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value })}
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1 text-theme-muted">الوصف</label>
              <textarea
                value={newVideo.description}
                onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                rows="2"
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none resize-y"
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
              className="px-6 py-2 rounded-xl bg-white/5 text-theme-muted hover:bg-white/10 transition-all duration-300"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {siteData.videos?.map((video) => (
          <div key={video.id} className="p-4 rounded-2xl glass-premium border border-white/5">
            <div className="flex items-start gap-4">
              <div className="w-24 h-16 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                <FaYoutube className="text-3xl text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm truncate text-theme-primary">{video.title}</h4>
                <p className="text-xs truncate text-theme-muted">{video.description}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-theme-muted">
                  <span className="flex items-center gap-1"><FaClock className="text-gold/50" />{video.duration}</span>
                  <span>{video.category}</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(video.id)}
                className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300"
              >
                <FaTrash className="text-sm" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {siteData.videos?.length === 0 && (
        <div className="text-center py-12 text-theme-muted">
          <FaYoutube className="text-6xl mx-auto mb-4 opacity-30" />
          <p>لا توجد فيديوهات حالياً</p>
        </div>
      )}
    </div>
  );
};

// ============================================
// COMPONENT: MaterialsManager
// ============================================
const MaterialsManager = () => {
  const { siteData, addMaterial, deleteMaterial } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);

  const [newMaterial, setNewMaterial] = useState({
    title: '',
    size: '',
    category: 'نحو',
    date: new Date().toISOString().split('T')[0],
    downloads: 0,
  });

  const categories = ['نحو', 'بلاغة', 'إملاء'];

  const handleAddMaterial = () => {
    if (newMaterial.title) {
      addMaterial(newMaterial);
      setNewMaterial({
        title: '',
        size: '',
        category: 'نحو',
        date: new Date().toISOString().split('T')[0],
        downloads: 0,
      });
      setShowAddForm(false);
      alert('تم إضافة الملزمة بنجاح!');
    }
  };

  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذه الملزمة؟')) {
      deleteMaterial(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-premium calligraphy">إدارة الملازم</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-300"
        >
          <FaPlus /> إضافة ملزمة
        </button>
      </div>

      {showAddForm && (
        <div className="p-6 rounded-2xl glass-premium border border-gold/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-theme-muted">عنوان الملزمة</label>
              <input
                type="text"
                value={newMaterial.title}
                onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-theme-muted">الحجم</label>
              <input
                type="text"
                value={newMaterial.size}
                onChange={(e) => setNewMaterial({ ...newMaterial, size: e.target.value })}
                placeholder="٥ ميجابايت"
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-theme-muted">التصنيف</label>
              <select
                value={newMaterial.category}
                onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value })}
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddMaterial}
              className="px-6 py-2 rounded-xl bg-gold text-black font-bold hover:shadow-xl hover:shadow-gold/20 transition-all duration-300"
            >
              إضافة
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2 rounded-xl bg-white/5 text-theme-muted hover:bg-white/10 transition-all duration-300"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {siteData.materials?.map((material) => (
          <div key={material.id} className="flex items-center justify-between p-4 rounded-2xl glass-premium border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <FaFilePdf className="text-2xl text-red-400" />
              </div>
              <div>
                <h4 className="font-bold text-theme-primary">{material.title}</h4>
                <div className="flex items-center gap-3 text-xs text-theme-muted">
                  <span className="flex items-center gap-1"><FaDownload className="text-gold/50" />{material.size}</span>
                  <span>{material.category}</span>
                  <span>{material.date}</span>
                  <span className="flex items-center gap-1"><FaEye className="text-gold/50" />{material.downloads} تحميل</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDelete(material.id)}
              className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {siteData.materials?.length === 0 && (
        <div className="text-center py-12 text-theme-muted">
          <FaFilePdf className="text-6xl mx-auto mb-4 opacity-30" />
          <p>لا توجد ملازم حالياً</p>
        </div>
      )}
    </div>
  );
};

// ============================================
// COMPONENT: GalleryManager
// ============================================
const GalleryManager = () => {
  const { siteData, addGalleryImage, deleteGalleryImage } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);

  const [newImage, setNewImage] = useState({
    title: '',
    category: 'طلاب',
    date: new Date().getFullYear().toString(),
    src: '',
  });

  const categories = ['طلاب', 'تدريس', 'ورش', 'إنجازات', 'رحلات'];

  const handleAddImage = () => {
    if (newImage.title && newImage.src) {
      addGalleryImage(newImage);
      setNewImage({
        title: '',
        category: 'طلاب',
        date: new Date().getFullYear().toString(),
        src: '',
      });
      setShowAddForm(false);
      alert('تم إضافة الصورة بنجاح!');
    }
  };

  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
      deleteGalleryImage(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-premium calligraphy">إدارة المعرض</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-300"
        >
          <FaPlus /> إضافة صورة
        </button>
      </div>

      {showAddForm && (
        <div className="p-6 rounded-2xl glass-premium border border-gold/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-theme-muted">عنوان الصورة</label>
              <input
                type="text"
                value={newImage.title}
                onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-theme-muted">التصنيف</label>
              <select
                value={newImage.category}
                onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1 text-theme-muted">رابط الصورة</label>
              <input
                type="text"
                value={newImage.src}
                onChange={(e) => setNewImage({ ...newImage, src: e.target.value })}
                placeholder="/assets/images/with-students/1.jpg"
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddImage}
              className="px-6 py-2 rounded-xl bg-gold text-black font-bold hover:shadow-xl hover:shadow-gold/20 transition-all duration-300"
            >
              إضافة
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2 rounded-xl bg-white/5 text-theme-muted hover:bg-white/10 transition-all duration-300"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {siteData.gallery?.map((image) => (
          <div key={image.id} className="group relative rounded-2xl overflow-hidden glass-premium border border-white/5">
            <div className="aspect-square bg-gradient-to-br from-gold/5 to-primary">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(image.title)}&size=400&background=1a1a1a&color=c9a84c`;
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
              <h4 className="text-sm font-bold truncate text-white">{image.title}</h4>
              <p className="text-xs text-gold">{image.category}</p>
            </div>
            <button
              onClick={() => handleDelete(image.id)}
              className="absolute top-2 right-2 p-2 rounded-xl bg-red-500/80 text-white hover:bg-red-500 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <FaTrash className="text-xs" />
            </button>
          </div>
        ))}
      </div>

      {siteData.gallery?.length === 0 && (
        <div className="text-center py-12 text-theme-muted">
          <FaImages className="text-6xl mx-auto mb-4 opacity-30" />
          <p>لا توجد صور حالياً</p>
        </div>
      )}
    </div>
  );
};

// ============================================
// COMPONENT: ExamsManager
// ============================================
const ExamsManager = () => {
  const { siteData, addExam, deleteExam } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);

  const [newExam, setNewExam] = useState({
    title: '',
    description: '',
    icon: '📝',
    color: 'from-amber-500/20 to-amber-600/10',
    questions: [],
  });

  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correct: 0,
  });

  const handleAddQuestion = () => {
    if (newQuestion.question && newQuestion.options.every(o => o.trim())) {
      setNewExam({
        ...newExam,
        questions: [...newExam.questions, { 
          id: `q${Date.now()}`,
          ...newQuestion 
        }],
      });
      setNewQuestion({ question: '', options: ['', '', '', ''], correct: 0 });
    }
  };

  const handleRemoveQuestion = (index) => {
    setNewExam({
      ...newExam,
      questions: newExam.questions.filter((_, i) => i !== index),
    });
  };

  const handleAddExam = () => {
    if (newExam.title && newExam.questions.length > 0) {
      addExam(newExam);
      setNewExam({
        title: '',
        description: '',
        icon: '📝',
        color: 'from-amber-500/20 to-amber-600/10',
        questions: [],
      });
      setShowAddForm(false);
      alert('تم إضافة الامتحان بنجاح!');
    }
  };

  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا الامتحان؟')) {
      deleteExam(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-premium calligraphy">إدارة الامتحانات</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-300"
        >
          <FaPlus /> إضافة امتحان
        </button>
      </div>

      {showAddForm && (
        <div className="p-6 rounded-2xl glass-premium border border-gold/10">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-theme-muted">عنوان الامتحان</label>
                <input
                  type="text"
                  value={newExam.title}
                  onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-theme-muted">الوصف</label>
                <input
                  type="text"
                  value={newExam.description}
                  onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                />
              </div>
            </div>

            <div className="border-t border-white/5 pt-4">
              <h4 className="font-bold mb-3 text-theme-primary">الأسئلة ({newExam.questions.length})</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1 text-theme-muted">السؤال</label>
                  <input
                    type="text"
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {newQuestion.options.map((opt, idx) => (
                    <div key={idx}>
                      <label className="block text-sm mb-1 text-theme-muted">الخيار {idx + 1}</label>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...newQuestion.options];
                          newOpts[idx] = e.target.value;
                          setNewQuestion({ ...newQuestion, options: newOpts });
                        }}
                        className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm mb-1 text-theme-muted">رقم الإجابة الصحيحة (0-3)</label>
                  <input
                    type="number"
                    min="0"
                    max="3"
                    value={newQuestion.correct}
                    onChange={(e) => setNewQuestion({ ...newQuestion, correct: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                  />
                </div>
                <button
                  onClick={handleAddQuestion}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-300"
                >
                  <FaPlus /> إضافة سؤال
                </button>
              </div>

              {newExam.questions.length > 0 && (
                <div className="mt-4 space-y-2">
                  {newExam.questions.map((q, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <div>
                        <p className="text-sm text-theme-primary">{idx + 1}. {q.question}</p>
                        <p className="text-xs text-theme-muted">الإجابة الصحيحة: {q.options[q.correct]}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveQuestion(idx)}
                        className="p-1 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAddExam}
                disabled={newExam.questions.length === 0}
                className="px-6 py-2 rounded-xl bg-gold text-black font-bold hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                إضافة الامتحان
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 rounded-xl bg-white/5 text-theme-muted hover:bg-white/10 transition-all duration-300"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {siteData.exams?.map((exam) => (
          <div key={exam.id} className="p-4 rounded-2xl glass-premium border border-white/5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl mb-2">{exam.icon}</div>
                <h4 className="font-bold text-theme-primary">{exam.title}</h4>
                <p className="text-sm text-theme-muted">{exam.description}</p>
                <div className="flex items-center gap-2 mt-2 text-theme-muted">
                  <FaClipboardList className="text-gold/50" />
                  <span className="text-xs">{exam.questions?.length || 0} أسئلة</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(exam.id)}
                className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {siteData.exams?.length === 0 && (
        <div className="text-center py-12 text-theme-muted">
          <FaClipboardList className="text-6xl mx-auto mb-4 opacity-30" />
          <p>لا توجد امتحانات حالياً</p>
        </div>
      )}
    </div>
  );
};

// ============================================
// COMPONENT: SettingsManager
// ============================================
const SettingsManager = () => {
  const { siteData, updateSettings, resetData, theme, toggleTheme } = useApp();
  const isDark = theme === 'dark';
  
  const [settings, setSettings] = useState({
    siteName: siteData.settings?.siteName || '',
    siteDescription: siteData.settings?.siteDescription || '',
    primaryColor: siteData.settings?.primaryColor || '#c9a84c',
    socialLinks: {
      whatsapp: siteData.settings?.socialLinks?.whatsapp || '',
      phone: siteData.settings?.socialLinks?.phone || '',
      facebook: siteData.settings?.socialLinks?.facebook || '',
      instagram: siteData.settings?.socialLinks?.instagram || '',
      youtube: siteData.settings?.socialLinks?.youtube || '',
    },
  });

  const handleSave = () => {
    updateSettings(settings);
    alert('تم حفظ الإعدادات بنجاح!');
  };

  const handleReset = () => {
    if (confirm('هل أنت متأكد من إعادة تعيين جميع البيانات إلى الافتراضية؟')) {
      resetData();
      alert('تم إعادة تعيين جميع البيانات!');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold gradient-premium calligraphy">إعدادات الموقع</h2>

      <div className="p-6 rounded-2xl glass-premium border border-gold/10">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-theme-primary">
          {isDark ? <FaMoon className="text-gold" /> : <FaSun className="text-gold" />}
          مظهر الموقع
        </h3>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-300"
          >
            {isDark ? <FaSun /> : <FaMoon />}
            <span>{isDark ? 'الوضع الفاتح' : 'الوضع المظلم'}</span>
          </button>
          <span className="text-sm text-theme-muted">
            {isDark ? 'الوضع المظلم مفعل حالياً' : 'الوضع الفاتح مفعل حالياً'}
          </span>
        </div>
      </div>

      <div className="p-6 rounded-2xl glass-premium border border-gold/10">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-theme-primary">
          <FaGlobe className="text-gold" /> الإعدادات العامة
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-theme-muted">اسم الموقع</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-theme-muted">وصف الموقع</label>
            <input
              type="text"
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-theme-muted">اللون الرئيسي</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="w-12 h-12 rounded-xl cursor-pointer border border-white/5"
              />
              <span className="text-sm text-theme-muted">{settings.primaryColor}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl glass-premium border border-gold/10">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-theme-primary">
          <FaWhatsapp className="text-gold" /> روابط التواصل الاجتماعي
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FaWhatsapp className="text-2xl text-green-500 flex-shrink-0" />
            <input
              type="text"
              value={settings.socialLinks.whatsapp}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, whatsapp: e.target.value }
              })}
              placeholder="رابط واتساب"
              className="flex-1 px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none min-w-0"
            />
          </div>
          <div className="flex items-center gap-3">
            <FaPhone className="text-2xl text-gold flex-shrink-0" />
            <input
              type="text"
              value={settings.socialLinks.phone}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, phone: e.target.value }
              })}
              placeholder="رقم الهاتف"
              className="flex-1 px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none min-w-0"
            />
          </div>
          <div className="flex items-center gap-3">
            <FaFacebook className="text-2xl text-blue-500 flex-shrink-0" />
            <input
              type="text"
              value={settings.socialLinks.facebook}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, facebook: e.target.value }
              })}
              placeholder="رابط فيسبوك"
              className="flex-1 px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none min-w-0"
            />
          </div>
          <div className="flex items-center gap-3">
            <FaInstagram className="text-2xl text-pink-500 flex-shrink-0" />
            <input
              type="text"
              value={settings.socialLinks.instagram}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, instagram: e.target.value }
              })}
              placeholder="رابط انستجرام"
              className="flex-1 px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none min-w-0"
            />
          </div>
          <div className="flex items-center gap-3">
            <FaYoutube className="text-2xl text-red-500 flex-shrink-0" />
            <input
              type="text"
              value={settings.socialLinks.youtube}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, youtube: e.target.value }
              })}
              placeholder="رابط يوتيوب"
              className="flex-1 px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none min-w-0"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-black font-bold hover:shadow-xl hover:shadow-gold/20 transition-all duration-300"
        >
          <FaSave /> حفظ الإعدادات
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300"
        >
          <FaTrash /> إعادة تعيين جميع البيانات
        </button>
      </div>
    </div>
  );
};

// ============================================
// MAIN: AdminDashboard
// ============================================
const AdminDashboard = ({ onBack }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { logout, theme, toggleTheme } = useApp();
  const isDark = theme === 'dark';

  const menuItems = [
    { id: 'dashboard', icon: FaHome, label: 'لوحة المعلومات' },
    { id: 'content', icon: FaUser, label: 'المحتوى الرئيسي' },
    { id: 'videos', icon: FaVideo, label: 'الفيديوهات' },
    { id: 'materials', icon: FaFilePdf, label: 'الملازم' },
    { id: 'gallery', icon: FaImages, label: 'المعرض' },
    { id: 'exams', icon: FaClipboardList, label: 'الامتحانات' },
    { id: 'settings', icon: FaCog, label: 'الإعدادات' },
  ];

  const handleLogout = () => {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
      logout();
      onBack();
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <DashboardStats />;
      case 'content': return <ContentManager />;
      case 'videos': return <VideosManager />;
      case 'materials': return <MaterialsManager />;
      case 'gallery': return <GalleryManager />;
      case 'exams': return <ExamsManager />;
      case 'settings': return <SettingsManager />;
      default: return <DashboardStats />;
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-primary' : 'bg-light-primary'} transition-colors duration-500 flex`}>
      {/* Sidebar */}
      <div className={`hidden lg:block fixed top-0 right-0 h-full w-72 ${
        isDark ? 'bg-dark-secondary/95' : 'bg-light-secondary/95'
      } border-l border-gold/10 z-50 transition-colors duration-500 overflow-y-auto`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
              <FaGraduationCap className="text-2xl text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`font-bold text-sm truncate ${isDark ? 'text-white' : 'text-dark-text'}`}>لوحة التحكم</h3>
              <p className={`text-xs truncate ${isDark ? 'text-dark-textMuted' : 'text-light-textMuted'}`}>محمد أحمد عرابى</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 group text-right ${
                  activeTab === item.id
                    ? 'bg-gold/10 text-gold'
                    : isDark 
                      ? 'text-dark-textSecondary hover:text-white hover:bg-white/5' 
                      : 'text-light-textSecondary hover:text-dark-text hover:bg-black/5'
                }`}
              >
                <item.icon className={`text-lg flex-shrink-0 ${activeTab === item.id ? 'text-gold' : 'text-gold/50 group-hover:text-gold'}`} />
                <span className="truncate">{item.label}</span>
                {activeTab === item.id && <div className="mr-auto w-1 h-8 rounded-full bg-gold" />}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-6 right-6 left-6 space-y-2">
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm ${
                isDark 
                  ? 'bg-white/5 text-dark-textSecondary hover:bg-white/10 hover:text-white' 
                  : 'bg-black/5 text-light-textSecondary hover:bg-black/10 hover:text-dark-text'
              }`}
            >
              {isDark ? <FaSun /> : <FaMoon />}
              <span>{isDark ? 'الوضع الفاتح' : 'الوضع المظلم'}</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300 text-sm"
            >
              <FaSignOutAlt /> <span>تسجيل الخروج</span>
            </button>

            <button
              onClick={onBack}
              className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm ${
                isDark 
                  ? 'bg-white/5 text-dark-textSecondary hover:bg-white/10 hover:text-white' 
                  : 'bg-black/5 text-light-textSecondary hover:bg-black/10 hover:text-dark-text'
              }`}
            >
              <FaArrowRight /> <span>العودة للموقع</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className={`lg:hidden fixed top-4 right-4 z-50 p-3 rounded-xl glass-premium border border-gold/10 text-gold`}
      >
        {mobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden fixed inset-0 z-40 ${
              isDark ? 'bg-dark-secondary/98' : 'bg-light-secondary/98'
            } backdrop-blur-xl overflow-y-auto`}
          >
            <div className="p-6 pt-20">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 text-right ${
                      activeTab === item.id
                        ? 'bg-gold/10 text-gold'
                        : isDark 
                          ? 'text-dark-textSecondary hover:text-white hover:bg-white/5' 
                          : 'text-light-textSecondary hover:text-dark-text hover:bg-black/5'
                    }`}
                  >
                    <item.icon className={`text-lg ${activeTab === item.id ? 'text-gold' : 'text-gold/50'}`} />
                    <span>{item.label}</span>
                  </button>
                ))}
                <button
                  onClick={toggleTheme}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm mt-2 text-right ${
                    isDark 
                      ? 'text-dark-textSecondary hover:text-white hover:bg-white/5' 
                      : 'text-light-textSecondary hover:text-dark-text hover:bg-black/5'
                  }`}
                >
                  {isDark ? <FaSun /> : <FaMoon />}
                  <span>{isDark ? 'الوضع الفاتح' : 'الوضع المظلم'}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300 text-sm mt-2 text-right"
                >
                  <FaSignOutAlt /> <span>تسجيل الخروج</span>
                </button>
                <button
                  onClick={() => {
                    onBack();
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm mt-2 text-right ${
                    isDark 
                      ? 'text-dark-textSecondary hover:text-white hover:bg-white/5' 
                      : 'text-light-textSecondary hover:text-dark-text hover:bg-black/5'
                  }`}
                >
                  <FaArrowRight /> <span>العودة للموقع</span>
                </button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;