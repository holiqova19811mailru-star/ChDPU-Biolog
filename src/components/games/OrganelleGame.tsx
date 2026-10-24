import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { organelleGameQuestions, OrganelleQuestion } from '../../data/gamesData';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OrganelleGame: React.FC = () => {
  const { t } = useTranslation();
  const { saveGameScore, addBadge } = useAuth();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const currentQ = organelleGameQuestions[currentIndex];

  const handleSelect = (option: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);

    if (option === currentQ.correctAnswer) {
      setScore(prev => prev + 100);
      try {
        confetti({ particleCount: 30, spread: 50 });
      } catch (e) {}
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < organelleGameQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setGameOver(true);
      saveGameScore('game-organelle', score);
      if (score >= 400) {
        addBadge('Hujayra Ustasi');
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
        <div>
          <span className="text-xs font-bold text-[#176B4D] dark:text-[#62C9A5] uppercase tracking-wider">
            1-O\'yin
          </span>
          <h3 className="text-xl font-extrabold text-stone-900 dark:text-white">
            {t('gameOrganelle')}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-stone-500">To\'plangan ball:</span>
          <p className="text-lg font-black text-emerald-700 dark:text-emerald-400 font-mono">{score}</p>
        </div>
      </div>

      {!gameOver ? (
        <div className="space-y-5">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Savol: {currentIndex + 1} / {organelleGameQuestions.length}</span>
            <span>Har bir to\'g\'ri javob: +100 ball</span>
          </div>

          {/* Riddle Prompt */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60">
            <p className="text-sm font-bold text-stone-900 dark:text-white leading-relaxed">
              "{currentQ.prompt}"
            </p>

            <div className="mt-3 pt-3 border-t border-emerald-200/50 dark:border-emerald-800/40 space-y-1">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Qo\'shimcha belgilar:</span>
              {currentQ.clues.map((c, i) => (
                <p key={i} className="text-xs text-stone-700 dark:text-stone-300">
                  🔍 {c}
                </p>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, i) => {
              let btnClass = 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-stone-800 dark:text-stone-200';
              if (selectedAnswer !== null) {
                if (opt === currentQ.correctAnswer) {
                  btnClass = 'border-emerald-500 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 font-bold';
                } else if (opt === selectedAnswer) {
                  btnClass = 'border-red-400 bg-red-100 dark:bg-red-950/80 text-red-900 dark:text-red-200';
                } else {
                  btnClass = 'opacity-50 border-stone-200 dark:border-stone-800';
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(opt)}
                  disabled={selectedAnswer !== null}
                  className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${btnClass}`}
                >
                  <span>{opt}</span>
                  {selectedAnswer !== null && opt === currentQ.correctAnswer && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  )}
                  {selectedAnswer === opt && opt !== currentQ.correctAnswer && (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next */}
          {selectedAnswer !== null && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300">
                <span className="font-bold text-[#176B4D] dark:text-[#62C9A5] block mb-0.5">Izoh:</span>
                <p>{currentQ.explanation}</p>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#104C36] text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-xs"
              >
                <span>Keyingi savolga o\'tish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Game Over Screen */
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#176B4D] dark:text-[#62C9A5] flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <h4 className="text-xl font-extrabold text-stone-900 dark:text-white">
            O\'yin yakunlandi!
          </h4>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Siz <strong>{organelleGameQuestions.length * 100}</strong> balldan <strong>{score}</strong> ball to\'pladingiz.
          </p>

          <button
            onClick={handleRestart}
            className="px-6 py-2.5 rounded-xl bg-[#176B4D] text-white font-bold text-xs inline-flex items-center space-x-2 shadow-xs hover:bg-[#104C36]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Qayta o\'ynash</span>
          </button>
        </div>
      )}
    </div>
  );
};
