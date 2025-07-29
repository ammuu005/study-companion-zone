import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import studyBuddyLogo from '@/assets/study-buddy-logo.jpg';

interface OTPVerificationProps {
  email: string;
  onBack: () => void;
  onSuccess: () => void;
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({
  email,
  onBack,
  onSuccess
}) => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { verifyOTP, resendOTP } = useAuth();
  const { toast } = useToast();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the complete 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    try {
      const result = await verifyOTP(email, otp);
      if (result.error) {
        toast({
          title: "Verification Failed",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account Verified!",
          description: "Your account has been successfully verified",
        });
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const result = await resendOTP(email);
      if (result.error) {
        toast({
          title: "Resend Failed",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Code Resent!",
          description: "A new verification code has been sent to your email",
        });
        setOtp('');
      }
    } catch (error) {
      toast({
        title: "Resend Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-auth p-4">
      <Card className="w-full max-w-md shadow-elegant border-border/50 bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img
              src={studyBuddyLogo}
              alt="Study Buddy Logo"
              className="h-16 w-16 rounded-full object-cover shadow-md"
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Verify Your Email
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Enter the 6-digit verification code sent to {email}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
                disabled={isVerifying}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              onClick={handleVerify}
              disabled={isVerifying || otp.length !== 6}
              className="w-full"
            >
              {isVerifying ? "Verifying..." : "Verify Email"}
            </Button>

            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                onClick={handleResend}
                disabled={isResending}
                className="w-full"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isResending ? 'animate-spin' : ''}`} />
                {isResending ? "Resending..." : "Resend Code"}
              </Button>

              <Button
                variant="ghost"
                onClick={onBack}
                disabled={isVerifying || isResending}
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign Up
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};