import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Users, Plus, CheckCircle2, MessageSquare, ClipboardCheck, Sparkles } from 'lucide-react';

export const TeacherCabinet: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();

  const [assignments, setAssignments] = useState([
    {
      id: 'asg-1',
      title: 'Fotosintez yorug\'lik bosqichida elektronlar oqimi',
      group: 'O\'zMU Biologiya 301-guruh',
      deadline: '2026-10-28',
      submittedCount: 21,
      totalCount: 24,
      status: 'active'
    },
    {
      id: 'asg-2',
      title: 'Mitoz fazalari mikroskopik preparati hisoboti',
      group: 'O\'zMU Biologiya 301-guruh',
      deadline: '2026-10-30',
      submittedCount: 18,
      totalCount: 24,
      status: 'active'
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newGroup, setNewGroup] = useState('O\'zMU Biologiya 301-guruh');
  const [newDeadline, setNewDeadline] = useState('2026-11-05');
  const [createdMsg, setCreatedMsg] = useState(false);

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    setAssignments(prev => [
      ...prev,
      {
        id: `asg-${Date.now()}`,
        title: newTitle,
        group: newGroup,
        deadline: newDeadline,
        submittedCount: 0,
        totalCount: 24,
        status: 'active'
      }
    ]);

    setNewTitle('');
    setCreatedMsg(true);
    setTimeout(() => setCreatedMsg(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-[#183D2F] to-[#102B21] text-white shadow-xl border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-emerald-400 text-stone-950 text-xs font-bold mb-2">
            O'qituvchi Xonasi
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">{currentUser.name}</h1>
          <p className="text-xs text-emerald-200 mt-1">{currentUser.specialty}</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 text-center">
            <span className="text-lg font-bold font-mono">2 ta</span>
            <span className="text-[10px] text-emerald-200 block">Akademik guruh</span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 text-center">
            <span className="text-lg font-bold font-mono">48 nafar</span>
            <span className="text-[10px] text-emerald-200 block">Talabalar</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Active Assignments & Student Submissions */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-white flex items-center space-x-2">
              <ClipboardCheck className="w-5 h-5 text-[#176B4D]" />
              <span>Guruhlarga Belgilangan Topshiriqlar</span>
            </h3>

            <div className="space-y-3">
              {assignments.map((asg) => (
                <div
                  key={asg.id}
                  className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-white text-sm">
                      {asg.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Guruh: <strong>{asg.group}</strong> • Muddat: {asg.deadline}
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <div className="w-32 h-1.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                        <div
                          className="h-full bg-emerald-600"
                          style={{ width: `${(asg.submittedCount / asg.totalCount) * 100}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono text-stone-500">
                        {asg.submittedCount}/{asg.totalCount} topshirildi
                      </span>
                    </div>
                  </div>

                  <button className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#176B4D] dark:text-[#62C9A5] hover:bg-[#176B4D] hover:text-white font-bold text-xs transition-colors self-start sm:self-auto">
                    Tekshirish & Baholash
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Create New Assignment Form */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-white flex items-center space-x-2">
              <Plus className="w-5 h-5 text-[#176B4D]" />
              <span>Yangi Topshiriq Yaratish</span>
            </h3>

            {createdMsg && (
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold">
                Topshiriq muvaffaqiyatli e'lon qilindi!
              </div>
            )}

            <form onSubmit={handleCreateAssignment} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Mavzu / Topshiriq nomi:</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Mendel qonunlari bo'yicha hisob-kitoblar..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Akademik guruh:</label>
                <select
                  value={newGroup}
                  onChange={(e) => setNewGroup(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900"
                >
                  <option value="O'zMU Biologiya 301-guruh">O'zMU Biologiya 301-guruh (24 talaba)</option>
                  <option value="ToshDAU Agrobiologiya 204-guruh">ToshDAU Agrobiologiya 204-guruh (24 talaba)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Topshirish muddati:</label>
                <input
                  type="date"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#104C36] text-white font-bold text-xs shadow-xs transition-colors"
              >
                Topshiriqni e'lon qilish
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
