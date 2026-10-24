import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { dailyBiologyFacts } from '../../data/uzbekistanNatureData';
import { Lightbulb, RefreshCw, BookOpen } from 'lucide-react';

export const DailyFactSection: React.FC = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const fact = dailyBiologyFacts[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % dailyBiologyFacts.length);
  };

  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-emerald-50 to-teal-50/40 dark:from-[#13221C] dark:to-[#172A22] border border-emerald-200/80 dark:border-emerald-800/60 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600/10 dark:bg-emerald-400/10 text-[#176B4D] dark:text-[#62C9A5] flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-wider">
              {t('dailyFactTitle')}
            </h3>
            <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
              Har kuni yangi ilmiy kashfiyot
            </span>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="p-1.5 rounded-lg text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
          title="Boshqa faktni ko'rish"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        <h4 className="text-base font-bold text-emerald-950 dark:text-emerald-100">
          {fact.title}
        </h4>
        <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          {fact.fact}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-emerald-800/40 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
        <span className="flex items-center space-x-1">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Manba: {fact.source}</span>
        </span>
        <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400">
          #{currentIndex + 1} / {dailyBiologyFacts.length}
        </span>
      </div>
    </div>
  );
};
