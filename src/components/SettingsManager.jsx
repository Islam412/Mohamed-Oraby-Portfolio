import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaWhatsapp, FaPhone, FaFacebook, FaInstagram, FaYoutube, FaPalette, FaGlobe } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

const SettingsManager = () => {
  const { siteData, updateSettings, resetData } = useApp();
  
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
    if (confirm('هل أنت متأكد من إعادة تعيين جميع البيانات إلى الافتراضية؟ هذا الإجراء لا يمكن التراجع عنه!')) {
      resetData();
      alert('تم إعادة تعيين جميع البيانات!');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold gradient-premium calligraphy">إعدادات الموقع</h2>

      {/* الإعدادات العامة */}
      <div className="p-6 rounded-2xl glass-premium border border-gold/10">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FaGlobe className="text-gold" />
          الإعدادات العامة
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-textMuted mb-1">اسم الموقع</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-textMuted mb-1">وصف الموقع</label>
            <input
              type="text"
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-textMuted mb-1">اللون الرئيسي</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="w-12 h-12 rounded-xl cursor-pointer border border-white/5"
              />
              <span className="text-sm text-textMuted">{settings.primaryColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* روابط التواصل الاجتماعي */}
      <div className="p-6 rounded-2xl glass-premium border border-gold/10">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FaWhatsapp className="text-gold" />
          روابط التواصل الاجتماعي
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FaWhatsapp className="text-2xl text-green-500" />
            <input
              type="text"
              value={settings.socialLinks.whatsapp}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, whatsapp: e.target.value }
              })}
              placeholder="رابط واتساب"
              className="flex-1 px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <FaPhone className="text-2xl text-gold" />
            <input
              type="text"
              value={settings.socialLinks.phone}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, phone: e.target.value }
              })}
              placeholder="رقم الهاتف"
              className="flex-1 px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <FaFacebook className="text-2xl text-blue-500" />
            <input
              type="text"
              value={settings.socialLinks.facebook}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, facebook: e.target.value }
              })}
              placeholder="رابط فيسبوك"
              className="flex-1 px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <FaInstagram className="text-2xl text-pink-500" />
            <input
              type="text"
              value={settings.socialLinks.instagram}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, instagram: e.target.value }
              })}
              placeholder="رابط انستجرام"
              className="flex-1 px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <FaYoutube className="text-2xl text-red-500" />
            <input
              type="text"
              value={settings.socialLinks.youtube}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, youtube: e.target.value }
              })}
              placeholder="رابط يوتيوب"
              className="flex-1 px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white outline-none"
            />
          </div>
        </div>
      </div>

      {/* أزرار الإجراءات */}
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
          className="px-6 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300"
        >
          إعادة تعيين جميع البيانات
        </button>
      </div>
    </div>
  );
};

export default SettingsManager;