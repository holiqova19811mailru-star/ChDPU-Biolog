import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { Trees, Play, RotateCcw, AlertCircle, Award, Sparkles, TrendingUp } from 'lucide-react';
import confetti from 'canvas-confetti';

export const EcosystemLab: React.FC = () => {
  const { t } = useTranslation();
  const { markLabCompleted } = useAuth();

  const [month, setMonth] = useState(1);
  const [producers, setProducers] = useState(5000); // kg biomass
  const [herbivores, setHerbivores] = useState(120); // population
  const [predators, setPredators] = useState(15); // population
  const [history, setHistory] = useState<Array<{ month: number; prod: number; herb: number; pred: number }>>([
    { month: 1, prod: 5000, herb: 120, pred: 15 }
  ]);
  const [eventMsg, setEventMsg] = useState<string | null>(null);

  // Advance simulation step (Month cycle based on Lotka-Volterra dynamics)
  const advanceMonth = () => {
    setMonth((prev) => {
      const nextMonth = prev + 1;
      
      // Calculate growth and interactions
      // Herbivores consume producers
      const consumedPlant = herbivores * 8;
      const newProducers = Math.max(200, Math.min(10000, producers + 800 - consumedPlant));

      // Predators hunt herbivores
      const huntedHerbivores = Math.min(herbivores, Math.round(predators * 1.8));
      const newHerbivores = Math.max(5, Math.min(1500, Math.round(herbivores * 1.15) - huntedHerbivores));

      // Predator population depends on available prey
      const foodRatio = herbivores / (predators * 8);
      let newPredators = predators;
      if (foodRatio > 1.2) {
        newPredators = Math.min(80, Math.round(predators * 1.1) + 1);
      } else if (foodRatio < 0.7) {
        newPredators = Math.max(2, Math.round(predators * 0.85));
      }

      setProducers(newProducers);
      setHerbivores(newHerbivores);
      setPredators(newPredators);

      setHistory(h => [
        ...h.slice(-11),
        { month: nextMonth, prod: newProducers, herb: newHerbivores, pred: newPredators }
      ]);

      if (nextMonth >= 12) {
        markLabCompleted('ecosystem-lab');
      }

      return nextMonth;
    });
  };

  const triggerEvent = (type: 'drought' | 'hunt' | 'restore') => {
    if (type === 'drought') {
      setProducers(prev => Math.round(prev * 0.35));
      setEventMsg('Qurg\'oqchilik yuz berdi: o\'simliklar biomassasi 65% ga kamaydi!');
    } else if (type === 'hunt') {
      setPredators(2);
      setEventMsg('Yirtqichlar noqonuniy ovlandi: populyatsiya 2 tagacha tushdi! O\'txo\'rlar soni keskin ortishi kutilmoqda.');
    } else if (type === 'restore') {
      setProducers(5000);
      setHerbivores(120);
      setPredators(15);
      setEventMsg('Qo\'riqxona rejimi joriy etildi: tabiiy barqarorlik tiklandi.');
    }
  };

  const handleReset = () => {
    setMonth(1);
    setProducers(5000);
    setHerbivores(120);
    setPredators(15);
    setHistory([{ month: 1, prod: 5000, herb: 120, pred: 15 }]);
    setEventMsg(null);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white flex items-center space-x-2">
            <Trees className="w-5 h-5 text-[#2D9B75] dark:text-[#62C9A5]" />
            <span>{t('labEcosystemName')}</span>
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400">
            Produtsentlar, o\'txo\'rlar va yirtqichlar o\'rtasidagi trofik muvozanat va Lotka-Volterra dinamikasi
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50"
            title="Qayta boshlash"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={advanceMonth}
            className="px-4 py-2 rounded-xl bg-[#176B4D] hover:bg-[#104C36] text-white font-bold text-xs flex items-center space-x-2 shadow-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Keyingi oyga o\'tish (Oy: {month})</span>
          </button>
        </div>
      </div>

      {eventMsg && (
        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <p>{eventMsg}</p>
        </div>
      )}

      {/* Main dashboard & Trophic pyramid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Visual Ecological Pyramid */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-6">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Ekologik biomassa piramidasi
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
              Vaqt: {month}-oy
            </span>
          </div>

          {/* Pyramid levels */}
          <div className="w-full max-w-md space-y-3 flex flex-col items-center">
            {/* 3. Apex Predators (Top) */}
            <div
              className="w-40 py-2.5 px-4 rounded-xl bg-red-600 text-white text-center text-xs font-bold shadow-md transition-all duration-300"
              style={{ width: `${Math.min(260, Math.max(120, predators * 4))}px` }}
            >
              <span>🐺 Yirtqichlar (Bo\'ri/Tulki)</span>
              <div className="text-[11px] font-mono opacity-90">{predators} ta</div>
            </div>

            {/* 2. Herbivores (Middle) */}
            <div
              className="w-64 py-3 px-4 rounded-xl bg-amber-500 text-stone-950 text-center text-xs font-bold shadow-md transition-all duration-300"
              style={{ width: `${Math.min(360, Math.max(180, herbivores * 1.5))}px` }}
            >
              <span>🐇 O\'txo\'rlar (Quyon/Jayron)</span>
              <div className="text-[11px] font-mono opacity-90">{herbivores} ta</div>
            </div>

            {/* 1. Producers (Base) */}
            <div
              className="w-full py-4 px-4 rounded-xl bg-emerald-600 text-white text-center text-xs font-bold shadow-md transition-all duration-300"
            >
              <span>🌿 Produtsentlar (O\'tlar va butalar biomassasi)</span>
              <div className="text-[11px] font-mono opacity-90">{producers.toLocaleString()} kg</div>
            </div>
          </div>

          {/* Dynamic History Timeline */}
          <div className="w-full mt-8 pt-4 border-t border-stone-200 dark:border-stone-800">
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 block flex items-center space-x-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Populyatsiyalar dinamikasi (Oxirgi oylar)</span>
            </span>
            <div className="flex items-end space-x-2 h-24 pt-2">
              {history.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                  <div
                    className="w-full rounded-t bg-emerald-500"
                    style={{ height: `${Math.min(100, (h.prod / 10000) * 100)}%` }}
                    title={`Oy ${h.month}: Produtsent ${h.prod} kg`}
                  />
                  <span className="text-[9px] text-stone-400 mt-1">{h.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Environmental Stress Events & Scenarios */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white">
              Tashqi ta\'sirlarni simulyatsiya qilish
            </h4>

            <button
              onClick={() => triggerEvent('drought')}
              className="w-full p-3 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-950/30 text-left hover:bg-amber-100 transition-colors"
            >
              <div className="text-xs font-bold text-amber-900 dark:text-amber-200">
                ☀️ Qurg\'oqchilik va suv tanqisligi
              </div>
              <p className="text-[11px] text-amber-700 dark:text-amber-300 mt-0.5">
                O\'simliklar quriydi, oziq yetishmovchiligi o\'txo\'rlarga zarba beradi.
              </p>
            </button>

            <button
              onClick={() => triggerEvent('hunt')}
              className="w-full p-3 rounded-xl border border-red-300 dark:border-red-800 bg-red-50/60 dark:bg-red-950/30 text-left hover:bg-red-100 transition-colors"
            >
              <div className="text-xs font-bold text-red-900 dark:text-red-200">
                🎯 Noqonuniy ovlanish (Yirtqichlar yo\'qolishi)
              </div>
              <p className="text-[11px] text-red-700 dark:text-red-300 mt-0.5">
                Bo\'rilar yo\'qolsa, quyonlar o\'tloqni yeb bitiradi va degradatsiya yuz beradi.
              </p>
            </button>

            <button
              onClick={() => triggerEvent('restore')}
              className="w-full p-3 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30 text-left hover:bg-emerald-100 transition-colors"
            >
              <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                🛡️ Biosfera rezervati va qo\'riqlash
              </div>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-300 mt-0.5">
                Populyatsiyalarni optimal Lotka-Volterra muvozanatiga qaytaradi.
              </p>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-stone-700 dark:text-stone-300 space-y-1.5">
            <h5 className="font-bold text-[#176B4D] dark:text-[#62C9A5]">Lindeman 10% qoidasi:</h5>
            <p className="leading-relaxed">
              Trofik piramidada har bir pog\'ona o\'zidan oldingi pog\'ona energiyasining atigi ~10% qismini o\'zlashtiradi. Shu bois ekotizimda yirtqichlar soni o\'txo\'rlarga qaraganda doimo kam bo\'ladi.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
