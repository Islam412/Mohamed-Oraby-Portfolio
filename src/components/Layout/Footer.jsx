import { FaWhatsapp, FaPhone, FaFacebook, FaInstagram, FaYoutube, FaCode } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-right">
            <h4 className="font-bold gradient-text">محمد عرلبي</h4>
            <p className="text-xs text-gray-500">مدرس لغة عربية للمرحلة الإعدادية</p>
          </div>
          
          <div className="flex gap-4">
            <a href="https://wa.me/201140739030" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-all duration-300">
              <FaWhatsapp className="text-xl" />
            </a>
            <a href="tel:+201140739030" className="text-gray-400 hover:text-accent transition-all duration-300">
              <FaPhone className="text-xl" />
            </a>
            <a href="https://www.facebook.com/share/18pihwFGkc/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-all duration-300">
              <FaFacebook className="text-xl" />
            </a>
            <a href="https://www.instagram.com/mohamedahmedebrahiem" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-all duration-300">
              <FaInstagram className="text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-accent transition-all duration-300">
              <FaYoutube className="text-xl" />
            </a>
          </div>
          
          <div className="text-center">
            <div className="text-xs text-gray-500">
              © {new Date().getFullYear()} جميع الحقوق محفوظة
            </div>
            <div className="text-xs text-gray-600 mt-1 flex items-center justify-center gap-2">
              <span>تم التطوير بواسطة</span>
              <a 
                href="https://islam-portfolio-phi.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:text-accentHover transition-all duration-300 flex items-center gap-1 group"
              >
                <FaCode className="text-xs group-hover:rotate-12 transition-all duration-300" />
                <span className="font-semibold">إسلام حمدى</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;