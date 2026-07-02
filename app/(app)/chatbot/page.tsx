import React from 'react';
import Link from 'next/link';
import { UserCheck, ChevronRight } from 'lucide-react';
import AICoachPage from './MainPage';
import { getUserProfile } from '@/serverActions/profile';
import { Button } from '@/components/ui/button';
import { profile } from '@/lib/constants';
export default async function Page() {
  const userProfile = await getUserProfile() || profile;

  if (!userProfile) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white dark:bg-slate-950 px-4">
        <div className="max-w-md w-full text-center space-y-5 p-8 border border-slate-100 dark:border-slate-900 rounded-2xl bg-slate-50/40 dark:bg-slate-900/10 shadow-xs animate-in fade-in zoom-in-95 duration-300">
          
          <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
            <UserCheck className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Profile Setup Required
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              To unlock your personalized Bonyan AI Coach and receive precise nutritional macros, please take a moment to complete your fitness profile.
            </p>
          </div>

          <Button asChild className="w-full h-11 bg-slate-950 hover:bg-slate-900 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-xl font-medium text-sm transition-all shadow-xs cursor-pointer gap-2 group">
            <Link href="/profile">
              Complete Profile
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          
        </div>
      </div>
    );
  }

  return <AICoachPage userProfile={userProfile} />;
}