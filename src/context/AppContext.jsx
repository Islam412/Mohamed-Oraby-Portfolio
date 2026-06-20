// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  FaUsers, FaBookOpen, FaStar, FaGraduationCap, 
  FaChalkboardTeacher, FaCertificate, FaAward, FaBook,
  FaPenFancy, FaBookOpen as FaBookOpenIcon
} from 'react-icons/fa';

const AppContext = createContext();

// البيانات الافتراضية
const defaultData = {
  about: {
    name: 'محمد أحمد عرابى',
    title: 'مدرس لغة عربية للمرحلة الإعدادية',
    description: 'معلم لغة عربية متخصص في تدريس المرحلة الإعدادية. أؤمن بأن اللغة العربية هي هويتنا ووسيلة التواصل الحضاري، وأسعى دائماً لتقديم محتوى تعليمي متميز يجمع بين الأصالة والمعاصرة.',
    profileImage: '',
    stats: [
      { icon: FaGraduationCap, label: 'المؤهل', value: 'ليسانس آداب - قسم اللغة العربية' },
      { icon: FaChalkboardTeacher, label: 'الخبرة', value: '٥ سنوات في تدريس المرحلة الإعدادية' },
      { icon: FaCertificate, label: 'الشهادات', value: 'دبلوم تربوي - متخصص في المناهج' },
      { icon: FaAward, label: 'الإنجازات', value: 'حاصل على جائزة أفضل معلم لعام ٢٠٢٤' },
    ]
  },
  hero: {
    title: 'محمد أحمد عرابى',
    subtitle: 'مدرس لغة عربية للمرحلة الإعدادية',
    description: 'أهلاً بكم في موقعي التعليمي. هنا ستجدون كل ما تحتاجونه لإتقان اللغة العربية من شروحات، ملازم، وفيديوهات تعليمية متميزة.',
    stats: [
      { icon: FaUsers, value: '+٥٠٠', label: 'طالب' },
      { icon: FaBookOpen, value: '+١٠٠', label: 'فيديو شرح' },
      { icon: FaStar, value: '+٥', label: 'سنوات خبرة' },
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
  videos: [],
  materials: [],
  gallery: [],
  exams: [],
  examResults: [],
  settings: {
    siteName: 'محمد أحمد عرابى',
    siteDescription: 'مدرس لغة عربية للمرحلة الإعدادية',
    primaryColor: '#c9a84c',
    theme: 'dark',
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
  // دالة لاستخراج معرف يوتيوب
  const extractYoutubeId = (input) => {
    if (!input) return '';
    const trimmed = String(input).trim();
    const match = trimmed.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : trimmed;
  };

  // تحميل البيانات من localStorage
  const loadData = () => {
    try {
      const saved = localStorage.getItem('siteData');
      if (saved) {
        const parsed = JSON.parse(saved);
        const mergedVideos = (parsed.videos || defaultData.videos).map(video => ({
          ...video,
          youtubeId: extractYoutubeId(video.youtubeId),
        }));
        return {
          ...defaultData,
          ...parsed,
          about: { ...defaultData.about, ...parsed.about, stats: defaultData.about.stats },
          hero: { ...defaultData.hero, ...parsed.hero, stats: defaultData.hero.stats },
          courses: parsed.courses || defaultData.courses,
          videos: mergedVideos,
          materials: parsed.materials || defaultData.materials,
          gallery: parsed.gallery || defaultData.gallery,
          exams: parsed.exams || defaultData.exams,
          examResults: parsed.examResults || [],
          settings: { ...defaultData.settings, ...parsed.settings },
        };
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
    return defaultData;
  };

  const [siteData, setSiteData] = useState(loadData);
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
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

  // دوال إدارة المحتوى
  const updateAbout = (data) => {
    setSiteData(prev => {
      const newData = { ...prev, about: { ...prev.about, ...data } };
      localStorage.setItem('siteData', JSON.stringify(newData));
      return newData;
    });
  };

  const updateHero = (data) => {
    setSiteData(prev => {
      const newData = { ...prev, hero: { ...prev.hero, ...data } };
      localStorage.setItem('siteData', JSON.stringify(newData));
      return newData;
    });
  };

  const addCourse = (course) => {
    setSiteData(prev => {
      const newData = {
        ...prev,
        courses: [...prev.courses, { ...course, id: Date.now() }]
      };
      localStorage.setItem('siteData', JSON.stringify(newData));
      return newData;
    });
  };

  const updateCourse = (id, data) => {
    setSiteData(prev => {
      const newData = {
        ...prev,
        courses: prev.courses.map(c => c.id === id ? { ...c, ...data } : c)
      };
      localStorage.setItem('siteData', JSON.stringify(newData));
      return newData;
    });
  };

  const deleteCourse = (id) => {
    setSiteData(prev => {
      const newData = {
        ...prev,
        courses: prev.courses.filter(c => c.id !== id)
      };
      localStorage.setItem('siteData', JSON.stringify(newData));
      return newData;
    });
  };

  const addVideo = (video) => {
    setSiteData(prev => {
      const newData = {
        ...prev,
        videos: [...prev.videos, { ...video, youtubeId: extractYoutubeId(video.youtubeId), id: Date.now() }]
      };
      localStorage.setItem('siteData', JSON.stringify(newData));
      return newData;
    });
  };

  const updateVideo = (id, data) => {
    setSiteData(prev => {
      const newData = {
        ...prev,
        videos: prev.videos.map(v => v.id === id ? { ...v, ...data } : v)
      };
      localStorage.setItem('siteData', JSON.stringify(newData));
      return newData;
    });
  };

  const deleteVideo = (id) => {
    setSiteData(prev => {
      const newData = {
        ...prev,
        videos: prev.videos.filter(v => v.id !== id)
      };
      localStorage.setItem('siteData', JSON.stringify(newData));
      return newData;
    });
  };

  const addMaterial = (material) => {
    setSiteData(prev => {
      const newData = {
        ...prev,
        materials: [...prev.materials, { ...material, id: Date.now() }]
      };
      localStorage.setItem('siteData', JSON.stringify(newData));
      return newData;
    });
  };

  const updateMaterial = (id, data) => {
    setSiteData(prev => {
      const newData = {
        ...prev,
        materials: prev.materials.map(m => m.id === id ? { ...m, ...data } : m)
      };
      localStorage.setItem('siteData', JSON.stringify(newData));
      return newData;
    });
  };

  const deleteMaterial = (id) => {
    setSiteData(prev => {
      const newData = {
        ...prev,
        materials: prev.materials.filter(m => m.id !== id)
      };
      localStorage.setItem('siteData', JSON.stringify(newData));
      return newData;
    });
  };

  const addGalleryImage = (image) => {
    setSiteData(prev => {
      const newData = {
        ...prev,
        gallery: [...prev.gallery, { ...image, id: Date.now() }]
      };
      localStorage.setItem('siteData', JSON.stringify(newData));
      return newData;
    });
  };

  const deleteGalleryImage = (id) => {
    setSiteData(prev => {
      const newData = {
        ...prev,
        gallery: prev.gallery.filter(g => g.id !== id)
      };
      localStorage.setItem('siteData', JSON.stringify(newData));
      return newData;
    });
  };

  const addExam = (exam) => {
    setSiteData(prev => {
      const newData = {
        ...prev,
        exams: [...prev.exams, { ...exam, id: Date.now(), results: [] }]
      };
      localStorage.setItem('siteData', JSON.stringify(newData));
      return newData;
    });
  };

  const updateExam = (id, data) => {
    setSiteData(prev => {
      const newData = {
        ...prev,
        exams: prev.exams.map(e => e.id === id ? { ...e, ...data } : e)
      };
      localStorage.setItem('siteData', JSON.stringify(newData));
      return newData;
    });
  };

  const deleteExam = (id) => {
    setSiteData(prev => {
      const newData = {
        ...prev,
        exams: prev.exams.filter(e => e.id !== id)
      };
      localStorage.setItem('siteData', JSON.stringify(newData));
      return newData;
    });
  };

  const addExamResult = (examId, result) => {
    setSiteData(prev => {
      const exams = prev.exams.map(e => {
        if (e.id === examId) {
          const results = [...(e.results || []), { ...result, date: new Date().toISOString() }];
          return { ...e, results };
        }
        return e;
      });
      const newData = { ...prev, exams };
      localStorage.setItem('siteData', JSON.stringify(newData));
      return newData;
    });
  };

  const updateSettings = (data) => {
    setSiteData(prev => {
      const newData = {
        ...prev,
        settings: { ...prev.settings, ...data }
      };
      localStorage.setItem('siteData', JSON.stringify(newData));
      return newData;
    });
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
      window.location.reload();
    }
  };

  const refreshData = () => {
    setSiteData(loadData());
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
      addExamResult,
      updateSettings,
      login,
      logout,
      resetData,
      refreshData,
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