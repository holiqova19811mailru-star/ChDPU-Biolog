import React from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Heart, ExternalLink, BookCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { setActivePage } = useAuth();

  return (
    <footer className="border-t transition-colors duration-200 bg-[#EBF3EF] dark:bg-[#0D1512] border-emerald-900/10 dark:border-emerald-900/40 text-stone-600 dark:text-stone-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-[#176B4D] flex items-center justify-center text-white font-extrabold text-sm">
                B
              </div>
              <span className="font-extrabold text-lg text-emerald-950 dark:text-emerald-100">
                Bio<span className="text-[#2D9B75] dark:text-[#62C9A5]">Lab</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-400">
              {t('brandSub')}. Universitet talabalari va o\'qituvchilari uchun interaktiv biologiya ta\'limi.
            </p>
            <div className="flex items-center space-x-2 pt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                <ShieldCheck className="w-3 h-3 mr-1 text-emerald-600 dark:text-emerald-400" />
                Akademik standart
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-stone-200 text-stone-800 dark:bg-stone-800 dark:text-stone-300">
                v1.0.0
              </span>
            </div>
          </div>

          {/* Quick Links: Fanlar va Laboratoriyalar */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 mb-3">
              {t('navLabs')} & {t('navSubjects')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('labs')} className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                  {t('labCellName')}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('labs')} className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                  {t('labMicroscopeName')}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('labs')} className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                  {t('labPhotosynthesisName')}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('labs')} className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                  {t('labGeneticsName')}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('subjects')} className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                  {t('navSubjects')}
                </button>
              </li>
            </ul>
          </div>

          {/* Manbalar va O'zbekiston */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 mb-3">
              Ilmiy Bo\'limlar
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('uzbekistan')} className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                  {t('navUzbekistan')}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('observer')} className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                  {t('navObserver')}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('atlas')} className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                  {t('navAtlas')}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('games')} className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                  {t('navGames')}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('library')} className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                  {t('navLibrary')}
                </button>
              </li>
            </ul>
          </div>

          {/* Ethical Policy & Safety */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 mb-3">
              Xavfsizlik va Etika
            </h4>
            <p className="text-[11px] leading-relaxed text-stone-500 dark:text-stone-400 mb-2">
              Barcha laboratoriya modellar ta\'limiy va xavfsiz simulyatsiya hisoblanadi. Hech qanday xavfli patogenlar yoki tibbiy davolash retseptlari berilmaydi.
            </p>
            <div className="flex flex-col space-y-1.5 text-xs text-emerald-800 dark:text-emerald-400 font-medium">
              <a
                href="https://www.ncbi.nlm.nih.gov/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center hover:underline"
              >
                <span>NCBI Bookshelf & PubMed</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
              <a
                href="https://openstax.org/subjects/science"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center hover:underline"
              >
                <span>OpenStax Biology Open Access</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

        </div>

        {/* Developer Attribution */}
        <div className="mt-8 pt-6 border-t border-emerald-900/10 dark:border-emerald-800/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#176B4D] via-[#2D9B75] to-[#62C9A5] flex items-center justify-center text-white font-extrabold text-xs shadow-md">
              XM
            </div>
            <div>
              <p className="font-bold text-stone-900 dark:text-white">
                Platforma ishlab chiquvchisi: <span className="text-[#176B4D] dark:text-[#62C9A5] font-extrabold">Xolikova Moxichexra Azamatovna</span>
              </p>
              <p className="text-[11px] text-emerald-800 dark:text-emerald-400 font-medium">
                Chirchiq davlat pedagogika universiteti
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-stone-500 dark:text-stone-400 text-[11px]">
            <p>© {new Date().getFullYear()} BioLab Platform. {t('allRightsReserved')}.</p>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center">
              Ta\'lim uchun mehr bilan yaratilgan <Heart className="w-3 h-3 text-red-500 mx-1 fill-current" /> O\'zbekiston
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
