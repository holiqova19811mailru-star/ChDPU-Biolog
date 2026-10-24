import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { Topic } from '../../types';
import { ArrowLeft, BookOpen, CheckCircle2, Award, Sparkles, MapPin, ExternalLink, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TopicDetailViewProps {
  topic: Topic;
  onBack: () => void;
}

export const TopicDetailView: React.FC<TopicDetailViewProps> = ({ topic, onBack }) => {
  const { t } = useTranslation();
  const { markTopicCompleted, currentUser, setActivePage } = useAuth();

  const [selectedExerciseOption, setSelectedExerciseOption] = useState<number | null>(null);
  const [exerciseChecked, setExerciseChecked] = useState(false);
  const isCompleted = currentUser.completedTopics.includes(topic.id);

  const handleCheckExercise = (idx: number) => {
    setSelectedExerciseOption(idx);
    setExerciseChecked(true);

    if (idx === topic.interactiveExercise.correctIndex) {
      markTopicCompleted(topic.id);
      try {
        confetti({ particleCount: 40, spread: 60 });
      } catch (e) {}
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center space-x-2 text-xs font-bold text-[#176B4D] dark:text-[#62C9A5] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Fanlar katalogiga qaytish</span>
      </button>

      {/* Topic Title Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#176B4D] dark:text-[#62C9A5]">
            Mavzu tafsilotlari
          </span>
          {isCompleted && (
            <span className="inline-flex items-center text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              O\'zlashtirilgan
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          {topic.title}
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          <strong>O\'quv maqsadi:</strong> {topic.objective}
        </p>

        {/* Expected outcomes */}
        <div className="pt-2">
          <span className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
            Kutilayotgan natijalar:
          </span>
          <ul className="space-y-1 text-xs text-stone-600 dark:text-stone-400">
            {topic.expectedOutcomes.map((outcome, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key terms glossary for this topic */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#176B4D]" />
          <span>Asosiy Terminlar va Tushunchalar</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topic.keyTerms.map((term, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 text-xs">
              <span className="font-bold text-[#176B4D] dark:text-[#62C9A5] block mb-1">{term.term}:</span>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{term.definition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lecture Content */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1 block">
            Qisqa ma\'ruza
          </span>
          <p className="text-sm sm:text-base font-medium text-stone-800 dark:text-stone-200 leading-relaxed italic border-l-4 border-emerald-600 pl-4 py-1">
            {topic.shortLecture}
          </p>
        </div>

        <div className="border-t border-stone-100 dark:border-stone-800 pt-4">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 block">
            Batafsil ilmiy bayon
          </span>
          <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line space-y-3">
            {topic.detailedContent}
          </div>
        </div>

        {/* Real life example */}
        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/60 text-xs text-amber-950 dark:text-amber-200 space-y-1">
          <span className="font-bold block text-amber-900 dark:text-amber-100">💡 Hayotiy misol:</span>
          <p className="leading-relaxed">{topic.realLifeExample}</p>
        </div>

        {/* Uzbekistan Context */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-xs text-emerald-950 dark:text-emerald-200 space-y-1">
          <span className="font-bold flex items-center space-x-1 text-[#176B4D] dark:text-[#62C9A5]">
            <MapPin className="w-3.5 h-3.5" />
            <span>O\'zbekiston sharoitiga oid amaliyot:</span>
          </span>
          <p className="leading-relaxed text-stone-700 dark:text-stone-300">{topic.uzbekistanContext}</p>
        </div>
      </div>

      {/* Interactive In-Topic Exercise */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-[#176B4D]" />
          <span>Interaktiv mashq: O\'z-o\'zini baholash</span>
        </h3>

        <p className="text-sm font-semibold text-stone-900 dark:text-white">
          {topic.interactiveExercise.question}
        </p>

        <div className="space-y-2">
          {topic.interactiveExercise.options.map((opt, idx) => {
            let optStyle = 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 hover:bg-emerald-50 text-stone-800 dark:text-stone-200';

            if (exerciseChecked) {
              if (idx === topic.interactiveExercise.correctIndex) {
                optStyle = 'border-emerald-500 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500';
              } else if (idx === selectedExerciseOption) {
                optStyle = 'border-red-400 bg-red-50 text-red-900 ring-1 ring-red-400';
              } else {
                optStyle = 'opacity-40 border-stone-200';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleCheckExercise(idx)}
                disabled={exerciseChecked}
                className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${optStyle}`}
              >
                <span>{opt}</span>
                {exerciseChecked && idx === topic.interactiveExercise.correctIndex && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                )}
              </button>
            );
          })}
        </div>

        {exerciseChecked && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-stone-800 dark:text-stone-200">
            <p className="font-bold text-[#176B4D] dark:text-[#62C9A5] mb-1">
              {selectedExerciseOption === topic.interactiveExercise.correctIndex
                ? '✓ To\'g\'ri javob! Mavzu muvaffaqiyatli o\'zlashtirildi.'
                : '✕ Noto\'g\'ri tanlov.'}
            </p>
            <p className="leading-relaxed">{topic.interactiveExercise.explanation}</p>
          </div>
        )}
      </div>

      {/* References & Independent Work */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
            Mustaqil ish topshirig\'i
          </span>
          <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
            {topic.independentWork}
          </p>
        </div>

        <div className="border-t border-stone-100 dark:border-stone-800 pt-3">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
            Foydalanilgan ilmiy manbalar
          </span>
          <ul className="space-y-1 text-xs text-stone-500">
            {topic.references.map((ref, i) => (
              <li key={i}>• {ref}</li>
            ))}
          </ul>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={() => setActivePage('quizzes')}
            className="px-4 py-2 rounded-xl bg-[#176B4D] hover:bg-[#104C36] text-white text-xs font-bold transition-colors shadow-xs"
          >
            Mavzu bo\'yicha test topshirish
          </button>
        </div>
      </div>
    </div>
  );
};
