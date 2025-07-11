
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuestionSidebar from './QuestionSidebar';
import QuestionContent from './QuestionContent';
import AddQuestionModal from './AddQuestionModal';
import { Question, MCQOption, SubQuestion } from '@/types';

interface QuestionPageProps {
  isAdmin: boolean;
}

// Generate mock MCQ options
const generateMCQOptions = (questionNum: number): MCQOption[] => {
  return [
    { id: '1', text: `Option 1 for question ${questionNum}` },
    { id: '2', text: `Option 2 for question ${questionNum}` },
    { id: '3', text: `Option 3 for question ${questionNum}` },
    { id: '4', text: `Option 4 for question ${questionNum}` },
    { id: '5', text: `Option 5 for question ${questionNum}` },
  ];
};

// Generate mock sub-questions for structured/essay
const generateSubQuestions = (questionNum: number): SubQuestion[] => {
  return [
    { id: `${questionNum}-a`, questionText: `(a) Sub-question A for question ${questionNum}`, marks: 2 },
    { id: `${questionNum}-b`, questionText: `(b) Sub-question B for question ${questionNum}`, marks: 3 },
    { id: `${questionNum}-c`, questionText: `(c) Sub-question C for question ${questionNum}`, marks: 5 },
  ];
};

const QuestionPage: React.FC<QuestionPageProps> = ({ isAdmin }) => {
  const { subjectId, year, questionType } = useParams();
  const navigate = useNavigate();
  
  // Generate questions based on type
  const generateQuestions = (): Question[] => {
    const questionCount = questionType === 'mcq' ? 50 : 5;
    
    return Array.from({ length: questionCount }, (_, i) => {
      const questionNum = i + 1;
      const baseQuestion: Question = {
        id: `${questionType}-q${questionNum}`,
        questionText: `${questionType?.toUpperCase()} Question ${questionNum}: This is a sample question for ${subjectId} ${year}. Solve this problem step by step.`,
        explanation: `Detailed explanation for question ${questionNum}. This explains the concept and solution approach.`,
        type: questionType as any,
        subjectId: subjectId!,
        year: year!,
        questionNumber: questionNum,
      };

      if (questionType === 'mcq') {
        return {
          ...baseQuestion,
          options: generateMCQOptions(questionNum),
          answer: '1', // Correct option ID
        };
      } else {
        return {
          ...baseQuestion,
          subQuestions: generateSubQuestions(questionNum),
        };
      }
    });
  };

  const [questions, setQuestions] = useState<Question[]>(generateQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAddQuestion = (question: Omit<Question, 'id'>) => {
    const newQuestion: Question = {
      ...question,
      id: `${questionType}-q${questions.length + 1}`,
      questionNumber: questions.length + 1,
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (questionId: string) => {
    const updatedQuestions = questions.filter(q => q.id !== questionId);
    // Renumber remaining questions
    const renumberedQuestions = updatedQuestions.map((q, index) => ({
      ...q,
      questionNumber: index + 1,
      id: `${questionType}-q${index + 1}`,
    }));
    
    setQuestions(renumberedQuestions);
    
    if (currentQuestionIndex >= renumberedQuestions.length && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-screen flex flex-col">
      <div className="mb-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/subject/${subjectId}/year/${year}`)}
          className="hover:bg-blue-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Question Types
        </Button>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left Sidebar */}
        <div className="w-64 flex-shrink-0">
          <QuestionSidebar
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            onQuestionSelect={setCurrentQuestionIndex}
            isAdmin={isAdmin}
            onAddQuestion={() => setShowAddModal(true)}
            onDeleteQuestion={handleDeleteQuestion}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {currentQuestion ? (
            <QuestionContent
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              isAdmin={isAdmin}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500">No questions available</p>
              {isAdmin && (
                <Button 
                  onClick={() => setShowAddModal(true)}
                  className="mt-4"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Question
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <AddQuestionModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddQuestion}
        questionType={questionType as any}
        subjectId={subjectId!}
        year={year!}
        nextQuestionNumber={questions.length + 1}
      />
    </div>
  );
};

export default QuestionPage;
