import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { Heart, Activity, Play, CheckCircle2, Award, Info, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Chamber {
  id: string;
  name: string;
  latin: string;
  bloodType: 'arterial' | 'venous';
  pressureMmHg: string;
  functionDesc: string;
}

const chambers: Chamber[] = [
  {
    id: 'lv',
    name: 'Chap qorincha',
    latin: 'Ventriculus sinister',
    bloodType: 'arterial',
    pressureMmHg: '120 mmHg (sistola)',
    functionDesc: 'Eng qalin miokard mushak devoriga ega; kislorodli qonni aorta orqali katta doiraga haydaydi.'
  },
  {
    id: 'rv',
    name: 'O\'ng qorincha',
    latin: 'Ventriculus dexter',
    bloodType: 'venous',
    pressureMmHg: '25 mmHg (sistola)',
    functionDesc: 'Venoz qonni o\'pka poyasi orqali gaz almashinuvi uchun o\'pka kapillyarlariga yuboradi.'
  },
  {
    id: 'la',
    name: 'Chap bo\'lmacha',
    latin: 'Atrium sinistrum',
    bloodType: 'arterial',
    pressureMmHg: '8-10 mmHg',
    functionDesc: 'O\'pkadan 4 ta o\'pka venasi orqali qaytgan toza arterial qonni qabul qiladi va mitral klapan orqali chap qorinchaga uzatadi.'
  },
  {
    id: 'ra',
    name: 'O\'ng bo\'lmacha',
    latin: 'Atrium dextrum',
    bloodType: 'venous',
    pressureMmHg: '4-6 mmHg',
    functionDesc: 'Yuqori va pastki kovak venalardan kelgan venoz qonni to\'playdi; sinus-bo\'lmacha (peysmeyker) tuguniga ega.'
  }
];

export const HeartLab: React.FC = () => {
  const { t } = useTranslation();
  const { markLabCompleted } = useAuth();

  const [selectedChamber, setSelectedChamber] = useState<Chamber>(chambers[0]);
  const [bpm, setBpm] = useState<number>(72);
  const [activeLoop, setActiveLoop] = useState<'systemic' | 'pulmonary'>('systemic');

  const handleFinish = () => {
    markLabCompleted('heart-lab');
    try {
      confetti({ particleCount: 50, spread: 70 });
    } catch (e) {}
  };

  const animDuration = (60 / bpm).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <span>{t('labHeartName')}</span>
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400">
            Yurak kameralari, klapanlar va katta/kichik qon aylanish doiralari gemodinamikasi
          </p>
        </div>

        {/* Loop Switcher */}
        <div className="inline-flex p-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs">
          <button
            onClick={() => setActiveLoop('systemic')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeLoop === 'systemic' ? 'bg-[#176B4D] text-white shadow-xs' : 'text-stone-700 dark:text-stone-300'
            }`}
          >
            Katta doira (Tana bo\'ylab)
          </button>
          <button
            onClick={() => setActiveLoop('pulmonary')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeLoop === 'pulmonary' ? 'bg-[#176B4D] text-white shadow-xs' : 'text-stone-700 dark:text-stone-300'
            }`}
          >
            Kichik doira (O\'pka bo\'ylab)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Animated SVG Heart representation */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Yurak anatomik xaritasi
            </span>
            <div className="flex items-center space-x-1.5 text-xs font-bold font-mono text-red-600">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>{bpm} BPM</span>
            </div>
          </div>

          {/* Heart Graphic Stage */}
          <div
            className="relative w-64 h-72 sm:w-80 sm:h-88 my-2 flex items-center justify-center transition-transform"
            style={{
              animation: `pulse ${animDuration}s infinite ease-in-out`
            }}
          >
            <svg className="w-full h-full" viewBox="0 0 300 320">
              {/* Aorta Arch */}
              <path d="M 120 100 C 120 40, 200 40, 190 120" stroke="#DC2626" strokeWidth="24" fill="none" strokeLinecap="round" />
              {/* Pulmonary Artery trunk */}
              <path d="M 170 110 C 160 60, 100 70, 90 120" stroke="#2563EB" strokeWidth="20" fill="none" strokeLinecap="round" />

              {/* Heart Body Muscular Contour */}
              <path
                d="M 150 110 C 230 70, 270 190, 150 290 C 30 190, 70 70, 150 110 Z"
                fill="#991B1B"
                stroke="#7F1D1D"
                strokeWidth="4"
              />

              {/* Septum (Interventricular septum) */}
              <path d="M 150 130 L 150 280" stroke="#7F1D1D" strokeWidth="8" strokeDasharray="2 4" />

              {/* RA (Right Atrium) Button */}
              <g onClick={() => setSelectedChamber(chambers.find(c => c.id === 'ra')!)} className="cursor-pointer group">
                <rect x="80" y="125" width="55" height="50" rx="12" fill={selectedChamber.id === 'ra' ? '#3B82F6' : '#1D4ED8'} opacity="0.9" />
                <text x="107" y="155" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">RA</text>
              </g>

              {/* LA (Left Atrium) Button */}
              <g onClick={() => setSelectedChamber(chambers.find(c => c.id === 'la')!)} className="cursor-pointer group">
                <rect x="165" y="125" width="55" height="50" rx="12" fill={selectedChamber.id === 'la' ? '#EF4444' : '#DC2626'} opacity="0.9" />
                <text x="192" y="155" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">LA</text>
              </g>

              {/* RV (Right Ventricle) Button */}
              <g onClick={() => setSelectedChamber(chambers.find(c => c.id === 'rv')!)} className="cursor-pointer group">
                <rect x="75" y="185" width="65" height="70" rx="14" fill={selectedChamber.id === 'rv' ? '#2563EB' : '#1E40AF'} opacity="0.9" />
                <text x="107" y="225" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle">RV</text>
              </g>

              {/* LV (Left Ventricle) Button */}
              <g onClick={() => setSelectedChamber(chambers.find(c => c.id === 'lv')!)} className="cursor-pointer group">
                <rect x="160" y="185" width="65" height="75" rx="14" fill={selectedChamber.id === 'lv' ? '#B91C1C' : '#991B1B'} opacity="0.9" />
                <text x="192" y="225" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle">LV</text>
              </g>
            </svg>
          </div>

          {/* Quick Flow Map */}
          <div className="w-full mt-4 p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-xs">
            <span className="font-bold text-[#176B4D] dark:text-[#62C9A5] block mb-1">
              {activeLoop === 'systemic' ? '🔴 Katta qon aylanish doirasi yo\'li:' : '🔵 Kichik (o\'pka) qon aylanish doirasi yo\'li:'}
            </span>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-mono text-[11px]">
              {activeLoop === 'systemic'
                ? 'Chap qorincha (LV) -> Aorta -> Tana a\'zolari kapillyarlari -> Kovak venalar -> O\'ng bo\'lmacha (RA)'
                : 'O\'ng qorincha (RV) -> O\'pka poyasi -> O\'pka alveolalari -> O\'pka venalari -> Chap bo\'lmacha (LA)'}
            </p>
          </div>
        </div>

        {/* Right Side: Chamber Details & BPM Controller */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Selected Chamber Dossier */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                selectedChamber.bloodType === 'arterial'
                  ? 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
              }`}>
                {selectedChamber.bloodType === 'arterial' ? 'Arterial (O2 ga boy)' : 'Venoz (CO2 ga boy)'}
              </span>
              <span className="text-[11px] font-mono text-stone-500">
                Bosim: {selectedChamber.pressureMmHg}
              </span>
            </div>

            <h4 className="text-base font-extrabold text-stone-900 dark:text-white">
              {selectedChamber.name}
            </h4>
            <p className="text-xs italic text-stone-500 font-mono">{selectedChamber.latin}</p>

            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              {selectedChamber.functionDesc}
            </p>
          </div>

          {/* BPM Rheostat */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-3">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                Puls chastotasi (Yurak urishi):
              </span>
              <span className="font-mono font-bold text-red-600">{bpm} zarba/daqiqa</span>
            </div>
            <input
              type="range"
              min="45"
              max="160"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-full accent-red-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400">
              <span>Bradikardiya (45)</span>
              <span>Norma (72)</span>
              <span>Taxikardiya (160)</span>
            </div>

            <button
              onClick={handleFinish}
              className="w-full mt-3 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#104C36] text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-xs"
            >
              <Award className="w-4 h-4" />
              <span>Laboratoriyani yakunlash</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
