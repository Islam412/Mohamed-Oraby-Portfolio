import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCheck, FaTimes, FaStar, FaBookOpen, FaArrowLeft, 
  FaArrowRight, FaClock, FaTrophy, FaAward, 
  FaGraduationCap, FaMedal, FaCertificate, FaRocket 
} from 'react-icons/fa';
import { examsData, getExamById } from '../../data/examsData';

const Exams = () => {
  const [currentExam, setCurrentExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [examStarted, setExamStarted] = useState(false);

  const exam = currentExam ? getExamById(currentExam) : null;
  const totalQuestions = exam?.questions?.length || 0;
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleSubmit = () => {
    let correct = 0;
    exam.questions.forEach(q => {
      if (answers[q.id] === q.correct) correct++;
    });
    setScore(correct);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getScoreEmoji = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage === 100) return '🏆';
    if (percentage >= 80) return '🌟';
    if (percentage >= 60) return '💪';
    if (percentage >= 40) return '📖';
    return '🎯';
  };

  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage === 100) return 'ممتاز! أنت نابغة في اللغة العربية 🎉';
    if (percentage >= 80) return 'رائع! مستوى متميز جداً 🌟';
    if (percentage >= 60) return 'جيد جداً، واصل التقدم 💪';
    if (percentage >= 40) return 'لا بأس، تحتاج للمزيد من الممارسة 📖';
    return 'لا تستسلم، حاول مرة أخرى وأنت قادر 🎯';
  };

  const getScoreGrade = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage === 100) return 'امتياز مع مرتبة الشرف';
    if (percentage >= 80) return 'امتياز';
    if (percentage >= 60) return 'جيد جداً';
    if (percentage >= 40) return 'جيد';
    return 'يحتاج تحسين';
  };

  return (
    <section id="exams" className="py-24 relative overflow-hidden pattern-bg">
      {/* خلفية */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary/50 to-primary" />
      <div className="absolute top-20 right-20 w-80 h-80 bg-gold/3 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gold/3 rounded-full blur-3xl" />
      
      {/* زخارف */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-gold/5 text-4xl font-amiri">﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾</div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-16 h-px bg-gradient-to-l from-gold/30 to-transparent" />
            <FaGraduationCap className="text-gold text-2xl" />
            <div className="w-16 h-px bg-gradient-to-r from-gold/30 to-transparent" />
          </div>
          <h2 className="heading-primary text-4xl md:text-5xl font-bold gradient-premium mb-3 calligraphy">
            الامتحانات
          </h2>
          <p className="text-textSecondary text-lg max-w-2xl mx-auto">
            اختبر معلوماتك في اللغة العربية وتحدى نفسك
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full mt-4" />
        </motion.div>

        <AnimatePresence mode="wait">
          {/* قائمة الامتحانات */}
          {!currentExam && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {examsData.map((exam) => (
                <motion.div
                  key={exam.id}
                  whileHover={{ y: -8 }}
                  className="group relative cursor-pointer"
                  onClick={() => {
                    setCurrentExam(exam.id);
                    setShowResult(false);
                    setAnswers({});
                    setCurrentQuestion(0);
                    setExamStarted(false);
                  }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/20 via-transparent to-gold/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  <div className={`relative p-8 rounded-2xl glass-premium border border-gold/10 group-hover:border-gold/30 transition-all duration-500 overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${exam.color} opacity-0 group-hover:opacity-100 transition-all duration-700`} />
                    
                    <div className="relative">
                      <div className="text-5xl mb-4 block group-hover:scale-110 transition-all duration-500">
                        {exam.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-all duration-300">
                        {exam.title}
                      </h3>
                      <p className="text-textSecondary text-sm mb-3">{exam.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-textMuted">
                          {exam.questions.length} أسئلة
                        </span>
                        <span className="text-xs px-3 py-1 rounded-full bg-gold/10 text-gold group-hover:bg-gold/20 transition-all duration-300">
                          ابدأ الآن →
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* الامتحان الحالي */}
          {currentExam && exam && !showResult && (
            <motion.div
              key="exam"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              {/* Progress Bar */}
              <div className="mb-8 glass-premium rounded-2xl p-4 border border-gold/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{exam.icon}</span>
                    <span className="font-semibold text-sm">{exam.title}</span>
                  </div>
                  <span className="text-sm text-textMuted">
                    {answeredCount}/{totalQuestions} تم الإجابة
                  </span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                    className="h-full bg-gradient-to-r from-gold to-goldLight rounded-full"
                  />
                </div>
              </div>

              {/* السؤال الحالي */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="mb-6 p-8 rounded-2xl glass-premium border border-gold/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm text-gold font-semibold">
                      السؤال {currentQuestion + 1} من {totalQuestions}
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
                  </div>
                  
                  <h4 className="text-xl font-bold mb-6">
                    {exam.questions[currentQuestion].question}
                  </h4>
                  
                  <div className="space-y-3">
                    {exam.questions[currentQuestion].options.map((option, optIndex) => (
                      <motion.div
                        key={optIndex}
                        whileHover={{ scale: 1.01 }}
                        className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                          answers[exam.questions[currentQuestion].id] === optIndex
                            ? 'border-gold bg-gold/10 shadow-lg shadow-gold/5'
                            : 'border-white/5 hover:border-gold/30 hover:bg-white/5'
                        }`}
                        onClick={() => handleAnswer(exam.questions[currentQuestion].id, optIndex)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            answers[exam.questions[currentQuestion].id] === optIndex
                              ? 'border-gold bg-gold'
                              : 'border-textMuted hover:border-gold'
                          }`}>
                            {answers[exam.questions[currentQuestion].id] === optIndex && (
                              <FaCheck className="text-xs text-black" />
                            )}
                          </div>
                          <span className={answers[exam.questions[currentQuestion].id] === optIndex ? 'text-gold' : ''}>
                            {option}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestion === 0}
                  className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                    currentQuestion === 0
                      ? 'opacity-30 cursor-not-allowed'
                      : 'glass-premium hover:border-gold/30 hover:text-gold'
                  }`}
                >
                  <FaArrowRight />
                  <span>السابق</span>
                </button>
                
                {currentQuestion === totalQuestions - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={answeredCount < totalQuestions}
                    className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                      answeredCount < totalQuestions
                        ? 'bg-white/5 text-textMuted cursor-not-allowed'
                        : 'bg-gradient-to-r from-gold to-goldLight text-black hover:shadow-xl hover:shadow-gold/20'
                    }`}
                  >
                    عرض النتيجة 🎯
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-xl glass-premium hover:border-gold/30 hover:text-gold transition-all duration-300 flex items-center gap-2"
                  >
                    <span>التالي</span>
                    <FaArrowLeft />
                  </button>
                )}
              </div>

              {/* Progress Indicators */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {exam.questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentQuestion
                        ? 'w-6 bg-gold'
                        : answers[exam.questions[index].id] !== undefined
                        ? 'bg-gold/50'
                        : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Result */}
          {showResult && exam && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto"
            >
              <div className="p-10 rounded-2xl glass-premium border border-gold/20 text-center">
                <div className="text-7xl mb-4 animate-bounce">
                  {getScoreEmoji()}
                </div>
                
                <h3 className="text-3xl font-bold gradient-premium mb-2 calligraphy">
                  النتيجة النهائية
                </h3>
                
                <div className="flex items-center justify-center gap-6 my-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold gradient-premium">
                      {score}
                    </div>
                    <div className="text-sm text-textMuted">من {totalQuestions}</div>
                  </div>
                  <div className="h-12 w-px bg-gold/20" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold">
                      {Math.round((score / totalQuestions) * 100)}%
                    </div>
                    <div className="text-sm text-textMuted">النسبة</div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="inline-block px-6 py-2 rounded-full bg-gold/10 border border-gold/20">
                    <span className="text-gold font-semibold">{getScoreGrade()}</span>
                  </div>
                </div>

                <p className="text-textSecondary text-lg mb-8">
                  {getScoreMessage()}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setCurrentExam(null);
                      setShowResult(false);
                      setAnswers({});
                      setCurrentQuestion(0);
                    }}
                    className="px-8 py-3 rounded-xl glass-premium hover:border-gold/30 hover:text-gold transition-all duration-300"
                  >
                    📚 العودة للامتحانات
                  </button>
                  <button
                    onClick={() => {
                      setShowResult(false);
                      setAnswers({});
                      setCurrentQuestion(0);
                    }}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-gold to-goldLight text-black font-bold hover:shadow-xl hover:shadow-gold/20 transition-all duration-300"
                  >
                    🔄 إعادة المحاولة
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Exams;