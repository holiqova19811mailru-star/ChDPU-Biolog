import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { libraryResources, biologyGlossary, GlossaryTerm } from '../../data/libraryData';
import { LibraryResource } from '../../types';
import { BookOpen, Search, ExternalLink, ShieldCheck, Languages, BookA, FileText, Check } from 'lucide-react';

export const DigitalLibrary: React.FC = () => {
  const { t, language } = useTranslation();

  const [activeTab, setActiveTab] = useState<'resources' | 'glossary'>('resources');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterLang, setFilterLang] = useState<string>('all');

  const filteredResources = libraryResources.filter(r => {
    const q = searchQuery.toLowerCase();
    const matchesQ = r.title.toLowerCase().includes(q) ||
      r.authors.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q);
    const matchesType = filterType === 'all' || r.type === filterType;
    const matchesLang = filterLang === 'all' || r.language === filterLang;
    return matchesQ && matchesType && matchesLang;
  });

  const filteredGlossary = biologyGlossary.filter(g => {
    const q = searchQuery.toLowerCase();
    return g.term.toLowerCase().includes(q) ||
      g.latin.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q) ||
      g.defUz.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Ilmiy Ma\'lumotlar Bazasi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          {t('navLibrary')}
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-3xl leading-relaxed">
          Universitet darsliklari, laboratoriya yo\'riqnomalari, NCBI/PubMed ochiq maqolalari va ko\'p tilli biologik terminlar lug\'ati.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-stone-200 dark:border-stone-800">
        <button
          onClick={() => setActiveTab('resources')}
          className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center space-x-2 ${
            activeTab === 'resources'
              ? 'border-[#176B4D] text-[#176B4D] dark:text-[#62C9A5]'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Kutubxona Resurslari ({libraryResources.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('glossary')}
          className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center space-x-2 ${
            activeTab === 'glossary'
              ? 'border-[#176B4D] text-[#176B4D] dark:text-[#62C9A5]'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <BookA className="w-4 h-4" />
          <span>Biologik Terminlar Lug\'ati ({biologyGlossary.length})</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Resurs yoki termin qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {activeTab === 'resources' && (
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="p-2 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200"
            >
              <option value="all">Barcha turlar</option>
              <option value="textbook">Darslik</option>
              <option value="manual">Qo'llanma / Kitob</option>
              <option value="article">Ilmiy maqola</option>
            </select>

            <select
              value={filterLang}
              onChange={(e) => setFilterLang(e.target.value)}
              className="p-2 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200"
            >
              <option value="all">Barcha tillar</option>
              <option value="uz">O'zbekcha</option>
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
          </div>
        )}
      </div>

      {/* Tab 1: Library Resources Grid */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    {res.type}
                  </span>
                  <span className="text-xs font-mono text-stone-500">{res.year} yil</span>
                </div>

                <h3 className="text-base font-bold text-stone-900 dark:text-white mb-1 leading-snug">
                  {res.title}
                </h3>
                <p className="text-xs text-stone-500 mb-3 italic">
                  Mualliflar: {res.authors}
                </p>

                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed mb-4">
                  {res.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-stone-400">
                  {res.publisher} • {res.pages} bet
                </span>
                {res.sourceUrl && (
                  <a
                    href={res.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 font-bold text-[#176B4D] dark:text-[#62C9A5] hover:underline"
                  >
                    <span>Ochish</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Glossary Dictionary */}
      {activeTab === 'glossary' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGlossary.map((item, idx) => {
            let localizedDef = item.defUz;
            if (language === 'ru') localizedDef = item.defRu;
            else if (language === 'en') localizedDef = item.defEn;

            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-extrabold text-[#176B4D] dark:text-[#62C9A5]">
                    {item.term}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                    {item.category}
                  </span>
                </div>

                <p className="text-xs italic text-stone-500 font-mono">
                  {item.latin}
                </p>

                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed pt-1">
                  {localizedDef}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
