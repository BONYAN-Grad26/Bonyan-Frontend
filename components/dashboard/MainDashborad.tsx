'use client'
import React, { useEffect, useState } from 'react'

import { Meal, NutritionData, WorkoutData } from '@/lib/interfaces';
import MealComponent from '@/components/dashboard/Meal';
import Workout from '@/components/dashboard/Workout';
import Nutrition from '@/components/dashboard/Nutrition';
import AidailyTaps from '@/components/dashboard/AidailyTaps';
import Header from '@/components/dashboard/Header';
import "aos/dist/aos.css";
import AOS from "aos";

interface MainDashboardProps {
  nutrition: NutritionData | null;
  workout: WorkoutData | null;
}

const MainDashboard = ({ nutrition, workout }: MainDashboardProps) => {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [activeTab, setActiveTab] = useState<'nutrition' | 'workout'>('nutrition');
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div data-aos="fade-up" className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8 font-sans antialiased selection:bg-emerald-100">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* --- HEADER --- */}
          <Header workout={workout} nutrition={nutrition} activeTab={activeTab} setActiveTab={setActiveTab} />


        {/* --- AI ADVISORY BANNER --- */}
        {nutrition?.aiDailyTips && (
          <AidailyTaps aiDailyTips={nutrition.aiDailyTips} />
        )}

        {/* ==================== NUTRITION TAB ==================== */}
        {activeTab === 'nutrition' && (
          nutrition ? (
            <Nutrition nutrition={nutrition} setSelectedMeal={setSelectedMeal} />
          ) : (
            /* Fallback UI when nutrition is null */
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-100 shadow-sm text-center space-y-3">
              <div className="text-4xl animate-bounce">🍎</div>
              <h3 className="text-lg font-semibold text-slate-700">No Nutrition Plan Today</h3>
              <p className="text-sm text-slate-400 max-w-sm mx-auto">
                No meals or macros have been tracked or assigned for today yet. Try adding a custom meal or wait for your plan update.
              </p>
            </div>
          )
        )}

        {/* ==================== WORKOUT TAB ==================== */}
        {activeTab === 'workout' && (
          workout ? (
            <Workout workout={workout} />
          ) : (
            /* Fallback UI when workout is null */
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-100 shadow-sm text-center space-y-3">
              <div className="text-4xl animate-pulse">💪</div>
              <h3 className="text-lg font-semibold text-slate-700">Rest Day!</h3>
              <p className="text-sm text-slate-400 max-w-sm mx-auto">
                No workouts are scheduled for today. Take this time to recover, hydrate, and let your muscles rebuild.
              </p>
            </div>
          )
        )}

        {/* ==================== MEAL DETAIL MODAL ==================== */}
        {selectedMeal && (
          <MealComponent selectedMeal={selectedMeal} setSelectedMeal={setSelectedMeal} />
        )}

      </div>
    </div>
  )
}

export default MainDashboard;