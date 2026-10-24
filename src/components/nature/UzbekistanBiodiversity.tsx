import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { uzbekistanSpecies, uzbekistanEcosystems, SpeciesInfo, EcosystemZone } from '../../data/uzbekistanNatureData';
import { Globe2, MapPin, ShieldAlert, Leaf, Trees, Sprout, Search } from 'lucide-react';

export const UzbekistanBiodiversity: React.FC = () => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<'species' | 'ecosystems' | 'agri'>('species');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesInfo | null>(uzbekistanSpecies[0]);

  const filteredSpecies = uzbekistanSpecies.filter(s => {
    const q = searchQuery.toLowerCase();
    return s.nameUz.toLowerCase().includes(q) ||
      s.scientificName.toLowerCase().includes(q) ||
      s.region.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-semibold mb-2">
          <Globe2 className="w-3.5 h-3.5" />
          <span>Milliy Biologik Meros</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          {t('uzbekistanTitle')}
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-3xl leading-relaxed">
          {t('uzbekistanDesc')} Chotqol archazorlari, Nurota tog\'lari, Orolqum fitomelioratsiyasi va paxta/bug\'doy seleksiyasidagi biotexnologik yutuqlar.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-stone-200 dark:border-stone-800 pb-1">
        <button
          onClick={() => setActiveTab('species')}
          className={`pb-2.5 text-xs font-bold transition-all border-b-2 flex items-center space-x-1.5 ${
            activeTab === 'species'
              ? 'border-[#176B4D] text-[#176B4D] dark:text-[#62C9A5]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{t('redBook')} & Endemiklar ({uzbekistanSpecies.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('ecosystems')}
          className={`pb-2.5 text-xs font-bold transition-all border-b-2 flex items-center space-x-1.5 ${
            activeTab === 'ecosystems'
              ? 'border-[#176B4D] text-[#176B4D] dark:text-[#62C9A5]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Trees className="w-4 h-4" />
          <span>{t('ecosystems')} ({uzbekistanEcosystems.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('agri')}
          className={`pb-2.5 text-xs font-bold transition-all border-b-2 flex items-center space-x-1.5 ${
            activeTab === 'agri'
              ? 'border-[#176B4D] text-[#176B4D] dark:text-[#62C9A5]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Sprout className="w-4 h-4" />
          <span>{t('agriculture')}</span>
        </button>
      </div>

      {/* Tab 1: Red Book Species & Endemics */}
      {activeTab === 'species' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Turni qidirish (o'zbekcha yoki lotincha)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs bg-white dark:bg-[#162420] border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              {filteredSpecies.map((sp) => (
                <div
                  key={sp.id}
                  onClick={() => setSelectedSpecies(sp)}
                  className={`cursor-pointer p-4 rounded-2xl border text-xs transition-all ${
                    selectedSpecies?.id === sp.id
                      ? 'border-[#176B4D] bg-emerald-50/70 dark:bg-emerald-950/60 ring-2 ring-emerald-500/20'
                      : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-[#162420] hover:bg-emerald-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-stone-900 dark:text-white text-sm">
                      {sp.nameUz}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300">
                      {sp.status}
                    </span>
                  </div>
                  <p className="text-[11px] italic font-mono text-stone-500">{sp.scientificName}</p>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 flex items-center">
                    <MapPin className="w-3 h-3 mr-1 text-emerald-600 shrink-0" />
                    <span>{sp.region}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Species Dossier */}
          {selectedSpecies && (
            <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                <div>
                  <h3 className="text-xl font-extrabold text-stone-900 dark:text-white">
                    {selectedSpecies.nameUz}
                  </h3>
                  <p className="text-xs italic text-stone-500 font-mono">
                    {selectedSpecies.scientificName}
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300">
                  {selectedSpecies.status}
                </span>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <span className="font-bold text-stone-900 dark:text-white block mb-0.5">Tavsif:</span>
                  <p className="text-stone-700 dark:text-stone-300">{selectedSpecies.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                    <span className="font-bold text-stone-900 dark:text-white block mb-0.5">Yashash biotopi:</span>
                    <p className="text-stone-600 dark:text-stone-400">{selectedSpecies.habitat}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                    <span className="font-bold text-stone-900 dark:text-white block mb-0.5">Tarqalgan hudud:</span>
                    <p className="text-stone-600 dark:text-stone-400">{selectedSpecies.region}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <span className="font-bold text-[#176B4D] dark:text-[#62C9A5] block mb-0.5">Ekologik adaptatsiya:</span>
                  <p className="text-stone-700 dark:text-stone-300">{selectedSpecies.adaptation}</p>
                </div>

                <div>
                  <span className="font-bold text-stone-900 dark:text-white block mb-1">Populyatsiyaga tahdidlar:</span>
                  <ul className="space-y-1 text-stone-600 dark:text-stone-400">
                    {selectedSpecies.threats.map((t, idx) => (
                      <li key={idx} className="flex items-center space-x-1.5">
                        <span className="text-red-500">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Ecosystems */}
      {activeTab === 'ecosystems' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {uzbekistanEcosystems.map((eco) => (
            <div
              key={eco.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-4"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                  Ekotizim
                </span>
                <h3 className="text-base font-extrabold text-stone-900 dark:text-white mt-1">
                  {eco.name}
                </h3>
                <p className="text-xs text-stone-500 mt-1">{eco.areaDesc}</p>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-bold text-stone-700 dark:text-stone-300 block mb-0.5">Xos flora:</span>
                  <p className="text-stone-600 dark:text-stone-400">{eco.keyFlora.join(', ')}</p>
                </div>
                <div>
                  <span className="font-bold text-stone-700 dark:text-stone-300 block mb-0.5">Xos fauna:</span>
                  <p className="text-stone-600 dark:text-stone-400">{eco.keyFauna.join(', ')}</p>
                </div>
                <div>
                  <span className="font-bold text-stone-700 dark:text-stone-300 block mb-0.5">Muhofaza holati:</span>
                  <p className="text-emerald-800 dark:text-emerald-300 font-semibold">{eco.conservationStatus}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Agricultural Biotechnology */}
      {activeTab === 'agri' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-6">
          <div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white">
              Qishloq Xo'jaligi va Oziq-ovqat Xavfsizligida Biologiya
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
              O'zbekistonda paxta, bug'doy, mosh va soya ekinlarining hosildorligini oshirish, sho'rlanish va qurg'oqchilik stressiga chidamli navlarni yaratish mexanizmlari.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
              <h4 className="text-sm font-bold text-[#176B4D] dark:text-[#62C9A5]">
                🌾 Bug'doy va Paxtada Qurg'oqchilikka Chidamlilik
              </h4>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                Suv tanqisligida o'simlik barglarida absitsin kislotasi (ABA) miqdori keskin ortib, og'izchalarni yopadi. Hujayra sitoplazmasida esa <strong>prolin</strong> va <strong>glyitsin-betain</strong> to'planib, oqsillarni denaturatsiyadan asraydi.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
              <h4 className="text-sm font-bold text-[#176B4D] dark:text-[#62C9A5]">
                🧬 Genomik Seleksiya ("Porloq" navlari)
              </h4>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                Genomika va bioinformatika markazi tomonidan g'o'zaning RNK-interferentsiya (RNAi) texnologiyasi orqali tola uzunligi 38-40 mm gacha yetuvchi, viltga chidamli yuqori sifatli navlari yaratildi.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
