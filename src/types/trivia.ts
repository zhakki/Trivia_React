export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'multiple' | 'boolean';

export interface TriviaCategory {
  id: number;
  name: string;
}

export interface TriviaApiQuestion {
  category: string;
  type: QuestionType;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizQuestion {
  id: string;
  category: string;
  type: QuestionType;
  difficulty: Difficulty;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  options: string[];
}

export interface QuizSettings {
  playerName: string;
  categoryId: number | null;
  categoryName: string;
  difficulty: Difficulty | '';
  amount: number;
  timePerQuestion: number;
}

export interface QuizAnswer {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface QuizResultRecord {
  id?: number;
  playerName: string;
  score: number;
  percentage: number;
  finishedAt: string;
  durationSeconds: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  category: string;
  difficulty: string;
  answersJson: string;
}