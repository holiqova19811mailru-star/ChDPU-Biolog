import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { questionsOfTheDay } from '../../data/uzbekistanNatureData';
import { HelpCircle, Check, X, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuestionOfTheDay: React.FC = () => {
  const { t } = useTranslation();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [questionIdx, setQuestionIdx] = useState(0);

  const q = questionsOfTheDay[questionIdx];

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelectedIdx(idx);
    setRevealed(true);
    if (idx === q.correctIndex) {
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
      } catch (e) {}
    }
  };

  const handleNext = () => {
    setSelectedIdx(null);
    setRevealed(false);
    setQuestionIdx((prev) => (prev + 1) % questionsOfTheDay.length);
  };

  return (
    <div className="rounded-2xl p-6 bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600/10 dark:bg-emerald-400/10 text-[#176B4D] dark:text-[#62C9A5] flex items-center justify-center">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-wider">
              {t('dailyQuestionTitle')}
            </h3>
            <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
              O\'z bilimingizni sinab ko\'ring
            </span>
          </div>
        </div>

        {revealed && (
          <button
            onClick={handleNext}
            className="flex items-center space-x-1 text-xs font-semibold text-[#176B4D] dark:text-[#62C9A5] hover:underline"
          >
            <span>Keyingi savol</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <p className="text-sm font-semibold text-stone-900 dark:text-white mb-4 leading-relaxed">
        {q.question}
      </p>

      {/* Options List */}
      <div className="space-y-2">
        {q.options.map((option, idx) => {
          let btnStyle = 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-stone-700 dark:text-stone-300';

          if (revealed) {
            if (idx === q.correctIndex) {
              btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500';
            } else if (idx === selectedIdx) {
              btnStyle = 'border-red-400 bg-red-50 dark:bg-red-950/50 text-red-900 dark:text-red-200 ring-1 ring-red-400';
            } else {
              btnStyle = 'border-stone-200 dark:border-stone-800 opacity-60 text-stone-500';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={revealed}
              className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start space-x-2.5 ${btnStyle}`}
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold border border-current">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1 leading-snug">{option}</span>
              {revealed && idx === q.correctIndex && (
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              )}
              {revealed && idx === selectedIdx && idx !== q.correctIndex && (
                <X className="w-4 h-4 text-red-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation when revealed */}
      {revealed && (
        <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-xs text-stone-700 dark:text-stone-300">
          <p className="font-bold text-[#176B4D] dark:text-[#62C9A5] mb-1">
            {selectedIdx === q.correctIndex ? '✓ To\'g\'ri javob!' : '✕ Noto\'g\'ri javob.'}
          </p>
          <p className="leading-relaxed">{q.explanation}</p>
        </div>
      )}
    </div>
  );
};
