
import React, { useState } from 'react';
import { Eye, EyeOff, MessageCircle, Edit2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
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
  const [selectedOption, setSelectedOption] = useState('');
  const [subAnswers, setSubAnswers] = useState<{ [key: string]: string }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mcq': return 'bg-green-100 text-green-800';
      case 'structured': return 'bg-blue-100 text-blue-800';
      case 'essay': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubAnswerChange = (subQuestionId: string, value: string) => {
    setSubAnswers(prev => ({
      ...prev,
      [subQuestionId]: value
    }));
  };

  const renderMCQOptions = () => {
    if (question.type !== 'mcq' || !question.options) return null;

    return (
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700">Choose your answer:</Label>
        <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id} className="cursor-pointer flex-1">
                <span className="font-medium">{option.id}.</span> {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  };

  const renderSubQuestions = () => {
    if (question.type === 'mcq' || !question.subQuestions) return null;

    return (
      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700">Answer all parts:</Label>
        {question.subQuestions.map((subQ) => (
          <div key={subQ.id} className="border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <p className="font-medium text-gray-800">{subQ.questionText}</p>
              {subQ.marks && (
                <Badge variant="outline" className="ml-2">
                  {subQ.marks} marks
                </Badge>
              )}
            </div>
            <Textarea
              value={subAnswers[subQ.id] || ''}
              onChange={(e) => handleSubAnswerChange(subQ.id, e.target.value)}
              placeholder="Write your answer here..."
              className="min-h-20 resize-none"
            />
          </div>
        ))}
      </div>
    );
  };

  const renderAnswer = () => {
    if (!showAnswer) return null;

    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-lg text-green-800 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Correct Answer
          </CardTitle>
        </CardHeader>
        <CardContent>
          {question.type === 'mcq' && question.options && question.answer ? (
            <div>
              <p className="text-green-900 font-medium">
                Option {question.answer}: {question.options.find(opt => opt.id === question.answer)?.text}
              </p>
            </div>
          ) : (
            <p className="text-green-900">
              Model answer will be displayed here for structured/essay questions.
            </p>
          )}
        </CardContent>
      </Card>
    );
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
          
          {/* MCQ Options */}
          {renderMCQOptions()}
          
          {/* Sub Questions for Structured/Essay */}
          {renderSubQuestions()}
          
          {/* General Answer Area for MCQ */}
          {question.type === 'mcq' && (
            <div className="space-y-3">
              <Label className="block text-sm font-medium text-gray-700">
                Working (Optional):
              </Label>
              <Textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Show your working here (optional)..."
                className="min-h-20 resize-none"
              />
            </div>
          )}
          
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => setShowAnswer(!showAnswer)}
              className="flex items-center space-x-2"
            >
              {showAnswer ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span>{showAnswer ? 'Hide' : 'View'} Answer</span>
            </Button>
            
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

      {/* Answer Section */}
      {renderAnswer()}

      {/* Explanation Section */}
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

      {/* AI Chat */}
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
