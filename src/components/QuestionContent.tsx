
import React, { useState } from 'react';
import { Eye, EyeOff, MessageCircle, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Question } from '@/types';
import AIChat from './AIChat';

interface QuestionContentProps {
  question: Question;
  questionNumber: number;
  isAdmin: boolean;
}

const QuestionContent: React.FC<QuestionContentProps> = ({
  question,
  questionNumber,
  isAdmin,
}) => {
  const [answer, setAnswer] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mcq': return 'bg-green-100 text-green-800';
      case 'structured': return 'bg-blue-100 text-blue-800';
      case 'essay': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CardTitle className="text-xl">Question {questionNumber}</CardTitle>
              <Badge className={getTypeColor(question.type)}>
                {question.type.toUpperCase()}
              </Badge>
            </div>
            {isAdmin && (
              <Button variant="ghost" size="sm">
                <Edit2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="prose max-w-none">
            <p className="text-gray-800 leading-relaxed">
              {question.questionText}
            </p>
            {question.questionImage && (
              <img 
                src={question.questionImage} 
                alt="Question image" 
                className="max-w-full h-auto rounded-lg mt-4"
              />
            )}
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Your Answer:
            </label>
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="min-h-32 resize-none"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => setShowExplanation(!showExplanation)}
              className="flex items-center space-x-2"
            >
              {showExplanation ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span>{showExplanation ? 'Hide' : 'View'} Explanation</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setShowAIChat(!showAIChat)}
              className="flex items-center space-x-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Ask AI</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {showExplanation && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">Explanation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-900 leading-relaxed">
              {question.explanation}
            </p>
          </CardContent>
        </Card>
      )}

      {showAIChat && (
        <AIChat 
          question={question}
          onClose={() => setShowAIChat(false)}
        />
      )}
    </div>
  );
};

export default QuestionContent;
