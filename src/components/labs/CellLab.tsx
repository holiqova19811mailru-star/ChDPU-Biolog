import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { cellOrganelles, OrganelleItem } from '../../data/virtualLabsData';
import { CheckCircle2, RefreshCw, Award, Info, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CellLab: React.FC = () => {
  const { t } = useTranslation();
  const { markLabCompleted } = useAuth();

  const [activeCellType, setActiveCellType] = useState<'plant' | 'animal'>('plant');
  const [selectedOrganelle, setSelectedOrganelle] = useState<OrganelleItem>(cellOrganelles[0]);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [userMatches, setUserMatches] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  // Filter organelles for current cell type
  const availableOrganelles = cellOrganelles.filter((org) => {
    if (activeCellType === 'plant') return org.foundIn === 'both' || org.foundIn === 'plant-only';
    return org.foundIn === 'both' || org.foundIn === 'animal-only';
  });

  const handleMatchCheck = () => {
    let score = 0;
    availableOrganelles.slice(0, 4).forEach((org) => {
      if (userMatches[org.id] === org.functionUz) {
        score += 25;
      }
    });

    setQuizScore(score);
    if (score >= 75) {
      setFeedback('Ajoyib natija! Hujayra organoidlari vazifasini mukammal o\'zlashtirdingiz.');
      markLabCompleted('cell-lab');
      try {
        confetti({ particleCount: 50, spread: 70 });
      } catch (e) {}
    } else {
      setFeedback('Ayrim organoidlar vazifasi noto\'g\'ri moslashtirildi. Tushuntirishlarni yana bir bor o\'rganib chiqing.');
    }
  };

  const handleReset = () => {
    setUserMatches({});
    setQuizScore(null);
    setFeedback(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Cell Type Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs gap-4">
        <div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#2D9B75] dark:text-[#62C9A5]" />
            <span>{t('labCellName')}</span>
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400">
            Organoidlar tuzilishi, biogenezi va o\'simlik hamda hayvon hujayralarini qiyoslash
          </p>
        </div>

        {/* Plant vs Animal Toggle */}
        <div className="inline-flex p-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
          <button
            onClick={() => {
              setActiveCellType('plant');
              setSelectedOrganelle(cellOrganelles.find(o => o.id === 'chloroplast') || cellOrganelles[0]);
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCellType === 'plant'
                ? 'bg-[#176B4D] text-white shadow-xs'
                : 'text-stone-700 dark:text-stone-300 hover:text-emerald-800'
            }`}
          >
            🌿 O\'simlik Hujayrasi
          </button>
          <button
            onClick={() => {
              setActiveCellType('animal');
              setSelectedOrganelle(cellOrganelles.find(o => o.id === 'centrosome') || cellOrganelles[0]);
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCellType === 'animal'
                ? 'bg-[#176B4D] text-white shadow-xs'
                : 'text-stone-700 dark:text-stone-300 hover:text-emerald-800'
            }`}
          >
            🐾 Hayvon Hujayrasi
          </button>
        </div>
      </div>

      {/* Main Interactive Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Interactive Cell Diagram representation */}
        <div className="lg:col-span-7 rounded-2xl p-6 bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
              {activeCellType === 'plant' ? 'O\'simlik hujayrasi xaritasi' : 'Hayvon hujayrasi xaritasi'}
            </span>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              Organoidni bosib tanlang
            </span>
          </div>

          {/* Graphical Interactive Cell Stage */}
          <div className="relative w-full aspect-square max-h-[420px] mx-auto rounded-3xl bg-gradient-to-br from-emerald-50/50 via-stone-50 to-teal-50/30 dark:from-[#111F1B] dark:to-[#172822] border-2 border-dashed border-emerald-300 dark:border-emerald-800 p-4 flex items-center justify-center overflow-hidden">
            
            {/* Cell Membrane / Cell Wall Outline */}
            <div
              className={`relative w-[90%] h-[90%] transition-all duration-300 flex items-center justify-center ${
                activeCellType === 'plant'
                  ? 'rounded-2xl border-4 border-emerald-600 bg-emerald-900/5 shadow-inner'
                  : 'rounded-full border-4 border-amber-600/60 bg-amber-900/5 shadow-inner'
              }`}
            >
              {activeCellType === 'plant' && (
                <div className="absolute top-2 left-2 text-[10px] font-bold text-emerald-800 dark:text-emerald-400 bg-white/80 dark:bg-black/40 px-2 py-0.5 rounded">
                  Qattiq selluloza qobiq
                </div>
              )}

              {/* Central Nucleus */}
              <button
                onClick={() => setSelectedOrganelle(cellOrganelles.find(o => o.id === 'nucleus')!)}
                className={`absolute w-24 h-24 rounded-full flex flex-col items-center justify-center text-white transition-transform hover:scale-110 shadow-lg ${
                  selectedOrganelle.id === 'nucleus' ? 'ring-4 ring-purple-400 scale-105' : ''
                }`}
                style={{ backgroundColor: '#8B5CF6' }}
              >
                <div className="w-6 h-6 rounded-full bg-purple-900/80 mb-0.5" />
                <span className="text-[10px] font-bold">Yadro</span>
              </button>

              {/* Mitochondria */}
              <button
                onClick={() => setSelectedOrganelle(cellOrganelles.find(o => o.id === 'mitochondria')!)}
                className={`absolute top-6 right-8 px-3 py-1.5 rounded-full text-white text-[10px] font-bold shadow-md hover:scale-110 transition-transform ${
                  selectedOrganelle.id === 'mitochondria' ? 'ring-4 ring-red-400 scale-105' : ''
                }`}
                style={{ backgroundColor: '#EF4444' }}
              >
                Mitoxondriya
              </button>

              {/* Chloroplast (Plant only) */}
              {activeCellType === 'plant' && (
                <button
                  onClick={() => setSelectedOrganelle(cellOrganelles.find(o => o.id === 'chloroplast')!)}
                  className={`absolute bottom-8 left-8 px-3 py-2 rounded-2xl text-white text-[10px] font-bold shadow-md hover:scale-110 transition-transform ${
                    selectedOrganelle.id === 'chloroplast' ? 'ring-4 ring-green-300 scale-105' : ''
                  }`}
                  style={{ backgroundColor: '#10B981' }}
                >
                  Xloroplast
                </button>
              )}

              {/* Central Vacuole (Plant only) */}
              {activeCellType === 'plant' && (
                <button
                  onClick={() => setSelectedOrganelle(cellOrganelles.find(o => o.id === 'vacuole-central')!)}
                  className={`absolute top-10 left-10 w-28 h-20 rounded-3xl text-cyan-950 font-bold text-[10px] flex items-center justify-center border-2 border-cyan-400 shadow-inner hover:scale-105 transition-transform ${
                    selectedOrganelle.id === 'vacuole-central' ? 'ring-4 ring-cyan-400 scale-105' : ''
                  }`}
                  style={{ backgroundColor: 'rgba(6, 182, 212, 0.35)' }}
                >
                  Markaziy Vakuola
                </button>
              )}

              {/* Centrosome (Animal only) */}
              {activeCellType === 'animal' && (
                <button
                  onClick={() => setSelectedOrganelle(cellOrganelles.find(o => o.id === 'centrosome')!)}
                  className={`absolute top-12 left-12 px-3 py-1.5 rounded-lg text-white text-[10px] font-bold shadow-md hover:scale-110 transition-transform ${
                    selectedOrganelle.id === 'centrosome' ? 'ring-4 ring-amber-300 scale-105' : ''
                  }`}
                  style={{ backgroundColor: '#F59E0B' }}
                >
                  Sentriola
                </button>
              )}

              {/* Golgi Apparatus */}
              <button
                onClick={() => setSelectedOrganelle(cellOrganelles.find(o => o.id === 'golgi')!)}
                className={`absolute bottom-8 right-10 px-3 py-1.5 rounded-xl text-white text-[10px] font-bold shadow-md hover:scale-110 transition-transform ${
                  selectedOrganelle.id === 'golgi' ? 'ring-4 ring-teal-300 scale-105' : ''
                }`}
                style={{ backgroundColor: '#14B8A6' }}
              >
                Golji majmuasi
              </button>

              {/* Lysosome */}
              <button
                onClick={() => setSelectedOrganelle(cellOrganelles.find(o => o.id === 'lysosome')!)}
                className={`absolute bottom-24 right-20 w-8 h-8 rounded-full text-white text-[9px] font-bold flex items-center justify-center shadow-md hover:scale-110 transition-transform ${
                  selectedOrganelle.id === 'lysosome' ? 'ring-4 ring-pink-300 scale-105' : ''
                }`}
                style={{ backgroundColor: '#EC4899' }}
              >
                Liz
              </button>
            </div>
          </div>

          {/* Quick Info Bar */}
          <div className="mt-4 flex flex-wrap gap-2">
            {availableOrganelles.map((org) => (
              <button
                key={org.id}
                onClick={() => setSelectedOrganelle(org)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedOrganelle.id === org.id
                    ? 'bg-[#176B4D] text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-emerald-50'
                }`}
              >
                {org.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Selected Organelle Details & Interactive Matching Exercise */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Organelle Dossier Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs">
            <div className="flex items-center space-x-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: selectedOrganelle.color }}
              >
                {selectedOrganelle.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-base font-extrabold text-stone-900 dark:text-white">
                  {selectedOrganelle.name}
                </h4>
                <p className="text-xs italic text-stone-500 font-mono">
                  {selectedOrganelle.latinName}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
              <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60">
                <p className="font-bold text-[#176B4D] dark:text-[#62C9A5] mb-0.5">Biologik vazifasi:</p>
                <p className="leading-relaxed">{selectedOrganelle.functionUz}</p>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-stone-500">Tarqalishi:</span>
                <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                  {selectedOrganelle.foundIn === 'both'
                    ? 'Barcha eukariotlarda'
                    : selectedOrganelle.foundIn === 'plant-only'
                    ? 'Faqat o\'simliklarda'
                    : 'Faqat hayvonlarda'}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Lab Exercise: Match Organelles to Functions */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white flex items-center space-x-1.5">
                <Info className="w-3.5 h-3.5 text-[#176B4D]" />
                <span>Organoid vazifasini sinash</span>
              </h4>
              <button
                onClick={handleReset}
                className="text-[11px] text-stone-500 hover:text-emerald-700 flex items-center space-x-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Tozalash</span>
              </button>
            </div>

            <div className="space-y-3">
              {availableOrganelles.slice(0, 3).map((org) => (
                <div key={org.id} className="text-xs">
                  <label className="font-bold text-stone-800 dark:text-stone-200 block mb-1">
                    {org.name}:
                  </label>
                  <select
                    value={userMatches[org.id] || ''}
                    onChange={(e) => setUserMatches(prev => ({ ...prev, [org.id]: e.target.value }))}
                    className="w-full p-2 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Vazifasini tanlang...</option>
                    {availableOrganelles.slice(0, 4).map((f) => (
                      <option key={f.id} value={f.functionUz}>
                        {f.functionUz.slice(0, 60)}...
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              <button
                onClick={handleMatchCheck}
                className="w-full mt-2 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#104C36] text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Tekshirish va baholash</span>
              </button>

              {quizScore !== null && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-stone-800 dark:text-stone-200">
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span>Natija:</span>
                    <span className="text-emerald-700 dark:text-emerald-400">{quizScore}%</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">{feedback}</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
