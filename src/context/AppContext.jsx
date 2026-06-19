import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// البيانات الافتراضية
const defaultData = {
  about: {
    name: 'محمد أحمد عرابى',
    title: 'مدرس لغة عربية للمرحلة الإعدادية',
    description: 'معلم لغة عربية متخصص في تدريس المرحلة الإعدادية. أؤمن بأن اللغة العربية هي هويتنا ووسيلة التواصل الحضاري، وأسعى دائماً لتقديم محتوى تعليمي متميز يجمع بين الأصالة والمعاصرة.',
    stats: [
      { icon: 'FaGraduationCap', label: 'المؤهل', value: 'ليسانس آداب - قسم اللغة العربية' },
      { icon: 'FaChalkboardTeacher', label: 'الخبرة', value: '٥ سنوات في تدريس المرحلة الإعدادية' },
      { icon: 'FaCertificate', label: 'الشهادات', value: 'دبلوم تربوي - متخصص في المناهج' },
      { icon: 'FaAward', label: 'الإنجازات', value: 'حاصل على جائزة أفضل معلم لعام ٢٠٢٤' },
    ]
  },
  hero: {
    title: 'محمد أحمد عرابى',
    subtitle: 'مدرس لغة عربية للمرحلة الإعدادية',
    description: 'أهلاً بكم في موقعي التعليمي. هنا ستجدون كل ما تحتاجونه لإتقان اللغة العربية من شروحات، ملازم، وفيديوهات تعليمية متميزة.',
    stats: [
      { icon: 'FaUsers', value: '+٥٠٠', label: 'طالب' },
      { icon: 'FaBookOpen', value: '+١٠٠', label: 'فيديو شرح' },
      { icon: 'FaStar', value: '+٥', label: 'سنوات خبرة' },
    ]
  },
  courses: [
    {
      id: 1,
      title: 'النحو والصرف',
      description: 'قواعد اللغة العربية الأساسية والمتقدمة',
      icon: 'FaBook',
      color: 'from-amber-500/20 to-amber-600/10',
      borderColor: 'border-amber-500/30',
      gradient: 'from-amber-400 to-amber-600',
    },
    // ... باقي الدورات
  ],
  videos: [
    {
      id: 1,
      title: 'شرح درس النحو - الجملة الاسمية',
      description: 'تعلم قواعد الجملة الاسمية في النحو العربي مع أمثلة تطبيقية',
      duration: '٢٠:٣٠',
      views: '١.٢٥٠',
      likes: '٨٩',
      category: 'نحو',
      date: '٢٠٢٤-٠١-١٥',
      youtubeId: 'dQw4w9WgXcQ',
      teacher: 'محمد عرلبي',
    },
    // ... باقي الفيديوهات
  ],
  materials: [
    {
      id: 1,
      title: 'ملزمة النحو - الجزء الأول',
      size: '٥ ميجابايت',
      category: 'نحو',
      date: '٢٠٢٤-٠١-١٥',
      downloads: 250,
    },
    // ... باقي الملازم
  ],
  gallery: [
    {
      id: 1,
      title: 'مع الطلاب',
      category: 'طلاب',
      date: '٢٠٢٤',
      image: '/assets/images/with-students/1.jpg',
    },
    // ... باقي الصور
  ],
  exams: [
    {
      id: 1,
      title: 'امتحان النحو',
      description: 'اختبر معلوماتك في قواعد النحو',
      icon: '📝',
      color: 'from-amber-500/20 to-amber-600/10',
      questions: [
        {
          id: 'q1',
          question: 'ما هو الفاعل في الجملة: "قرأ الطالب الكتاب"؟',
          options: ['الطالب', 'الكتاب', 'قرأ', 'لا يوجد'],
          correct: 0,
        },
        // ... باقي الأسئلة
      ],
    },
    // ... باقي الامتحانات
  ],
  settings: {
    siteName: 'محمد أحمد عرابى',
    siteDescription: 'مدرس لغة عربية للمرحلة الإعدادية',
    primaryColor: '#c9a84c',
    socialLinks: {
      whatsapp: 'https://wa.me/201140739030',
      phone: 'tel:+201140739030',
      facebook: 'https://www.facebook.com/share/18pihwFGkc/',
      instagram: 'https://www.instagram.com/mohamedahmedebrahiem',
      youtube: '#',
    }
  }
};

