
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface YearSelectionProps {
  isAdmin: boolean;
}

const YearSelection: React.FC<YearSelectionProps> = ({ isAdmin }) => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [years, setYears] = useState(['2021', '2022', '2023', '2024']);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newYear, setNewYear] = useState('');

  const handleYearClick = (year: string) => {
    navigate(`/subject/${subjectId}/year/${year}`);
  };

  const handleAddYear = () => {
    if (newYear && !years.includes(newYear)) {
      setYears([...years, newYear].sort().reverse());
      setNewYear('');
      setShowAddModal(false);
    }
  };

  const handleDeleteYear = (year: string) => {
    setYears(years.filter(y => y !== year));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-4 hover:bg-blue-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Subjects
        </Button>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
            {subjectId} - Select Year
          </h2>
          <p className="text-gray-600">Choose the year you want to practice</p>
        </div>
      </div>

      {isAdmin && (
        <div className="mb-6 flex justify-end">
          <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Year
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {years.map((year) => (
          <Card 
            key={year}
            className="group hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 relative"
            onClick={() => !isAdmin && handleYearClick(year)}
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
                    handleDeleteYear(year);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                {year}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="text-center">
              {!isAdmin && (
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => handleYearClick(year)}
                >
                  Select {year}
                </Button>
              )}
              {isAdmin && (
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={() => handleYearClick(year)}
                >
                  Manage Questions
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Year</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Input
              value={newYear}
              onChange={(e) => setNewYear(e.target.value)}
              placeholder="Enter year (e.g., 2025)"
              type="number"
            />
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddYear}>Add Year</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default YearSelection;
