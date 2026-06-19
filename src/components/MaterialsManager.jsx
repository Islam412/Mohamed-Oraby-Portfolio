import React, { useState, useRef } from 'react';
import { FaPlus, FaTrash, FaFilePdf, FaDownload, FaEye, FaUpload, FaSpinner } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

const MaterialsManager = () => {
  const { siteData, addMaterial, deleteMaterial, theme } = useApp();
  const isDark = theme === 'dark';
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const [newMaterial, setNewMaterial] = useState({
    title: '',
    size: '',
    category: 'نحو',
    date: new Date().toISOString().split('T')[0],
    downloads: 0,
    fileData: null,
    fileName: '',
  });

  const categories = ['نحو', 'بلاغة', 'إملاء'];

  // دالة لرفع ملف PDF مع حساب الحجم تلقائياً
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // التحقق من نوع الملف
      if (file.type !== 'application/pdf') {
        alert('يرجى اختيار ملف PDF فقط');
        e.target.value = '';
        return;
      }

      setUploading(true);
      setUploadProgress(0);

      // حساب حجم الملف بالميجابايت مع رقمين عشريين
      const sizeInMB = (file.size / (1024 * 1024));
      let formattedSize;
      if (sizeInMB < 1) {
        formattedSize = `${(sizeInMB * 1024).toFixed(0)} كيلوبايت`;
      } else {
        formattedSize = `${sizeInMB.toFixed(1)} ميجابايت`;
      }

      // محاكاة تقدم الرفع
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setUploadProgress(Math.min(progress, 100));
      }, 100);

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMaterial(prev => ({
          ...prev,
          fileData: reader.result,
          size: formattedSize,
          fileName: file.name,
        }));
        setUploading(false);
        setUploadProgress(100);
        clearInterval(interval);
      };
      reader.onerror = () => {
        setUploading(false);
        alert('حدث خطأ أثناء رفع الملف');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMaterial = () => {
    if (!newMaterial.title) {
      alert('يرجى إدخال عنوان الملزمة');
      return;
    }
    if (!newMaterial.fileData) {
      alert('يرجى اختيار ملف PDF');
      return;
    }

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
    setShowAddForm(false);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    alert('تم إضافة الملزمة بنجاح!');
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
              <label className="block text-sm mb-1 text-theme-muted">رفع ملف PDF من الجهاز</label>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileUpload}
                    className={`flex-1 px-4 py-2 rounded-xl border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none ${
                      isDark ? 'glass-premium' : 'bg-white'
                    }`}
                  />
                  {uploading && <FaSpinner className="animate-spin text-gold text-xl" />}
                </div>
                
                {/* شريط تقدم الرفع */}
                {uploading && (
                  <div className="w-full">
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-gold to-goldLight rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-theme-muted mt-1">جاري الرفع... {Math.round(uploadProgress)}%</p>
                  </div>
                )}

                {newMaterial.fileData && !uploading && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                    <FaFilePdf className="text-2xl text-red-500" />
                    <div className="flex-1">
                      <p className="text-sm text-theme-primary font-semibold">{newMaterial.fileName || 'ملف PDF'}</p>
                      <p className="text-xs text-theme-muted">الحجم: {newMaterial.size}</p>
                    </div>
                    <span className="text-green-500 text-sm">✅ تم الرفع</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1 text-theme-muted">حجم الملف (يتحدد تلقائياً)</label>
              <input
                type="text"
                value={newMaterial.size}
                disabled
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 text-theme-muted outline-none cursor-not-allowed"
                placeholder="سيتم تحديد الحجم تلقائياً"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-theme-muted">تاريخ الإضافة</label>
              <input
                type="text"
                value={newMaterial.date}
                disabled
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 text-theme-muted outline-none cursor-not-allowed"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddMaterial}
              disabled={!newMaterial.fileData || uploading}
              className="px-6 py-2 rounded-xl bg-gold text-black font-bold hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'جاري الرفع...' : 'إضافة'}
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setNewMaterial({
                  title: '',
                  size: '',
                  category: 'نحو',
                  date: new Date().toISOString().split('T')[0],
                  downloads: 0,
                  fileData: null,
                  fileName: '',
                });
                setUploadProgress(0);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
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
                  {material.fileData && (
                    <span className="text-green-500 text-[10px]">📁 محلي</span>
                  )}
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
          <p className="text-sm">اضغط على "إضافة ملزمة" لرفع ملف PDF من جهازك</p>
        </div>
      )}
    </div>
  );
};

export default MaterialsManager;