export const AppProvider = ({ children }) => {
  const [siteData, setSiteData] = useState(() => {
    const saved = localStorage.getItem('siteData');
    return saved ? JSON.parse(saved) : defaultData;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('siteData', JSON.stringify(siteData));
  }, [siteData]);

  // دوال لإدارة المحتوى
  const updateAbout = (data) => {
    setSiteData(prev => ({ ...prev, about: { ...prev.about, ...data } }));
  };

  const updateHero = (data) => {
    setSiteData(prev => ({ ...prev, hero: { ...prev.hero, ...data } }));
  };

  const addCourse = (course) => {
    setSiteData(prev => ({
      ...prev,
      courses: [...prev.courses, { ...course, id: Date.now() }]
    }));
  };

  const updateCourse = (id, data) => {
    setSiteData(prev => ({
      ...prev,
      courses: prev.courses.map(c => c.id === id ? { ...c, ...data } : c)
    }));
  };

  const deleteCourse = (id) => {
    setSiteData(prev => ({
      ...prev,
      courses: prev.courses.filter(c => c.id !== id)
    }));
  };

  const addVideo = (video) => {
    setSiteData(prev => ({
      ...prev,
      videos: [...prev.videos, { ...video, id: Date.now() }]
    }));
  };

  const updateVideo = (id, data) => {
    setSiteData(prev => ({
      ...prev,
      videos: prev.videos.map(v => v.id === id ? { ...v, ...data } : v)
    }));
  };

  const deleteVideo = (id) => {
    setSiteData(prev => ({
      ...prev,
      videos: prev.videos.filter(v => v.id !== id)
    }));
  };

  const addMaterial = (material) => {
    setSiteData(prev => ({
      ...prev,
      materials: [...prev.materials, { ...material, id: Date.now() }]
    }));
  };

  const updateMaterial = (id, data) => {
    setSiteData(prev => ({
      ...prev,
      materials: prev.materials.map(m => m.id === id ? { ...m, ...data } : m)
    }));
  };

  const deleteMaterial = (id) => {
    setSiteData(prev => ({
      ...prev,
      materials: prev.materials.filter(m => m.id !== id)
    }));
  };

  const addGalleryImage = (image) => {
    setSiteData(prev => ({
      ...prev,
      gallery: [...prev.gallery, { ...image, id: Date.now() }]
    }));
  };

  const deleteGalleryImage = (id) => {
    setSiteData(prev => ({
      ...prev,
      gallery: prev.gallery.filter(g => g.id !== id)
    }));
  };

  const addExam = (exam) => {
    setSiteData(prev => ({
      ...prev,
      exams: [...prev.exams, { ...exam, id: Date.now() }]
    }));
  };

  const updateExam = (id, data) => {
    setSiteData(prev => ({
      ...prev,
      exams: prev.exams.map(e => e.id === id ? { ...e, ...data } : e)
    }));
  };

  const deleteExam = (id) => {
    setSiteData(prev => ({
      ...prev,
      exams: prev.exams.filter(e => e.id !== id)
    }));
  };

  const updateSettings = (data) => {
    setSiteData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...data }
    }));
  };

  const login = (password) => {
    // يمكنك تغيير كلمة المرور هنا
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const resetData = () => {
    if (confirm('هل أنت متأكد من إعادة تعيين جميع البيانات؟')) {
      setSiteData(defaultData);
      localStorage.setItem('siteData', JSON.stringify(defaultData));
    }
  };

  return (
    <AppContext.Provider value={{
      siteData,
      isAdmin,
      loading,
      updateAbout,
      updateHero,
      addCourse,
      updateCourse,
      deleteCourse,
      addVideo,
      updateVideo,
      deleteVideo,
      addMaterial,
      updateMaterial,
      deleteMaterial,
      addGalleryImage,
      deleteGalleryImage,
      addExam,
      updateExam,
      deleteExam,
      updateSettings,
      login,
      logout,
      resetData,
      setLoading,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};