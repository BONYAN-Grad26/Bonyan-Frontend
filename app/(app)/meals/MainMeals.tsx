'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Apple, Plus, Clock, ChefHat, TrendingUp } from 'lucide-react';
import { parseDescription } from '@/lib/constants';
import { ApiMealPlanResponse } from '@/lib/interfaces';
import "aos/dist/aos.css";
import AOS from "aos";
interface MealPageProps {
  apiData: ApiMealPlanResponse[];
}

export default function MealsPage({ apiData }: MealPageProps) {
  const currentWeek = useMemo(() => {
    return apiData && apiData.length > 0 ? apiData[0] : null;
  }, [apiData]);

  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const currentDay = useMemo(() => {
    if (!currentWeek || !currentWeek.days || currentWeek.days.length === 0) return null;
    return currentWeek.days[activeDayIndex] || currentWeek.days[0];
  }, [currentWeek, activeDayIndex]);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  const totals = useMemo(() => {
    if (!currentDay || !currentDay.meals) return { calories: 0, protein: 0, carbs: 0, fat: 0 };

    return currentDay.meals.reduce((acc, meal) => {
      const macros = parseDescription(meal.description);
      return {
        calories: acc.calories + macros.calories,
        protein: acc.protein + macros.protein,
        carbs: acc.carbs + macros.carbs,
        fat: acc.fat + macros.fat,
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  }, [currentDay]);

  if (!currentWeek || !currentDay) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-muted-foreground font-medium text-sm select-none">
        No meal plans available.
      </div>
    );
  }

  return (
    <div data-aos="fade-up" className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-sky-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-foreground/90 tracking-tight mb-1">Meal Planning</h1>
              <p className="text-xs text-muted-foreground/80 font-medium">Your personalized AI-generated meal plan</p>
            </div>
            <Button className="h-10 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-md shadow-sky-500/10 self-start sm:self-auto cursor-pointer active:scale-95 transition-all">
              <Plus className="w-4 h-4 mr-1.5" />
              Log Meal
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Overview */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-foreground/80 tracking-tight select-none">This Week&apos;s Plan</h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                {currentWeek.days.map((day, index) => {
                  const dayTotalCalories = day.meals.reduce((sum, m) => sum + parseDescription(m.description).calories, 0);
                  const isSelected = index === activeDayIndex;
                  
                  return (
                    <div
                      key={day.id}
                      onClick={() => setActiveDayIndex(index)}
                      className={`p-4 rounded-2xl text-center space-y-2 cursor-pointer transition-all border duration-200 select-none ${
                        isSelected
                          ? 'bg-sky-500/10 border-sky-500/30 text-sky-500'
                          : 'bg-card border-sky-500/5 hover:border-sky-500/15 text-muted-foreground'
                      }`}
                    >
                      <p className={`text-xs font-bold ${isSelected ? 'text-sky-500' : 'text-foreground/80'}`}>Day {day.dayOfWeek}</p>
                      <p className="text-[11px] font-semibold text-muted-foreground/70">{Math.round(dayTotalCalories)} kcal</p>
                      <div className="w-full h-1 bg-sky-500/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${isSelected ? 'bg-sky-500' : 'bg-muted-foreground/20'}`} 
                          style={{ width: `${Math.min((dayTotalCalories / (day.targetCalories || 2000)) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Today's Meals */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-foreground/80 tracking-tight select-none">Today&apos;s Meals</h2>

              <div className="space-y-4">
                {currentDay.meals.map((meal) => {
                  const macros = parseDescription(meal.description);
                  return (
                    <div
                      key={meal.id}
                      className="bg-card border border-sky-500/5 rounded-2xl p-6 hover:border-sky-500/20 transition-all duration-200 cursor-pointer group hover:bg-sky-500/[0.005]"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <Apple className="w-4 h-4 text-sky-500" />
                            <p className="text-[10px] font-bold uppercase tracking-wider text-sky-500 bg-sky-500/10 px-2 py-0.5 rounded">{meal.mealType}</p>
                          </div>
                          <h3 className="text-lg font-bold text-foreground/90 group-hover:text-sky-500 transition-colors duration-200">
                            {meal.name}
                          </h3>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {meal.ingredients.map((ing) => (
                              <span key={ing.ingredientId} className="text-[10px] font-semibold text-muted-foreground/80 bg-sky-500/5 border border-sky-500/0 px-2 py-0.5 rounded-lg select-none">
                                {ing.ingredientName} ({ing.quantity} {ing.measurementUnit})
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-left sm:text-right shrink-0 select-none">
                          <p className="text-2xl font-black text-foreground/90 tracking-tight">{Math.round(macros.calories)}</p>
                          <p className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-wider">kcal</p>
                        </div>
                      </div>

                      {/* Macros Breakdown */}
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-sky-500/5 select-none">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50 mb-0.5">Protein</p>
                          <p className="text-sm font-extrabold text-foreground/80">{macros.protein}g</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50 mb-0.5">Carbs</p>
                          <p className="text-sm font-extrabold text-foreground/80">{macros.carbs}g</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50 mb-0.5">Fat</p>
                          <p className="text-sm font-extrabold text-foreground/80">{macros.fat}g</p>
                        </div>
                      </div>

                      {/* Instructions */}
                      {meal.preparationInstructions && (
                        <div className="mt-4 pt-4 border-t border-sky-500/5 text-xs text-muted-foreground/80 flex gap-2">
                          <ChefHat className="w-4 h-4 text-sky-500 shrink-0" />
                          <p className="font-medium leading-relaxed">
                            <span className="font-bold text-foreground/80 select-none">Instructions: </span> 
                            {meal.preparationInstructions}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6  ">
            {/* Daily Summary */}
            <div className=' sticky top-5'>
            <div className="bg-card  border border-sky-500/5 rounded-2xl p-6 space-y-5">
              <h3 className="font-bold text-foreground/80 text-sm tracking-tight select-none">Today&apos;s Summary</h3>

              <div className="space-y-4">
                {/* Calories Progress */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold select-none">
                    <span className="text-muted-foreground">Calories</span>
                    <span className="font-bold text-foreground">{Math.round(totals.calories)} / {Math.round(currentDay.targetCalories)} kcal</span>
                  </div>
                  <div className="w-full h-1.5 bg-sky-500/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-sky-500 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min((totals.calories / (currentDay.targetCalories || 1)) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Protein Progress */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold select-none">
                    <span className="text-muted-foreground">Protein</span>
                    <span className="font-bold text-foreground">{Math.round(totals.protein)} / {Math.round(currentDay.targetProtein)}g</span>
                  </div>
                  <div className="w-full h-1.5 bg-sky-500/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-sky-500 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min((totals.protein / (currentDay.targetProtein || 1)) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Carbs Progress */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold select-none">
                    <span className="text-muted-foreground">Carbs</span>
                    <span className="font-bold text-foreground">{Math.round(totals.carbs)} / {Math.round(currentDay.targetCarbs)}g</span>
                  </div>
                  <div className="w-full h-1.5 bg-sky-500/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-sky-500 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min((totals.carbs / (currentDay.targetCarbs || 1)) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="relative overflow-hidden bg-sky-500/[0.02] border border-sky-500/10 rounded-2xl p-6 space-y-4">
              <div className="absolute -right-6 -top-6 w-12 h-12 bg-sky-500/10 blur-xl rounded-full pointer-events-none" />
              
              <h3 className="font-bold text-xs uppercase tracking-wider text-sky-500 flex items-center gap-2 select-none">
                <TrendingUp className="w-4 h-4 text-sky-500" />
                AI Recommendation & Tips
              </h3>
              
              <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                {currentDay.aiDailyTips || "Your personalized nutrition target is optimized for your active day."}
              </p>
              
              {currentWeek.aiPreparationTips && (
                <p className="text-[11px] text-muted-foreground/70 italic pt-3 border-t border-sky-500/5 font-medium leading-relaxed">
                  Tip: {currentWeek.aiPreparationTips}
                </p>
              )}
              
              <Button className="w-full h-10 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-md shadow-sky-500/10 cursor-pointer active:scale-95 transition-all">
                <Apple className="w-4 h-4 mr-1.5" />
                View Recommendation
              </Button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}