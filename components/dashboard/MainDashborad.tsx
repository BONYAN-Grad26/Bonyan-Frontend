'use client'
import React from 'react'

import { Meal, NutritionData, WorkoutData } from '@/lib/interfaces';
import { defaultNutrition, defaultWorkout, macros } from '@/lib/constants';
import MealComponent from '@/components/dashboard/Meal';
import Workout from '@/components/dashboard/Workout';
import Nutrition from '@/components/dashboard/Nutrition';
import AidailyTaps from '@/components/dashboard/AidailyTaps';
import { useState } from 'react';
import Header from '@/components/dashboard/Header';

interface MainDashboradProps {
  nutrition:NutritionData | null,
  workout:WorkoutData | null

}
const MainDashborad = ({nutrition,workout}:MainDashboradProps) => {


    const [selectedMeal,setSelectedMeal] = useState<Meal | null> (null)
  
    const [activeTab, setActiveTab] = useState<'nutrition' | 'workout'>('nutrition');


  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8 font-sans antialiased selection:bg-emerald-100">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* --- HEADER --- */}
        <Header nutrition={nutrition!} activeTab={activeTab} setActiveTab={setActiveTab} />


        {/* --- AI ADVISORY BANNER --- */}
        {nutrition!.aiDailyTips && (
          <AidailyTaps aiDailyTips={defaultNutrition.aiDailyTips} />

        )}

        {/* ==================== NUTRITION TAB ==================== */}
        {activeTab === 'nutrition' && (
          <Nutrition nutrition={nutrition!} setSelectedMeal={setSelectedMeal} />

        )}

        {/* ==================== WORKOUT TAB ==================== */}
        {activeTab === 'workout' && (
          <Workout workout={workout!} />

        )}

        {/* ==================== MEAL DETAIL MODAL ==================== */}
        {selectedMeal && (
          <MealComponent  selectedMeal={selectedMeal} setSelectedMeal={setSelectedMeal} />

        )}

      </div>
    </div>  )
}

export default MainDashborad