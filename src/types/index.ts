
export type UserRole = 'student' | 'admin';

export type QuestionType = 'mcq' | 'structured' | 'essay';

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Question {
  id: string;
  questionText: string;
  questionImage?: string;
  explanation: string;
  type: QuestionType;
  subjectId: string;
  year: string;
}

export interface Answer {
  questionId: string;
  answer: string;
}
