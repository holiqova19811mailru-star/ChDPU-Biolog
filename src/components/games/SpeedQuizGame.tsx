import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { speedQuestionsPool, SpeedQuestion } from '../../data/gamesData';
import { Zap, Clock, Award, RotateCcw, Play, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SpeedQuizGame: React.FC = () => {
  const { t } = useTranslation();
  const { saveGameScore, addBadge } = useAuth();

  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Timer countdown
  useEffect(() => {
    let timer: any = null;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isPlaying && timeLeft === 0) {
      setIsPlaying(false);
      setGameOver(true);
      saveGameScore('game-speed', score);
      if (score >= 400) {
        addBadge('Chaqmoq Fikr');
      }
      try {
        confetti({ particleCount: 50, spread: 70 });
      } catch (e) {}
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleStart = () => {
    setIsPlaying(true);
    setTimeLeft(60);
    setCurrentIdx(0);
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setGameOver(false);
  };

  const handleAnswer = (selectedIndex: number) => {
    if (!isPlaying) return;

    const q = speedQuestionsPool[currentIdx];
    if (selectedIndex === q.correctIndex) {
      setScore(s => s + 50);
      setCorrectCount(c => c + 1);
    } else {
      setWrongCount(w => w + 1);
    }

    // Advance to next question (loops around if needed)
    setCurrentIdx(idx => (idx + 1) % speedQuestionsPool.length);
  };

  const currentQ = speedQuestionsPool[currentIdx];

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
        <div>
          <span className="text-xs font-bold text-[#176B4D] dark:text-[#62C9A5] uppercase tracking-wider">
            3-O\'yin
          </span>
          <h3 className="text-xl font-extrabold text-stone-900 dark:text-white flex items-center space-x-1.5">
            <Zap className="w-5 h-5 text-amber-500 fill-current" />
            <span>{t('gameSpeed')}</span>
          </h3>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-xl border border-amber-200">
            <Clock className="w-3.5 h-3.5" />
            <span>{timeLeft}s</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-stone-500">Ball:</span>
            <p className="text-lg font-black text-emerald-700 dark:text-emerald-400 font-mono">{score}</p>
          </div>
        </div>
      </div>

      {!isPlaying && !gameOver ? (
        /* Start Screen */
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-600 flex items-center justify-center mx-auto">
            <Zap className="w-8 h-8 fill-current" />
          </div>

          <h4 className="text-lg font-extrabold text-stone-900 dark:text-white">
            60 soniya ichida nechta savolga ulgurasiz?
          </h4>
          <p className="text-xs text-stone-600 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
            Tezkor biologik blits-savollar. Har bir to\'g\'ri javob uchun +50 ball beriladi. Tayyor bo\'lsangiz start tugmasini bosing!
          </p>

          <button
            onClick={handleStart}
            className="px-6 py-3 rounded-xl bg-[#176B4D] hover:bg-[#104C36] text-white font-bold text-xs inline-flex items-center space-x-2 shadow-md"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Vaqtni boshlash (60 soniya)</span>
          </button>
        </div>
      ) : isPlaying ? (
        /* Active Rapid-Fire Question */
        <div className="space-y-5">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>To\'g\'ri: <strong className="text-emerald-600">{correctCount}</strong> | Xato: <strong className="text-red-500">{wrongCount}</strong></span>
            <span>Qolgan vaqt: {timeLeft} soniya</span>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/60 min-h-[100px] flex items-center justify-center text-center">
            <h4 className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-white">
              {currentQ.question}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-stone-900 dark:text-white font-bold text-xs text-left transition-all active:scale-95"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Game Over Screen */
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <h4 className="text-xl font-extrabold text-stone-900 dark:text-white">
            Vaqt tugadi!
          </h4>

          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto text-center text-xs">
            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="text-stone-400 block text-[10px]">Jami ball</span>
              <span className="text-lg font-black text-emerald-600 font-mono">{score}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="text-stone-400 block text-[10px]">To\'g\'ri</span>
              <span className="text-lg font-black text-emerald-600 font-mono">{correctCount}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="text-stone-400 block text-[10px]">Xato</span>
              <span className="text-lg font-black text-red-500 font-mono">{wrongCount}</span>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="px-6 py-2.5 rounded-xl bg-[#176B4D] text-white font-bold text-xs inline-flex items-center space-x-2 shadow-xs hover:bg-[#104C36]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Yana o\'ynash</span>
          </button>
        </div>
      )}
    </div>
  );
};
