export type Language = 'uz-Latn' | 'uz-Cyrl' | 'ru' | 'en';
export type Theme = 'light' | 'dark';

export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  university: string;
  specialty: string;
  yearOfStudy: number;
  completedTopics: string[];
  completedLabs: string[];
  gameHighScores: Record<string, number>;
  quizScores: Array<{
    quizId: string;
    topicId: string;
    score: number;
    total: number;
    date: string;
    timeSpentSeconds: number;
  }>;
  streakDays: number;
  badges: string[];
  weeklyTargetMinutes: number;
  studiedMinutesThisWeek: number;
}

export interface Subject {
  id: string;
  slug: string;
  titleKey: string;
  descriptionKey: string;
  iconName: string;
  color: string;
  topicsCount: number;
  category: 'fundamental' | 'applied' | 'ecological' | 'molecular';
  topics: Topic[];
}

export interface Topic {
  id: string;
  subjectId: string;
  title: string;
  objective: string;
  expectedOutcomes: string[];
  keyTerms: Array<{ term: string; definition: string }>;
  shortLecture: string;
  detailedContent: string;
  diagramDescription?: string;
  diagramType?: 'cell' | 'photosynthesis' | 'dna' | 'cycle' | 'mitosis' | 'heart' | 'plant';
  realLifeExample: string;
  uzbekistanContext: string;
  interactiveExercise: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  quiz: QuizQuestion[];
  independentWork: string;
  references: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'matching' | 'sequence';
  options: string[];
  correctAnswers: number[]; // indices of correct answers
  matchingPairs?: Array<{ left: string; right: string }>;
  sequenceOrder?: number[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizResult {
  quizId: string;
  topicTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  passed: boolean;
  date: string;
  breakdown: Array<{
    question: string;
    userAnswer: any;
    isCorrect: boolean;
    explanation: string;
  }>;
}

export interface LibraryResource {
  id: string;
  title: string;
  authors: string;
  year: number;
  type: 'textbook' | 'manual' | 'article' | 'presentation' | 'dictionary';
  subjectId: string;
  language: 'uz' | 'ru' | 'en';
  publisher: string;
  sourceUrl?: string;
  openAccess: boolean;
  pages: number;
  description: string;
  downloadUrl?: string;
}

export interface NatureObservation {
  id: string;
  speciesName: string;
  scientificName: string;
  category: 'flora' | 'fauna' | 'fungi' | 'microorganism';
  region: string;
  locationDetails: string;
  date: string;
  observerName: string;
  description: string;
  habitat: string;
  image?: string;
  status: 'verified' | 'pending' | 'review_needed';
  tags: string[];
}

export interface AtlasModel {
  id: string;
  name: string;
  scientificName: string;
  category: 'cellular' | 'molecular' | 'organ' | 'botanical';
  description: string;
  parts: Array<{
    id: string;
    name: string;
    latinName?: string;
    functionDesc: string;
    color: string;
    x: number;
    y: number;
    z?: number;
  }>;
}
