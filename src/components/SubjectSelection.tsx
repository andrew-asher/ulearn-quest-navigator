
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Calculator, Atom, Globe, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Subject } from '@/types';
import AddSubjectModal from './AddSubjectModal';

const defaultSubjects: Subject[] = [
  { id: 'maths', name: 'Mathematics', icon: 'Calculator', color: 'bg-blue-500' },
  { id: 'science', name: 'Science', icon: 'Atom', color: 'bg-green-500' },
  { id: 'geography', name: 'Geography', icon: 'Globe', color: 'bg-orange-500' },
  { id: 'english', name: 'English', icon: 'BookOpen', color: 'bg-purple-500' },
];

const iconMap = {
  Calculator,
  Atom,
  Globe,
  BookOpen,
};

interface SubjectSelectionProps {
  isAdmin: boolean;
}

const SubjectSelection: React.FC<SubjectSelectionProps> = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>(defaultSubjects);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSubjectClick = (subjectId: string) => {
    navigate(`/subject/${subjectId}`);
  };

  const handleDeleteSubject = (subjectId: string) => {
    setSubjects(subjects.filter(s => s.id !== subjectId));
  };

  const handleAddSubject = (subject: Subject) => {
    setSubjects([...subjects, subject]);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Subject</h2>
        <p className="text-gray-600">Select a subject to start your learning journey</p>
      </div>

      {isAdmin && (
        <div className="mb-6 flex justify-end">
          <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Subject
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subjects.map((subject) => {
          const IconComponent = iconMap[subject.icon as keyof typeof iconMap];
          
          return (
            <Card 
              key={subject.id} 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 relative"
              onClick={() => !isAdmin && handleSubjectClick(subject.id)}
            >
              {isAdmin && (
                <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 hover:bg-blue-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle edit
                    }}
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 hover:bg-red-100 text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSubject(subject.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`${subject.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {subject.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="text-center">
                {!isAdmin && (
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    onClick={() => handleSubjectClick(subject.id)}
                  >
                    Start Learning
                  </Button>
                )}
                {isAdmin && (
                  <Button 
                    className="w-full"
                    variant="outline"
                    onClick={() => handleSubjectClick(subject.id)}
                  >
                    Manage Content
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
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
