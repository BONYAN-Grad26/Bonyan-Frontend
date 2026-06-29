"use client";

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'react-hot-toast';
import { Lock } from 'lucide-react';
import { sendOtp } from '@/serverActions/auth';
import { useRouter } from 'next/navigation';

export const OtpForm = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp.trim().length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      await sendOtp(otp.trim());
      toast.success('Verification successful');
      router.refresh();
      router.replace('/onboarding');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to verify OTP');
    } finally {
      setIsSubmitting(false); // تم تصحيح setIsLoading هنا لتغلق حالة التحميل بدقة
      setIsLoading(false);
    }
  };

  // دالة للتأكد من إدخال الأرقام فقط والحد الأقصى 6 أرقام
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, ''); // منع الحروف
    if (val.length <= 6) {
      setOtp(val);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
      {/* حقل إدخال الـ OTP */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/90">Verification Code</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground/70" />
          <Input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="000000"
            disabled={isLoading}
            required
            value={otp}
            onChange={handleOtpChange}
            className="pl-10 h-11 text-center tracking-[0.5em] text-lg font-bold bg-background border-sky-500/10 focus-visible:ring-sky-500/30 focus-visible:border-sky-500/50 transition-all placeholder:tracking-normal placeholder:font-normal placeholder:text-muted-foreground/40"
          />
        </div>
        <p className="text-[11px] text-muted-foreground/60 text-center pt-1">
          Enter the 6-digit code sent to your secure inbox.
        </p>
      </div>

      {/* زر التأكيد */}
      <Button 
        disabled={isLoading || otp.length !== 6} 
        type="submit" 
        className="w-full h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-lg shadow-sky-500/10 transition-all active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
      >
        {isLoading ? 'Verifying...' : 'Verify Code'}
      </Button>

      {/* رابط إعادة الإرسال */}
      <div className="text-center text-sm text-muted-foreground">
        Didn&apos;t receive the code?{' '}
        <button 
          type="button"
          disabled={isLoading}
          onClick={() => toast.success('A new code has been sent!')}
          className="text-sky-400 hover:text-sky-500 font-semibold transition-colors disabled:opacity-40 cursor-pointer"
        >
          Resend
        </button>
      </div>
    </form>
  );
};