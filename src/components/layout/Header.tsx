import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { Language, UserRole } from '../../types';
import {
  Sparkles,
  BookOpen,
  FlaskConical,
  Gamepad2,
  Box,
  Brain,
  Globe2,
  Camera,
  User,
  Sun,
  Moon,
  Menu,
  X,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

export const Header: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
  const { theme, toggleTheme, currentUser, switchRole, activePage, setActivePage } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t('navHome'), icon: Sparkles },
    { id: 'subjects', label: t('navSubjects'), icon: BookOpen },
    { id: 'labs', label: t('navLabs'), icon: FlaskConical },
    { id: 'games', label: t('navGames'), icon: Gamepad2 },
    { id: 'atlas', label: t('navAtlas'), icon: Box },
    { id: 'quizzes', label: t('navQuizzes'), icon: CheckCircle2 },
    { id: 'library', label: t('navLibrary'), icon: BookOpen },
    { id: 'ai-tutor', label: t('navAITutor'), icon: Brain },
    { id: 'uzbekistan', label: t('navUzbekistan'), icon: Globe2 },
    { id: 'observer', label: t('navObserver'), icon: Camera },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'uz-Latn', label: 'O\'zbek (Lotin)', flag: '🇺🇿' },
    { code: 'uz-Cyrl', label: 'Ўзбек (Кирилл)', flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  const roles: { role: UserRole; titleKey: string; icon: any }[] = [
    { role: 'student', titleKey: 'roleStudent', icon: GraduationCap },
    { role: 'teacher', titleKey: 'roleTeacher', icon: BookOpen },
    { role: 'admin', titleKey: 'roleAdmin', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-200 bg-[#F7FAF8]/95 dark:bg-[#101916]/95 border-emerald-900/10 dark:border-emerald-500/20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div
            onClick={() => setActivePage('home')}
            className="flex items-center space-x-2.5 cursor-pointer group select-none"
          >
            <div className="relative w-11 h-11 rounded-full bg-white dark:bg-[#152721] p-0.5 border border-emerald-500/30 shadow-md shadow-emerald-950/20 group-hover:scale-105 transition-transform duration-200 shrink-0 overflow-hidden flex items-center justify-center">
              <img
                src="/assets/aistudio/5adbc420-0557-4ccc-9f47-ee071f5e7094_137394c9.png"
                alt="BioLab ChDPU Logotipi"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight text-emerald-950 dark:text-emerald-100">
                  Bio<span className="text-[#2D9B75] dark:text-[#62C9A5]">Lab</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  ChDPU
                </span>
              </div>
              <p className="text-[10px] leading-none text-emerald-700/80 dark:text-emerald-400/80 hidden sm:block font-medium">
                Biologiya ta'lim platformasi
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#176B4D] text-white shadow-xs'
                      : 'text-stone-700 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-2">

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangMenuOpen(!langMenuOpen);
                  setRoleMenuOpen(false);
                }}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 transition-colors"
                title="Tilni almashtirish"
              >
                <span>{languages.find(l => l.code === language)?.flag}</span>
                <span className="hidden md:inline">{languages.find(l => l.code === language)?.label.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-xl bg-white dark:bg-[#162420] border border-emerald-100 dark:border-emerald-800/80 py-1.5 z-50">
                  <div className="px-3 py-1 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    Til / Language / Язык
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center space-x-2.5 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 ${
                        language === l.code ? 'font-bold text-[#176B4D] dark:text-[#62C9A5] bg-emerald-50/50 dark:bg-emerald-900/20' : 'text-stone-700 dark:text-stone-200'
                      }`}
                    >
                      <span className="text-base">{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
              title={theme === 'dark' ? 'Yorug\' rejim' : 'Qorong\'u rejim'}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-emerald-900" />}
            </button>

            {/* Role Switcher & Cabinet Portal */}
            <div className="relative">
              <button
                onClick={() => {
                  setRoleMenuOpen(!roleMenuOpen);
                  setLangMenuOpen(false);
                }}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#176B4D] text-white hover:bg-[#104C36] transition-colors shadow-xs"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t(`role${currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}` as any)}</span>
                <ChevronDown className="w-3 h-3 opacity-80" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl shadow-xl bg-white dark:bg-[#162420] border border-emerald-100 dark:border-emerald-800/80 p-2 z-50">
                  <div className="px-3 py-2 border-b border-emerald-100 dark:border-emerald-800/60 mb-1">
                    <p className="text-xs font-bold text-stone-900 dark:text-white truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                      {currentUser.specialty}
                    </span>
                  </div>

                  <div className="px-2 py-1 text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                    Kabinetni tanlash / Rol
                  </div>
                  {roles.map((r) => {
                    const RoleIcon = r.icon;
                    return (
                      <button
                        key={r.role}
                        onClick={() => {
                          switchRole(r.role);
                          setRoleMenuOpen(false);
                          if (r.role === 'student') setActivePage('cabinet');
                          else if (r.role === 'teacher') setActivePage('teacher-cabinet');
                          else if (r.role === 'admin') setActivePage('admin-panel');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between mb-0.5 ${
                          currentUser.role === r.role
                            ? 'bg-emerald-100/70 dark:bg-emerald-900/50 text-[#176B4D] dark:text-[#62C9A5] font-bold'
                            : 'text-stone-700 dark:text-stone-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <RoleIcon className="w-3.5 h-3.5" />
                          <span>{t(r.titleKey as any)}</span>
                        </div>
                        {currentUser.role === r.role && <span className="text-[10px] font-bold text-emerald-600">Faol</span>}
                      </button>
                    );
                  })}

                  <div className="mt-2 pt-2 border-t border-emerald-100 dark:border-emerald-800/60">
                    <button
                      onClick={() => {
                        setActivePage('cabinet');
                        setRoleMenuOpen(false);
                      }}
                      className="w-full text-center py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 transition-colors"
                    >
                      {t('myCabinet')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-emerald-100 dark:border-emerald-900/60 bg-[#F7FAF8] dark:bg-[#101916] px-4 pt-3 pb-6 space-y-1">
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 p-2.5 rounded-lg text-xs font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-[#176B4D] text-white font-semibold'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-emerald-200/50 dark:border-emerald-800/40 flex items-center justify-between">
            <button
              onClick={() => {
                setActivePage('cabinet');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center text-xs font-semibold rounded-lg bg-[#176B4D] text-white mr-2"
            >
              {t('myCabinet')}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-emerald-200 dark:border-emerald-800 text-stone-700 dark:text-stone-200"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
