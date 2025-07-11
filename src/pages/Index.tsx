
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import SubjectSelection from '@/components/SubjectSelection';
import YearSelection from '@/components/YearSelection';
import QuestionTypeSelection from '@/components/QuestionTypeSelection';
import QuestionPage from '@/components/QuestionPage';
import { UserRole } from '@/types';

const Index = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header currentRole={currentRole} onRoleChange={setCurrentRole} />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<SubjectSelection isAdmin={currentRole === 'admin'} />} />
          <Route path="/subject/:subjectId" element={<YearSelection isAdmin={currentRole === 'admin'} />} />
          <Route path="/subject/:subjectId/year/:year" element={<QuestionTypeSelection />} />
          <Route path="/subject/:subjectId/year/:year/:questionType" element={<QuestionPage isAdmin={currentRole === 'admin'} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Index;
