"use client";

import { NutritionData, WorkoutData } from '@/lib/interfaces';
import { generateNutrition, generateWorkout } from '@/serverActions/dashboard';
import { Calendar, Dumbbell, Utensils, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

interface HeaderProps {
  nutrition: NutritionData | null;
  activeTab: 'nutrition' | 'workout';
  workout: WorkoutData | null;
  setActiveTab: React.Dispatch<React.SetStateAction<'nutrition' | 'workout'>>;
}

const Header = ({ nutrition, activeTab, setActiveTab, workout }: HeaderProps) => {
  const router = useRouter();
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const generateWorkoutHandling = async () => {
    setLoading2(true);
    try {
      await generateWorkout();
      toast.success('Workout generated successfully!');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate workout');
    } finally {
      setLoading2(false);
    }
  };

  const generateNutritionHandling = async () => {
    setLoading1(true);
    try {
      await generateNutrition();
      toast.success('Nutrition generated successfully!');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate nutrition');
    } finally {
      setLoading1(false);
    }
  };

  const hasData = nutrition?.date;

  return (
    <header className="flex flex-col gap-4 border-b border-sky-500/5 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div>
          {hasData ? (
            <div className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground/80">
              <Calendar size={14} className="text-muted-foreground/40" />
              <span>{nutrition.date}</span>
              <span className="rounded-full bg-sky-500/10 px-2.5 py-0.5 font-semibold text-sky-500">
                Day {nutrition.dayOfWeek || ""}
              </span>
            </div>
          ) : (
            <h1 className="mb-1 text-xs font-semibold uppercase tracking-wider text-sky-500">
              Create New Plan
            </h1>
          )}

          <h1 className="text-2xl font-extrabold tracking-tight text-foreground/90 capitalize">
            Today&apos;s Schedule
          </h1>
        </div>

        {/* TABS CONTROL - نمط مينيماليست زجاجي فائق النقاء */}
        <div className="flex self-start rounded-xl bg-sky-500/5 p-1 border border-sky-500/5 md:self-center">
          <button
            disabled={loading1 || loading2}
            onClick={() => setActiveTab('nutrition')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'nutrition'
                ? 'bg-card text-sky-500 shadow-sm border border-sky-500/5'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Utensils size={14} />
            Nutrition
          </button>
          <button
            disabled={loading1 || loading2}
            onClick={() => setActiveTab('workout')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'workout'
                ? 'bg-card text-sky-500 shadow-sm border border-sky-500/5'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Dumbbell size={14} />
            Workout
          </button>
        </div>
      </div>

      {/* DYNAMIC GENERATE BUTTON */}
      <div className="self-start sm:self-auto">
        {activeTab === 'nutrition' && !nutrition ? (
          <Button
            onClick={generateNutritionHandling}
            disabled={loading1}
            className="h-10 bg-sky-500 px-4 text-xs font-bold text-white shadow-md shadow-sky-500/10 hover:bg-sky-600 rounded-xl"
          >
            {loading1 ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Utensils size={14} className="mr-2" />
            )}
            {loading1 ? "Generating..." : "Generate Nutrition"}
          </Button>
        ) : !workout && activeTab !== 'nutrition' && (
          <Button
            disabled={loading2}
            onClick={generateWorkoutHandling}
            className="h-10 bg-sky-500 px-4 text-xs font-bold text-white shadow-md shadow-sky-500/10 hover:bg-sky-600 rounded-xl"
          >
            {loading2 ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Dumbbell size={14} className="mr-2" />
            )}
            {loading2 ? "Generating..." : "Generate Workout"}
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;