import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { microscopeSlides, MicroscopeSlide } from '../../data/virtualLabsData';
import { Maximize2, Sliders, Sun, Focus, Info, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MicroscopeLab: React.FC = () => {
  const { t } = useTranslation();
  const { markLabCompleted } = useAuth();

  const [activeSlide, setActiveSlide] = useState<MicroscopeSlide>(microscopeSlides[0]);
  const [magnification, setMagnification] = useState<number>(100);
  const [coarseFocus, setCoarseFocus] = useState<number>(50); // 0 - 100, ideal ~50
  const [fineFocus, setFineFocus] = useState<number>(50); // 0 - 100, ideal ~50
  const [brightness, setBrightness] = useState<number>(85); // 20 - 120
  const [activeStructure, setActiveStructure] = useState<{ name: string; desc: string } | null>(null);
  const [completed, setCompleted] = useState(false);

  // Focus blur calculation: optimal is coarse=50, fine=50
  const coarseDiff = Math.abs(coarseFocus - 50);
  const fineDiff = Math.abs(fineFocus - 50);
  const totalBlur = (coarseDiff * 0.15) + (fineDiff * 0.05);
  const isSharp = totalBlur < 1.2;

  const handleVerify = () => {
    if (isSharp) {
      setCompleted(true);
      markLabCompleted('microscope-lab');
      try {
        confetti({ particleCount: 50, spread: 60 });
      } catch (e) {}
    }
  };

  const handleResetControls = () => {
    setCoarseFocus(20);
    setFineFocus(80);
    setBrightness(80);
    setActiveStructure(null);
    setCompleted(false);
  };

  return (
    <div className="space-y-6">
      {/* Disclaimer Banner as required */}
      <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-center space-x-2.5">
        <Info className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <p>
          <strong>Eslatma:</strong> Mikroskop simulyatori universitet ta\'limi uchun raqamli optik modeldir. U jismoniy mikroskop apparatiga ulanmagan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Eyepiece Circular Field (Okulyar ko'rinishi) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Okulyar maydoni</span>
              <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                {activeSlide.name} ({magnification}x)
              </h4>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                isSharp ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300' : 'bg-amber-100 text-amber-800'
              }`}>
                {isSharp ? '✓ Aniq fokus' : 'Nofokus (Fokuslang)'}
              </span>
            </div>
          </div>

          {/* Eyepiece Circular Scope */}
          <div
            className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border-8 border-stone-800 dark:border-stone-900 bg-stone-900 overflow-hidden shadow-2xl flex items-center justify-center select-none"
            style={{
              filter: `brightness(${brightness}%)`
            }}
          >
            {/* Visual Crosshairs & Measurement Reticle */}
            <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center opacity-30">
              <div className="w-full h-px bg-emerald-400" />
              <div className="h-full w-px bg-emerald-400 absolute" />
              <div className="w-48 h-48 rounded-full border border-emerald-400 absolute" />
            </div>

            {/* Specimen Render Canvas */}
            <div
              className="absolute inset-0 transition-all duration-150 flex items-center justify-center"
              style={{
                filter: `blur(${totalBlur}px)`,
                transform: `scale(${magnification / activeSlide.baseMagnification})`,
                transformOrigin: 'center center'
              }}
            >
              {/* Synthetic slide texture representing specimen biology */}
              <div
                className="w-full h-full relative"
                style={{
                  backgroundColor: activeSlide.id === 'slide-blood' ? '#7F1D1D' : activeSlide.id === 'slide-onion' ? '#D97706' : activeSlide.id === 'slide-elodea' ? '#065F46' : '#5B21B6',
                  opacity: 0.85
                }}
              >
                {/* SVG Histology Cellular patterns */}
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  {activeSlide.id === 'slide-onion' && (
                    <g stroke="#FDE68A" strokeWidth="1.5" fill="none">
                      <rect x="10" y="10" width="85" height="50" rx="3" fill="#D97706" opacity="0.4" />
                      <circle cx="50" cy="35" r="8" fill="#78350F" />
                      <rect x="105" y="10" width="85" height="50" rx="3" fill="#D97706" opacity="0.4" />
                      <circle cx="150" cy="35" r="7" fill="#78350F" />
                      <rect x="10" y="70" width="90" height="55" rx="3" fill="#D97706" opacity="0.4" />
                      <circle cx="55" cy="98" r="8" fill="#78350F" />
                      <rect x="110" y="70" width="80" height="55" rx="3" fill="#D97706" opacity="0.4" />
                      <circle cx="150" cy="98" r="8" fill="#78350F" />
                    </g>
                  )}

                  {activeSlide.id === 'slide-blood' && (
                    <g>
                      {/* Biconcave erythrocytes */}
                      {[
                        [30, 40], [60, 30], [90, 50], [130, 40], [160, 60],
                        [40, 90], [80, 110], [120, 90], [150, 120], [30, 150],
                        [70, 160], [110, 150], [160, 170]
                      ].map(([cx, cy], i) => (
                        <circle key={i} cx={cx} cy={cy} r="12" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
                      ))}
                      {/* Segmented Neutrophil */}
                      <circle cx="100" cy="100" r="18" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2" />
                      <circle cx="95" cy="95" r="5" fill="#4338CA" />
                      <circle cx="106" cy="96" r="4" fill="#4338CA" />
                      <circle cx="100" cy="106" r="5" fill="#4338CA" />
                    </g>
                  )}

                  {activeSlide.id === 'slide-elodea' && (
                    <g stroke="#34D399" strokeWidth="2" fill="none">
                      <rect x="20" y="20" width="75" height="150" rx="6" fill="#047857" opacity="0.5" />
                      <rect x="105" y="20" width="75" height="150" rx="6" fill="#047857" opacity="0.5" />
                      {[
                        [35, 40], [60, 50], [45, 80], [70, 100], [40, 130], [65, 145],
                        [125, 40], [150, 60], [130, 90], [160, 110], [135, 135]
                      ].map(([cx, cy], i) => (
                        <ellipse key={i} cx={cx} cy={cy} rx="7" ry="11" fill="#10B981" />
                      ))}
                    </g>
                  )}

                  {activeSlide.id === 'slide-root-tip' && (
                    <g stroke="#C084FC" strokeWidth="1.5" fill="none">
                      <rect x="15" y="15" width="80" height="75" rx="4" />
                      {/* Metaphase plate */}
                      <line x1="30" y1="52" x2="80" y2="52" stroke="#581C87" strokeWidth="6" strokeDasharray="3 3" />
                      <rect x="105" y="15" width="80" height="75" rx="4" />
                      {/* Anaphase */}
                      <line x1="120" y1="35" x2="170" y2="35" stroke="#581C87" strokeWidth="4" />
                      <line x1="120" y1="70" x2="170" y2="70" stroke="#581C87" strokeWidth="4" />
                    </g>
                  )}
                </svg>

                {/* Clickable Structure Pins */}
                {activeSlide.structures.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStructure(s)}
                    className="absolute w-5 h-5 rounded-full bg-white text-stone-950 font-bold text-[9px] flex items-center justify-center shadow-lg hover:scale-125 transition-transform border border-emerald-600 cursor-pointer z-30"
                    style={{ left: `${s.x}%`, top: `${s.y}%` }}
                    title={s.name}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Structure Tag */}
          {activeStructure && (
            <div className="w-full mt-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs">
              <span className="font-bold text-[#176B4D] dark:text-[#62C9A5]">{activeStructure.name}:</span>{' '}
              <span className="text-stone-700 dark:text-stone-300">{activeStructure.desc}</span>
            </div>
          )}
        </div>

        {/* Right Side: Microscope Hardware Controls */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Specimen Slides Selector */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white mb-3">
              Mikropreparatlarni almashtirish
            </h4>
            <div className="space-y-2">
              {microscopeSlides.map((slide) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setActiveSlide(slide);
                    setActiveStructure(null);
                  }}
                  className={`w-full text-left p-3 rounded-xl text-xs transition-all border ${
                    activeSlide.id === slide.id
                      ? 'border-[#176B4D] bg-emerald-50/70 dark:bg-emerald-950/50 font-bold text-[#176B4D] dark:text-[#62C9A5]'
                      : 'border-stone-200 dark:border-stone-800 hover:bg-emerald-50/30 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <p>{slide.name}</p>
                  <p className="text-[10px] italic font-normal text-stone-500">{slide.latinName}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Magnification Objective Turret (Revolver) */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white mb-3 flex items-center justify-between">
              <span>Obyektiv (Kattalashtirish)</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-mono">{magnification}x</span>
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {[40, 100, 400, 1000].map((mag) => (
                <button
                  key={mag}
                  onClick={() => setMagnification(mag)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    magnification === mag
                      ? 'bg-[#176B4D] text-white border-[#176B4D] shadow-xs'
                      : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-emerald-50'
                  }`}
                >
                  {mag}x
                  {mag === 1000 && <span className="block text-[8px] font-normal">Moy</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Focus Sliders (Makrovint va Mikrovint) */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white flex items-center space-x-1.5">
                <Focus className="w-3.5 h-3.5 text-[#176B4D]" />
                <span>Optik fokuslash boshqaruvi</span>
              </h4>
              <button
                onClick={handleResetControls}
                className="text-[10px] text-stone-500 hover:text-emerald-700 flex items-center space-x-1"
                title="Qayta sozlash"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Coarse Focus Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-stone-700 dark:text-stone-300">Makrovint (Qo\'pol fokus):</span>
                <span className="font-mono text-stone-500">{coarseFocus}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={coarseFocus}
                onChange={(e) => setCoarseFocus(Number(e.target.value))}
                className="w-full accent-[#176B4D] cursor-pointer"
              />
            </div>

            {/* Fine Focus Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-stone-700 dark:text-stone-300">Mikrovint (Nozik fokus):</span>
                <span className="font-mono text-stone-500">{fineFocus}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={fineFocus}
                onChange={(e) => setFineFocus(Number(e.target.value))}
                className="w-full accent-[#2D9B75] cursor-pointer"
              />
            </div>

            {/* Brightness Rheostat */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-stone-700 dark:text-stone-300 flex items-center space-x-1">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Yoritgich reostati:</span>
                </span>
                <span className="font-mono text-stone-500">{brightness}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="130"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <button
              onClick={handleVerify}
              disabled={!isSharp}
              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-xs ${
                isSharp
                  ? 'bg-[#176B4D] hover:bg-[#104C36] text-white cursor-pointer'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{completed ? 'Fokus tasdiqlangan (Bajarildi!)' : 'Fokusni tekshirish va tasdiqlash'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
