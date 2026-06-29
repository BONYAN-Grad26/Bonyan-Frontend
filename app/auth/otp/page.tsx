import { OtpForm } from '@/components/auth/otp-form';
import React from 'react';

export const metadata = {
  title: 'Verify Email - Bonyan',
  description: 'Verify your secure account with Bonyan health platform',
};

export default function OtpPage() {
  return (
    <>
      {/* رأس صفحة التحقق مع تنسيق الخطوط والمحاذاة المينيماليست */}
      <div className="text-center mb-8 space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Verify Your Email
        </h1>
        <p className="text-sm text-muted-foreground/90">
          Enter the code sent to your email
        </p>
      </div>
      
      {/* فورم إدخال الرمز المتباعد والأنيق */}
      <OtpForm />
    </>
  );
}