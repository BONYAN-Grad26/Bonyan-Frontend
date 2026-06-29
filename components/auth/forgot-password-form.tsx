'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="space-y-6 text-center animate-in fade-in duration-300">
        {/* Success Icon Container - طابع صحي ناعم */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-sky-500/10 text-sky-500 border border-sky-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-2">Check Your Email</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            We&apos;ve sent a password reset link to <span className="font-semibold text-slate-800 dark:text-slate-200">{email}</span>. Click the link in the email to reset your password.
          </p>
        </div>

        {/* Tip Container - معتمد على طابع الـ Sky الخفيف */}
        <div className="bg-sky-500/5 border border-sky-500/10 rounded-xl p-4">
          <p className="text-xs text-sky-600 dark:text-sky-400 font-medium leading-relaxed">
            <strong>Tip:</strong> The link will expire in 24 hours. If you don&apos;t receive the email, check your spam folder.
          </p>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => {
            setSubmitted(false);
            setEmail('');
          }}
          variant="outline"
          className="w-full h-11 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-all rounded-xl text-sm font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Try another email
        </Button>
        
        <div className="block pt-2">
          <Link href="/auth/login" className="text-sky-500 hover:text-sky-600 font-semibold text-sm transition-colors">
            Return to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-300">
      {/* Email Field */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <Input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-11 rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-sky-500/20"
            required
          />
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
          Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      {/* Submit Button - Forced to Sky Blue Identity Tag */}
      <Button 
        type="submit" 
        className="w-full h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-all shadow-xs shadow-sky-500/10 cursor-pointer mt-2"
      >
        Send Reset Link
      </Button>

      {/* Back to Login Link */}
      <div className="flex justify-center pt-2">
        <Link
          href="/auth/login"
          className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium text-sm transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Login
        </Link>
      </div>
    </form>
  );
}