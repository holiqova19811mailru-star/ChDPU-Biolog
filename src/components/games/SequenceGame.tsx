import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { sequenceChallenges, SequenceChallenge } from '../../data/gamesData';
import { ListOrdered, ArrowUp, ArrowDown, CheckCircle2, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SequenceGame: React.FC = () => {
  const { t } = useTranslation();
  const { saveGameScore, addBadge } = useAuth();

  const [challengeIdx, setChallengeIdx] = useState(0);
  const currentChallenge = sequenceChallenges[challengeIdx];

  const [currentSteps, setCurrentSteps] = useState<string[]>([...currentChallenge.steps]);
  const [isChecked, setIsChecked] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [score, setScore] = useState(0);

  const moveStep = (index: number, dir: 'up' | 'down') => {
    const targetIdx = dir === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= currentSteps.length) return;

    const copy = [...currentSteps];
    const [item] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, item);
    setCurrentSteps(copy);
    setIsChecked(false);
  };

  const handleVerify = () => {
    setIsChecked(true);

    // Map each current step string back to its original index
    const userOrder = currentSteps.map(s => currentChallenge.steps.indexOf(s));
    const isCorrect = userOrder.every((val, i) => val === currentChallenge.correctOrder[i]);

    setIsSuccess(isCorrect);
    if (isCorrect) {
      setScore(s => s + 100);
      try {
        confetti({ particleCount: 40, spread: 60 });
      } catch (e) {}

      if (challengeIdx + 1 === sequenceChallenges.length) {
        saveGameScore('game-sequence', score + 100);
        addBadge('Molekulyar Arxitektor');
      }
    }
  };

  const handleNextChallenge = () => {
    const nextIdx = (challengeIdx + 1) % sequenceChallenges.length;
    setChallengeIdx(nextIdx);
    setCurrentSteps([...sequenceChallenges[nextIdx].steps]);
    setIsChecked(false);
    setIsSuccess(false);
  };

  const handleResetCurrent = () => {
    setCurrentSteps([...currentChallenge.steps]);
    setIsChecked(false);
    setIsSuccess(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
        <div>
          <span className="text-xs font-bold text-[#176B4D] dark:text-[#62C9A5] uppercase tracking-wider">
            4-O\'yin
          </span>
          <h3 className="text-xl font-extrabold text-stone-900 dark:text-white flex items-center space-x-1.5">
            <ListOrdered className="w-5 h-5 text-[#2D9B75] dark:text-[#62C9A5]" />
            <span>{t('gameSequence')}</span>
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-stone-500">Ball:</span>
          <p className="text-lg font-black text-emerald-700 dark:text-emerald-400 font-mono">{score}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
              {currentChallenge.title}
            </span>
            <span className="text-[10px] font-mono text-stone-500">
              Bosqich {challengeIdx + 1} / {sequenceChallenges.length}
            </span>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-300">
            {currentChallenge.description}
          </p>
        </div>

        {/* Re-orderable Steps */}
        <div className="space-y-2.5">
          {currentSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/40 flex items-center justify-between transition-all"
            >
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-xs font-medium text-stone-900 dark:text-stone-100 leading-snug">
                  {step}
                </span>
              </div>

              <div className="flex items-center space-x-1 shrink-0 ml-2">
                <button
                  onClick={() => moveStep(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1 rounded text-stone-400 hover:text-stone-900 dark:hover:text-white disabled:opacity-20"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => moveStep(idx, 'down')}
                  disabled={idx === currentSteps.length - 1}
                  className="p-1 rounded text-stone-400 hover:text-stone-900 dark:hover:text-white disabled:opacity-20"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Verification & Feedback */}
        <div className="flex items-center space-x-3 pt-2">
          <button
            onClick={handleResetCurrent}
            className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50"
            title="Qayta boshlash"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleVerify}
            className="flex-1 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#104C36] text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Tartibni tekshirish</span>
          </button>
        </div>

        {isChecked && (
          <div className={`p-4 rounded-2xl border text-xs ${
            isSuccess
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200'
              : 'bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-800 text-red-950 dark:text-red-200'
          }`}>
            <p className="font-bold mb-1">
              {isSuccess ? '✓ To\'g\'ri ketma-ketlik! (+100 ball)' : '✕ Xatolik bor. Qaytadan urinib ko\'ring.'}
            </p>
            <p className="text-[11px] leading-relaxed mb-3">
              {currentChallenge.explanation}
            </p>

            {isSuccess && (
              <button
                onClick={handleNextChallenge}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
              >
                Keyingi jarayonga o\'tish
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
