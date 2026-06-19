import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const images = [
    { id: 1, src: '/assets/images/with-students/1.jpg', title: 'مع الطلاب' },
    { id: 2, src: '/assets/images/with-students/2.jpg', title: 'في الفصل' },
    { id: 3, src: '/assets/images/with-students/3.jpg', title: 'ورشة عمل' },
    { id: 4, src: '/assets/images/with-students/4.jpg', title: 'تكريم' },
  ];

  return (
    <section id="gallery" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">معرض الصور</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative group cursor-pointer rounded-2xl overflow-hidden"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-square bg-gradient-to-br from-accent/10 to-primary">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
                <span className="text-sm font-semibold">{image.title}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:rotate-90 transition-all duration-300"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-w-full max-h-[90vh] rounded-2xl"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;