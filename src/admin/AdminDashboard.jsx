import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  FaHome, FaUser, FaBook, FaVideo, FaFilePdf, 
  FaImages, FaClipboardList, FaCog, FaSignOutAlt,
  FaBars, FaTimes, FaDashboard, FaChartLine,
  FaUsers, FaEye, FaHeart, FaGraduationCap,
  FaStar, FaBookOpen, FaFileAlt
} from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import ContentManager from './components/ContentManager';
import VideosManager from './components/VideosManager';
import MaterialsManager from './components/MaterialsManager';
import GalleryManager from './components/GalleryManager';
import ExamsManager from './components/ExamsManager';
import SettingsManager from './components/SettingsManager';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout, siteData } = useApp();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin', icon: FaDashboard, label: 'لوحة المعلومات' },
    { path: '/admin/content', icon: FaUser, label: 'المحتوى الرئيسي' },
    { path: '/admin/videos', icon: FaVideo, label: 'الفيديوهات' },
    { path: '/admin/materials', icon: FaFilePdf, label: 'الملازم' },
    { path: '/admin/gallery', icon: FaImages, label: 'المعرض' },
    { path: '/admin/exams', icon: FaClipboardList, label: 'الامتحانات' },
    { path: '/admin/settings', icon: FaCog, label: 'الإعدادات' },
  ];

  const handleLogout = () => {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
      logout();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-primary flex">
      {/* Sidebar - Desktop */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:block fixed top-0 right-0 h-full w-72 bg-secondary/95 border-l border-gold/10 z-50"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
              <FaGraduationCap className="text-2xl text-gold" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">لوحة التحكم</h3>
              <p className="text-xs text-textMuted">محمد أحمد عرابى</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-textSecondary hover:text-white hover:bg-white/5 transition-all duration-300 group"
              >
                <item.icon className="text-gold/50 group-hover:text-gold transition-all duration-300" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-6 right-6 left-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300 text-sm"
            >
              <FaSignOutAlt />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </motion.div>

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
        className="lg:hidden fixed top-4 right-4 z-50 p-3 rounded-xl glass-premium border border-gold/10 text-gold"
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
            className="lg:hidden fixed inset-0 z-40 bg-secondary/98 backdrop-blur-xl"
          >
            <div className="p-6 pt-20">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-textSecondary hover:text-white hover:bg-white/5 transition-all duration-300"
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon className="text-gold" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300 text-sm mt-4"
                >
                  <FaSignOutAlt />
                  <span>تسجيل الخروج</span>
                </button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:mr-72' : 'lg:mr-0'} min-h-screen`}>
        <div className="p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<DashboardStats />} />
            <Route path="/content" element={<ContentManager />} />
            <Route path="/videos" element={<VideosManager />} />
            <Route path="/materials" element={<MaterialsManager />} />
            <Route path="/gallery" element={<GalleryManager />} />
            <Route path="/exams" element={<ExamsManager />} />
            <Route path="/settings" element={<SettingsManager />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// لوحة المعلومات
const DashboardStats = () => {
  const { siteData } = useApp();
  const stats = [
    { icon: FaBook, label: 'الدورات', value: siteData.courses.length, color: 'from-amber-500/20 to-amber-600/10' },
    { icon: FaVideo, label: 'الفيديوهات', value: siteData.videos.length, color: 'from-blue-500/20 to-blue-600/10' },
    { icon: FaFilePdf, label: 'الملازم', value: siteData.materials.length, color: 'from-red-500/20 to-red-600/10' },
    { icon: FaImages, label: 'الصور', value: siteData.gallery.length, color: 'from-purple-500/20 to-purple-600/10' },
    { icon: FaClipboardList, label: 'الامتحانات', value: siteData.exams.length, color: 'from-emerald-500/20 to-emerald-600/10' },
    { icon: FaUsers, label: 'إجمالي الطلاب', value: '+٥٠٠', color: 'from-gold/20 to-gold/10' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold gradient-premium mb-6 calligraphy">لوحة المعلومات</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 rounded-2xl glass-premium border border-gold/10"
          >
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
              <stat.icon className="text-2xl text-gold" />
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-textMuted">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 p-6 rounded-2xl glass-premium border border-gold/10">
        <h3 className="font-bold text-white mb-4">إجراءات سريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <Link to="/admin/content" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 text-center text-sm text-textSecondary hover:text-white">
            <FaUser className="text-gold mx-auto mb-2" />
            تعديل المحتوى
          </Link>
          <Link to="/admin/videos" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 text-center text-sm text-textSecondary hover:text-white">
            <FaVideo className="text-gold mx-auto mb-2" />
            إضافة فيديو
          </Link>
          <Link to="/admin/materials" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 text-center text-sm text-textSecondary hover:text-white">
            <FaFilePdf className="text-gold mx-auto mb-2" />
            رفع ملزمة
          </Link>
          <Link to="/admin/exams" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 text-center text-sm text-textSecondary hover:text-white">
            <FaClipboardList className="text-gold mx-auto mb-2" />
            إضافة امتحان
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;