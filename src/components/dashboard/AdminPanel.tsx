import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Users, Server, ShieldAlert, CheckCircle2, AlertTriangle, FileText, Lock } from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  actor: string;
  target: string;
  timestamp: string;
  status: 'success' | 'warning' | 'info';
}

export const AdminPanel: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'log-1',
      action: 'Mavzu tasdiqlandi: Fotosintez C4 va CAM mexanizmlari',
      actor: 'Prof. D. Karimov (O\'qituvchi)',
      target: 'subjects/botanika',
      timestamp: '2026-10-24 10:15:02',
      status: 'success'
    },
    {
      id: 'log-2',
      action: 'Yangi kuzatuv tekshirildi: Tulipa greigii',
      actor: 'Admin (Bosh Moderator)',
      target: 'observations/obs-2',
      timestamp: '2026-10-24 09:40:11',
      status: 'success'
    },
    {
      id: 'log-3',
      action: 'Tashqi ilmiy manba litsenziyasi tekshirildi: NCBI Bookshelf',
      actor: 'Tizim audit xizmati',
      target: 'library/open-access',
      timestamp: '2026-10-23 18:22:50',
      status: 'info'
    }
  ]);

  const [resourcePolicies, setResourcePolicies] = useState([
    { domain: 'ncbi.nlm.nih.gov', category: 'Tavsiya etilgan ilmiy manba', status: 'approved' },
    { domain: 'openstax.org', category: 'Tavsiya etilgan ochiq darsliklar', status: 'approved' },
    { domain: 'nature.com', category: 'Ilmiy peer-reviewed jurnallar', status: 'approved' },
    { domain: 'unverified-biology-blog.net', category: 'Tekshirilishi kerak bo\'lgan manba', status: 'review_needed' }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white shadow-xl border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-stone-950 text-xs font-bold mb-2">
            Administrator Boshqaruv Markazi
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">{currentUser.name}</h1>
          <p className="text-xs text-stone-400 mt-1">Platforma xavfsizligi, akademik kontent va tizim siyosatlari</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-base font-bold text-emerald-400 font-mono">Faol</span>
            <span className="text-[10px] text-stone-400 block">Server holati</span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-base font-bold text-emerald-400 font-mono">100%</span>
            <span className="text-[10px] text-stone-400 block">Xavfsizlik</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: External Resource Policy Management */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-[#176B4D]" />
              <span>Ilmiy Manbalar va Siyosatlar Nazorati</span>
            </h3>

            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Platforma o'zboshimchalik bilan internet saytlarini bloklamaydi. Faqat BioLab ichki katalogida tavsiya etiladigan, tekshirilishi kerak bo'lgan yoki universitet siyosatiga ko'ra cheklangan domenlar tasdiqlanadi.
            </p>

            <div className="space-y-2.5">
              {resourcePolicies.map((res, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-mono font-bold text-stone-900 dark:text-white block">{res.domain}</span>
                    <span className="text-[11px] text-stone-500">{res.category}</span>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    res.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {res.status === 'approved' ? 'Tasdiqlangan' : 'Ekspertiza zarur'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Security Audit Logs */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-white flex items-center space-x-2">
              <FileText className="w-5 h-5 text-[#176B4D]" />
              <span>Xavfsizlik va Amallar Jurnali (Audit Log)</span>
            </h3>

            <div className="space-y-3">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 dark:text-white">{log.actor}</span>
                    <span className="text-[10px] font-mono text-stone-400">{log.timestamp.split(' ')[1]}</span>
                  </div>
                  <p className="text-stone-600 dark:text-stone-400 text-[11px]">{log.action}</p>
                  <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 block pt-0.5">
                    Nishon: {log.target}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
