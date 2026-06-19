import { motion } from 'framer-motion';

const Videos = () => {
  const videos = [
    { id: 1, title: 'شرح درس النحو - الجملة الاسمية', thumbnail: '/assets/videos/thumb1.jpg' },
    { id: 2, title: 'شرح درس البلاغة - التشبيه', thumbnail: '/assets/videos/thumb2.jpg' },
    { id: 3, title: 'شرح درس الإملاء - الهمزة', thumbnail: '/assets/videos/thumb3.jpg' },
  ];

  return (
    <section id="videos" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">فيديوهات الشرح</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl overflow-hidden glass-effect glow-border group cursor-pointer"
            >
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-accent" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;