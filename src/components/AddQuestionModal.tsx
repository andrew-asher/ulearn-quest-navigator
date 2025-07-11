
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Question, QuestionType } from '@/types';

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (question: Omit<Question, 'id'>) => void;
  questionType: QuestionType;
  subjectId: string;
  year: string;
}

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  questionType,
  subjectId,
  year,
}) => {
  const [questionText, setQuestionText] = useState('');
  const [explanation, setExplanation] = useState('');
  const [questionImage, setQuestionImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (questionText && explanation) {
      const newQuestion: Omit<Question, 'id'> = {
        questionText,
        explanation,
        questionImage: questionImage || undefined,
        type: questionType,
        subjectId,
        year,
      };
      onAdd(newQuestion);
      setQuestionText('');
      setExplanation('');
      setQuestionImage('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New {questionType.toUpperCase()} Question</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="questionText">Question Text</Label>
            <Textarea
              id="questionText"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Enter the question text..."
              className="min-h-24"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="questionImage">Question Image URL (Optional)</Label>
            <Input
              id="questionImage"
              value={questionImage}
              onChange={(e) => setQuestionImage(e.target.value)}
              placeholder="Enter image URL if needed"
              type="url"
            />
          </div>
          
          <div>
            <Label htmlFor="explanation">Explanation</Label>
            <Textarea
              id="explanation"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Enter the explanation for this question..."
              className="min-h-24"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Question</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionModal;
