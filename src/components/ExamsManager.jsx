import React, { useState } from 'react';
import { FaPlus, FaTrash, FaList, FaClipboardList } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

const ExamsManager = () => {
  const { siteData, addExam, deleteExam, theme } = useApp();
  const isDark = theme === 'dark';
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
    } else {
      alert('يرجى إكمال جميع الحقول (السؤال وجميع الخيارات)');
    }
  };

  const handleRemoveQuestion = (index) => {
    setNewExam({
      ...newExam,
      questions: newExam.questions.filter((_, i) => i !== index),
    });
  };

  const handleAddExam = () => {
    if (!newExam.title) {
      alert('يرجى إدخال عنوان الامتحان');
      return;
    }
    if (newExam.questions.length === 0) {
      alert('يرجى إضافة سؤال واحد على الأقل');
      return;
    }

    addExam({
      ...newExam,
      id: Date.now(),
    });

    setNewExam({
      title: '',
      description: '',
      icon: '📝',
      color: 'from-amber-500/20 to-amber-600/10',
      questions: [],
    });
    setShowAddForm(false);
    alert('تم إضافة الامتحان بنجاح! وسيظهر في الموقع فوراً');
  };

  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا الامتحان؟')) {
      deleteExam(id);
      alert('تم حذف الامتحان بنجاح!');
    }
  };

  // عرض عدد الأسئلة لكل امتحان
  const getQuestionsCount = (exam) => {
    return exam.questions?.length || 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-premium calligraphy">إدارة الامتحانات</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-300"
        >
          <FaPlus /> إضافة امتحان
        </button>
      </div>

      {showAddForm && (
        <div className="p-6 rounded-2xl glass-premium border border-gold/10">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-theme-muted">عنوان الامتحان</label>
                <input
                  type="text"
                  value={newExam.title}
                  onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                  placeholder="مثال: امتحان النحو - الصف الأول الإعدادي"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-theme-muted">الوصف</label>
                <input
                  type="text"
                  value={newExam.description}
                  onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                  placeholder="مثال: اختبر معلوماتك في قواعد النحو"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-theme-muted">الأيقونة</label>
                <select
                  value={newExam.icon}
                  onChange={(e) => setNewExam({ ...newExam, icon: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                >
                  <option value="📝">📝</option>
                  <option value="📚">📚</option>
                  <option value="🎯">🎯</option>
                  <option value="⭐">⭐</option>
                  <option value="🏆">🏆</option>
                </select>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4">
              <h4 className={`font-bold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-theme-primary'}`}>
                <FaList className="text-gold" />
                الأسئلة ({newExam.questions.length})
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1 text-theme-muted">السؤال</label>
                  <input
                    type="text"
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                    placeholder="أدخل نص السؤال"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {newQuestion.options.map((opt, idx) => (
                    <div key={idx}>
                      <label className={`block text-sm mb-1 ${isDark ? 'text-dark-textMuted' : 'text-light-textMuted'}`}>
                        الخيار {idx + 1} {idx === newQuestion.correct && '✅ (الصحيح)'}
                      </label>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...newQuestion.options];
                          newOpts[idx] = e.target.value;
                          setNewQuestion({ ...newQuestion, options: newOpts });
                        }}
                        className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                        placeholder={`الخيار ${idx + 1}`}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm mb-1 text-theme-muted">رقم الإجابة الصحيحة (0-3)</label>
                  <input
                    type="number"
                    min="0"
                    max="3"
                    value={newQuestion.correct}
                    onChange={(e) => setNewQuestion({ ...newQuestion, correct: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-xl glass-premium border border-white/5 focus:border-gold/30 transition-all duration-300 text-theme-primary outline-none"
                  />
                </div>
                <button
                  onClick={handleAddQuestion}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-300"
                >
                  <FaPlus /> إضافة سؤال
                </button>
              </div>

              {newExam.questions.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-theme-primary'}`}>
                    الأسئلة المضافة ({newExam.questions.length}):
                  </p>
                  {newExam.questions.map((q, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-white' : 'text-theme-primary'}`}>
                          {idx + 1}. {q.question}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-dark-textMuted' : 'text-light-textMuted'}`}>
                          الإجابة الصحيحة: {q.options[q.correct]}
                        </p>
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
                إضافة الامتحان ({newExam.questions.length} سؤال)
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 rounded-xl bg-white/5 text-theme-muted hover:bg-white/10 transition-all duration-300"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {siteData.exams?.map((exam) => (
          <div key={exam.id} className={`p-4 rounded-2xl glass-premium border border-white/5 hover:border-gold/30 transition-all duration-300 ${
            isDark ? '' : 'bg-white/80'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-3xl mb-2">{exam.icon}</div>
                <h4 className={`font-bold ${isDark ? 'text-white' : 'text-theme-primary'}`}>
                  {exam.title}
                </h4>
                <p className={`text-sm ${isDark ? 'text-dark-textMuted' : 'text-light-textMuted'}`}>
                  {exam.description}
                </p>
                <div className={`flex items-center gap-2 mt-2 ${isDark ? 'text-dark-textMuted' : 'text-light-textMuted'}`}>
                  <FaClipboardList className="text-gold/50" />
                  <span className="text-xs">{getQuestionsCount(exam)} أسئلة</span>
                  <span className="text-xs text-green-500">✅ محفوظ</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(exam.id)}
                className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300 flex-shrink-0"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {siteData.exams?.length === 0 && (
        <div className="text-center py-12 text-theme-muted">
          <FaClipboardList className="text-6xl mx-auto mb-4 opacity-30" />
          <p>لا توجد امتحانات حالياً</p>
          <p className="text-sm">اضغط على "إضافة امتحان" لإضافة أول امتحان</p>
        </div>
      )}
    </div>
  );
};

export default ExamsManager;