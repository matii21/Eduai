export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  learning_style: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  accessibility_needs: string[];
  created_at: string;
}

export interface StudyMaterial {
  id: string;
  user_id: string;
  title: string;
  content: string;
  type: 'text' | 'pdf' | 'audio' | 'image';
  file_url?: string;
  created_at: string;
}

export interface Flashcard {
  id: string;
  material_id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  next_review: string;
  review_count: number;
  success_rate: number;
}

export interface Quiz {
  id: string;
  material_id: string;
  title: string;
  questions: QuizQuestion[];
  time_limit?: number;
  anti_cheat_enabled: boolean;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
}

export interface Tutor {
  id: string;
  user_id: string;
  subjects: string[];
  hourly_rate: number;
  rating: number;
  total_sessions: number;
  bio: string;
  verified: boolean;
  stripe_account_id?: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  title: string;
  description: string;
  blockchain_hash: string;
  issued_at: string;
  nft_token_id?: string;
}

export interface LearningSession {
  id: string;
  user_id: string;
  material_id?: string;
  tutor_id?: string;
  duration: number;
  score?: number;
  integrity_score: number;
  completed_at: string;
}