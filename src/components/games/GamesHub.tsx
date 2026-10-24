import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { gamesCatalog } from '../../data/gamesData';
import { OrganelleGame } from './OrganelleGame';
import { DominoGame } from './DominoGame';
import { SpeedQuizGame } from './SpeedQuizGame';
import { SequenceGame } from './SequenceGame';
import { WhoAmIGame } from './WhoAmIGame';
import { EcoDetectiveGame } from './EcoDetectiveGame';
import { Gamepad2, ArrowLeft, Trophy, Play, Star, Sparkles } from 'lucide-react';

export const GamesHub: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  const renderActiveGame = () => {
    switch (selectedGameId) {
      case 'game-organelle':
        return <OrganelleGame />;
      case 'game-domino':
        return <DominoGame />;
      case 'game-speed':
        return <SpeedQuizGame />;
      case 'game-sequence':
        return <SequenceGame />;
      case 'game-whoami':
        return <WhoAmIGame />;
      case 'game-detective':
        return <EcoDetectiveGame />;
      default:
        return <OrganelleGame />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {selectedGameId ? (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedGameId(null)}
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#176B4D] dark:text-[#62C9A5] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Barcha 6 ta o\'yinga qaytish</span>
          </button>

          {renderActiveGame()}
        </div>
      ) : (
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-semibold mb-2">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Interaktiv Intellektual O\'yinlar</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              {t('gamesTitle')}
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-3xl leading-relaxed">
              {t('gamesDesc')}
            </p>
          </div>

          {/* User Achievement summary card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 via-[#164332] to-[#123628] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg border border-emerald-500/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold">O\'yin natijalari va rekordlar</h4>
                <p className="text-xs text-emerald-200">
                  Faol o\'yinchi: <strong>{currentUser.name}</strong> • Nishonlar soni: <strong>{currentUser.badges.length} ta</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 font-mono">
                Umumiy ball: {Object.values(currentUser.gameHighScores).reduce((a, b) => a + b, 0)}
              </span>
            </div>
          </div>

          {/* 6 Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gamesCatalog.map((game, idx) => {
              const highScore = currentUser.gameHighScores[game.id] || 0;

              return (
                <div
                  key={game.id}
                  onClick={() => setSelectedGameId(game.id)}
                  className="cursor-pointer group rounded-2xl p-6 bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 hover:border-emerald-500/50 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                        {game.difficulty}
                      </span>
                      <div className="flex items-center space-x-1 text-xs text-stone-500">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                        <span>Nishon: {game.badgeName}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      <span className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-[#176B4D] dark:text-[#62C9A5] flex items-center justify-center font-bold text-xs">
                        #{idx + 1}
                      </span>
                      <h3 className="text-base font-bold text-stone-900 dark:text-white group-hover:text-[#176B4D] dark:group-hover:text-[#62C9A5] transition-colors">
                        {t(game.titleKey as any)}
                      </h3>
                    </div>

                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mt-2">
                      {game.descKey}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 block uppercase font-bold">Rekord ball:</span>
                      <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
                        {highScore} ball
                      </span>
                    </div>

                    <button className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#176B4D] dark:text-[#62C9A5] group-hover:bg-[#176B4D] group-hover:text-white font-bold text-xs transition-colors shadow-xs flex items-center space-x-1">
                      <Play className="w-3 h-3 fill-current" />
                      <span>{t('playGame')}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
