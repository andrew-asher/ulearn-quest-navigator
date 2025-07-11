
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, FileText, PenTool, Calculator, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const defaultQuestionTypes = [
  {
    id: 'mcq',
    name: 'Multiple Choice Questions',
    description: 'Quick assessment with multiple options',
    icon: CheckCircle,
    color: 'bg-green-500',
    badge: 'MCQ'
  },
  {
    id: 'structured',
    name: 'Structured Questions',
    description: 'Detailed questions with structured answers',
    icon: FileText,
    color: 'bg-blue-500',
    badge: 'Structured'
  },
  {
    id: 'essay',
    name: 'Essay Questions',
    description: 'Long-form comprehensive answers',
    icon: PenTool,
    color: 'bg-purple-500',
    badge: 'Essay'
  }
];

const mathsQuestionTypes = [
  {
    id: 'combined',
    name: 'Combined Maths',
    description: 'Pure mathematics and applied mathematics',
    icon: Calculator,
    color: 'bg-blue-600',
    badge: 'Combined'
  },
  {
    id: 'applied',
    name: 'Applied Maths',
    description: 'Statistics, mechanics and other applications',
    icon: BookOpen,
    color: 'bg-green-600',
    badge: 'Applied'
  }
];

const QuestionTypeSelection: React.FC = () => {
  const { subjectId, year } = useParams();
  const navigate = useNavigate();

  // Use different question types based on subject
  const questionTypes = subjectId === 'maths' ? mathsQuestionTypes : defaultQuestionTypes;

  const handleTypeClick = (type: string) => {
    navigate(`/subject/${subjectId}/year/${year}/${type}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/subject/${subjectId}`)}
          className="mb-4 hover:bg-blue-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Years
        </Button>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
            {subjectId} {year} - {subjectId === 'maths' ? 'Mathematics Types' : 'Question Types'}
          </h2>
          <p className="text-gray-600">
            {subjectId === 'maths' 
              ? 'Choose the type of mathematics you want to practice'
              : 'Choose the type of questions you want to practice'
            }
          </p>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${questionTypes.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
        {questionTypes.map((type) => {
          const IconComponent = type.icon;
          
          return (
            <Card 
              key={type.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => handleTypeClick(type.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-3">
                  <Badge variant="secondary" className="mb-2">
                    {type.badge}
                  </Badge>
                </div>
                <div className={`${type.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {type.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4 text-sm">
                  {type.description}
                </p>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Start Practice
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionTypeSelection;
