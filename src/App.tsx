/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LanguageProvider } from './locales';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { DailyFactSection } from './components/home/DailyFactSection';
import { QuestionOfTheDay } from './components/home/QuestionOfTheDay';
import { FeaturedLabsSection } from './components/home/FeaturedLabsSection';
import { UzbekistanNatureBanner } from './components/home/UzbekistanNatureBanner';
import { SubjectCatalog } from './components/subjects/SubjectCatalog';
import { VirtualLabsHub } from './components/labs/VirtualLabsHub';
import { GamesHub } from './components/games/GamesHub';
import { BiologicalAtlas } from './components/atlas/BiologicalAtlas';
import { QuizSystem } from './components/quizzes/QuizSystem';
import { DigitalLibrary } from './components/library/DigitalLibrary';
import { AITutor } from './components/ai/AITutor';
import { UzbekistanBiodiversity } from './components/nature/UzbekistanBiodiversity';
import { NatureObserver } from './components/nature/NatureObserver';
import { StudentCabinet } from './components/dashboard/StudentCabinet';
import { TeacherCabinet } from './components/dashboard/TeacherCabinet';
import { AdminPanel } from './components/dashboard/AdminPanel';

const MainContent: React.FC = () => {
  const { activePage } = useAuth();

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <div>
            <HeroSection />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 my-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <DailyFactSection />
                <QuestionOfTheDay />
              </div>
              <FeaturedLabsSection />
              <UzbekistanNatureBanner />
            </div>
          </div>
        );
      case 'subjects':
        return <SubjectCatalog />;
      case 'labs':
        return <VirtualLabsHub />;
      case 'games':
        return <GamesHub />;
      case 'atlas':
        return <BiologicalAtlas />;
      case 'quizzes':
        return <QuizSystem />;
      case 'library':
        return <DigitalLibrary />;
      case 'ai-tutor':
        return <AITutor />;
      case 'uzbekistan':
        return <UzbekistanBiodiversity />;
      case 'observer':
        return <NatureObserver />;
      case 'cabinet':
        return <StudentCabinet />;
      case 'teacher-cabinet':
        return <TeacherCabinet />;
      case 'admin-panel':
        return <AdminPanel />;
      default:
        return (
          <div className="max-w-md mx-auto my-24 p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold">Sahifa topilmadi (404)</h2>
            <p className="text-xs text-stone-500">So'ralgan bo'lim mavjud emas yoki ko'chirilgan.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] dark:bg-[#101916] text-[#0D1C16] dark:text-[#ECF8F3] transition-colors duration-200">
      <Header />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
