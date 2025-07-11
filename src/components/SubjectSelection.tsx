
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calculator, Atom, Zap, Flask } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Subject } from '@/types';
import AddSubjectModal from './AddSubjectModal';

interface SubjectSelectionProps {
  isAdmin: boolean;
}

// Icon mapping for subjects
const iconMap = {
  Calculator,
  Atom,
  Zap,
  Flask,
};

// Updated subjects list with softer, more elegant colors
const defaultSubjects: Subject[] = [
  { id: 'maths', name: 'Mathematics', icon: 'Calculator', color: 'bg-gradient-to-br from-blue-100 to-blue-200' },
  { id: 'biology', name: 'Biology', icon: 'Atom', color: 'bg-gradient-to-br from-emerald-100 to-emerald-200' },
  { id: 'physics', name: 'Physics', icon: 'Zap', color: 'bg-gradient-to-br from-purple-100 to-purple-200' },
  { id: 'chemistry', name: 'Chemistry', icon: 'Flask', color: 'bg-gradient-to-br from-orange-100 to-orange-200' },
];

const SubjectSelection: React.FC<SubjectSelectionProps> = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>(defaultSubjects);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSubjectClick = (subjectId: string) => {
    navigate(`/subject/${subjectId}`);
  };

  const handleAddSubject = (subject: Subject) => {
    setSubjects([...subjects, subject]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-light text-slate-800 tracking-wide">
            Choose Your Subject
          </h1>
          <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
            Select a subject to begin your learning journey with our comprehensive question bank
          </p>
          
          {isAdmin && (
            <div className="pt-4">
              <Button 
                onClick={() => setShowAddModal(true)}
                className="bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all duration-200"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Subject
              </Button>
            </div>
          )}
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
          {subjects.map((subject) => {
            const IconComponent = iconMap[subject.icon as keyof typeof iconMap] || Calculator;
            
            return (
              <Card
                key={subject.id}
                className="group cursor-pointer border-0 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/70 backdrop-blur-sm"
                onClick={() => handleSubjectClick(subject.id)}
              >
                <CardHeader className={`${subject.color} rounded-t-lg p-8 text-center transition-all duration-300 group-hover:scale-105`}>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <IconComponent className="h-8 w-8 text-slate-700" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-medium text-slate-800 tracking-wide">
                    {subject.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-6 text-center">
                  <p className="text-slate-600 text-sm font-light leading-relaxed">
                    Explore comprehensive questions and enhance your understanding
                  </p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full"></div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center pt-12">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>

      <AddSubjectModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddSubject}
      />
    </div>
  );
};

export default SubjectSelection;
