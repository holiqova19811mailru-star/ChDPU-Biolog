import React from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { FlaskConical, ArrowRight, Sparkles, Dna, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const { setActivePage } = useAuth();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-emerald-900/10 dark:border-emerald-800/30">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/50 via-emerald-50/20 to-transparent dark:from-emerald-950/30 dark:via-transparent dark:to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700/60 text-emerald-900 dark:text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              <span>Universitet Biologiya Ta\'limi Platformasi</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-[1.15]">
              {t('heroTitle').split(' ')[0]} <span className="text-[#176B4D] dark:text-[#62C9A5] underline decoration-emerald-400/40 decoration-wavy underline-offset-8">{t('heroTitle').split(' ').slice(1).join(' ')}</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
              {t('heroSubtitle')} Nazariyani interaktiv 8 ta virtual laboratoriya, mikroskop simulyatori, 6 ta o\'yin va boy O\'zbekiston biologiyasi bilan birlashtiring.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setActivePage('subjects')}
                className="px-6 py-3 rounded-xl bg-[#176B4D] hover:bg-[#104C36] text-white font-bold text-sm flex items-center space-x-2 transition-all shadow-md shadow-emerald-950/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{t('heroStartBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActivePage('labs')}
                className="px-6 py-3 rounded-xl bg-white dark:bg-[#162420] text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 font-bold text-sm flex items-center space-x-2 transition-all shadow-xs"
              >
                <FlaskConical className="w-4 h-4 text-[#2D9B75] dark:text-[#62C9A5]" />
                <span>{t('heroLabBtn')}</span>
              </button>
            </div>

            {/* Key Value Highlights */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/70 dark:bg-[#162420]/70 border border-emerald-900/10 dark:border-emerald-800/40 shadow-xs">
                <div className="font-extrabold text-base text-[#176B4D] dark:text-[#62C9A5]">8 ta</div>
                <div className="text-stone-500 dark:text-stone-400">Virtual Laboratoriya</div>
              </div>
              <div className="p-3 rounded-xl bg-white/70 dark:bg-[#162420]/70 border border-emerald-900/10 dark:border-emerald-800/40 shadow-xs">
                <div className="font-extrabold text-base text-[#176B4D] dark:text-[#62C9A5]">6 ta</div>
                <div className="text-stone-500 dark:text-stone-400">Biologik O\'yin</div>
              </div>
              <div className="p-3 rounded-xl bg-white/70 dark:bg-[#162420]/70 border border-emerald-900/10 dark:border-emerald-800/40 shadow-xs">
                <div className="font-extrabold text-base text-[#176B4D] dark:text-[#62C9A5]">3D</div>
                <div className="text-stone-500 dark:text-stone-400">Interaktiv Atlas</div>
              </div>
              <div className="p-3 rounded-xl bg-white/70 dark:bg-[#162420]/70 border border-emerald-900/10 dark:border-emerald-800/40 shadow-xs">
                <div className="font-extrabold text-base text-[#176B4D] dark:text-[#62C9A5]">4 Tilda</div>
                <div className="text-stone-500 dark:text-stone-400">To\'liq Mahalliylashgan</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Biological Hero Banner */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-emerald-900 via-[#102B20] to-[#0A1813] p-6 shadow-2xl border border-emerald-500/30 overflow-hidden flex flex-col justify-between text-white">
              
              {/* Dynamic SVG Biological Cell & DNA artwork */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                  <circle cx="200" cy="200" r="160" stroke="#62C9A5" strokeWidth="2" strokeDasharray="6 6" />
                  <circle cx="200" cy="200" r="110" stroke="#2D9B75" strokeWidth="3" />
                  <ellipse cx="200" cy="200" rx="60" ry="45" fill="#176B4D" opacity="0.6" />
                  <path d="M50 150 Q 150 100, 200 200 T 350 250" stroke="#62C9A5" strokeWidth="3" fill="none" />
                  <path d="M50 250 Q 150 300, 200 200 T 350 150" stroke="#2D9B75" strokeWidth="3" fill="none" />
                </svg>
              </div>

              {/* Top Card Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-2 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-500/30 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-emerald-300">VIRTUAL SIMULATION</span>
                </div>
                <div className="text-xs bg-white/10 px-2.5 py-1 rounded-md text-emerald-200">
                  3D Interaktiv
                </div>
              </div>

              {/* Center Organelle Visuals */}
              <div className="relative z-10 my-auto text-center space-y-3">
                <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-emerald-600/40 to-teal-500/20 backdrop-blur-md border border-emerald-400/40 shadow-inner">
                  <Dna className="w-14 h-14 text-emerald-300 mx-auto animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-emerald-100">Hujayra & Molekulyar Dinamika</h3>
                  <p className="text-xs text-emerald-300/80">Reallikka mos biofizik hisob-kitoblar</p>
                </div>
              </div>

              {/* Bottom Quick Feature Tag */}
              <div className="relative z-10 bg-emerald-950/90 rounded-2xl p-3 border border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-700/60 flex items-center justify-center text-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Fotosintez & Oksidlanish</p>
                    <p className="text-[10px] text-emerald-400">Jonli parametrlar boshqaruvi</p>
                  </div>
                </div>
                <button
                  onClick={() => setActivePage('labs')}
                  className="text-xs px-2.5 py-1 rounded-md bg-emerald-500 text-stone-950 font-bold hover:bg-emerald-400 transition-colors"
                >
                  Ochish
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
