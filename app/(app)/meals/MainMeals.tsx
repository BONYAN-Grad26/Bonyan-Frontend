'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Apple, Plus, Clock, ChefHat, TrendingUp } from 'lucide-react';
import {  parseDescription } from '@/lib/constants'; // شيلنا apiData من الـ constants لأنها بقت بتيجي كـ Props
import { ApiMealPlanResponse } from '@/lib/interfaces';

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
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        No meal plans available.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Meal Planning</h1>
              <p className="text-foreground/60">Your personalized AI-generated meal plan</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="w-5 h-5 mr-2" />
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
              <h2 className="text-2xl font-bold text-foreground">This Week&apos;s Plan</h2>

              <div className="grid grid-cols-7 gap-2">
                {currentWeek.days.map((day, index) => {
                  const dayTotalCalories = day.meals.reduce((sum, m) => sum + parseDescription(m.description).calories, 0);
                  const isSelected = index === activeDayIndex;
                  
                  return (
                    <div
                      key={day.id}
                      onClick={() => setActiveDayIndex(index)}
                      className={`p-4 rounded-xl text-center space-y-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'glass-primary border-primary'
                          : 'glass border-border'
                      }`}
                    >
                      <p className="text-sm font-semibold text-foreground">Day {day.dayOfWeek}</p>
                      <p className="text-xs text-foreground/60">{Math.round(dayTotalCalories)} kcal</p>
                      <div className="w-full h-1 bg-border rounded-full">
                        <div className="h-full w-3/4 bg-gradient-nutrition rounded-full"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Today's Meals */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Today&apos;s Meals</h2>

              <div className="space-y-4">
                {currentDay.meals.map((meal) => {
                  const macros = parseDescription(meal.description);
                  return (
                    <div
                      key={meal.id}
                      className="glass rounded-2xl p-6 hover:glass-primary transition-all cursor-pointer group"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Apple className="w-5 h-5 text-primary" />
                            <p className="text-sm font-semibold text-foreground/60 capitalize">{meal.mealType.toLowerCase()}</p>
                          </div>
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {meal.name}
                          </h3>
                          {/* عرض المكونات بشكل مبسط وأنيق أسفل اسم الوجبة */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {meal.ingredients.map((ing) => (
                              <span key={ing.ingredientId} className="text-xs text-foreground/60 bg-foreground/5 px-2 py-0.5 rounded">
                                {ing.ingredientName} ({ing.quantity}{ing.measurementUnit})
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-3xl font-bold text-foreground">{Math.round(macros.calories)}</p>
                          <p className="text-xs text-foreground/60">kcal</p>
                        </div>
                      </div>

                      {/* Macros */}
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                        <div>
                          <p className="text-xs text-foreground/60 mb-1">Protein</p>
                          <p className="font-bold text-foreground">{macros.protein}g</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/60 mb-1">Carbs</p>
                          <p className="font-bold text-foreground">{macros.carbs}g</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/60 mb-1">Fat</p>
                          <p className="font-bold text-foreground">{macros.fat}g</p>
                        </div>
                      </div>

                      {/* Instructions */}
                      {meal.preparationInstructions && (
                        <div className="mt-4 pt-4 border-t border-border/30 text-xs text-foreground/70 flex gap-2">
                          <ChefHat className="w-4 h-4 text-primary shrink-0" />
                          <p><span className="font-bold text-foreground">Instructions:</span> {meal.preparationInstructions}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Daily Summary */}
            <div className="glass rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-foreground text-lg">Today&apos;s Summary</h3>

              <div className="space-y-3">
                {/* Calories Progress - يقرأ ديناميكياً من أهداف اليوم الحالية */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-foreground/70">Calories</span>
                    <span className="font-bold text-foreground">{Math.round(totals.calories)} / {Math.round(currentDay.targetCalories)}</span>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-nutrition" 
                      style={{ width: `${Math.min((totals.calories / (currentDay.targetCalories || 1)) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Protein Progress */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-foreground/70">Protein</span>
                    <span className="font-bold text-foreground">{Math.round(totals.protein)} / {Math.round(currentDay.targetProtein)}g</span>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-health" 
                      style={{ width: `${Math.min((totals.protein / (currentDay.targetProtein || 1)) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Carbs Progress */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-foreground/70">Carbs</span>
                    <span className="font-bold text-foreground">{Math.round(totals.carbs)} / {Math.round(currentDay.targetCarbs)}g</span>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-workout" 
                      style={{ width: `${Math.min((totals.carbs / (currentDay.targetCarbs || 1)) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="glass-primary rounded-2xl p-6 space-y-4 border-l-4 border-primary">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                AI Recommendation & Tips
              </h3>
              <p className="text-sm text-foreground/70">
                {currentDay.aiDailyTips || "Your personalized nutrition target is optimized for your active day."}
              </p>
              {currentWeek.aiPreparationTips && (
                <p className="text-xs text-foreground/60 italic pt-2 border-t border-primary/10">
                  Tip: {currentWeek.aiPreparationTips}
                </p>
              )}
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                <Apple className="w-4 h-4 mr-2" />
                View Recommendation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}