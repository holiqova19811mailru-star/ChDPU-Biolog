import React from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { virtualLabsCatalog } from '../../data/virtualLabsData';
import { ArrowRight, Clock, Award, Play } from 'lucide-react';

export const FeaturedLabsSection: React.FC = () => {
  const { t } = useTranslation();
  const { setActivePage, currentUser } = useAuth();

  return (
    <section className="py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#176B4D] dark:text-[#62C9A5] mb-1">
            Amaliy Mashg\'ulotlar
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            {t('labsTitle')}
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
            {t('labsDesc')}
          </p>
        </div>

        <button
          onClick={() => setActivePage('labs')}
          className="mt-4 sm:mt-0 inline-flex items-center space-x-1.5 text-xs font-bold text-[#176B4D] dark:text-[#62C9A5] hover:underline"
        >
          <span>Barcha 8 ta laboratoriyani ko\'rish</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {virtualLabsCatalog.slice(0, 4).map((lab) => {
          const isCompleted = currentUser.completedLabs.includes(lab.id);

          return (
            <div
              key={lab.id}
              onClick={() => setActivePage('labs', { labId: lab.id })}
              className="group cursor-pointer rounded-2xl p-5 bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/50 hover:border-emerald-500/50 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                    {lab.difficulty}
                  </span>
                  <div className="flex items-center space-x-1 text-[11px] text-stone-500">
                    <Clock className="w-3 h-3" />
                    <span>{lab.durationMinutes} daq</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-stone-900 dark:text-white group-hover:text-[#176B4D] dark:group-hover:text-[#62C9A5] transition-colors">
                  {t(lab.nameKey as any)}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                  {t(lab.descKey as any)}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                {isCompleted ? (
                  <span className="flex items-center text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    <Award className="w-3.5 h-3.5 mr-1" />
                    Bajarilgan
                  </span>
                ) : (
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                    Boshlanmagan
                  </span>
                )}

                <button
                  className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#176B4D] dark:text-[#62C9A5] group-hover:bg-[#176B4D] group-hover:text-white transition-all shadow-xs"
                  aria-label="Laboratoriyani boshlash"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
