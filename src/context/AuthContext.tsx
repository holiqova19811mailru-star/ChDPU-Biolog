import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, QuizResult, NatureObservation } from '../types';

interface AuthContextType {
  currentUser: UserProfile;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  switchRole: (role: UserRole) => void;
  markTopicCompleted: (topicId: string) => void;
  markLabCompleted: (labId: string) => void;
  saveQuizResult: (result: QuizResult) => void;
  saveGameScore: (gameId: string, score: number) => void;
  addBadge: (badgeName: string) => void;
  observations: NatureObservation[];
  addObservation: (obs: Omit<NatureObservation, 'id' | 'date' | 'status'>) => Promise<boolean>;
  activePage: string;
  setActivePage: (page: string, params?: Record<string, string>) => void;
  pageParams: Record<string, string>;
}

const defaultStudent: UserProfile = {
  id: 'usr-student-1',
  name: 'Moxichexra Xolikova',
  email: 'm.xolikova@cspu.uz',
  role: 'student',
  university: 'Chirchiq davlat pedagogika universiteti',
  specialty: 'Biologiya ta\'lim yo\'nalishi (Bakalavriat)',
  yearOfStudy: 3,
  completedTopics: ['topic-cyto-1', 'topic-bot-1'],
  completedLabs: ['cell-lab', 'photosynthesis-lab'],
  gameHighScores: {
    'game-organelle': 500,
    'game-speed': 420,
    'game-whoami': 300
  },
  quizScores: [
    { quizId: 'quiz-cyto-1', topicId: 'topic-cyto-1', score: 95, total: 100, date: '2026-10-22', timeSpentSeconds: 140 },
    { quizId: 'quiz-bot-1', topicId: 'topic-bot-1', score: 88, total: 100, date: '2026-10-23', timeSpentSeconds: 195 }
  ],
  streakDays: 7,
  badges: ['Hujayra Ustasi', '7 Kunlik Marafon', 'Fotosintez Tajribachisi', 'Tabiat Qalqoni'],
  weeklyTargetMinutes: 240,
  studiedMinutesThisWeek: 185
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('biolab_user');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return defaultStudent;
  });

  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('biolab_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [activePage, setActivePageState] = useState<string>('home');
  const [pageParams, setPageParams] = useState<Record<string, string>>({});
  const [observations, setObservations] = useState<NatureObservation[]>([]);

  // Sync theme to document body
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.body.style.backgroundColor = '#101916';
        document.body.style.color = '#ECF8F3';
      } else {
        document.documentElement.classList.remove('dark');
        document.body.style.backgroundColor = '#F7FAF8';
        document.body.style.color = '#0D1C16';
      }
      localStorage.setItem('biolab_theme', theme);
    }
  }, [theme]);

  // Sync user state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('biolab_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // Load observations from server or fallback
  useEffect(() => {
    fetch('/api/observations')
      .then(res => res.json())
      .then(data => {
        if (data && data.success && Array.isArray(data.data)) {
          setObservations(data.data);
        }
      })
      .catch(() => {
        // Fallback default observations
        setObservations([
          {
            id: 'obs-1',
            speciesName: 'Zarafshon qirg\'ovuli',
            scientificName: 'Phasianus colchicus zerafschanicus',
            category: 'fauna',
            region: 'Zarafshon milliy bog\'i',
            locationDetails: 'To\'qay chakalakzori',
            date: '2026-09-14',
            observerName: 'Farrux Rustamov',
            description: 'To\'qay mevalari bilan oziqlanayotgan erkak qirg\'ovul.',
            habitat: 'To\'qayzor',
            status: 'verified',
            tags: ['endemik', 'to\'qay']
          }
        ]);
      });
  }, []);

  const setTheme = (t: 'light' | 'dark') => setThemeState(t);
  const toggleTheme = () => setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));

  const setActivePage = (page: string, params: Record<string, string> = {}) => {
    setActivePageState(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchRole = (role: UserRole) => {
    setCurrentUser(prev => ({
      ...prev,
      role,
      name: role === 'teacher' ? 'Prof. Dilshod Karimov' : role === 'admin' ? 'Bosh Administrator' : 'Azizbek Rahimov',
      email: role === 'teacher' ? 'd.karimov@nuu.uz' : role === 'admin' ? 'admin@biolab.uz' : 'azizbek.rahimov@nuu.uz',
      specialty: role === 'teacher' ? 'Biologiya kafedrasi professori' : role === 'admin' ? 'Tizim koordinatori' : 'Biologiya (Bakalavriat, 3-kurs)'
    }));
  };

  const markTopicCompleted = (topicId: string) => {
    setCurrentUser(prev => {
      if (prev.completedTopics.includes(topicId)) return prev;
      return {
        ...prev,
        completedTopics: [...prev.completedTopics, topicId],
        studiedMinutesThisWeek: prev.studiedMinutesThisWeek + 20
      };
    });
  };

  const markLabCompleted = (labId: string) => {
    setCurrentUser(prev => {
      if (prev.completedLabs.includes(labId)) return prev;
      return {
        ...prev,
        completedLabs: [...prev.completedLabs, labId],
        studiedMinutesThisWeek: prev.studiedMinutesThisWeek + 30
      };
    });
  };

  const saveQuizResult = (result: QuizResult) => {
    setCurrentUser(prev => ({
      ...prev,
      quizScores: [
        {
          quizId: result.quizId,
          topicId: result.quizId,
          score: result.scorePercentage,
          total: 100,
          date: result.date,
          timeSpentSeconds: result.timeSpentSeconds
        },
        ...prev.quizScores
      ],
      studiedMinutesThisWeek: prev.studiedMinutesThisWeek + Math.ceil(result.timeSpentSeconds / 60)
    }));
  };

  const saveGameScore = (gameId: string, score: number) => {
    setCurrentUser(prev => {
      const currentHigh = prev.gameHighScores[gameId] || 0;
      if (score > currentHigh) {
        return {
          ...prev,
          gameHighScores: {
            ...prev.gameHighScores,
            [gameId]: score
          }
        };
      }
      return prev;
    });
  };

  const addBadge = (badgeName: string) => {
    setCurrentUser(prev => {
      if (prev.badges.includes(badgeName)) return prev;
      return {
        ...prev,
        badges: [...prev.badges, badgeName]
      };
    });
  };

  const addObservation = async (obs: Omit<NatureObservation, 'id' | 'date' | 'status'>): Promise<boolean> => {
    try {
      const res = await fetch('/api/observations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obs)
      });
      const data = await res.json();
      if (data && data.success && data.data) {
        setObservations(prev => [data.data, ...prev]);
        addBadge('Tabiat Tadqiqotchisi');
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    // Client fallback
    const localObs: NatureObservation = {
      ...obs,
      id: `obs-local-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'verified'
    };
    setObservations(prev => [localObs, ...prev]);
    addBadge('Tabiat Tadqiqotchisi');
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        theme,
        setTheme,
        toggleTheme,
        switchRole,
        markTopicCompleted,
        markLabCompleted,
        saveQuizResult,
        saveGameScore,
        addBadge,
        observations,
        addObservation,
        activePage,
        setActivePage,
        pageParams
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
