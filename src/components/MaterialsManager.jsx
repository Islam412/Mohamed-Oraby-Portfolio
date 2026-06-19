import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaFilePdf, FaDownload, FaClock, FaEye } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

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
          <FaPlus />
          إضافة ملزمة
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
                <label className="block text-sm text-textMuted mb-1">عنوان الملزمة</label>
                <input
                  type="text"
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-textMuted mb-1">الحجم</label>
                <input
                  type="text"
                  value={newMaterial.size}
                  onChange={(e) => setNewMaterial({ ...newMaterial, size: e.target.value })}
                  placeholder="٥ ميجابايت"
                  className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-textMuted mb-1">التصنيف</label>
                <select
                  value={newMaterial.category}
                  onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white outline-none"
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
                className="px-6 py-2 rounded-xl bg-white/5 text-textMuted hover:bg-white/10 transition-all duration-300"
              >
                إلغاء
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* قائمة الملازم */}
      <div className="space-y-2">
        {siteData.materials.map((material) => (
          <motion.div
            key={material.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 rounded-2xl glass-premium border border-white/5"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <FaFilePdf className="text-2xl text-red-400" />
              </div>
              <div>
                <h4 className="font-bold text-white">{material.title}</h4>
                <div className="flex items-center gap-3 text-xs text-textMuted">
                  <span className="flex items-center gap-1">
                    <FaDownload className="text-gold/50" />
                    {material.size}
                  </span>
                  <span>{material.category}</span>
                  <span>{material.date}</span>
                  <span className="flex items-center gap-1">
                    <FaEye className="text-gold/50" />
                    {material.downloads} تحميل
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDelete(material.id)}
              className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300"
            >
              <FaTrash />
            </button>
          </motion.div>
        ))}
      </div>

      {siteData.materials.length === 0 && (
        <div className="text-center py-12 text-textMuted">
          <FaFilePdf className="text-6xl mx-auto mb-4 opacity-30" />
          <p>لا توجد ملازم حالياً</p>
          <p className="text-sm">اضغط على "إضافة ملزمة" لإضافة أول ملزمة</p>
        </div>
      )}
    </div>
  );
};

export default MaterialsManager;