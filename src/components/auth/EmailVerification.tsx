import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

interface EmailVerificationProps {
  onSuccess: () => void;
}

export const EmailVerification: React.FC<EmailVerificationProps> = ({ onSuccess }) => {
  const [code, setCode] = useState('');
  const { user, verifyEmail } = useAuth();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code) {
      toast({
        title: "Error",
        description: "Please enter the verification code",
        variant: "destructive"
      });
      return;
    }

    const success = verifyEmail(code);
    if (success) {
      toast({
        title: "Email Verified!",
        description: "Welcome to Study Buddy! You can now access all features.",
      });
      onSuccess();
    } else {
      toast({
        title: "Invalid Code",
        description: "Please check your verification code and try again. Use '1234' for demo.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-auth p-4">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-10 h-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a verification code to <strong>{user?.email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter 6-digit code (use 1234 for demo)"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
            </div>
            
            <Button 
              type="submit" 
              variant="auth" 
              className="w-full"
            >
              Verify Email
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Didn't receive the code? 
                <button 
                  type="button"
                  className="text-primary hover:underline ml-1"
                >
                  Resend
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};