import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { whoAmIRiddles, WhoAmIRiddle } from '../../data/gamesData';
import { HelpCircle, Eye, CheckCircle2, XCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const WhoAmIGame: React.FC = () => {
  const { t } = useTranslation();
  const { saveGameScore, addBadge } = useAuth();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealedCluesCount, setRevealedCluesCount] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const currentRiddle = whoAmIRiddles[currentIdx];

  const handleRevealClue = () => {
    if (revealedCluesCount < currentRiddle.clues.length) {
      setRevealedCluesCount(prev => prev + 1);
    }
  };

  const handleSelectAnswer = (option: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);

    if (option === currentRiddle.correctAnswer) {
      // Points: 4 clues = 40 pts, 3 clues = 60 pts, 2 clues = 80 pts, 1 clue = 100 pts!
      const earned = Math.max(30, 110 - (revealedCluesCount * 20));
      setScore(s => s + earned);
      try {
        confetti({ particleCount: 40, spread: 60 });
      } catch (e) {}
    }
  };

  const handleNextRiddle = () => {
    if (currentIdx + 1 < whoAmIRiddles.length) {
      setCurrentIdx(i => i + 1);
      setRevealedCluesCount(1);
      setSelectedAnswer(null);
    } else {
      setGameOver(true);
      saveGameScore('game-whoami', score);
      if (score >= 200) {
        addBadge('Tiriklik Bilimdoni');
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setRevealedCluesCount(1);
    setSelectedAnswer(null);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
        <div>
          <span className="text-xs font-bold text-[#176B4D] dark:text-[#62C9A5] uppercase tracking-wider">
            5-O\'yin
          </span>
          <h3 className="text-xl font-extrabold text-stone-900 dark:text-white flex items-center space-x-1.5">
            <HelpCircle className="w-5 h-5 text-[#2D9B75] dark:text-[#62C9A5]" />
            <span>{t('gameWhoAmI')}</span>
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-stone-500">Ball:</span>
          <p className="text-lg font-black text-emerald-700 dark:text-emerald-400 font-mono">{score}</p>
        </div>
      </div>

      {!gameOver ? (
        <div className="space-y-5">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-semibold text-emerald-800 dark:text-emerald-300">
              Kategoriya: {currentRiddle.category}
            </span>
            <span>Riddle: {currentIdx + 1} / {whoAmIRiddles.length}</span>
          </div>

          {/* Clues Box */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900 dark:text-white">
                Ochilgan maslahatlar ({revealedCluesCount}/{currentRiddle.clues.length}):
              </span>
              {revealedCluesCount < currentRiddle.clues.length && selectedAnswer === null && (
                <button
                  onClick={handleRevealClue}
                  className="text-xs font-bold text-[#176B4D] dark:text-[#62C9A5] hover:underline flex items-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Yana bitta maslahat olish</span>
                </button>
              )}
            </div>

            <div className="space-y-2 pt-1">
              {currentRiddle.clues.slice(0, revealedCluesCount).map((clue, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white dark:bg-[#162420] border border-emerald-100 dark:border-emerald-800/60 text-xs text-stone-800 dark:text-stone-200 shadow-xs flex items-start space-x-2">
                  <span className="text-emerald-600 font-bold">#{idx + 1}</span>
                  <span>{clue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentRiddle.options.map((option, idx) => {
              let btnClass = 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 text-stone-900 dark:text-stone-100 hover:bg-emerald-50';

              if (selectedAnswer !== null) {
                if (option === currentRiddle.correctAnswer) {
                  btnClass = 'border-emerald-500 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 font-bold';
                } else if (option === selectedAnswer) {
                  btnClass = 'border-red-400 bg-red-100 dark:bg-red-950/80 text-red-900 dark:text-red-200';
                } else {
                  btnClass = 'opacity-40 border-stone-200 dark:border-stone-800';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${btnClass}`}
                >
                  <span>{option}</span>
                  {selectedAnswer !== null && option === currentRiddle.correctAnswer && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  )}
                  {selectedAnswer === option && option !== currentRiddle.correctAnswer && (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next */}
          {selectedAnswer !== null && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300">
                <span className="font-bold text-[#176B4D] dark:text-[#62C9A5] block mb-0.5">Ilmiy fakt:</span>
                <p className="leading-relaxed">{currentRiddle.scientificFact}</p>
              </div>

              <button
                onClick={handleNextRiddle}
                className="w-full py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#104C36] text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-xs"
              >
                <span>Keyingi topishmoq</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Game Over */
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <h4 className="text-xl font-extrabold text-stone-900 dark:text-white">
            Topishmoqlar yakunlandi!
          </h4>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Siz <strong>{score}</strong> ball to\'pladingiz.
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
