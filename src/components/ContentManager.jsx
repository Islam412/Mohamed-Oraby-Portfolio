import React, { useState } from 'react';
import { FaSave, FaPlus, FaTrash } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

const ContentManager = () => {
  const { siteData, updateAbout, updateHero, addCourse, deleteCourse, theme } = useApp();
  const isDark = theme === 'dark';
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
      <h2 className="text-2xl font-bold gradient-premium calligraphy">
        إدارة المحتوى
      </h2>

      {/* معلومات المدرس */}
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
            <FaSave />
            حفظ
          </button>
        </div>
      </div>

      {/* معلومات الرئيسية */}
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
            <FaSave />
            حفظ
          </button>
        </div>
      </div>

      {/* إدارة الدورات */}
      <div className="p-6 rounded-2xl glass-premium border border-gold/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-theme-primary">الدورات ({siteData.courses?.length || 0})</h3>
          <button
            onClick={() => setShowAddCourse(!showAddCourse)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-300"
          >
            <FaPlus />
            إضافة دورة
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

export default ContentManager;