import React, { useState, useRef } from 'react';
import { FaPlus, FaTrash, FaImages } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

const GalleryManager = () => {
  const { siteData, addGalleryImage, deleteGalleryImage, theme } = useApp();
  const isDark = theme === 'dark';
  const [showAddForm, setShowAddForm] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const [newImage, setNewImage] = useState({
    title: '',
    category: 'طلاب',
    date: new Date().getFullYear().toString(),
    src: '',
    fileName: '',
  });

  const categories = ['طلاب', 'تدريس', 'ورش', 'إنجازات', 'رحلات', 'أخرى'];

  // ✅ رفع الصورة من الجهاز
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert('❌ لم يتم اختيار ملف');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('⚠️ يرجى اختيار ملف صورة فقط');
      e.target.value = '';
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('⚠️ حجم الصورة كبير جداً. الحد الأقصى 10 ميجابايت');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
      setNewImage(prev => ({
        ...prev,
        src: reader.result,
        fileName: file.name,
      }));
    };
    reader.onerror = () => {
      alert('❌ حدث خطأ أثناء قراءة الملف');
    };
    reader.readAsDataURL(file);
  };

  const handleAddImage = () => {
    if (!newImage.title) {
      alert('⚠️ يرجى إدخال عنوان الصورة');
      return;
    }
    if (!newImage.src) {
      alert('⚠️ يرجى اختيار صورة أولاً');
      return;
    }

    addGalleryImage({
      ...newImage,
      id: Date.now(),
    });

    setNewImage({
      title: '',
      category: 'طلاب',
      date: new Date().getFullYear().toString(),
      src: '',
      fileName: '',
    });
    setPreviewUrl(null);
    setShowAddForm(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    alert('✅ تم إضافة الصورة بنجاح!');
  };

  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
      deleteGalleryImage(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-premium calligraphy">🖼️ إدارة المعرض</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-300"
        >
          <FaPlus /> إضافة صورة
        </button>
      </div>

      {showAddForm && (
        <div className="p-6 rounded-2xl glass-premium border border-gold/10">
          <h3 className="text-lg font-bold text-theme-primary mb-4">📤 إضافة صورة جديدة</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-theme-muted">🏷️ عنوان الصورة</label>
              <input
                type="text"
                value={newImage.title}
                onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                placeholder="مثال: مع الطلاب في الفصل"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1 text-theme-muted">📂 التصنيف</label>
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
          </div>

          {/* ✅ هذا هو زر رفع الملف - يعمل على الهاتف والكمبيوتر */}
          <div className="mt-4">
            <label className="block text-sm mb-2 text-theme-muted">📷 اختر صورة من جهازك</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full px-4 py-4 rounded-xl glass-premium border-2 border-dashed border-gold/40 hover:border-gold/60 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-gold/10 file:text-gold hover:file:bg-gold/20"
            />
            <p className="text-xs text-theme-muted mt-2">
              💡 يدعم: JPG, PNG, GIF, WebP | الحد الأقصى: 10 ميجابايت
            </p>
          </div>

          {/* معاينة الصورة */}
          {previewUrl && (
            <div className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="flex items-start gap-4">
                <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-gold/20 flex-shrink-0 bg-secondary">
                  <img 
                    src={previewUrl} 
                    alt="معاينة" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-theme-primary font-semibold">
                    {newImage.fileName || 'صورة'}
                  </p>
                  <p className="text-xs text-green-500">✅ تم اختيار الصورة بنجاح</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6 pt-4 border-t border-gold/10">
            <button
              onClick={handleAddImage}
              disabled={!newImage.src}
              className="px-6 py-2 rounded-xl bg-gold text-black font-bold hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✅ إضافة الصورة
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setNewImage({ title: '', category: 'طلاب', date: new Date().getFullYear().toString(), src: '', fileName: '' });
                setPreviewUrl(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="px-6 py-2 rounded-xl bg-white/5 text-theme-muted hover:bg-white/10 transition-all duration-300"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      {/* عرض الصور */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {siteData.gallery?.map((image) => (
          <div key={image.id} className="group relative rounded-2xl overflow-hidden glass-premium border border-white/5 hover:border-gold/30 transition-all duration-300">
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
            
            {image.src && image.src.startsWith('data:image') && (
              <div className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-green-500/80 text-white text-[10px]">
                📁 محلي
              </div>
            )}
            
            <button
              onClick={() => handleDelete(image.id)}
              className="absolute top-2 right-2 p-2 rounded-xl bg-red-500/80 text-white hover:bg-red-500 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <FaTrash className="text-xs" />
            </button>
          </div>
        ))}
      </div>

      {siteData.gallery?.length === 0 && (
        <div className="text-center py-16 text-theme-muted">
          <div className="text-6xl mb-4">🖼️</div>
          <p>لا توجد صور في المعرض</p>
          <p className="text-sm mt-1">اضغط على <span className="text-gold">"إضافة صورة"</span> ثم اختر صورة من جهازك</p>
        </div>
      )}

      {siteData.gallery?.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-gold/10">
          <div className="flex items-center gap-2 text-sm text-theme-muted">
            <FaImages className="text-gold" />
            <span>📸 عدد الصور: <span className="font-bold text-theme-primary">{siteData.gallery.length}</span></span>
          </div>
          <div className="flex items-center gap-2 text-sm text-theme-muted">
            <span>📁</span>
            <span>صور محلية: <span className="font-bold text-theme-primary">
              {siteData.gallery.filter(img => img.src?.startsWith('data:image')).length}
            </span></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;