import React from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { Compass, Camera, Sparkles, MapPin } from 'lucide-react';

export const UzbekistanNatureBanner: React.FC = () => {
  const { t } = useTranslation();
  const { setActivePage } = useAuth();

  return (
    <section className="my-12 rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-[#123126] to-[#0B1E17] text-white p-8 md:p-12 relative border border-emerald-500/30 shadow-xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-800/40 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5" />
          <span>O\'zbekiston Milliy Merosi & Ekotizimlari</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
          {t('uzbekistanTitle')}
        </h2>

        <p className="text-sm sm:text-base text-emerald-200/90 leading-relaxed">
          {t('uzbekistanDesc')} Chotqol tog\' archazorlari, Orolqum fitomelioratsiyasi, Zarafshon to\'qayzorlari va Qizil kitobga kiritilgan noyob turlarni interaktiv ilmiy xaritada o\'rganing.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => setActivePage('uzbekistan')}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center space-x-2 transition-all shadow-md"
          >
            <Compass className="w-4 h-4" />
            <span>Biologik xilma-xillikni ochish</span>
          </button>

          <button
            onClick={() => setActivePage('observer')}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-emerald-400/30 font-semibold text-xs flex items-center space-x-2 transition-all"
          >
            <Camera className="w-4 h-4 text-emerald-300" />
            <span>{t('navObserver')}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
