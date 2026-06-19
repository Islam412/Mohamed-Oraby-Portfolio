import React, { useState } from 'react';
import { FaPlus, FaTrash, FaImages } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

const GalleryManager = () => {
  const { siteData, addGalleryImage, deleteGalleryImage, theme } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);

  const [newImage, setNewImage] = useState({
    title: '',
    category: 'طلاب',
    date: new Date().getFullYear().toString(),
    src: '',
  });

  const categories = ['طلاب', 'تدريس', 'ورش', 'إنجازات', 'رحلات'];

  const handleAddImage = () => {
    if (newImage.title && newImage.src) {
      addGalleryImage(newImage);
      setNewImage({
        title: '',
        category: 'طلاب',
        date: new Date().getFullYear().toString(),
        src: '',
      });
      setShowAddForm(false);
      alert('تم إضافة الصورة بنجاح!');
    }
  };

  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
      deleteGalleryImage(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-premium calligraphy">إدارة المعرض</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-300"
        >
          <FaPlus />
          إضافة صورة
        </button>
      </div>

      {showAddForm && (
        <div className="p-6 rounded-2xl glass-premium border border-gold/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-theme-muted">عنوان الصورة</label>
              <input
                type="text"
                value={newImage.title}
                onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-theme-muted">التصنيف</label>
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
            <div className="md:col-span-2">
              <label className="block text-sm mb-1 text-theme-muted">رابط الصورة</label>
              <input
                type="text"
                value={newImage.src}
                onChange={(e) => setNewImage({ ...newImage, src: e.target.value })}
                placeholder="/assets/images/with-students/1.jpg"
                className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddImage}
              className="px-6 py-2 rounded-xl bg-gold text-black font-bold hover:shadow-xl hover:shadow-gold/20 transition-all duration-300"
            >
              إضافة
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2 rounded-xl bg-white/5 text-theme-muted hover:bg-white/10 transition-all duration-300"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {siteData.gallery?.map((image) => (
          <div key={image.id} className="group relative rounded-2xl overflow-hidden glass-premium border border-white/5">
            <div className="aspect-square bg-gradient-to-br from-gold/5 to-primary">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover"
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
        <div className="text-center py-12 text-theme-muted">
          <FaImages className="text-6xl mx-auto mb-4 opacity-30" />
          <p>لا توجد صور حالياً</p>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;