
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Question } from '@/types';

interface QuestionSidebarProps {
  questions: Question[];
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
  isAdmin: boolean;
  onAddQuestion: () => void;
  onDeleteQuestion: (questionId: string) => void;
}

const QuestionSidebar: React.FC<QuestionSidebarProps> = ({
  questions,
  currentQuestionIndex,
  onQuestionSelect,
  isAdmin,
  onAddQuestion,
  onDeleteQuestion,
}) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Questions</CardTitle>
          {isAdmin && (
            <Button
              size="sm"
              onClick={onAddQuestion}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto px-4 pb-4">
          <div className="grid grid-cols-5 gap-2">
            {questions.map((question, index) => (
              <div key={question.id} className="relative group">
                <Button
                  variant={index === currentQuestionIndex ? "default" : "outline"}
                  size="sm"
                  className="w-full h-10 text-xs"
                  onClick={() => onQuestionSelect(index)}
                >
                  Q{index + 1}
                </Button>
                
                {isAdmin && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-red-100 hover:bg-red-200 text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteQuestion(question.id);
                    }}
                  >
                    <Trash2 className="h-2 w-2" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionSidebar;
