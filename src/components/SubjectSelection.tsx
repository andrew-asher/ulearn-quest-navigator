
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Subject } from '@/types';
import AddSubjectModal from './AddSubjectModal';

interface SubjectSelectionProps {
  isAdmin: boolean;
}

// Updated subjects list
const defaultSubjects: Subject[] = [
  { id: 'maths', name: 'Maths', icon: 'Calculator', color: 'bg-blue-500' },
  { id: 'biology', name: 'Biology', icon: 'Atom', color: 'bg-green-500' },
  { id: 'physics', name: 'Physics', icon: 'Zap', color: 'bg-purple-500' },
  { id: 'chemistry', name: 'Chemistry', icon: 'Flask', color: 'bg-orange-500' },
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-900">Select Subject</h1>
        {isAdmin && (
          <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Subject
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjects.map((subject) => (
          <Card
            key={subject.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleSubjectClick(subject.id)}
          >
            <CardHeader className={`${subject.color} text-white`}>
              <CardTitle className="flex items-center justify-center">
                <span className="text-2xl font-bold">{subject.name.charAt(0)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-center">{subject.name}</h3>
            </CardContent>
          </Card>
        ))}
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
