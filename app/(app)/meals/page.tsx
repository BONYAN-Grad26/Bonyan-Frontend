import { ApiMealPlanResponse } from '@/lib/interfaces';
import MealsPage from './MainMeals';
import { getWeeklyPlans } from '@/serverActions/meals';
import Link from 'next/link';
import { UtensilsCrossed } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Weekly Diet Plan - Bonyan',
  description: 'View and manage your tailored weekly nutrition and meal schedule.',
};

const WeeklyMealsPage = async () => {
  const apiData = await getWeeklyPlans();

  // حالة عدم وجود خطة أسبوعية مسبقة - تصميم فائق النقاء والمينيماليست
  if (!apiData || !apiData.length) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col justify-center items-center gap-6 p-6">
        {/* حاوية الأيقونة مع إضاءة وحركة نبضية رقيقة جداً بديلة للإيموجي */}
        <div className="relative p-5 bg-sky-500/5 rounded-2xl border border-sky-500/10 shadow-sm text-sky-500">
          <UtensilsCrossed size={32} className="animate-pulse" />
          <div className="absolute -inset-1 bg-sky-500/5 blur-lg rounded-full pointer-events-none" />
        </div>
        
        <div className="text-center space-y-1.5 select-none">
          <h1 className="text-xl font-extrabold tracking-tight text-foreground/90">
            No Weekly Diet Plan Found
          </h1>
          <p className="text-xs text-muted-foreground/80 max-w-sm mx-auto font-medium leading-relaxed">
            It looks like you haven&apos;t generated or assigned a meal plan for this week yet. Let&apos;s build one right now.
          </p>
        </div>
        
        {/* زر التوجيه للداشبورد متناسق تماماً مع نظام التصميم */}
        <Link
          href="/dashboard" 
          className={cn(
            buttonVariants({ variant: 'default' }),
            "h-11 px-6 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-lg shadow-sky-500/10 transition-all duration-200 active:scale-95"
          )}
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return <MealsPage apiData={apiData} />;
};

export default WeeklyMealsPage;