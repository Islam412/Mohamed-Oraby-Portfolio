import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaUser, FaGraduationCap } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (login(password)) {
        navigate('/admin');
      } else {
        setError('كلمة المرور غير صحيحة');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center relative overflow-hidden">
      {/* خلفية */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="p-8 rounded-3xl glass-premium border border-gold/10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border border-gold/20 mb-4">
              <FaGraduationCap className="text-4xl text-gold" />
            </div>
            <h2 className="text-2xl font-bold gradient-premium calligraphy">
              لوحة التحكم
            </h2>
            <p className="text-textSecondary text-sm mt-1">
              محمد أحمد عرابى - مدرس لغة عربية
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="relative">
                <input
                  type="password"
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white placeholder-textMuted outline-none"
                  required
                  autoFocus
                />
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-textMuted" />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl mb-4"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-gold to-goldLight text-black font-bold hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'جاري التحقق...' : 'دخول'}
            </button>

            <div className="text-center mt-4">
              <span className="text-xs text-textMuted">
                كلمة المرور الافتراضية: admin123
              </span>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;