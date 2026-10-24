import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { subjectsData } from '../../data/subjectsData';
import { QuizQuestion, QuizResult } from '../../types';
import { CheckCircle2, Clock, Award, RotateCcw, ArrowRight, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizSystem: React.FC = () => {
  const { t } = useTranslation();
  const { saveQuizResult } = useAuth();

  // Combine questions from all topics
  const allQuestions: Array<{ q: QuizQuestion; topicTitle: string; topicId: string }> = [];
  subjectsData.forEach(sub => {
    sub.topics.forEach(top => {
      top.quiz.forEach(q => {
        allQuestions.push({ q, topicTitle: top.title, topicId: top.id });
      });
    });
  });

  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userSelected, setUserSelected] = useState<number[]>([]);
  const [answersHistory, setAnswersHistory] = useState<any[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [finalResult, setFinalResult] = useState<QuizResult | null>(null);

  const filteredQuestions = allQuestions.filter(item => {
    if (selectedDifficulty === 'all') return true;
    return item.q.difficulty === selectedDifficulty;
  });

  // Timer
  useEffect(() => {
    let timer: any = null;
    if (!quizFinished) {
      timer = setInterval(() => setSecondsElapsed(s => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [quizFinished]);

  if (filteredQuestions.length === 0) {
    return <div className="p-8 text-center text-xs text-stone-500">Savollar topilmadi.</div>;
  }

  const currentItem = filteredQuestions[currentIdx];
  const question = currentItem.q;

  const handleToggleOption = (idx: number) => {
    if (isSubmitted) return;
    if (question.type === 'multiple') {
      setUserSelected(prev => (prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]));
    } else {
      setUserSelected([idx]);
    }
  };

  const handleConfirmAnswer = () => {
    if (userSelected.length === 0) return;
    setIsSubmitted(true);

    const isCorrect = userSelected.length === question.correctAnswers.length &&
      userSelected.every(a => question.correctAnswers.includes(a));

    const ansRecord = {
      question: question.question,
      userAnswer: userSelected,
      isCorrect,
      explanation: question.explanation
    };

    setAnswersHistory(prev => [...prev, ansRecord]);
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < filteredQuestions.length) {
      setCurrentIdx(i => i + 1);
      setUserSelected([]);
      setIsSubmitted(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setQuizFinished(true);
    const correctCount = answersHistory.filter(a => a.isCorrect).length;
    const scorePct = Math.round((correctCount / (filteredQuestions.length || 1)) * 100);

    const result: QuizResult = {
      quizId: `quiz-${Date.now()}`,
      topicTitle: currentItem.topicTitle,
      totalQuestions: filteredQuestions.length,
      correctAnswers: correctCount,
      scorePercentage: scorePct,
      timeSpentSeconds: secondsElapsed,
      passed: scorePct >= 70,
      date: new Date().toISOString().split('T')[0],
      breakdown: answersHistory
    };

    setFinalResult(result);
    saveQuizResult(result);

    // Call server evaluation endpoint
    try {
      await fetch('/api/quizzes/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: result.quizId,
          answers: answersHistory,
          timeSpentSeconds: secondsElapsed
        })
      });
    } catch (e) {}

    if (scorePct >= 70) {
      try {
        confetti({ particleCount: 50, spread: 70 });
      } catch (e) {}
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setUserSelected([]);
    setAnswersHistory([]);
    setIsSubmitted(false);
    setSecondsElapsed(0);
    setQuizFinished(false);
    setFinalResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-semibold mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>Bilimni Baholash & Imtihon</span>
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          {t('navQuizzes')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
          Universitet biologiya standartlari asosidagi nazorat savollari. Natijalar serverda tekshiriladi va xatolar xaritasi tuziladi.
        </p>
      </div>

      {!quizFinished ? (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xl space-y-5">
          {/* Top Status Bar */}
          <div className="flex items-center justify-between text-xs pb-3 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-[#176B4D] dark:text-[#62C9A5]">
                Savol: {currentIdx + 1} / {filteredQuestions.length}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                {question.difficulty}
              </span>
            </div>

            <div className="flex items-center space-x-1.5 font-mono text-stone-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{Math.floor(secondsElapsed / 60)}m {secondsElapsed % 60}s</span>
            </div>
          </div>

          <div className="text-[11px] text-stone-500 italic">
            Mavzu: {currentItem.topicTitle}
          </div>

          {/* Question Text */}
          <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white leading-relaxed">
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-2.5">
            {question.options.map((opt, idx) => {
              const isSelected = userSelected.includes(idx);
              let optStyle = 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 hover:bg-emerald-50 text-stone-800 dark:text-stone-200';

              if (isSubmitted) {
                if (question.correctAnswers.includes(idx)) {
                  optStyle = 'border-emerald-500 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 font-bold';
                } else if (isSelected) {
                  optStyle = 'border-red-400 bg-red-100 dark:bg-red-950 text-red-900 dark:text-red-200';
                } else {
                  optStyle = 'opacity-40 border-stone-200';
                }
              } else if (isSelected) {
                optStyle = 'border-[#176B4D] bg-emerald-50 dark:bg-emerald-950/60 text-[#176B4D] dark:text-[#62C9A5] ring-2 ring-[#176B4D] font-bold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleToggleOption(idx)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${optStyle}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border border-current">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {isSubmitted && question.correctAnswers.includes(idx) && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation if submitted */}
          {isSubmitted && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-stone-800 dark:text-stone-200">
              <span className="font-bold text-[#176B4D] dark:text-[#62C9A5] block mb-1">Ilmiy izoh:</span>
              <p className="leading-relaxed">{question.explanation}</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-2">
            {!isSubmitted ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={userSelected.length === 0}
                className="w-full py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#104C36] disabled:opacity-40 text-white font-bold text-xs transition-all shadow-xs"
              >
                {t('checkAnswer')}
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="w-full py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#104C36] text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center space-x-1.5"
              >
                <span>{currentIdx + 1 < filteredQuestions.length ? 'Keyingi savol' : 'Natijani yakunlash'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Final Result Card */
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-extrabold text-stone-900 dark:text-white">
              {finalResult?.passed ? 'Tabriklaymiz, testdan o\'tdingiz!' : 'Test yakunlandi.'}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Topshirilgan vaqt: {finalResult?.date} • Sarflangan vaqt: {Math.floor(secondsElapsed / 60)} daqiqa {secondsElapsed % 60} soniya
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-xs">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200">
              <span className="text-stone-500 block text-[10px] uppercase font-bold">To'plangan ball</span>
              <span className="text-2xl font-black text-emerald-800 dark:text-emerald-300 font-mono">
                {finalResult?.scorePercentage}%
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200">
              <span className="text-stone-500 block text-[10px] uppercase font-bold">To'g'ri javoblar</span>
              <span className="text-2xl font-black text-emerald-800 dark:text-emerald-300 font-mono">
                {finalResult?.correctAnswers} / {finalResult?.totalQuestions}
              </span>
            </div>
          </div>

          <div className="text-left p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-xs space-y-2">
            <h4 className="font-bold text-stone-900 dark:text-white flex items-center space-x-1.5">
              <AlertCircle className="w-4 h-4 text-[#176B4D]" />
              <span>Xatolar tahlili va takrorlash tavsiyasi:</span>
            </h4>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              {finalResult?.passed
                ? 'Siz asosiy biologik mexanizmlarni yaxshi o\'zlashtirdingiz. Bilimlarni mustahkamlash uchun virtual laboratoriyada tajribalarni takrorlang.'
                : 'Ayrim mavzularda bo\'shliqlar aniqlandi. Ayniqsa Sitologiya va Fotosintez qorong\'ulik bosqichi bo\'yicha darslikdagi qisqa ma\'ruzani qayta o\'qib chiqish tavsiya etiladi.'}
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="px-6 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#104C36] text-white font-bold text-xs inline-flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Qayta topshirish</span>
          </button>
        </div>
      )}
    </div>
  );
};
