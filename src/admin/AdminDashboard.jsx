// src/admin/AdminDashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, FaBook, FaVideo, FaFilePdf, 
  FaImages, FaClipboardList, FaCog, FaSignOutAlt,
  FaBars, FaTimes, FaMoon, FaSun, FaUsers, 
  FaGraduationCap, FaArrowRight, FaSave, FaPlus, 
  FaTrash, FaYoutube, FaClock, FaDownload, FaEye, 
  FaWhatsapp, FaPhone, FaFacebook, FaInstagram, FaGlobe,
  FaHome, FaUpload, FaSpinner, FaCheck, FaEdit,
  FaToggleOn, FaToggleOff, FaStopwatch, FaUserPlus,
  FaFileAlt, FaImage, FaVideo as FaVideoIcon
} from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { toast } from 'react-hot-toast';

// ============================================
// COMPONENT: FileUpload
// ============================================
const FileUpload = ({ onUpload, accept, label, icon: Icon, multiple = false }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    setProgress(0);

    try {
      const results = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        const dataUrl = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        
        results.push({
          file,
          dataUrl,
          name: file.name,
          size: file.size,
          type: file.type,
        });
        
        setProgress(Math.round(((i + 1) / files.length) * 100));
      }
      
      onUpload(multiple ? results : results[0]);
    } catch (error) {
      toast.error('حدث خطأ أثناء رفع الملف');
    } finally {
      setUploading(false);
      setProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
        id={`file-upload-${label}`}
      />
      <label
        htmlFor={`file-upload-${label}`}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
          uploading ? 'border-gold/50 bg-gold/5' : 'border-gold/20 hover:border-gold/40 hover:bg-gold/5'
        }`}
      >
        {uploading ? (
          <div className="flex items-center gap-3">
            <FaSpinner className="animate-spin text-gold" />
            <span className="text-sm text-theme-muted">جاري الرفع... {progress}%</span>
            <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gold rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : (
          <>
            {Icon && <Icon className="text-2xl text-gold" />}
            <div className="text-right">
              <span className="text-sm font-medium text-theme-primary">{label}</span>
              <p className="text-xs text-theme-muted">انقر لاختيار ملف أو اسحب وأفلت</p>
            </div>
          </>
        )}
      </label>
    </div>
  );
};

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
    { icon: FaUsers, label: 'إجمالي الممتحنين', value: siteData.examResults?.length || 0, color: 'from-gold/20 to-gold/10' },
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
    </div>
  );
};

// ============================================
// COMPONENT: ProfileManager (معلومات المدرس)
// ============================================
const ProfileManager = () => {
  const { siteData, updateAbout, updateHero } = useApp();
  const [profileImage, setProfileImage] = useState(siteData.about?.profileImage || '');
  const [aboutData, setAboutData] = useState({
    name: siteData.about?.name || '',
    title: siteData.about?.title || '',
    description: siteData.about?.description || '',
    profileImage: siteData.about?.profileImage || '',
  });

  const handleImageUpload = (file) => {
    setProfileImage(file.dataUrl);
    setAboutData({ ...aboutData, profileImage: file.dataUrl });
    toast.success('تم رفع الصورة بنجاح');
  };

  const handleSave = () => {
    updateAbout(aboutData);
    toast.success('تم حفظ معلومات المدرس بنجاح!');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold gradient-premium calligraphy">معلومات المدرس</h2>
      
      <div className="p-6 rounded-2xl glass-premium border border-gold/10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-2 border-gold/30">
              <img
                src={profileImage || 'https://ui-avatars.com/api/?name=محمد+أحمد+عرابى&size=400&background=1a1a1a&color=c9a84c'}
                alt="صورة المدرس"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <div className="mt-4">
              <FileUpload
                onUpload={handleImageUpload}
                accept="image/*"
                label="رفع صورة المدرس"
                icon={FaImage}
              />
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm mb-1 text-theme-muted">الاسم الكامل</label>
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
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-300"
            >
              <FaSave /> حفظ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// COMPONENT: CoursesManager
// ============================================
const CoursesManager = () => {
  const { siteData, addCourse, deleteCourse } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);

  const iconOptions = [
    { value: 'FaBook', label: '📖 كتاب' },
    { value: 'FaGraduationCap', label: '🎓 قبعة' },
    { value: 'FaPenFancy', label: '✒️ قلم' },
    { value: 'FaBookOpen', label: '📖 كتاب مفتوح' },
    { value: 'FaChalkboardTeacher', label: '👨‍🏫 معلم' },
    { value: 'FaQuran', label: '📖 قرآن' },
    { value: 'FaLanguage', label: '🌐 لغة' },
    { value: 'FaScroll', label: '📜 مخطوطة' },
  ];

  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    icon: 'FaBook',
    color: 'from-amber-500/20 to-amber-600/10',
    borderColor: 'border-amber-500/30',
    gradient: 'from-amber-400 to-amber-600',
  });

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
      setShowAddForm(false);
      toast.success('تم إضافة الدورة بنجاح!');
    }
  };

  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذه الدورة؟')) {
      deleteCourse(id);
      toast.success('تم حذف الدورة بنجاح');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-premium calligraphy">الدورات التعليمية</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-300"
        >
          <FaPlus /> إضافة دورة
        </button>
      </div>

      {showAddForm && (
        <div className="p-6 rounded-2xl glass-premium border border-gold/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-theme-muted">عنوان الدورة</label>
              <input
                type="text"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                placeholder="مثال: النحو والصرف"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-theme-muted">الوصف</label>
              <input
                type="text"
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                placeholder="مثال: قواعد اللغة العربية الأساسية"
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
                  <option key={icon.value} value={icon.value}>{icon.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 text-theme-muted">اللون</label>
              <select
                value={newCourse.color}
                onChange={(e) => setNewCourse({ ...newCourse, color: e.target.value })}
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
              >
                <option value="from-amber-500/20 to-amber-600/10">ذهبي</option>
                <option value="from-emerald-500/20 to-emerald-600/10">زمردي</option>
                <option value="from-purple-500/20 to-purple-600/10">بنفسجي</option>
                <option value="from-blue-500/20 to-blue-600/10">أزرق</option>
                <option value="from-red-500/20 to-red-600/10">أحمر</option>
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
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2 rounded-xl bg-white/5 text-theme-muted hover:bg-white/10 transition-all duration-300"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {siteData.courses?.map((course) => (
          <div key={course.id} className="flex items-center justify-between p-4 rounded-2xl glass-premium border border-white/5">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                <span className="text-2xl">
                  {course.icon === 'FaBook' && '📖'}
                  {course.icon === 'FaGraduationCap' && '🎓'}
                  {course.icon === 'FaPenFancy' && '✒️'}
                  {course.icon === 'FaBookOpen' && '📖'}
                  {course.icon === 'FaChalkboardTeacher' && '👨‍🏫'}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-theme-primary">{course.title}</h4>
                <p className="text-sm text-theme-muted">{course.description}</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(course.id)}
              className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// COMPONENT: VideosManager (مع رفع فيديو محلي)
// ============================================
const VideosManager = () => {
  const { siteData, addVideo, deleteVideo } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [videoSource, setVideoSource] = useState('youtube');

  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    duration: '',
    category: 'نحو',
    youtubeId: '',
    teacher: 'محمد عرلبي',
    source: 'youtube',
    videoFile: null,
  });

  const categories = ['نحو', 'بلاغة', 'إملاء', 'أدب', 'نصوص'];

  const handleFileUpload = (file) => {
    setNewVideo({ ...newVideo, videoFile: file.dataUrl, source: 'local' });
  };

  const handleAddVideo = () => {
    if (newVideo.title && (newVideo.youtubeId || newVideo.videoFile)) {
      addVideo({
        ...newVideo,
        views: '٠',
        likes: '٠',
        date: new Date().toISOString().split('T')[0],
        id: Date.now(),
      });
      setNewVideo({
        title: '',
        description: '',
        duration: '',
        category: 'نحو',
        youtubeId: '',
        teacher: 'محمد عرلبي',
        source: 'youtube',
        videoFile: null,
      });
      setShowAddForm(false);
      toast.success('تم إضافة الفيديو بنجاح!');
    } else {
      toast.error('يرجى إدخال عنوان الفيديو ومصدره');
    }
  };

  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا الفيديو؟')) {
      deleteVideo(id);
      toast.success('تم حذف الفيديو بنجاح');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-premium calligraphy">الفيديوهات</h2>
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
                placeholder="مثال: شرح درس النحو"
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
            <div>
              <label className="block text-sm mb-1 text-theme-muted">المدرس</label>
              <input
                type="text"
                value={newVideo.teacher}
                onChange={(e) => setNewVideo({ ...newVideo, teacher: e.target.value })}
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-2 text-theme-muted">مصدر الفيديو</label>
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setVideoSource('youtube')}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    videoSource === 'youtube' ? 'bg-gold/20 text-gold border border-gold/30' : 'glass-premium text-theme-muted'
                  }`}
                >
                  <FaYoutube className="inline ml-2" /> يوتيوب
                </button>
                <button
                  onClick={() => setVideoSource('local')}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    videoSource === 'local' ? 'bg-gold/20 text-gold border border-gold/30' : 'glass-premium text-theme-muted'
                  }`}
                >
                  <FaUpload className="inline ml-2" /> رفع من الجهاز
                </button>
              </div>

              {videoSource === 'youtube' ? (
                <div>
                  <label className="block text-sm mb-1 text-theme-muted">رابط يوتيوب</label>
                  <input
                    type="text"
                    value={newVideo.youtubeId}
                    onChange={(e) => setNewVideo({ ...newVideo, youtubeId: e.target.value })}
                    placeholder="ضع رابط الفيديو من يوتيوب"
                    className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                  />
                </div>
              ) : (
                <FileUpload
                  onUpload={handleFileUpload}
                  accept="video/*"
                  label="رفع فيديو من الجهاز"
                  icon={FaVideoIcon}
                />
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1 text-theme-muted">الوصف</label>
              <textarea
                value={newVideo.description}
                onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                rows="2"
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none resize-y"
                placeholder="وصف مختصر للفيديو"
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
              <div className="w-24 h-16 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 overflow-hidden">
                {video.source === 'local' && video.videoFile ? (
                  <video src={video.videoFile} className="w-full h-full object-cover" muted />
                ) : (
                  <FaYoutube className="text-3xl text-red-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm truncate text-theme-primary">{video.title}</h4>
                <p className="text-xs truncate text-theme-muted">{video.description}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-theme-muted">
                  <span className="flex items-center gap-1"><FaClock className="text-gold/50" />{video.duration}</span>
                  <span>{video.category}</span>
                  {video.source === 'local' && <span className="text-green-500">📁 محلي</span>}
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
// COMPONENT: MaterialsManager (مع رفع PDF)
// ============================================
const MaterialsManager = () => {
  const { siteData, addMaterial, deleteMaterial } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [newMaterial, setNewMaterial] = useState({
    title: '',
    size: '',
    category: 'نحو',
    date: new Date().toISOString().split('T')[0],
    downloads: 0,
    fileData: null,
    fileName: '',
  });

  const categories = ['نحو', 'بلاغة', 'إملاء', 'أدب', 'نصوص', 'قواعد'];

  const handleFileUpload = (file) => {
    const sizeInMB = (file.file.size / (1024 * 1024));
    const formattedSize = sizeInMB < 1 ? `${(sizeInMB * 1024).toFixed(0)} كيلوبايت` : `${sizeInMB.toFixed(1)} ميجابايت`;
    
    setSelectedFile(file);
    setNewMaterial({
      ...newMaterial,
      fileData: file.dataUrl,
      size: formattedSize,
      fileName: file.name,
    });
  };

  const handleAddMaterial = () => {
    if (newMaterial.title && newMaterial.fileData) {
      addMaterial({
        ...newMaterial,
        id: Date.now(),
      });
      setNewMaterial({
        title: '',
        size: '',
        category: 'نحو',
        date: new Date().toISOString().split('T')[0],
        downloads: 0,
        fileData: null,
        fileName: '',
      });
      setSelectedFile(null);
      setShowAddForm(false);
      toast.success('تم إضافة الملزمة بنجاح!');
    } else {
      toast.error('يرجى إدخال عنوان الملزمة ورفع ملف PDF');
    }
  };

  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذه الملزمة؟')) {
      deleteMaterial(id);
      toast.success('تم حذف الملزمة بنجاح');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-premium calligraphy">الملازم التعليمية</h2>
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
                placeholder="مثال: ملزمة النحو - الجزء الأول"
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
            <div className="md:col-span-2">
              <FileUpload
                onUpload={handleFileUpload}
                accept=".pdf,application/pdf"
                label="رفع ملف PDF"
                icon={FaFilePdf}
              />
              {selectedFile && (
                <div className="mt-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                  <FaFilePdf className="text-red-500 text-2xl" />
                  <div className="flex-1">
                    <p className="text-sm text-theme-primary font-semibold">{selectedFile.name}</p>
                    <p className="text-xs text-theme-muted">الحجم: {newMaterial.size}</p>
                  </div>
                  <FaCheck className="text-green-500" />
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddMaterial}
              disabled={!newMaterial.fileData}
              className="px-6 py-2 rounded-xl bg-gold text-black font-bold hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <span className="flex items-center gap-1"><FaEye className="text-gold/50" />{material.downloads || 0} تحميل</span>
                  {material.fileData && <span className="text-green-500">📁 محلي</span>}
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
// COMPONENT: GalleryManager (مع رفع صور)
// ============================================
const GalleryManager = () => {
  const { siteData, addGalleryImage, deleteGalleryImage } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const [newImage, setNewImage] = useState({
    title: '',
    category: 'طلاب',
    date: new Date().getFullYear().toString(),
    src: '',
  });

  const categories = ['طلاب', 'تدريس', 'ورش', 'إنجازات', 'رحلات', 'أخرى'];

  const handleImageUpload = (files) => {
    const imageFiles = Array.isArray(files) ? files : [files];
    setSelectedImages(imageFiles);
    if (imageFiles.length > 0) {
      setNewImage({
        ...newImage,
        src: imageFiles[0].dataUrl,
      });
    }
  };

  const handleAddImage = () => {
    if (newImage.title && newImage.src) {
      const imagesToAdd = selectedImages.length > 0 ? selectedImages : [newImage];
      imagesToAdd.forEach((img, index) => {
        addGalleryImage({
          ...newImage,
          id: Date.now() + index,
          src: img.dataUrl || newImage.src,
          title: img.name ? img.name.replace(/\.[^/.]+$/, '') : newImage.title,
        });
      });
      setNewImage({
        title: '',
        category: 'طلاب',
        date: new Date().getFullYear().toString(),
        src: '',
      });
      setSelectedImages([]);
      setShowAddForm(false);
      toast.success(`تم إضافة ${imagesToAdd.length} صورة بنجاح!`);
    } else {
      toast.error('يرجى إدخال عنوان الصورة واختيار صورة');
    }
  };

  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
      deleteGalleryImage(id);
      toast.success('تم حذف الصورة بنجاح');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-premium calligraphy">معرض الصور</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-300"
        >
          <FaPlus /> إضافة صور
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
                placeholder="مثال: مع الطلاب في الفصل"
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
              <FileUpload
                onUpload={handleImageUpload}
                accept="image/*"
                label="رفع صور من الجهاز (يمكن اختيار عدة صور)"
                icon={FaImage}
                multiple={true}
              />
              {selectedImages.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedImages.map((img, idx) => (
                    <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-gold/20">
                      <img src={img.dataUrl} alt={img.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <FaCheck className="text-white text-sm" />
                      </div>
                    </div>
                  ))}
                  <span className="text-xs text-theme-muted self-center">{selectedImages.length} صورة مختارة</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddImage}
              disabled={!newImage.src}
              className="px-6 py-2 rounded-xl bg-gold text-black font-bold hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              إضافة {selectedImages.length > 1 ? `(${selectedImages.length} صور)` : ''}
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
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
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
            {image.src && image.src.startsWith('data:image') && (
              <div className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-green-500/80 text-white text-[10px]">
                📁 محلي
              </div>
            )}
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
// COMPONENT: ExamsManager (متقدم مع مؤقت ونتائج)
// ============================================
const ExamsManager = () => {
  const { siteData, addExam, deleteExam, updateExam, addExamResult } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingExam, setEditingExam] = useState(null);

  const [newExam, setNewExam] = useState({
    title: '',
    description: '',
    icon: '📝',
    color: 'from-amber-500/20 to-amber-600/10',
    questions: [],
    duration: 30, // المدة بالدقائق
    isActive: true,
    requiresName: true,
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
      toast.success('تم إضافة السؤال');
    } else {
      toast.error('يرجى إكمال جميع الحقول');
    }
  };

  const handleRemoveQuestion = (index) => {
    setNewExam({
      ...newExam,
      questions: newExam.questions.filter((_, i) => i !== index),
    });
  };

  const handleAddExam = () => {
    if (!newExam.title) {
      toast.error('يرجى إدخال عنوان الامتحان');
      return;
    }
    if (newExam.questions.length === 0) {
      toast.error('يرجى إضافة سؤال واحد على الأقل');
      return;
    }

    addExam({
      ...newExam,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    });

    setNewExam({
      title: '',
      description: '',
      icon: '📝',
      color: 'from-amber-500/20 to-amber-600/10',
      questions: [],
      duration: 30,
      isActive: true,
      requiresName: true,
    });
    setShowAddForm(false);
    toast.success('تم إضافة الامتحان بنجاح!');
  };

  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا الامتحان؟')) {
      deleteExam(id);
      toast.success('تم حذف الامتحان بنجاح');
    }
  };

  const toggleExamStatus = (exam) => {
    updateExam(exam.id, { ...exam, isActive: !exam.isActive });
    toast.success(`تم ${exam.isActive ? 'تعطيل' : 'تفعيل'} الامتحان`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-premium calligraphy">الامتحانات</h2>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1 text-theme-muted">عنوان الامتحان</label>
                <input
                  type="text"
                  value={newExam.title}
                  onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                  placeholder="مثال: امتحان النحو"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-theme-muted">الوصف</label>
                <input
                  type="text"
                  value={newExam.description}
                  onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                  placeholder="مثال: اختبر معلوماتك في النحو"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-theme-muted">المدة (بالدقائق)</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={newExam.duration}
                  onChange={(e) => setNewExam({ ...newExam, duration: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-theme-muted">
                  <input
                    type="checkbox"
                    checked={newExam.isActive}
                    onChange={(e) => setNewExam({ ...newExam, isActive: e.target.checked })}
                    className="w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold/30"
                  />
                  مفعل
                </label>
                <label className="flex items-center gap-2 text-sm text-theme-muted">
                  <input
                    type="checkbox"
                    checked={newExam.requiresName}
                    onChange={(e) => setNewExam({ ...newExam, requiresName: e.target.checked })}
                    className="w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold/30"
                  />
                  طلب اسم المستخدم
                </label>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4">
              <h4 className={`font-bold mb-3 flex items-center gap-2 text-theme-primary`}>
                <FaClipboardList className="text-gold" />
                الأسئلة ({newExam.questions.length})
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1 text-theme-muted">السؤال</label>
                  <input
                    type="text"
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                    placeholder="أدخل نص السؤال"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {newQuestion.options.map((opt, idx) => (
                    <div key={idx}>
                      <label className={`block text-sm mb-1 ${idx === newQuestion.correct ? 'text-green-500' : 'text-theme-muted'}`}>
                        الخيار {idx + 1} {idx === newQuestion.correct && '✅ (الصحيح)'}
                      </label>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...newQuestion.options];
                          newOpts[idx] = e.target.value;
                          setNewQuestion({ ...newQuestion, options: newOpts });
                        }}
                        className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                        placeholder={`الخيار ${idx + 1}`}
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
                    <div key={idx} className={`flex items-center justify-between p-3 rounded-xl bg-white/5`}>
                      <div className="flex-1">
                        <p className="text-sm text-theme-primary">
                          {idx + 1}. {q.question}
                        </p>
                        <p className="text-xs text-theme-muted">
                          الإجابة الصحيحة: {q.options[q.correct]}
                        </p>
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
                إضافة الامتحان ({newExam.questions.length} سؤال)
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

      <div className="grid grid-cols-1 gap-4">
        {siteData.exams?.map((exam) => (
          <div key={exam.id} className="p-4 rounded-2xl glass-premium border border-white/5 hover:border-gold/30 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{exam.icon}</span>
                  <div>
                    <h4 className="font-bold text-theme-primary">{exam.title}</h4>
                    <p className="text-sm text-theme-muted">{exam.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-theme-muted">
                  <span className="flex items-center gap-1"><FaClipboardList className="text-gold/50" />{exam.questions?.length || 0} أسئلة</span>
                  <span className="flex items-center gap-1"><FaClock className="text-gold/50" />{exam.duration || 30} دقيقة</span>
                  <span className={`flex items-center gap-1 ${exam.isActive ? 'text-green-500' : 'text-red-500'}`}>
                    {exam.isActive ? <FaToggleOn /> : <FaToggleOff />}
                    {exam.isActive ? 'مفعل' : 'معطل'}
                  </span>
                  {exam.requiresName && <span className="flex items-center gap-1"><FaUserPlus className="text-gold/50" />طلب اسم</span>}
                  <span className="flex items-center gap-1"><FaUsers className="text-gold/50" />{exam.results?.length || 0} ممتحن</span>
                </div>
                {exam.results && exam.results.length > 0 && (
                  <div className="mt-2 p-2 rounded-xl bg-white/5">
                    <p className="text-xs text-theme-muted">آخر النتائج:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {exam.results.slice(-3).map((result, idx) => (
                        <span key={idx} className="text-xs bg-gold/10 px-2 py-1 rounded-lg text-gold">
                          {result.studentName}: {result.score}/{exam.questions.length}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => toggleExamStatus(exam)}
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    exam.isActive ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                  }`}
                >
                  {exam.isActive ? <FaToggleOn className="text-lg" /> : <FaToggleOff className="text-lg" />}
                </button>
                <button
                  onClick={() => handleDelete(exam.id)}
                  className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300"
                >
                  <FaTrash />
                </button>
              </div>
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
    toast.success('تم حفظ الإعدادات بنجاح!');
  };

  const handleReset = () => {
    if (confirm('هل أنت متأكد من إعادة تعيين جميع البيانات إلى الافتراضية؟')) {
      resetData();
      toast.success('تم إعادة تعيين جميع البيانات!');
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
          {[
            { icon: FaWhatsapp, key: 'whatsapp', label: 'رابط واتساب', color: 'text-green-500' },
            { icon: FaPhone, key: 'phone', label: 'رقم الهاتف', color: 'text-gold' },
            { icon: FaFacebook, key: 'facebook', label: 'رابط فيسبوك', color: 'text-blue-500' },
            { icon: FaInstagram, key: 'instagram', label: 'رابط انستجرام', color: 'text-pink-500' },
            { icon: FaYoutube, key: 'youtube', label: 'رابط يوتيوب', color: 'text-red-500' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className="flex items-center gap-3">
                <Icon className={`text-2xl ${item.color} flex-shrink-0`} />
                <input
                  type="text"
                  value={settings.socialLinks[item.key]}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, [item.key]: e.target.value }
                  })}
                  placeholder={item.label}
                  className="flex-1 px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none min-w-0"
                />
              </div>
            );
          })}
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
    { id: 'profile', icon: FaUser, label: 'معلومات المدرس' },
    { id: 'courses', icon: FaBook, label: 'الدورات' },
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
      toast.success('تم تسجيل الخروج بنجاح');
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <DashboardStats />;
      case 'profile': return <ProfileManager />;
      case 'courses': return <CoursesManager />;
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
      <div 
        className={`hidden lg:block fixed top-0 right-0 h-full w-72 z-50 transition-all duration-300 overflow-y-auto ${
          isDark ? 'bg-dark-secondary/95' : 'bg-light-secondary/95'
        } border-l border-gold/10`}
        style={{ transform: sidebarOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
              <FaGraduationCap className="text-2xl text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`font-bold text-sm truncate ${isDark ? 'text-white' : 'text-dark-text'}`}>
                لوحة التحكم
              </h3>
              <p className={`text-xs truncate ${isDark ? 'text-dark-textMuted' : 'text-light-textMuted'}`}>
                محمد أحمد عرابى
              </p>
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

      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="hidden lg:flex fixed top-4 right-4 z-50 p-2 rounded-xl glass-premium border border-gold/10 text-gold hover:bg-gold/10 transition-all duration-300"
      >
        <FaBars />
      </button>

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
      <div 
        className={`flex-1 min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'lg:mr-72' : 'lg:mr-0'
        }`}
      >
        <div className="p-4 md:p-6 lg:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;