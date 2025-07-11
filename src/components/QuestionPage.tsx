
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuestionSidebar from './QuestionSidebar';
import QuestionContent from './QuestionContent';
import AddQuestionModal from './AddQuestionModal';
import { Question } from '@/types';

interface QuestionPageProps {
  isAdmin: boolean;
}

// Mock data - in a real app, this would come from an API
const mockQuestions: Question[] = Array.from({ length: 50 }, (_, i) => ({
  id: `q${i + 1}`,
  questionText: `Sample question ${i + 1} for practice. This is a detailed question that tests your understanding of the subject matter.`,
  explanation: `This is the explanation for question ${i + 1}. It provides detailed reasoning and helps you understand the concept better.`,
  type: 'mcq',
  subjectId: '',
  year: '',
}));

const QuestionPage: React.FC<QuestionPageProps> = ({ isAdmin }) => {
  const { subjectId, year, questionType } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAddQuestion = (question: Omit<Question, 'id'>) => {
    const newQuestion: Question = {
      ...question,
      id: `q${questions.length + 1}`,
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
    if (currentQuestionIndex >= questions.length - 1 && currentQuestionIndex > 0) {
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
      />
    </div>
  );
};

export default QuestionPage;
