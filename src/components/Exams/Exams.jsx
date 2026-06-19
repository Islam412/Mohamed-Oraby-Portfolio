import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaStar } from 'react-icons/fa';

const Exams = () => {
  const [currentExam, setCurrentExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const exams = [
    {
      id: 1,
      title: 'امتحان النحو - الصف الأول الإعدادي',
      questions: [
        {
          id: 1,
          question: 'ما هو إعراب كلمة "المعلم" في جملة "المعلم مجتهد"؟',
          options: ['مبتدأ مرفوع', 'خبر مرفوع', 'مفعول به منصوب', 'فاعل مرفوع'],
          correct: 0,
        },
        {
          id: 2,
          question: 'أي الجمل التالية صحيحة نحويًا؟',
          options: [
            'أكلت التفاح أنا',
            'أكلت أنا التفاح',
            'أنا أكلت التفاح',
            'التفاح أكلت أنا',
          ],
          correct: 1,
        },
        {
          id: 3,
          question: 'ما نوع كلمة "كتاب"؟',
          options: ['اسم جامد', 'اسم مشتق', 'فعل ماض', 'حرف جر'],
          correct: 0,
        },
      ],
    },
  ];

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleSubmit = () => {
    const exam = exams.find(e => e.id === currentExam);
    let correct = 0;
    exam.questions.forEach(q => {
      if (answers[q.id] === q.correct) correct++;
    });
    setScore(correct);
    setShowResult(true);
  };

  return (
    <section id="exams" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">الامتحانات</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        {!currentExam ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exams.map((exam) => (
              <motion.div
                key={exam.id}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-2xl glass-effect glow-border cursor-pointer"
                onClick={() => {
                  setCurrentExam(exam.id);
                  setShowResult(false);
                  setAnswers({});
                }}
              >
                <h3 className="text-xl font-bold mb-2">{exam.title}</h3>
                <p className="text-gray-400 text-sm">عدد الأسئلة: {exam.questions.length}</p>
                <button className="mt-4 px-6 py-2 bg-accent/20 text-accent rounded-full hover:bg-accent/30 transition-all duration-300">
                  بدء الامتحان
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {!showResult ? (
              <>
                {exams.find(e => e.id === currentExam)?.questions.map((q, index) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-6 p-6 rounded-2xl glass-effect"
                  >
                    <h4 className="text-lg font-semibold mb-4">
                      {index + 1}. {q.question}
                    </h4>
                    <div className="space-y-3">
                      {q.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                            answers[q.id] === optIndex
                              ? 'bg-accent/20 border border-accent'
                              : 'bg-white/5 hover:bg-white/10'
                          }`}
                          onClick={() => handleAnswer(q.id, optIndex)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              answers[q.id] === optIndex
                                ? 'border-accent bg-accent'
                                : 'border-gray-500'
                            }`}>
                              {answers[q.id] === optIndex && (
                                <FaCheck className="text-xs text-black" />
                              )}
                            </div>
                            <span>{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}

                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-accent text-black font-bold rounded-2xl hover:bg-accentHover transition-all duration-300"
                >
                  عرض النتيجة
                </button>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl glass-effect text-center"
              >
                <div className="text-6xl mb-4">
                  {score >= 2 ? '🎉' : '💪'}
                </div>
                <h3 className="text-2xl font-bold mb-2">النتيجة</h3>
                <div className="text-4xl font-bold gradient-text mb-4">
                  {score} / {exams.find(e => e.id === currentExam)?.questions.length}
                </div>
                <p className="text-gray-400 mb-6">
                  {score === 3 && 'ممتاز! أنت متميز في اللغة العربية'}
                  {score === 2 && 'جيد جداً، واصل التقدم'}
                  {score < 2 && 'لا بأس، حاول مرة أخرى'}
                </p>
                <button
                  onClick={() => {
                    setCurrentExam(null);
                    setShowResult(false);
                    setAnswers({});
                  }}
                  className="px-6 py-3 bg-accent/20 text-accent rounded-full hover:bg-accent/30 transition-all duration-300"
                >
                  العودة للقائمة
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Exams;