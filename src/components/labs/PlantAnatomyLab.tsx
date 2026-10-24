import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { Layers, Droplet, Wind, Award, CheckCircle2, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PlantOrgan {
  id: 'leaf' | 'stem' | 'root';
  title: string;
  structures: Array<{ name: string; latin: string; functionDesc: string; color: string }>;
}

const organs: PlantOrgan[] = [
  {
    id: 'leaf',
    title: 'Barg ko\'ndalang qirqimi',
    structures: [
      { name: 'Kutikula va Ustki Epidermis', latin: 'Cuticula et epidermis superior', functionDesc: 'Mumlu yupqa qavat bo\'lib, suvning keraksiz bug\'lanishiga to\'sqinlik qiladi.', color: '#059669' },
      { name: 'Ustunsimon (palisad) xlorenxima', latin: 'Chlorenchyma palisadicum', functionDesc: 'Bargdagi eng faol fotosintez to\'qimasi; xloroplastlar soni juda yuqori.', color: '#10B981' },
      { name: 'G\'ovak parenxima', latin: 'Parenchyma spongiosum', functionDesc: 'Keng hujayralararo bo\'shliqlar orqali CO2 va O2 gaz almashinuvini ta\'minlaydi.', color: '#34D399' },
      { name: 'O\'tkazuvchi to\'p (Tomir: Ksilema va Floema)', latin: 'Fasciculus vascularis', functionDesc: 'Ksilema suv va minerallarni keltiradi, floema fotosintez shirasini o\'simlikka tashiydi.', color: '#F59E0B' },
      { name: 'Stomata (Og\'izcha apparati)', latin: 'Apparatus stomatalis', functionDesc: 'Ikkita qoplag\'ich hujayra turgori orqali ochilib-yopilib, transpiratsiyani nazorat qiladi.', color: '#06B6D4' }
    ]
  },
  {
    id: 'stem',
    title: 'Poya ko\'ndalang qirqimi (Ikki pallali yog\'ochli poya)',
    structures: [
      { name: 'Po\'stloq (Periderma va po\'kak)', latin: 'Periderma et suber', functionDesc: 'Harorat tebranishlari va mexanik shikastlanishdan saqlovchi tashqi o\'lik qatlam.', color: '#78350F' },
      { name: 'Floema (Lub tolasi va elaksimon naylar)', latin: 'Phloema', functionDesc: 'Organik assimilyatlarni (saxaroza) bargdan pastga ildizgacha tashiydi.', color: '#D97706' },
      { name: 'Kambiy (Yon meristema)', latin: 'Cambium', functionDesc: 'Hujayralari bo\'linib, tashqariga floema, ichkariga ksilema hosil qiladi (poyaning yo\'g\'onlashishi).', color: '#FCD34D' },
      { name: 'Ksilema (Yog\'ochlik naylari)', latin: 'Xylema', functionDesc: 'Ildizdan suv va tuzlarni yuqoriga o\'rlatuvchi qattiq naylar tizimi.', color: '#0284C7' },
      { name: 'O\'zak (Serdtsevina)', latin: 'Medulla', functionDesc: 'Boshlang\'ich parenxima bo\'lib, kraxmal va zaxira moddalar saqlanadi.', color: '#A3E635' }
    ]
  },
  {
    id: 'root',
    title: 'Ildiz ko\'ndalang qirqimi (So\'rish zonasi)',
    structures: [
      { name: 'Epiblema (Ildiz tukchalari)', latin: 'Epiblema cum pilis radicalibus', functionDesc: 'Bir hujayrali o\'simtalar bo\'lib, suv va erigan tuzlarni so\'rish yuzasini yuzlab martaga oshiradi.', color: '#059669' },
      { name: 'Birlamchi po\'stloq (Parenxima)', latin: 'Cortex primarius', functionDesc: 'Suv va tuzlarni radial yo\'nalishda markaziy silindr tomon filtrlaydi.', color: '#10B981' },
      { name: 'Endoderma va Kaspari belbog\'i', latin: 'Endodermis cum zonis Casparyi', functionDesc: 'Suberinlashgan suv o\'tkazmaydigan to\'siq; suvning faqat simplast (hujayra ichi) orqali o\'tishini majburlaydi.', color: '#DC2626' },
      { name: 'Markaziy silindr ksilemasi', latin: 'Xylema cylindri centralis', functionDesc: 'Suvni yuqori ildiz bosimi bilan poya ksilemasiga uzatadi.', color: '#0284C7' }
    ]
  }
];

export const PlantAnatomyLab: React.FC = () => {
  const { t } = useTranslation();
  const { markLabCompleted } = useAuth();

  const [selectedOrgan, setSelectedOrgan] = useState<PlantOrgan>(organs[0]);
  const [selectedStructure, setSelectedStructure] = useState(organs[0].structures[0]);
  const [stomataOpenPercent, setStomataOpenPercent] = useState<number>(75);

  const handleFinish = () => {
    markLabCompleted('plant-anatomy-lab');
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white flex items-center space-x-2">
            <Layers className="w-5 h-5 text-[#2D9B75] dark:text-[#62C9A5]" />
            <span>{t('labPlantName')}</span>
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400">
            Ildiz, poya va barg gistologiyasi, ksilema-floema transporti va stomata transpiratsiyasi
          </p>
        </div>

        {/* Organ Switcher */}
        <div className="inline-flex p-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs">
          {organs.map((organ) => (
            <button
              key={organ.id}
              onClick={() => {
                setSelectedOrgan(organ);
                setSelectedStructure(organ.structures[0]);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedOrgan.id === organ.id ? 'bg-[#176B4D] text-white shadow-xs' : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              {organ.id === 'leaf' ? '🍃 Barg' : organ.id === 'stem' ? '🪵 Poya' : '🌱 Ildiz'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Histology Visualizer */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              {selectedOrgan.title}
            </span>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
              Qatlamni tanlang
            </span>
          </div>

          {/* SVG Histological diagram */}
          <div className="w-full aspect-video max-h-72 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-emerald-200 dark:border-emerald-800 p-4 flex flex-col justify-center items-center relative overflow-hidden">
            {selectedOrgan.id === 'leaf' && (
              <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* Upper Cuticle & Epidermis */}
                <rect x="20" y="20" width="360" height="25" rx="4" fill="#059669" opacity="0.8" />
                {/* Palisade parenchyma */}
                {[...Array(14)].map((_, i) => (
                  <rect key={i} x={30 + i * 25} y="50" width="18" height="50" rx="4" fill="#10B981" opacity="0.85" />
                ))}
                {/* Spongy parenchyma */}
                {[...Array(12)].map((_, i) => (
                  <circle key={i} cx={40 + (i % 6) * 60} cy={110 + Math.floor(i / 6) * 20} r="10" fill="#34D399" opacity="0.7" />
                ))}
                {/* Vein (vascular bundle) */}
                <circle cx="200" cy="115" r="28" fill="#F59E0B" opacity="0.9" />
                <circle cx="195" cy="110" r="12" fill="#0284C7" />
                <circle cx="208" cy="122" r="10" fill="#D97706" />
                {/* Lower Epidermis with Stomata */}
                <rect x="20" y="150" width="150" height="25" rx="4" fill="#059669" opacity="0.8" />
                <rect x="230" y="150" width="150" height="25" rx="4" fill="#059669" opacity="0.8" />
                {/* Stoma opening */}
                <ellipse cx="190" cy="162" rx="10" ry="6" fill="#06B6D4" />
                <ellipse cx="210" cy="162" rx="10" ry="6" fill="#06B6D4" />
              </svg>
            )}

            {selectedOrgan.id === 'stem' && (
              <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* Concentric rings */}
                <circle cx="200" cy="100" r="90" fill="#78350F" opacity="0.8" />
                <circle cx="200" cy="100" r="75" fill="#D97706" opacity="0.85" />
                <circle cx="200" cy="100" r="65" fill="#FCD34D" opacity="0.9" />
                <circle cx="200" cy="100" r="58" fill="#0284C7" opacity="0.8" />
                <circle cx="200" cy="100" r="25" fill="#A3E635" opacity="0.9" />
                <text x="200" y="105" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">O\'zak</text>
              </svg>
            )}

            {selectedOrgan.id === 'root' && (
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <circle cx="200" cy="100" r="90" fill="#059669" opacity="0.3" stroke="#059669" strokeWidth="2" />
                {/* Root hairs */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <line
                    key={i}
                    x1={200 + Math.cos((angle * Math.PI) / 180) * 90}
                    y1={100 + Math.sin((angle * Math.PI) / 180) * 90}
                    x2={200 + Math.cos((angle * Math.PI) / 180) * 115}
                    y2={100 + Math.sin((angle * Math.PI) / 180) * 115}
                    stroke="#059669"
                    strokeWidth="3"
                  />
                ))}
                {/* Endodermis Casparian strip */}
                <circle cx="200" cy="100" r="45" fill="none" stroke="#DC2626" strokeWidth="3" strokeDasharray="4 2" />
                {/* Central xylem star */}
                <polygon points="200,75 208,95 225,100 208,105 200,125 192,105 175,100 192,95" fill="#0284C7" />
              </svg>
            )}
          </div>

          {/* Structures buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedOrgan.structures.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedStructure(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedStructure.name === s.name
                    ? 'bg-[#176B4D] text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-emerald-50'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Structure Dossier & Stomatal Transpiration Controller */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-3">
            <h4 className="text-base font-extrabold text-stone-900 dark:text-white">
              {selectedStructure.name}
            </h4>
            <p className="text-xs italic text-stone-500 font-mono">{selectedStructure.latin}</p>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
              <span className="font-bold text-[#176B4D] dark:text-[#62C9A5] block mb-1">Gistologik vazifasi:</span>
              <p>{selectedStructure.functionDesc}</p>
            </div>
          </div>

          {/* Stomatal Aperture & Transpiration Simulation */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-3">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-stone-800 dark:text-stone-200 flex items-center space-x-1.5">
                <Wind className="w-3.5 h-3.5 text-cyan-600" />
                <span>Og\'izcha (Stomata) ochiqlik darajasi:</span>
              </span>
              <span className="font-mono font-bold text-cyan-600">{stomataOpenPercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={stomataOpenPercent}
              onChange={(e) => setStomataOpenPercent(Number(e.target.value))}
              className="w-full accent-cyan-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400">
              <span>Yopiq (Tun/Qurg\'oqchilik)</span>
              <span>Ochiq (Transpiratsiya yuqori)</span>
            </div>

            <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-xs text-cyan-950 dark:text-cyan-200">
              <p className="font-bold mb-0.5">Suv bug\'lanishi jadalligi:</p>
              <p className="text-[11px]">
                {stomataOpenPercent > 70
                  ? 'Yuqori transpiratsiya: Ksilema orqali so\'rish kuchi maksimal darajada, barglar soviydi.'
                  : stomataOpenPercent > 20
                  ? 'O\'rtacha transpiratsiya: Suv va CO2 kirishi muvozanatlashgan.'
                  : 'Minimal transpiratsiya: Qurg\'oqchilik stressida barglar suv yo\'qotishdan himoyalangan.'}
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="w-full mt-2 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#104C36] text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-xs"
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
