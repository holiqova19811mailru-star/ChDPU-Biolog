import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { virtualLabsCatalog } from '../../data/virtualLabsData';
import { CellLab } from './CellLab';
import { MicroscopeLab } from './MicroscopeLab';
import { PhotosynthesisLab } from './PhotosynthesisLab';
import { GeneticsLab } from './GeneticsLab';
import { MitosisLab } from './MitosisLab';
import { EcosystemLab } from './EcosystemLab';
import { HeartLab } from './HeartLab';
import { PlantAnatomyLab } from './PlantAnatomyLab';
import { FlaskConical, Clock, Award, ArrowLeft, Search, Filter } from 'lucide-react';

export const VirtualLabsHub: React.FC = () => {
  const { t } = useTranslation();
  const { pageParams, setActivePage, currentUser } = useAuth();

  // If a labId is in pageParams, show that lab directly
  const [selectedLabId, setSelectedLabId] = useState<string | null>(pageParams.labId || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  const filteredLabs = virtualLabsCatalog.filter((lab) => {
    const name = t(lab.nameKey as any).toLowerCase();
    const desc = t(lab.descKey as any).toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesQuery = name.includes(q) || desc.includes(q);
    const matchesDiff = filterDifficulty === 'all' || lab.difficulty === filterDifficulty;
    return matchesQuery && matchesDiff;
  });

  const renderActiveLabComponent = () => {
    switch (selectedLabId) {
      case 'cell-lab':
        return <CellLab />;
      case 'microscope-lab':
        return <MicroscopeLab />;
      case 'photosynthesis-lab':
        return <PhotosynthesisLab />;
      case 'genetics-lab':
        return <GeneticsLab />;
      case 'mitosis-lab':
        return <MitosisLab />;
      case 'ecosystem-lab':
        return <EcosystemLab />;
      case 'heart-lab':
        return <HeartLab />;
      case 'plant-anatomy-lab':
        return <PlantAnatomyLab />;
      default:
        return <CellLab />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Breadcrumb */}
      {selectedLabId ? (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedLabId(null)}
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#176B4D] dark:text-[#62C9A5] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Barcha 8 ta laboratoriyaga qaytish</span>
          </button>

          {renderActiveLabComponent()}
        </div>
      ) : (
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-semibold mb-2">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Universitet Amaliyoti</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              {t('labsTitle')}
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-3xl leading-relaxed">
              {t('labsDesc')}
            </p>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Laboratoriyani qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-xs text-stone-500">Qiyinlik:</span>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="p-2 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200"
              >
                <option value="all">Barchasi</option>
                <option value="boshlang'ich">Boshlang\'ich</option>
                <option value="o'rta">O\'rta</option>
                <option value="yuqori">Yuqori</option>
              </select>
            </div>
          </div>

          {/* Labs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredLabs.map((lab) => {
              const isCompleted = currentUser.completedLabs.includes(lab.id);

              return (
                <div
                  key={lab.id}
                  onClick={() => setSelectedLabId(lab.id)}
                  className="cursor-pointer group rounded-2xl p-6 bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 hover:border-emerald-500/50 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                        {lab.difficulty}
                      </span>
                      <div className="flex items-center space-x-1 text-xs text-stone-500">
                        <Clock className="w-3 h-3" />
                        <span>{lab.durationMinutes} daq</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 dark:text-white group-hover:text-[#176B4D] dark:group-hover:text-[#62C9A5] transition-colors mb-2">
                      {t(lab.nameKey as any)}
                    </h3>

                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {t(lab.descKey as any)}
                    </p>

                    <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/60 space-y-1">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                        Kutilayotgan ko\'nikmalar:
                      </span>
                      {lab.learningOutcomes.slice(0, 2).map((outcome, i) => (
                        <p key={i} className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">
                          • {outcome}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                    {isCompleted ? (
                      <span className="flex items-center text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        <Award className="w-4 h-4 mr-1 text-emerald-600" />
                        Bajarilgan
                      </span>
                    ) : (
                      <span className="text-xs text-stone-400">Bajarilmagan</span>
                    )}

                    <button className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#176B4D] dark:text-[#62C9A5] group-hover:bg-[#176B4D] group-hover:text-white font-bold text-xs transition-colors shadow-xs">
                      {t('openLab')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
