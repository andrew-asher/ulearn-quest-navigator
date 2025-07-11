
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { Question, QuestionType, MCQOption, SubQuestion } from '@/types';

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (question: Omit<Question, 'id'>) => void;
  questionType: QuestionType;
  subjectId: string;
  year: string;
  nextQuestionNumber: number;
}

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  questionType,
  subjectId,
  year,
  nextQuestionNumber,
}) => {
  const [questionText, setQuestionText] = useState('');
  const [explanation, setExplanation] = useState('');
  const [questionImage, setQuestionImage] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  
  // MCQ specific state
  const [options, setOptions] = useState<MCQOption[]>([
    { id: '1', text: '' },
    { id: '2', text: '' },
    { id: '3', text: '' },
    { id: '4', text: '' },
    { id: '5', text: '' },
  ]);
  
  // Structured/Essay specific state
  const [subQuestions, setSubQuestions] = useState<SubQuestion[]>([
    { id: '1', questionText: '', marks: 2 },
  ]);

  const handleOptionChange = (id: string, text: string) => {
    setOptions(options.map(opt => opt.id === id ? { ...opt, text } : opt));
  };

  const handleSubQuestionChange = (id: string, field: keyof SubQuestion, value: string | number) => {
    setSubQuestions(subQuestions.map(sq => 
      sq.id === id ? { ...sq, [field]: value } : sq
    ));
  };

  const addSubQuestion = () => {
    const newId = (subQuestions.length + 1).toString();
    setSubQuestions([...subQuestions, { id: newId, questionText: '', marks: 2 }]);
  };

  const removeSubQuestion = (id: string) => {
    if (subQuestions.length > 1) {
      setSubQuestions(subQuestions.filter(sq => sq.id !== id));
    }
  };

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
        questionNumber: nextQuestionNumber,
      };

      if (questionType === 'mcq') {
        newQuestion.options = options.filter(opt => opt.text.trim() !== '');
        newQuestion.answer = correctAnswer;
      } else {
        newQuestion.subQuestions = subQuestions.filter(sq => sq.questionText.trim() !== '');
      }

      onAdd(newQuestion);
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setQuestionText('');
    setExplanation('');
    setQuestionImage('');
    setCorrectAnswer('');
    setOptions([
      { id: '1', text: '' },
      { id: '2', text: '' },
      { id: '3', text: '' },
      { id: '4', text: '' },
      { id: '5', text: '' },
    ]);
    setSubQuestions([{ id: '1', questionText: '', marks: 2 }]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Add New {questionType.toUpperCase()} Question #{nextQuestionNumber}
          </DialogTitle>
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

          {/* MCQ Options */}
          {questionType === 'mcq' && (
            <div className="space-y-4">
              <Label>Answer Options</Label>
              {options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Label className="w-8">{option.id}.</Label>
                  <Input
                    value={option.text}
                    onChange={(e) => handleOptionChange(option.id, e.target.value)}
                    placeholder={`Option ${option.id}`}
                    className="flex-1"
                  />
                </div>
              ))}
              
              <div>
                <Label htmlFor="correctAnswer">Correct Answer</Label>
                <Select value={correctAnswer} onValueChange={setCorrectAnswer} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select correct option" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        Option {option.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Sub Questions for Structured/Essay */}
          {(questionType === 'structured' || questionType === 'essay') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Sub Questions</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSubQuestion}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Sub Question
                </Button>
              </div>
              
              {subQuestions.map((subQ, index) => (
                <div key={subQ.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Sub Question {String.fromCharCode(97 + index)}</Label>
                    {subQuestions.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSubQuestion(subQ.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <Textarea
                    value={subQ.questionText}
                    onChange={(e) => handleSubQuestionChange(subQ.id, 'questionText', e.target.value)}
                    placeholder="Enter sub question text..."
                    className="min-h-16"
                  />
                  
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`marks-${subQ.id}`}>Marks:</Label>
                    <Input
                      id={`marks-${subQ.id}`}
                      type="number"
                      value={subQ.marks || ''}
                      onChange={(e) => handleSubQuestionChange(subQ.id, 'marks', parseInt(e.target.value) || 0)}
                      className="w-20"
                      min="1"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          
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
