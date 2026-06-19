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
    {
      id: 2,
      title: 'البلاغة',
      description: 'أساليب البلاغة والبيان وأسرار التعبير القرآني',
      icon: 'FaGraduationCap',
      color: 'from-emerald-500/20 to-emerald-600/10',
      borderColor: 'border-emerald-500/30',
      gradient: 'from-emerald-400 to-emerald-600',
    },
    {
      id: 3,
      title: 'الإملاء والخط',
      description: 'قواعد الإملاء والكتابة الصحيحة وتحسين الخط العربي',
      icon: 'FaPenFancy',
      color: 'from-purple-500/20 to-purple-600/10',
      borderColor: 'border-purple-500/30',
      gradient: 'from-purple-400 to-purple-600',
    },
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
    {
      id: 2,
      title: 'شرح درس البلاغة - التشبيه',
      description: 'فهم أنواع التشبيه وأركانه مع تطبيقات من القرآن الكريم',
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
      duration: '١٦:٥٠',
      views: '٩٣٠',
      likes: '٧١',
      category: 'إملاء',
      date: '٢٠٢٤-٠٢-١٠',
      youtubeId: 'dQw4w9WgXcQ',
      teacher: 'محمد عرلبي',
    },
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
    {
      id: 2,
      title: 'ملزمة النحو - الجزء الثاني',
      size: '٦ ميجابايت',
      category: 'نحو',
      date: '٢٠٢٤-٠٢-٠١',
      downloads: 180,
    },
    {
      id: 3,
      title: 'ملزمة البلاغة - الجزء الأول',
      size: '٤ ميجابايت',
      category: 'بلاغة',
      date: '٢٠٢٤-٠١-٢٠',
      downloads: 200,
    },
    {
      id: 4,
      title: 'ملزمة البلاغة - الجزء الثاني',
      size: '٥ ميجابايت',
      category: 'بلاغة',
      date: '٢٠٢٤-٠٢-١٠',
      downloads: 150,
    },
    {
      id: 5,
      title: 'ملزمة الإملاء - الجزء الأول',
      size: '٣ ميجابايت',
      category: 'إملاء',
      date: '٢٠٢٤-٠١-٢٥',
      downloads: 320,
    },
    {
      id: 6,
      title: 'ملزمة الإملاء - الجزء الثاني',
      size: '٤ ميجابايت',
      category: 'إملاء',
      date: '٢٠٢٤-٠٢-١٥',
      downloads: 210,
    },
  ],
  gallery: [
    {
      id: 1,
      title: 'مع الطلاب',
      category: 'طلاب',
      date: '٢٠٢٤',
      src: '/assets/images/with-students/1.jpg',
    },
    {
      id: 2,
      title: 'في الفصل',
      category: 'تدريس',
      date: '٢٠٢٤',
      src: '/assets/images/with-students/2.jpg',
    },
    {
      id: 3,
      title: 'ورشة عمل',
      category: 'ورش',
      date: '٢٠٢٣',
      src: '/assets/images/with-students/3.jpg',
    },
    {
      id: 4,
      title: 'تكريم',
      category: 'إنجازات',
      date: '٢٠٢٤',
      src: '/assets/images/with-students/4.jpg',
    },
    {
      id: 5,
      title: 'رحلة تعليمية',
      category: 'رحلات',
      date: '٢٠٢٣',
      src: '/assets/images/with-students/5.jpg',
    },
    {
      id: 6,
      title: 'يوم التميز',
      category: 'إنجازات',
      date: '٢٠٢٤',
      src: '/assets/images/with-students/6.jpg',
    },
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
        {
          id: 'q2',
          question: 'أي من التالي يعتبر فعلاً ماضياً؟',
          options: ['يكتب', 'كتب', 'سيكتب', 'اكتب'],
          correct: 1,
        },
        {
          id: 'q3',
          question: 'ما هو إعراب كلمة "الكتاب" في الجملة السابقة؟',
          options: ['فاعل مرفوع', 'مفعول به منصوب', 'مضاف إليه مجرور', 'خبر مرفوع'],
          correct: 1,
        },
        {
          id: 'q4',
          question: 'أي من الأسماء التالية يعتبر اسماً مبنياً؟',
          options: ['محمد', 'هذا', 'كتاب', 'بيت'],
          correct: 1,
        },
        {
          id: 'q5',
          question: 'ما هو جمع كلمة "عالم"؟',
          options: ['عالمون', 'علماء', 'عالِمين', 'عالمات'],
          correct: 1,
        },
      ],
    },
    {
      id: 2,
      title: 'امتحان البلاغة',
      description: 'اختبر فهمك لعلم البلاغة',
      icon: '🎭',
      color: 'from-emerald-500/20 to-emerald-600/10',
      questions: [
        {
          id: 'q1',
          question: 'ما هو التشبيه في قول الشاعر: "وجهه كالبدر"؟',
          options: ['تشبيه بليغ', 'تشبيه تمثيلي', 'تشبيه مجمل', 'تشبيه مفصل'],
          correct: 0,
        },
        {
          id: 'q2',
          question: 'ما هي الاستعارة في قولنا: "رأيت الأسد يخطب"؟',
          options: ['استعارة تصريحية', 'استعارة مكنية', 'استعارة تمثيلية', 'ليس استعارة'],
          correct: 1,
        },
      ],
    },
  ],
  settings: {
    siteName: 'محمد أحمد عرابى',
    siteDescription: 'مدرس لغة عربية للمرحلة الإعدادية',
    primaryColor: '#c9a84c',
    theme: 'dark', // 'dark' | 'light'
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
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    // التحقق من تفضيلات النظام
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('siteData', JSON.stringify(siteData));
  }, [siteData]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    // تطبيق الثيم على جذر الصفحة
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

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
      theme,
      toggleTheme,
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