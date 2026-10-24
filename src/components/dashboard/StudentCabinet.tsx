import React from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { User, Award, Flame, CheckCircle2, Clock, BookOpen, FlaskConical, Target, ShieldCheck } from 'lucide-react';

export const StudentCabinet: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser, setActivePage } = useAuth();

  const totalPossibleTopics = 30;
  const totalPossibleLabs = 8;
  const progressPct = Math.round(
    ((currentUser.completedTopics.length + currentUser.completedLabs.length) / (totalPossibleTopics + totalPossibleLabs)) * 100
  );

  const avgQuizScore = currentUser.quizScores.length > 0
    ? Math.round(currentUser.quizScores.reduce((acc, q) => acc + q.score, 0) / currentUser.quizScores.length)
    : 85;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-[#154634] to-[#0E2C21] text-white shadow-xl border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white text-2xl font-bold">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-extrabold">{currentUser.name}</h1>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-400 text-stone-950">
                Talaba
              </span>
            </div>
            <p className="text-xs text-emerald-200 mt-0.5">{currentUser.specialty}</p>
            <p className="text-xs text-emerald-300/80">{currentUser.university}</p>
          </div>
        </div>

        {/* Streak and Study Time Stats */}
        <div className="flex items-center space-x-4">
          <div className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/10 text-center">
            <span className="flex items-center justify-center text-amber-400 text-xs font-bold space-x-1">
              <Flame className="w-4 h-4 fill-current" />
              <span>{currentUser.streakDays} kun</span>
            </span>
            <span className="text-[10px] text-emerald-200 block mt-0.5">Uzluksiz marafon</span>
          </div>

          <div className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/10 text-center">
            <span className="text-base font-extrabold font-mono text-white block">
              {currentUser.studiedMinutesThisWeek} daq
            </span>
            <span className="text-[10px] text-emerald-200 block mt-0.5">Bu haftada</span>
          </div>
        </div>
      </div>

      {/* Progress & Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs">
          <span className="text-xs text-stone-500 block mb-1">O'zlashtirilgan mavzular</span>
          <span className="text-2xl font-extrabold text-[#176B4D] dark:text-[#62C9A5] font-mono">
            {currentUser.completedTopics.length} / {totalPossibleTopics}
          </span>
          <div className="w-full h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 mt-2 overflow-hidden">
            <div
              className="h-full bg-[#176B4D] dark:bg-[#62C9A5]"
              style={{ width: `${(currentUser.completedTopics.length / totalPossibleTopics) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs">
          <span className="text-xs text-stone-500 block mb-1">Virtual laboratoriyalar</span>
          <span className="text-2xl font-extrabold text-[#176B4D] dark:text-[#62C9A5] font-mono">
            {currentUser.completedLabs.length} / {totalPossibleLabs}
          </span>
          <div className="w-full h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 mt-2 overflow-hidden">
            <div
              className="h-full bg-[#176B4D] dark:bg-[#62C9A5]"
              style={{ width: `${(currentUser.completedLabs.length / totalPossibleLabs) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs">
          <span className="text-xs text-stone-500 block mb-1">O'rtacha test aniqligi</span>
          <span className="text-2xl font-extrabold text-[#176B4D] dark:text-[#62C9A5] font-mono">
            {avgQuizScore}%
          </span>
          <p className="text-[10px] text-stone-400 mt-1">Akademik me'yor: 70% dan yuqori</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs">
          <span className="text-xs text-stone-500 block mb-1">Haftalik maqsad</span>
          <span className="text-2xl font-extrabold text-[#176B4D] dark:text-[#62C9A5] font-mono">
            {Math.round((currentUser.studiedMinutesThisWeek / currentUser.weeklyTargetMinutes) * 100)}%
          </span>
          <p className="text-[10px] text-stone-400 mt-1">{currentUser.studiedMinutesThisWeek} / {currentUser.weeklyTargetMinutes} daqiqa</p>
        </div>
      </div>

      {/* Badges Earned */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white flex items-center space-x-2">
          <Award className="w-4 h-4 text-[#176B4D]" />
          <span>Qo'lga Kiritilgan Yutuq Nishonlari ({currentUser.badges.length})</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {currentUser.badges.map((badge, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center space-x-3"
            >
              <div className="w-9 h-9 rounded-xl bg-[#176B4D] text-white flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-stone-900 dark:text-white block">{badge}</span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400">Tasdiqlangan</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz History & Teacher Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Quiz History */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white">
            Test Natijalari Tarixi
          </h3>
          <div className="space-y-2.5">
            {currentUser.quizScores.map((score, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-stone-900 dark:text-white block">{score.topicId}</span>
                  <span className="text-[10px] text-stone-500">{score.date} • {score.timeSpentSeconds}s</span>
                </div>
                <span className="text-sm font-extrabold font-mono text-emerald-700 dark:text-emerald-400">
                  {score.score}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Teacher Assignments */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white">
            O'qituvchi Topshiriqlari
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-center justify-between">
              <div>
                <span className="font-bold text-amber-950 dark:text-amber-200 block">
                  Fotosintez laboratoriyasi hisoboti
                </span>
                <span className="text-[11px] text-amber-700 dark:text-amber-400">
                  Muddat: 28-oktyabrgacha • Prof. D. Karimov
                </span>
              </div>
              <button
                onClick={() => setActivePage('labs')}
                className="px-3 py-1.5 rounded-xl bg-amber-600 text-white font-bold text-[11px]"
              >
                Bajarish
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-stone-900 dark:text-white block">
                  Genetika: Monoduragay masalalar yechimi
                </span>
                <span className="text-[11px] text-stone-500">
                  Muddat: 30-oktyabrgacha • O'zMU kafedrasi
                </span>
              </div>
              <button
                onClick={() => setActivePage('labs')}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-[11px]"
              >
                Ochish
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
