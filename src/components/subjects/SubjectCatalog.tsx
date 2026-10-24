import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { subjectsData } from '../../data/subjectsData';
import { Subject, Topic } from '../../types';
import { TopicDetailView } from './TopicDetailView';
import { BookOpen, Search, ArrowRight, CheckCircle2, Sparkles, Filter } from 'lucide-react';

export const SubjectCatalog: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Barchasi' },
    { id: 'fundamental', label: 'Fundamental biologiya' },
    { id: 'molecular', label: 'Molekulyar & Genetika' },
    { id: 'ecological', label: 'Ekologiya & Tabiat' },
    { id: 'applied', label: 'Amaliy & Biotexnologiya' },
  ];

  const filteredSubjects = subjectsData.filter((subj) => {
    const matchesCat = selectedCategory === 'all' || subj.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesQuery = subj.titleKey.toLowerCase().includes(q) ||
      subj.descriptionKey.toLowerCase().includes(q) ||
      subj.topics.some(t => t.title.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  if (selectedTopic) {
    return <TopicDetailView topic={selectedTopic} onBack={() => setSelectedTopic(null)} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Akademik O\'quv Dasturi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          {t('navSubjects')}
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-3xl leading-relaxed">
          Universitet biologiya ta\'lim yo\'nalishlari bo\'yicha chuqurlashtirilgan ma\'ruzalar, mikroskopik tuzilmalar, hayotiy misollar va O\'zbekiston sharoitiga bog\'liq ilmiy mavzular.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === c.id
                  ? 'bg-[#176B4D] text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-emerald-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subjects & Topics list */}
      <div className="space-y-8">
        {filteredSubjects.map((subj) => (
          <div
            key={subj.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800/60 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {subj.category}
                </span>
                <h2 className="text-xl font-bold text-stone-900 dark:text-white mt-1">
                  {subj.titleKey}
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {subj.descriptionKey}
                </p>
              </div>

              <span className="text-xs font-mono font-semibold text-stone-500">
                {subj.topics.length} ta mavzu
              </span>
            </div>

            {/* Topics inside subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subj.topics.map((topic) => {
                const isCompleted = currentUser.completedTopics.includes(topic.id);

                return (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className="group cursor-pointer p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 hover:border-emerald-500/50 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                          Universitet moduli
                        </span>
                        {isCompleted && (
                          <span className="flex items-center text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            O\'zlashtirilgan
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-stone-900 dark:text-white group-hover:text-[#176B4D] dark:group-hover:text-[#62C9A5] transition-colors leading-snug">
                        {topic.title}
                      </h3>

                      <p className="text-xs text-stone-500 line-clamp-2 mt-1.5 leading-relaxed">
                        {topic.objective}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between text-xs font-semibold text-[#176B4D] dark:text-[#62C9A5]">
                      <span>{t('viewTopic')}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
