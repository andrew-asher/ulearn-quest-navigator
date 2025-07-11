
export type UserRole = 'student' | 'admin';

export type QuestionType = 'mcq' | 'structured' | 'essay';

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface MCQOption {
  id: string;
  text: string;
}

export interface SubQuestion {
  id: string;
  questionText: string;
  marks?: number;
}

export interface Question {
  id: string;
  questionText: string;
  questionImage?: string;
  explanation: string;
  answer?: string; // For MCQ, this will be the correct option ID
  type: QuestionType;
  subjectId: string;
  year: string;
  questionNumber: number;
  // MCQ specific
  options?: MCQOption[];
  // Structured/Essay specific
  subQuestions?: SubQuestion[];
}

export interface Answer {
  questionId: string;
  answer: string;
  selectedOption?: string; // For MCQ
  subAnswers?: { [subQuestionId: string]: string }; // For structured/essay
}
