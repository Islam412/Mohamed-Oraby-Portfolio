import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaQuestion, FaList, FaClipboardList } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

const ExamsManager = () => {
  const { siteData, addExam, deleteExam } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);

  const [newExam, setNewExam] = useState({
    title: '',
    description: '',
    icon: '📝',
    color: 'from-amber-500/20 to-amber-600/10',
    questions: [],
  });

  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correct: 0,
  });

  const handleAddQuestion = () => {
    if (newQuestion.question && newQuestion.options.every(o => o.trim())) {
      setNewExam({
        ...newExam,
        questions: [...newExam.questions, { 
          id: `q${Date.now()}`,
          ...newQuestion 
        }],
      });
      setNewQuestion({ question: '', options: ['', '', '', ''], correct: 0 });
    }
  };

  const handleRemoveQuestion = (index) => {
    setNewExam({
      ...newExam,
      questions: newExam.questions.filter((_, i) => i !== index),
    });
  };

  const handleAddExam = () => {
    if (newExam.title && newExam.questions.length > 0) {
      addExam(newExam);
      setNewExam({
        title: '',
        description: '',
        icon: '📝',
        color: 'from-amber-500/20 to-amber-600/10',
        questions: [],
      });
      setShowAddForm(false);
      alert('تم إضافة الامتحان بنجاح!');
    }
  };

  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا الامتحان؟')) {
      deleteExam(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-premium calligraphy">إدارة الامتحانات</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-300"
        >
          <FaPlus />
          إضافة امتحان
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
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-textMuted mb-1">عنوان الامتحان</label>
                  <input
                    type="text"
                    value={newExam.title}
                    onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-textMuted mb-1">الوصف</label>
                  <input
                    type="text"
                    value={newExam.description}
                    onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white outline-none"
                  />
                </div>
              </div>

              {/* إضافة أسئلة */}
              <div className="border-t border-white/5 pt-4">
                <h4 className="font-bold text-white mb-3">الأسئلة</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-textMuted mb-1">السؤال</label>
                    <input
                      type="text"
                      value={newQuestion.question}
                      onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {newQuestion.options.map((opt, idx) => (
                      <div key={idx}>
                        <label className="block text-sm text-textMuted mb-1">الخيار {idx + 1}</label>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...newQuestion.options];
                            newOpts[idx] = e.target.value;
                            setNewQuestion({ ...newQuestion, options: newOpts });
                          }}
                          className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white outline-none"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm text-textMuted mb-1">رقم الإجابة الصحيحة (0-3)</label>
                    <input
                      type="number"
                      min="0"
                      max="3"
                      value={newQuestion.correct}
                      onChange={(e) => setNewQuestion({ ...newQuestion, correct: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-white outline-none"
                    />
                  </div>
                  <button
                    onClick={handleAddQuestion}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-300"
                  >
                    <FaPlus />
                    إضافة سؤال
                  </button>
                </div>

                {/* قائمة الأسئلة المضافة */}
                {newExam.questions.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {newExam.questions.map((q, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                        <div>
                          <p className="text-sm text-white">{idx + 1}. {q.question}</p>
                          <p className="text-xs text-textMuted">الإجابة الصحيحة: {q.options[q.correct]}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveQuestion(idx)}
                          className="p-1 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleAddExam}
                  disabled={newExam.questions.length === 0}
                  className="px-6 py-2 rounded-xl bg-gold text-black font-bold hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  إضافة الامتحان
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 rounded-xl bg-white/5 text-textMuted hover:bg-white/10 transition-all duration-300"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* قائمة الامتحانات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {siteData.exams.map((exam) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl glass-premium border border-white/5"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl mb-2">{exam.icon}</div>
                <h4 className="font-bold text-white">{exam.title}</h4>
                <p className="text-sm text-textMuted">{exam.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <FaList className="text-gold/50" />
                  <span className="text-xs text-textMuted">{exam.questions?.length || 0} أسئلة</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(exam.id)}
                className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300"
              >
                <FaTrash />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {siteData.exams.length === 0 && (
        <div className="text-center py-12 text-textMuted">
          <FaClipboardList className="text-6xl mx-auto mb-4 opacity-30" />
          <p>لا توجد امتحانات حالياً</p>
          <p className="text-sm">اضغط على "إضافة امتحان" لإضافة أول امتحان</p>
        </div>
      )}
    </div>
  );
};

export default ExamsManager;