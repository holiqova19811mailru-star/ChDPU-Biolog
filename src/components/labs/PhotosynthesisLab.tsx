import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { Sun, Thermometer, Wind, RefreshCw, Award, AlertTriangle, Play, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PhotosynthesisLab: React.FC = () => {
  const { t } = useTranslation();
  const { markLabCompleted } = useAuth();

  const [lightIntensity, setLightIntensity] = useState<number>(600); // 0 - 1000 Lux
  const [co2Level, setCo2Level] = useState<number>(0.08); // 0 - 0.20 %
  const [temperature, setTemperature] = useState<number>(26); // 0 - 50 °C
  const [isSimulating, setIsSimulating] = useState(true);

  // Photosynthesis kinetics calculation
  // 1. Light factor: hyperbolic saturation (Michaelis-Menten style)
  const lightFactor = lightIntensity / (lightIntensity + 200);

  // 2. CO2 factor: saturation curve
  const co2Factor = co2Level / (co2Level + 0.03);

  // 3. Temperature factor: bell curve optimum around 25-30°C, drops sharply after 42°C (denaturation)
  let tempFactor = 0;
  if (temperature < 5) {
    tempFactor = 0.05;
  } else if (temperature <= 30) {
    tempFactor = (temperature - 5) / 25; // rises from 0 to 1
  } else if (temperature <= 42) {
    tempFactor = 1 - ((temperature - 30) / 12) * 0.7; // drops from 1 to 0.3
  } else {
    // Severe thermal denaturation of RuBisCO & photosystem complexes
    tempFactor = Math.max(0, 0.3 - ((temperature - 42) / 8) * 0.3);
  }

  // Bubble rate (bubbles per minute)
  const baseRate = 80;
  const bubbleRate = Math.round(baseRate * lightFactor * co2Factor * tempFactor);
  const glucoseMgPerHour = (bubbleRate * 0.45).toFixed(1);
  const isDenatured = temperature >= 43;

  const handlePreset = (preset: 'optimal' | 'desert' | 'cold' | 'cloudy') => {
    if (preset === 'optimal') {
      setLightIntensity(850);
      setCo2Level(0.12);
      setTemperature(25);
    } else if (preset === 'desert') {
      setLightIntensity(1000);
      setCo2Level(0.04);
      setTemperature(46);
    } else if (preset === 'cold') {
      setLightIntensity(500);
      setCo2Level(0.05);
      setTemperature(4);
    } else if (preset === 'cloudy') {
      setLightIntensity(150);
      setCo2Level(0.04);
      setTemperature(18);
    }
  };

  const handleFinishExperiment = () => {
    markLabCompleted('photosynthesis-lab');
    try {
      confetti({ particleCount: 50, spread: 70 });
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white flex items-center space-x-2">
            <Sun className="w-5 h-5 text-amber-500" />
            <span>{t('labPhotosynthesisName')}</span>
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400">
            Yorug\'lik, CO2 va harorat omillarining Elodeya suv o\'simligida fotosintez tezligiga ta\'siri
          </p>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-1.5 text-xs">
          <button
            onClick={() => handlePreset('optimal')}
            className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 font-semibold hover:bg-emerald-200"
          >
            Optimal issiqxona
          </button>
          <button
            onClick={() => handlePreset('desert')}
            className="px-2.5 py-1 rounded-lg bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 font-semibold hover:bg-red-200"
          >
            Jazirama cho\'l (+46°C)
          </button>
          <button
            onClick={() => handlePreset('cloudy')}
            className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 font-semibold hover:bg-stone-200"
          >
            Bulutli havo
          </button>
        </div>
      </div>

      {isDenatured && (
        <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-800 text-xs text-red-900 dark:text-red-200 flex items-center space-x-2.5">
          <AlertTriangle className="w-5 h-5 shrink-0 text-red-500" />
          <p>
            <strong>Termik denaturatsiya ogohlantirishi:</strong> Harorat +42°C dan oshganda RuBisCO fermenti va tilakoid membranalaridagi fotosistema II oqsillari uchlamchi strukturasini yo\'qotadi. Fotosintez keskin to\'xtaydi!
          </p>
        </div>
      )}

      {/* Main experiment stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Test Tube & Aquatic Elodea Bubble Visualizer */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Tajriba idishi (Elodea canadensis)
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
              {bubbleRate} pufakcha / daq
            </span>
          </div>

          {/* Test Tube Simulation Chamber */}
          <div className="relative w-48 sm:w-56 h-80 sm:h-96 rounded-b-full border-4 border-t-0 border-cyan-400/80 bg-gradient-to-b from-cyan-100/60 via-cyan-50/40 to-cyan-200/50 dark:from-cyan-950/40 dark:via-cyan-900/30 dark:to-cyan-950/60 overflow-hidden flex flex-col justify-end items-center shadow-inner my-2">
            
            {/* Water level meniscus */}
            <div className="absolute top-4 w-full h-3 border-b-2 border-cyan-300 opacity-60" />

            {/* Rising Animated Oxygen (O2) Bubbles */}
            {bubbleRate > 0 && isSimulating && (
              <div className="absolute inset-0 pointer-events-none flex justify-center">
                {[...Array(Math.min(18, Math.max(3, Math.round(bubbleRate / 4))))].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white/90 border border-cyan-300 shadow-xs"
                    style={{
                      width: `${6 + (i % 4) * 2}px`,
                      height: `${6 + (i % 4) * 2}px`,
                      left: `${45 + ((i % 5) - 2) * 12}%`,
                      bottom: `${15 + (i * 18) % 75}%`,
                      opacity: 0.85,
                      animation: `bounce 1.5s infinite ease-in-out`,
                      animationDelay: `${(i * 0.25).toFixed(2)}s`
                    }}
                  />
                ))}
              </div>
            )}

            {/* Elodea Aquatic Plant Sprig SVG */}
            <div className="relative z-10 w-24 h-48 mb-3">
              <svg className="w-full h-full" viewBox="0 0 100 200">
                <path d="M50 190 Q 52 100, 50 10" stroke="#065F46" strokeWidth="5" fill="none" />
                {[20, 45, 70, 95, 120, 145, 170].map((y, i) => (
                  <g key={i}>
                    <ellipse cx="32" cy={y} rx="16" ry="6" fill="#10B981" transform={`rotate(-15 32 ${y})`} />
                    <ellipse cx="68" cy={y - 5} rx="16" ry="6" fill="#059669" transform={`rotate(15 68 ${y - 5})`} />
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Real-time Rate Dashboard */}
          <div className="w-full mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60">
              <span className="text-stone-500 block text-[10px]">O2 Ajralishi</span>
              <span className="text-base font-extrabold text-emerald-800 dark:text-emerald-300">{bubbleRate}</span>
              <span className="text-[10px] text-stone-500 block">dona/daq</span>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60">
              <span className="text-stone-500 block text-[10px]">Glyukoza</span>
              <span className="text-base font-extrabold text-emerald-800 dark:text-emerald-300">{glucoseMgPerHour}</span>
              <span className="text-[10px] text-stone-500 block">mg / soat</span>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60">
              <span className="text-stone-500 block text-[10px]">Samaradorlik</span>
              <span className="text-base font-extrabold text-emerald-800 dark:text-emerald-300">
                {Math.round((bubbleRate / 80) * 100)}%
              </span>
              <span className="text-[10px] text-stone-500 block">nisbiy</span>
            </div>
          </div>
        </div>

        {/* Right Side: Environmental Controls Sliders */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white">
              Atrof-muhit parametrlarini boshqarish
            </h4>

            {/* Light Intensity Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-stone-700 dark:text-stone-300 flex items-center space-x-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Yorug\'lik intensivligi:</span>
                </span>
                <span className="font-mono text-stone-500">{lightIntensity} Lux</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="25"
                value={lightIntensity}
                onChange={(e) => setLightIntensity(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="text-[10px] text-stone-400">0 Lux (qorong\'ulik) dan 1000 Lux (to\'g\'ri quyosh nuri) gacha</span>
            </div>

            {/* CO2 Concentration Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-stone-700 dark:text-stone-300 flex items-center space-x-1.5">
                  <Wind className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Karbonat angidrid (CO2):</span>
                </span>
                <span className="font-mono text-stone-500">{(co2Level * 100).toFixed(2)}%</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.20"
                step="0.01"
                value={co2Level}
                onChange={(e) => setCo2Level(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <span className="text-[10px] text-stone-400">Atmosfera darajasi: ~0.04% (400 ppm)</span>
            </div>

            {/* Temperature Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-stone-700 dark:text-stone-300 flex items-center space-x-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-red-500" />
                  <span>Suv harorati:</span>
                </span>
                <span className={`font-mono font-bold ${temperature > 40 ? 'text-red-500' : 'text-stone-500'}`}>
                  {temperature}°C
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full accent-red-500 cursor-pointer"
              />
              <span className="text-[10px] text-stone-400">Optimal oraliq: 22°C - 30°C</span>
            </div>

            <button
              onClick={handleFinishExperiment}
              className="w-full py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#104C36] text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-xs"
            >
              <Award className="w-4 h-4" />
              <span>Tajribani yakunlash va hisobotni saqlash</span>
            </button>
          </div>

          {/* Scientific Context Card */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-xs text-stone-700 dark:text-stone-300 leading-relaxed space-y-2">
            <h5 className="font-bold text-[#176B4D] dark:text-[#62C9A5] flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ilmiy xulosa</span>
            </h5>
            <p>
              Fotosintez tezligi cheklovchi (limitlovchi) omil qonuniga bo\'ysunadi (Blekmen qoidasi). Agar yorug\'lik yuqori bo\'lsa-yu, CO2 yetishmasa, tezlik oshmaydi.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
