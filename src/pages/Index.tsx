import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';

import { HomePage } from '@/components/HomePage/HomePage';

const Index = () => {
  const { user, isLoading } = useAuth();
  const [showVerification, setShowVerification] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading Study Buddy...</p>
        </div>
      </div>
    );
  }

  // Add error boundary for debugging
  if (!user && !isLoading) {
    console.log('No user found, showing login form');
  }

  // If no user, show login form
  if (!user) {
    return <LoginForm onSuccess={() => setShowVerification(true)} />;
  }


  // User is logged in and verified, show main app
  return <HomePage />;
};

export default Index;
