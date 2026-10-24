import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { dominoPairs } from '../../data/gamesData';
import { CheckCircle2, RotateCcw, Award, Layers, Link2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DominoGame: React.FC = () => {
  const { t } = useTranslation();
  const { saveGameScore, addBadge } = useAuth();

  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Scrambled lists
  const terms = dominoPairs.map(p => p.term);
  const matches = [...dominoPairs.map(p => p.match)].sort();

  const handleSelectTerm = (term: string) => {
    if (matchedPairs.includes(term)) return;
    setSelectedTerm(term);
    setErrorMsg(null);
  };

  const handleSelectMatch = (match: string) => {
    if (!selectedTerm) {
      setErrorMsg('Avval chap ustundan biologik atamani tanlang!');
      return;
    }

    const pair = dominoPairs.find(p => p.term === selectedTerm);
    if (pair && pair.match === match) {
      setMatchedPairs(prev => [...prev, selectedTerm]);
      setScore(prev => prev + 50);
      setSelectedTerm(null);
      setErrorMsg(null);

      if (matchedPairs.length + 1 === dominoPairs.length) {
        saveGameScore('game-domino', score + 50);
        addBadge('Domino Strategi');
        try {
          confetti({ particleCount: 50, spread: 60 });
        } catch (e) {}
      }
    } else {
      setErrorMsg('Noto\'g\'ri moslik! Boshqa variantni sinab ko\'ring.');
      setSelectedTerm(null);
    }
  };

  const handleReset = () => {
    setMatchedPairs([]);
    setSelectedTerm(null);
    setScore(0);
    setErrorMsg(null);
  };

  const isCompleted = matchedPairs.length === dominoPairs.length;

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
        <div>
          <span className="text-xs font-bold text-[#176B4D] dark:text-[#62C9A5] uppercase tracking-wider">
            2-O\'yin
          </span>
          <h3 className="text-xl font-extrabold text-stone-900 dark:text-white">
            {t('gameDomino')}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-stone-500">Ball:</span>
          <p className="text-lg font-black text-emerald-700 dark:text-emerald-400 font-mono">{score}</p>
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-xs text-stone-700 dark:text-stone-300 flex items-center justify-between">
        <span>Chap ustundagi atamani tanlang va unga mos o\'ng ustundagi biologik jarayonni bosing.</span>
        <button onClick={handleReset} className="text-stone-500 hover:text-emerald-700 flex items-center space-x-1 font-semibold">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-800 dark:text-red-200">
          {errorMsg}
        </div>
      )}

      {/* Domino Matching Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Left Column: Biological Terms */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Biologik Atama / Ferment
          </h4>
          {terms.map((term, i) => {
            const isMatched = matchedPairs.includes(term);
            const isSelected = selectedTerm === term;

            return (
              <button
                key={i}
                onClick={() => handleSelectTerm(term)}
                disabled={isMatched}
                className={`w-full p-3.5 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${
                  isMatched
                    ? 'bg-emerald-100/70 dark:bg-emerald-950/70 border-emerald-400 text-emerald-900 dark:text-emerald-200 line-through opacity-70'
                    : isSelected
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/60 text-[#176B4D] dark:text-[#62C9A5] ring-2 ring-emerald-400'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 text-stone-800 dark:text-stone-200 hover:bg-emerald-50'
                }`}
              >
                <span>{term}</span>
                {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                {isSelected && <Link2 className="w-4 h-4 text-emerald-600 animate-pulse" />}
              </button>
            );
          })}
        </div>

        {/* Right Column: Functions / Processes */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Vazifasi / Biologik Hodisa
          </h4>
          {matches.map((match, i) => {
            const matchingPair = dominoPairs.find(p => p.match === match);
            const isMatched = matchingPair && matchedPairs.includes(matchingPair.term);

            return (
              <button
                key={i}
                onClick={() => handleSelectMatch(match)}
                disabled={Boolean(isMatched)}
                className={`w-full p-3.5 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${
                  isMatched
                    ? 'bg-emerald-100/70 dark:bg-emerald-950/70 border-emerald-400 text-emerald-900 dark:text-emerald-200 line-through opacity-70'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 text-stone-800 dark:text-stone-200 hover:bg-emerald-50'
                }`}
              >
                <span>{match}</span>
                {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
              </button>
            );
          })}
        </div>

      </div>

      {isCompleted && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-center space-y-2">
          <Award className="w-8 h-8 text-emerald-600 mx-auto" />
          <h4 className="text-base font-bold text-emerald-950 dark:text-emerald-100">
            Ajoyib! Barcha domino zanjirlari muvaffaqiyatli ulandi!
          </h4>
          <p className="text-xs text-emerald-800 dark:text-emerald-300">
            Siz {score} ball va "Domino Strategi" nishonini qo\'lga kiritdingiz.
          </p>
        </div>
      )}
    </div>
  );
};
