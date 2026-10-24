import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { GitFork, CheckCircle2, RotateCcw, ArrowUp, ArrowDown, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MitosisStage {
  id: string;
  name: string;
  latin: string;
  formula: string;
  description: string;
  keyEvents: string[];
  visualColor: string;
}

const initialStages: MitosisStage[] = [
  {
    id: 'stage-meta',
    name: 'Metafaza',
    latin: 'Metaphasis',
    formula: '2n = 4c',
    description: 'Xromosomalar maksimal spirallashgan va hujayra ekvatori bo\'ylab tizilgan (metafaza plastinkasi).',
    keyEvents: ['Bo\'linish duki iplari kinetoxorlarga birikadi', 'Karyotipni mikroskopda sanash uchun eng maqbul faza', 'SAC nazorat nuqtasi faollashadi'],
    visualColor: '#3B82F6'
  },
  {
    id: 'stage-pro',
    name: 'Profaza',
    latin: 'Prophasis',
    formula: '2n = 4c',
    description: 'Xromatin iplari zichlashib xromosomaga aylanadi, sentriolalar qutblarga tarqaladi va yadro qobig\'i eriydi.',
    keyEvents: ['Yadrocha yo\'qoladi', 'Sentrosomalar qutblarga yo\'l oladi', 'Mikronaychalardan bo\'linish duki shakllanadi'],
    visualColor: '#8B5CF6'
  },
  {
    id: 'stage-telo',
    name: 'Telofaza va Sitokinez',
    latin: 'Telophasis et cytokinesis',
    formula: '2n = 2c (har bir hujayrada)',
    description: 'Qutblarda xromosomalar despirallashadi, yangi yadro qobiqlari hosil bo\'ladi va sitoplazma ikkiga ajraladi.',
    keyEvents: ['Yadro qobig\'i qayta tiklanadi', 'Bo\'linish duki parchalanadi', 'O\'simlikda fragmoplast, hayvonda bo\'linish egatchasi hosil bo\'ladi'],
    visualColor: '#10B981'
  },
  {
    id: 'stage-ana',
    name: 'Anafaza',
    latin: 'Anaphasis',
    formula: '4n = 4c (vaqtincha)',
    description: 'Sentromeralar bo\'linib, qiz xromatidalar mustaqil bir xromatidali xromosomaga aylanib qarama-qarshi qutblarga tortiladi.',
    keyEvents: ['Kinetoxor mikronaychalari qisqaradi', 'Xromatidalar ajraladi', 'Hujayrada xromosomalar soni ikki hissa ortadi'],
    visualColor: '#F59E0B'
  }
];

const correctOrderIds = ['stage-pro', 'stage-meta', 'stage-ana', 'stage-telo'];

export const MitosisLab: React.FC = () => {
  const { t } = useTranslation();
  const { markLabCompleted } = useAuth();

  const [stages, setStages] = useState<MitosisStage[]>(initialStages);
  const [isChecked, setIsChecked] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const moveStage = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= stages.length) return;

    const updated = [...stages];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setStages(updated);
    setIsChecked(false);
  };

  const handleVerify = () => {
    setIsChecked(true);
    const isCorrect = stages.every((s, i) => s.id === correctOrderIds[i]);
    setIsSuccess(isCorrect);
    if (isCorrect) {
      markLabCompleted('mitosis-lab');
      try {
        confetti({ particleCount: 50, spread: 60 });
      } catch (e) {}
    }
  };

  const handleReset = () => {
    setStages([...initialStages]);
    setIsChecked(false);
    setIsSuccess(false);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white flex items-center space-x-2">
            <GitFork className="w-5 h-5 text-[#2D9B75] dark:text-[#62C9A5]" />
            <span>{t('labMitosisName')}</span>
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400">
            Mitoz fazalarini xronologik tartibga keltiring va har bir fazadagi genetik formulani o\'rganing
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            className="p-2 rounded-xl text-xs font-semibold border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50"
            title="Qayta boshlash"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleVerify}
            className="px-4 py-2 rounded-xl bg-[#176B4D] hover:bg-[#104C36] text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Ketma-ketlikni tekshirish</span>
          </button>
        </div>
      </div>

      {isChecked && (
        <div className={`p-4 rounded-2xl border text-xs flex items-center space-x-3 ${
          isSuccess
            ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
            : 'bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200'
        }`}>
          {isSuccess ? <Award className="w-5 h-5 text-emerald-600 shrink-0" /> : <RotateCcw className="w-5 h-5 text-red-500 shrink-0" />}
          <div>
            <p className="font-bold">
              {isSuccess ? 'Ofarin! Ketma-ketlik 100% to\'g\'ri joylashtirildi.' : 'Ketma-ketlikda xatolik mavjud.'}
            </p>
            <p className="text-[11px] opacity-90">
              {isSuccess
                ? 'Profaza (2n4c) -> Metafaza (2n4c) -> Anafaza (4n4c) -> Telofaza (2n2c). Laboratoriya topshirig\'i muvaffaqiyatli yakunlandi!'
                : 'Mitoz profazadan boshlanadi, so\'ng xromosomalar ekvatorga teriladi (metafaza), qutblarga tortiladi (anafaza) va bo\'linish yakunlanadi (telofaza).'}
            </p>
          </div>
        </div>
      )}

      {/* Sorting Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage, idx) => {
          const isCorrectPosition = isChecked && stage.id === correctOrderIds[idx];

          return (
            <div
              key={stage.id}
              className={`p-5 rounded-2xl bg-white dark:bg-[#162420] border transition-all flex flex-col justify-between ${
                isChecked
                  ? isCorrectPosition
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'border-red-400 ring-2 ring-red-400/20'
                  : 'border-emerald-900/10 dark:border-emerald-800/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => moveStage(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 rounded-md text-stone-500 hover:text-stone-900 dark:hover:text-white disabled:opacity-30"
                      title="Oldinga siljitish"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveStage(idx, 'down')}
                      disabled={idx === stages.length - 1}
                      className="p-1 rounded-md text-stone-500 hover:text-stone-900 dark:hover:text-white disabled:opacity-30"
                      title="Keyinga siljitish"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.visualColor }} />
                  <h4 className="font-extrabold text-stone-900 dark:text-white text-base">
                    {stage.name}
                  </h4>
                </div>
                <p className="text-[11px] italic font-mono text-stone-500 mb-2">{stage.latin}</p>

                <div className="inline-block px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-[10px] font-mono font-bold text-[#176B4D] dark:text-[#62C9A5] mb-3">
                  Formula: {stage.formula}
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-3">
                  {stage.description}
                </p>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-stone-400">Asosiy hodisalar:</span>
                  {stage.keyEvents.map((ev, i) => (
                    <div key={i} className="text-[11px] text-stone-600 dark:text-stone-400 flex items-start space-x-1.5">
                      <span className="text-emerald-600">•</span>
                      <span>{ev}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
