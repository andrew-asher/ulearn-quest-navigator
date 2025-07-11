
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/types';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const Header: React.FC<HeaderProps> = ({ currentRole, onRoleChange }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-blue-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">U-Learn</h1>
              <p className="text-sm text-gray-600">Interactive Learning Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge 
              variant={currentRole === 'student' ? 'default' : 'secondary'}
              className="capitalize"
            >
              {currentRole === 'student' ? <User className="h-3 w-3 mr-1" /> : <Settings className="h-3 w-3 mr-1" />}
              {currentRole}
            </Badge>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRoleChange(currentRole === 'student' ? 'admin' : 'student')}
              className="hover:bg-blue-50"
            >
              Switch to {currentRole === 'student' ? 'Admin' : 'Student'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
