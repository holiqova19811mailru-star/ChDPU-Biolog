import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { ecologicalDetectiveCases, DetectiveCase } from '../../data/gamesData';
import { Compass, Search, AlertTriangle, ShieldCheck, CheckCircle2, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export const EcoDetectiveGame: React.FC = () => {
  const { t } = useTranslation();
  const { saveGameScore, addBadge } = useAuth();

  const [currentCaseIdx, setCurrentCaseIdx] = useState(0);
  const [selectedSuspectIdx, setSelectedSuspectIdx] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const curCase = ecologicalDetectiveCases[currentCaseIdx];

  const handleSelectSuspect = (idx: number) => {
    if (selectedSuspectIdx !== null) return;
    setSelectedSuspectIdx(idx);

    if (curCase.suspects[idx].isGuilty) {
      setScore(s => s + 150);
      try {
        confetti({ particleCount: 50, spread: 70 });
      } catch (e) {}
      saveGameScore('game-detective', score + 150);
      addBadge('Biyo-Detektiv');
    }
  };

  const handleNextCase = () => {
    setSelectedSuspectIdx(null);
    setCurrentCaseIdx((prev) => (prev + 1) % ecologicalDetectiveCases.length);
  };

  const handleReset = () => {
    setSelectedSuspectIdx(null);
    setCurrentCaseIdx(0);
    setScore(0);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
        <div>
          <span className="text-xs font-bold text-[#176B4D] dark:text-[#62C9A5] uppercase tracking-wider">
            6-O\'yin
          </span>
          <h3 className="text-xl font-extrabold text-stone-900 dark:text-white flex items-center space-x-1.5">
            <Compass className="w-5 h-5 text-[#2D9B75] dark:text-[#62C9A5]" />
            <span>{t('gameDetective')}</span>
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-stone-500">Ball:</span>
          <p className="text-lg font-black text-emerald-700 dark:text-emerald-400 font-mono">{score}</p>
        </div>
      </div>

      {/* Case Header Dossier */}
      <div className="p-5 rounded-2xl bg-stone-900 text-white space-y-3 shadow-md">
        <div className="flex items-center justify-between text-xs text-emerald-400 font-mono">
          <span>📁 JINOMAT ISHI: #{curCase.id.toUpperCase()}</span>
          <span>📍 {curCase.location}</span>
        </div>
        <h4 className="text-lg font-black">{curCase.title}</h4>
        <p className="text-xs text-stone-300 leading-relaxed">{curCase.brief}</p>
      </div>

      {/* Symptoms & Clues Discovered */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs space-y-2">
          <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center space-x-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Voqea joyidagi alomatlar:</span>
          </span>
          <ul className="space-y-1 text-stone-700 dark:text-stone-300">
            {curCase.symptoms.map((s, i) => (
              <li key={i} className="flex items-start space-x-1.5">
                <span className="text-amber-600">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs space-y-2">
          <span className="font-bold text-[#176B4D] dark:text-[#62C9A5] flex items-center space-x-1.5">
            <Search className="w-3.5 h-3.5" />
            <span>Topilgan ilmiy ashyoviy dalillar:</span>
          </span>
          <ul className="space-y-1 text-stone-700 dark:text-stone-300">
            {curCase.cluesFound.map((c, i) => (
              <li key={i} className="flex items-start space-x-1.5">
                <span className="text-emerald-600">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suspect Theories Selection */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">
          Ekologik tashxisni qo\'ying (Gipotezani tanlang):
        </h4>

        <div className="space-y-2.5">
          {curCase.suspects.map((suspect, idx) => {
            let itemClass = 'border-stone-200 dark:border-stone-800 bg-white dark:bg-[#162420] hover:border-emerald-500';

            if (selectedSuspectIdx !== null) {
              if (suspect.isGuilty) {
                itemClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/80 ring-2 ring-emerald-400';
              } else if (idx === selectedSuspectIdx) {
                itemClass = 'border-red-400 bg-red-50 dark:bg-red-950/80 ring-2 ring-red-400';
              } else {
                itemClass = 'opacity-40 border-stone-200';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectSuspect(idx)}
                disabled={selectedSuspectIdx !== null}
                className={`w-full p-4 rounded-xl border text-left text-xs transition-all ${itemClass}`}
              >
                <div className="flex items-center justify-between font-bold text-stone-900 dark:text-white mb-1">
                  <span>{suspect.name}</span>
                  {selectedSuspectIdx !== null && suspect.isGuilty && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
                <p className="text-stone-600 dark:text-stone-300 text-[11px] leading-relaxed">
                  {suspect.description}
                </p>

                {selectedSuspectIdx !== null && (idx === selectedSuspectIdx || suspect.isGuilty) && (
                  <div className="mt-2 pt-2 border-t border-stone-200 dark:border-stone-700 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
                    💡 {suspect.explanation}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      {selectedSuspectIdx !== null && (
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleReset}
            className="text-xs font-semibold text-stone-500 hover:text-stone-800 flex items-center space-x-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Qayta boshlash</span>
          </button>
          <button
            onClick={handleNextCase}
            className="px-5 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#104C36] text-white font-bold text-xs shadow-xs"
          >
            Keyingi ishni ochish
          </button>
        </div>
      )}
    </div>
  );
};
