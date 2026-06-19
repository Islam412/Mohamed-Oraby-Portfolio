import React, { useState } from 'react';
import { FaSave, FaWhatsapp, FaPhone, FaFacebook, FaInstagram, FaYoutube, FaGlobe, FaMoon, FaSun, FaTrash } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

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

      {/* الوضع المظلم/الفاتح */}
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

      {/* الإعدادات العامة */}
      <div className="p-6 rounded-2xl glass-premium border border-gold/10">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-theme-primary">
          <FaGlobe className="text-gold" />
          الإعدادات العامة
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

      {/* روابط التواصل الاجتماعي */}
      <div className="p-6 rounded-2xl glass-premium border border-gold/10">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-theme-primary">
          <FaWhatsapp className="text-gold" />
          روابط التواصل الاجتماعي
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
          <FaSave />
          حفظ الإعدادات
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300"
        >
          <FaTrash />
          إعادة تعيين جميع البيانات
        </button>
      </div>
    </div>
  );
};

export default SettingsManager;