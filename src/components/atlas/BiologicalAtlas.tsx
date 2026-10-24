import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { atlasModels } from '../../data/atlasData';
import { AtlasModel } from '../../types';
import { Box, RotateCw, ZoomIn, ZoomOut, Info, Sparkles, Layers } from 'lucide-react';

export const BiologicalAtlas: React.FC = () => {
  const { t } = useTranslation();

  const [activeModel, setActiveModel] = useState<AtlasModel>(atlasModels[0]);
  const [selectedPart, setSelectedPart] = useState(atlasModels[0].parts[0]);
  const [rotationAngle, setRotationAngle] = useState(0); // 0 - 360 deg
  const [tiltAngle, setTiltAngle] = useState(15); // -30 to 45 deg
  const [zoomLevel, setZoomLevel] = useState(1); // 0.8 - 1.6

  const handleRotateLeft = () => setRotationAngle(r => (r - 30 + 360) % 360);
  const handleRotateRight = () => setRotationAngle(r => (r + 30) % 360);
  const handleZoomIn = () => setZoomLevel(z => Math.min(1.6, z + 0.15));
  const handleZoomOut = () => setZoomLevel(z => Math.max(0.8, z - 0.15));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-semibold mb-2">
          <Box className="w-3.5 h-3.5" />
          <span>Interaktiv 3D Vizualizatsiya</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          {t('navAtlas')}
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-3xl leading-relaxed">
          Hujayra, DNK qo\'sh spirali, inson yuragi, bosh miya va o\'simlik bargining fazoviy 3D anatomik tuzilishi. Qismlarni tanlab, ularning lotincha nomlari va ilmiy vazifalarini ko\'ring.
        </p>
      </div>

      {/* Model Selection Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {atlasModels.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setActiveModel(m);
              setSelectedPart(m.parts[0]);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
              activeModel.id === m.id
                ? 'bg-[#176B4D] text-white border-[#176B4D] shadow-md shadow-emerald-950/20'
                : 'bg-white dark:bg-[#162420] border-emerald-900/10 dark:border-emerald-800/60 text-stone-700 dark:text-stone-300 hover:bg-emerald-50'
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>

      {/* 3D Atlas Stage and Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: 3D Rotatable Canvas Stage */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs flex flex-col items-center relative overflow-hidden">
          
          {/* Stage Controls Toolbar */}
          <div className="w-full flex items-center justify-between mb-4 z-20">
            <div>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                3D Fazoviy Model
              </span>
              <h3 className="text-base font-extrabold text-stone-900 dark:text-white">
                {activeModel.name}
              </h3>
            </div>

            <div className="flex items-center space-x-1.5 bg-stone-100 dark:bg-stone-900 p-1 rounded-xl border border-stone-200 dark:border-stone-800">
              <button
                onClick={handleRotateLeft}
                className="p-1.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800"
                title="Chapga burish (-30°)"
              >
                <RotateCw className="w-4 h-4 transform -scale-x-100" />
              </button>
              <button
                onClick={handleRotateRight}
                className="p-1.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800"
                title="O'ngga burish (+30°)"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-mono font-bold px-1 text-stone-500">{rotationAngle}°</span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800"
                title="Yaqinlashtirish"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-1.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800"
                title="Uzoqlashtirish"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3D Viewport Box with Perspective */}
          <div
            className="w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-br from-stone-900 via-emerald-950 to-stone-950 flex items-center justify-center relative select-none shadow-inner border border-emerald-500/20"
            style={{ perspective: '800px' }}
          >
            {/* Background 3D depth grid */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                <circle cx="200" cy="200" r="160" stroke="#62C9A5" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="200" cy="200" r="100" stroke="#62C9A5" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
            </div>

            {/* Rotatable 3D Object Group */}
            <div
              className="relative w-64 h-64 sm:w-72 sm:h-72 transition-transform duration-300 flex items-center justify-center cursor-grab active:cursor-grabbing"
              style={{
                transform: `rotateX(${tiltAngle}deg) rotateY(${rotationAngle}deg) scale(${zoomLevel})`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Central Graphic SVG according to Model */}
              {activeModel.id === 'model-cell' && (
                <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="85" fill="#064E3B" opacity="0.4" stroke="#10B981" strokeWidth="3" />
                  <circle cx="100" cy="100" r="32" fill="#6D28D9" opacity="0.8" stroke="#A78BFA" strokeWidth="2" />
                  <ellipse cx="60" cy="130" rx="20" ry="10" fill="#DC2626" opacity="0.8" />
                  <ellipse cx="140" cy="70" rx="22" ry="12" fill="#2563EB" opacity="0.8" />
                  <ellipse cx="150" cy="130" rx="18" ry="10" fill="#059669" opacity="0.8" />
                </svg>
              )}

              {activeModel.id === 'model-dna' && (
                <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 200 200">
                  <path d="M 60 20 Q 140 60, 60 100 T 60 180" stroke="#10B981" strokeWidth="8" fill="none" strokeLinecap="round" />
                  <path d="M 140 20 Q 60 60, 140 100 T 140 180" stroke="#2D9B75" strokeWidth="8" fill="none" strokeLinecap="round" />
                  {[40, 70, 100, 130, 160].map((y, i) => (
                    <line key={i} x1="75" y1={y} x2="125" y2={y} stroke={i % 2 === 0 ? '#F59E0B' : '#EF4444'} strokeWidth="5" />
                  ))}
                </svg>
              )}

              {activeModel.id === 'model-heart' && (
                <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 200 200">
                  <path d="M 100 60 C 160 30, 190 120, 100 180 C 10 120, 40 30, 100 60 Z" fill="#991B1B" stroke="#DC2626" strokeWidth="3" />
                  <path d="M 80 50 C 80 20, 130 20, 130 60" stroke="#DC2626" strokeWidth="16" fill="none" strokeLinecap="round" />
                  <line x1="100" y1="80" x2="100" y2="170" stroke="#7F1D1D" strokeWidth="5" />
                </svg>
              )}

              {activeModel.id === 'model-brain' && (
                <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 200 200">
                  <path d="M 50 110 C 40 70, 70 30, 120 30 C 160 30, 180 70, 170 120 C 160 160, 120 170, 90 160 C 70 155, 50 140, 50 110 Z" fill="#4B5563" stroke="#9CA3AF" strokeWidth="3" />
                  <path d="M 120 130 C 140 130, 160 150, 140 170 C 120 175, 110 160, 120 130 Z" fill="#EC4899" />
                  <rect x="85" y="150" width="25" height="35" rx="6" fill="#6B7280" />
                </svg>
              )}

              {activeModel.id === 'model-plant-leaf' && (
                <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 200 200">
                  <rect x="20" y="30" width="160" height="20" rx="4" fill="#059669" />
                  <rect x="25" y="60" width="150" height="40" rx="4" fill="#10B981" />
                  <rect x="25" y="110" width="150" height="35" rx="4" fill="#34D399" />
                  <circle cx="100" cy="115" r="18" fill="#F59E0B" />
                  <rect x="20" y="155" width="160" height="20" rx="4" fill="#059669" />
                </svg>
              )}

              {/* Interactive Hotspot Pins on 3D Object */}
              {activeModel.parts.map((part) => (
                <button
                  key={part.id}
                  onClick={() => setSelectedPart(part)}
                  className={`absolute w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] text-white shadow-lg transition-transform border border-white/60 cursor-pointer ${
                    selectedPart.id === part.id ? 'scale-125 ring-4 ring-white animate-pulse' : 'hover:scale-110'
                  }`}
                  style={{
                    left: `${part.x}%`,
                    top: `${part.y}%`,
                    backgroundColor: part.color
                  }}
                  title={part.name}
                >
                  ●
                </button>
              ))}
            </div>
          </div>

          {/* Quick parts pill selectors */}
          <div className="w-full mt-4 flex flex-wrap gap-2 justify-center">
            {activeModel.parts.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPart(p)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  selectedPart.id === p.id
                    ? 'bg-[#176B4D] text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-emerald-50'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Anatomical Part Dossier */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-4">
            <div className="flex items-center space-x-3">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: selectedPart.color }}
              />
              <div>
                <h3 className="text-lg font-extrabold text-stone-900 dark:text-white">
                  {selectedPart.name}
                </h3>
                {selectedPart.latinName && (
                  <p className="text-xs italic text-stone-500 font-mono">
                    {selectedPart.latinName}
                  </p>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
              <span className="font-bold text-[#176B4D] dark:text-[#62C9A5] block mb-1">
                Biologik & Fiziologik vazifasi:
              </span>
              <p>{selectedPart.functionDesc}</p>
            </div>

            <div className="text-xs text-stone-500 space-y-1 pt-1">
              <p>• Model litsenziyasi: <strong>Akademik Ochiq Ta'lim (CC-BY 4.0)</strong></p>
              <p>• Ruxsat etilgan ilmiy aniqlik darajasi: <strong>Universitet sitologiyasi & anatomiyasi</strong></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
