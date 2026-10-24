import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { Dna, CheckCircle2, RotateCcw, Award, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export const GeneticsLab: React.FC = () => {
  const { t } = useTranslation();
  const { markLabCompleted } = useAuth();

  const [mode, setMode] = useState<'monohybrid' | 'dihybrid'>('monohybrid');

  // Monohybrid alleles: A (Sariq), a (Yashil)
  const [motherMono, setMotherMono] = useState<'AA' | 'Aa' | 'aa'>('Aa');
  const [fatherMono, setFatherMono] = useState<'AA' | 'Aa' | 'aa'>('Aa');

  // Calculate monohybrid 2x2
  const motherGametes = motherMono.split('');
  const fatherGametes = fatherMono.split('');

  const grid2x2 = [
    [fatherGametes[0] + motherGametes[0], fatherGametes[1] + motherGametes[0]],
    [fatherGametes[0] + motherGametes[1], fatherGametes[1] + motherGametes[1]]
  ].map(row => row.map(gen => {
    // Normalize Aa order
    return gen === 'aA' ? 'Aa' : gen;
  }));

  // Counts
  let countAA = 0, countAa = 0, countAaSmall = 0;
  grid2x2.flat().forEach(g => {
    if (g === 'AA') countAA++;
    else if (g === 'Aa') countAa++;
    else if (g === 'aa') countAaSmall++;
  });

  const yellowPhenotypeCount = countAA + countAa;
  const greenPhenotypeCount = countAaSmall;

  const handleFinish = () => {
    markLabCompleted('genetics-lab');
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white flex items-center space-x-2">
            <Dna className="w-5 h-5 text-[#2D9B75] dark:text-[#62C9A5]" />
            <span>{t('labGeneticsName')}</span>
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400">
            Mendel qonuniyatlari: Pennet katagida genotipik va fenotipik ehtimolliklarni hisoblash
          </p>
        </div>

        <div className="inline-flex p-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs">
          <button
            onClick={() => setMode('monohybrid')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              mode === 'monohybrid' ? 'bg-[#176B4D] text-white shadow-xs' : 'text-stone-700 dark:text-stone-300'
            }`}
          >
            Monoduragay (1 juft belgi)
          </button>
          <button
            onClick={() => setMode('dihybrid')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              mode === 'dihybrid' ? 'bg-[#176B4D] text-white shadow-xs' : 'text-stone-700 dark:text-stone-300'
            }`}
          >
            Diduragay (2 juft belgi)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Punnett Square Grid */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              {mode === 'monohybrid' ? '2x2 Pennet katagi' : '4x4 Diduragay Pennet katagi'}
            </span>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              A — Sariq no\'xat (dominant), a — Yashil no\'xat (retsessiv)
            </span>
          </div>

          {/* Interactive Punnett Square Table */}
          {mode === 'monohybrid' ? (
            <div className="max-w-md mx-auto my-4">
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
                {/* Top left corner blank */}
                <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center">
                  ♀ \ ♂
                </div>
                {/* Father Gametes (Top) */}
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 text-base">
                  {fatherGametes[0]}
                </div>
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 text-base">
                  {fatherGametes[1]}
                </div>

                {/* Mother Gamete 1 (Left) */}
                <div className="p-3 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-900 dark:text-pink-200 text-base flex items-center justify-center">
                  {motherGametes[0]}
                </div>
                {/* Offspring (0,0) */}
                <div className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center ${
                  grid2x2[0][0] === 'aa' ? 'bg-emerald-100 border-emerald-500 text-emerald-950' : 'bg-amber-100 border-amber-400 text-amber-950'
                }`}>
                  <span className="text-lg font-mono font-black">{grid2x2[0][0]}</span>
                  <span className="text-[10px]">{grid2x2[0][0] === 'aa' ? '🟢 Yashil' : '🟡 Sariq'}</span>
                </div>
                {/* Offspring (0,1) */}
                <div className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center ${
                  grid2x2[0][1] === 'aa' ? 'bg-emerald-100 border-emerald-500 text-emerald-950' : 'bg-amber-100 border-amber-400 text-amber-950'
                }`}>
                  <span className="text-lg font-mono font-black">{grid2x2[0][1]}</span>
                  <span className="text-[10px]">{grid2x2[0][1] === 'aa' ? '🟢 Yashil' : '🟡 Sariq'}</span>
                </div>

                {/* Mother Gamete 2 (Left) */}
                <div className="p-3 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-900 dark:text-pink-200 text-base flex items-center justify-center">
                  {motherGametes[1]}
                </div>
                {/* Offspring (1,0) */}
                <div className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center ${
                  grid2x2[1][0] === 'aa' ? 'bg-emerald-100 border-emerald-500 text-emerald-950' : 'bg-amber-100 border-amber-400 text-amber-950'
                }`}>
                  <span className="text-lg font-mono font-black">{grid2x2[1][0]}</span>
                  <span className="text-[10px]">{grid2x2[1][0] === 'aa' ? '🟢 Yashil' : '🟡 Sariq'}</span>
                </div>
                {/* Offspring (1,1) */}
                <div className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center ${
                  grid2x2[1][1] === 'aa' ? 'bg-emerald-100 border-emerald-500 text-emerald-950' : 'bg-amber-100 border-amber-400 text-amber-950'
                }`}>
                  <span className="text-lg font-mono font-black">{grid2x2[1][1]}</span>
                  <span className="text-[10px]">{grid2x2[1][1] === 'aa' ? '🟢 Yashil' : '🟡 Sariq'}</span>
                </div>
              </div>
            </div>
          ) : (
            /* Dihybrid 4x4 representation */
            <div className="overflow-x-auto my-3 text-center text-xs">
              <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 mb-2">
                Diduragay (AaBb x AaBb): F2 da 16 ta kombinatsiya hosil bo\'ladi.
              </div>
              <div className="grid grid-cols-4 gap-2 font-mono font-bold text-center">
                {['AABB', 'AABb', 'AaBB', 'AaBb', 'AABb', 'AAbb', 'AaBb', 'Aabb', 'AaBB', 'AaBb', 'aaBB', 'aaBb', 'AaBb', 'Aabb', 'aaBb', 'aabb'].map((comb, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                    <span className="block text-stone-900 dark:text-white">{comb}</span>
                    <span className="text-[9px] font-sans font-normal text-stone-500">
                      {comb.includes('aa') && comb.includes('bb') ? 'Yashil burishgan' : comb.includes('aa') ? 'Yashil silliq' : comb.includes('bb') ? 'Sariq burishgan' : 'Sariq silliq'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Probability & Breakdown Bar */}
          <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
              <h5 className="font-bold text-stone-900 dark:text-white mb-1">Genotipik nisbat:</h5>
              <p className="font-mono text-emerald-800 dark:text-emerald-300">
                AA: {countAA} ({((countAA / 4) * 100).toFixed(0)}%) | Aa: {countAa} ({((countAa / 4) * 100).toFixed(0)}%) | aa: {countAaSmall} ({((countAaSmall / 4) * 100).toFixed(0)}%)
              </p>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
              <h5 className="font-bold text-stone-900 dark:text-white mb-1">Fenotipik nisbat:</h5>
              <p className="font-mono text-emerald-800 dark:text-emerald-300">
                🟡 Sariq: {yellowPhenotypeCount} ({((yellowPhenotypeCount / 4) * 100).toFixed(0)}%) | 🟢 Yashil: {greenPhenotypeCount} ({((greenPhenotypeCount / 4) * 100).toFixed(0)}%)
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Parental Genotype Configuration */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white">
              Ota-ona genotiplarini tanlash
            </h4>

            {/* Mother Genotype */}
            <div>
              <label className="text-xs font-semibold text-pink-700 dark:text-pink-400 block mb-1">
                Ona organizm (♀ Genotip):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['AA', 'Aa', 'aa'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setMotherMono(g)}
                    className={`py-2 rounded-xl text-xs font-bold font-mono transition-all border ${
                      motherMono === g
                        ? 'bg-pink-600 text-white border-pink-600 shadow-xs'
                        : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Father Genotype */}
            <div>
              <label className="text-xs font-semibold text-blue-700 dark:text-blue-400 block mb-1">
                Ota organizm (♂ Genotip):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['AA', 'Aa', 'aa'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setFatherMono(g)}
                    className={`py-2 rounded-xl text-xs font-bold font-mono transition-all border ${
                      fatherMono === g
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full mt-2 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#104C36] text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-xs"
            >
              <Award className="w-4 h-4" />
              <span>Natijani tasdiqlash va ball olish</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-stone-700 dark:text-stone-300 space-y-1.5">
            <h5 className="font-bold text-[#176B4D] dark:text-[#62C9A5] flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Mendel qonuni tushuntirishi</span>
            </h5>
            <p className="leading-relaxed">
              Agar Aa x Aa chatishtirilsa, genotip bo\'yicha 1 AA : 2 Aa : 1 aa (1:2:1) va to\'liq dominantlikda fenotip bo\'yicha 3 sariq : 1 yashil (3:1) ajralish olinadi.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
