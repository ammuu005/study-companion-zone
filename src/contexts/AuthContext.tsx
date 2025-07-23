import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  name: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  verifyEmail: (code: string) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [verificationCode] = useState('1234'); // Mock verification code

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('studyBuddyUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock login - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      email,
      name,
      isVerified: false
    };
    
    setUser(newUser);
    localStorage.setItem('studyBuddyUser', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const verifyEmail = (code: string): boolean => {
    if (code === verificationCode && user) {
      const verifiedUser = { ...user, isVerified: true };
      setUser(verifiedUser);
      localStorage.setItem('studyBuddyUser', JSON.stringify(verifiedUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('studyBuddyUser');
  };

  const value = {
    user,
    login,
    logout,
    verifyEmail,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};