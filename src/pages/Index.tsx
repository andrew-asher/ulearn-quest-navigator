
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, Users, Award, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import SubjectSelection from '@/components/SubjectSelection';
import YearSelection from '@/components/YearSelection';
import QuestionTypeSelection from '@/components/QuestionTypeSelection';
import QuestionPage from '@/components/QuestionPage';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "Engage with comprehensive question banks across multiple subjects"
    },
    {
      icon: Users,
      title: "Admin Controls",
      description: "Full administrative access to manage questions and content"
    },
    {
      icon: Award,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">
            Welcome to U-Learn
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your comprehensive interactive learning platform for academic excellence
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 px-6 rounded-2xl shadow-lg max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8" />
              <span className="text-2xl font-bold">A Habbs Product</span>
            </div>
            <p className="text-lg opacity-90">
              Presented by <span className="font-semibold text-yellow-300">Edgrow</span>
            </p>
            <p className="text-sm opacity-75 max-w-2xl mx-auto">
              Empowering education through innovative technology and comprehensive learning solutions
            </p>
          </div>
        </div>

        <Button 
          onClick={() => navigate('/subjects')}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
        >
          Start Learning
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Features Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Why Choose U-Learn?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Begin Your Learning Journey?
        </h3>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Choose from our comprehensive collection of subjects and start practicing with our interactive question system.
        </p>
        <Button 
          onClick={() => navigate('/subjects')}
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Explore Subjects
        </Button>
      </div>
    </div>
  );
};

const Index = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header currentRole={currentRole} onRoleChange={setCurrentRole} />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subjects" element={<SubjectSelection isAdmin={currentRole === 'admin'} />} />
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
