import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';
import studyBuddyLogo from '@/assets/study-buddy-logo.jpg';

interface HeaderProps {
  onContactClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onContactClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gradient-primary shadow-elegant">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={studyBuddyLogo} 
              alt="Study Buddy Logo" 
              className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
            />
            <h1 className="text-4xl md:text-6xl font-bold text-white italic text-center">
              Study Buddy
            </h1>
          </div>
          
          <nav className="flex flex-wrap items-center gap-4">
            <Button variant="department" size="lg">
              Home
            </Button>
            <Button variant="department" size="lg" onClick={onContactClick}>
              Contact Us
            </Button>
            <Button 
              variant="department" 
              size="lg" 
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </nav>
        </div>
        
        {user && (
          <div className="text-center text-white/90">
            <p className="text-lg">Welcome back, <span className="font-semibold">{user.name}</span>!</p>
          </div>
        )}
      </div>
    </header>
  );
};