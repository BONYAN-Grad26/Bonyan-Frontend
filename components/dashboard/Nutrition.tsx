'use client';

import { macros } from '@/lib/constants';
import { Meal, NutritionData } from '@/lib/interfaces';
import { Clock, Droplet, Flame, Utensils } from 'lucide-react';
import React from 'react';

interface NutritionProps {
  nutrition: NutritionData;
  setSelectedMeal: React.Dispatch<React.SetStateAction<Meal | null>>;
}

const Nutrition = ({ nutrition, setSelectedMeal }: NutritionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* LEFT SIDEBAR: GOALS & MACROS */}
      <div className="lg:col-span-1 space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          
          {/* Calories Card */}
          <div className="bg-card border border-sky-500/5 rounded-2xl p-5 shadow-xs transition-all duration-300 hover:border-sky-500/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground/70 text-xs font-bold uppercase tracking-wider select-none">Target Energy</span>
              <Flame className="text-orange-500 animate-pulse" size={16} />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-foreground/90 tracking-tight">{nutrition.targetCalories}</span>
              <span className="text-xs text-muted-foreground font-semibold">kcal</span>
            </div>
          </div>

          {/* Water Card */}
          <div className="bg-card border border-sky-500/5 rounded-2xl p-5 shadow-xs transition-all duration-300 hover:border-sky-500/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground/70 text-xs font-bold uppercase tracking-wider select-none">Hydration Target</span>
              <Droplet className="text-sky-500" size={16} />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-foreground/90 tracking-tight">{nutrition.waterGoal}</span>
              <span className="text-xs text-muted-foreground font-semibold">Liters</span>
            </div>
          </div>
        </div>

        {/* Macros Panel */}
        <div className="bg-card border border-sky-500/5 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-muted-foreground/60 uppercase tracking-wider border-b border-sky-500/5 pb-2 select-none">Daily Breakdown</h3>
          <div className="space-y-4">
            {macros(nutrition).map((macro, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">{macro.name}</span>
                  {/* هنا نتوقع أن ثوابت الماكروز لديك مجهزة مسبقاً، سنترك اللون متوافقاً ديناميكياً */}
                  <span className={`${macro.textColor || 'text-sky-500'} font-bold`}>{macro.value}{macro.unit}</span>
                </div>
                {/* شريط التقدم النظيف فائق النقاء */}
                <div className="w-full bg-sky-500/5 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`${macro.color || 'bg-sky-500'} h-full rounded-full transition-all duration-500`} 
                    style={{ width: macro.progress }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT MAIN: MEALS LIST */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-sm font-bold text-foreground/80 flex items-center gap-2 tracking-tight select-none">
          <Utensils size={14} className="text-sky-500" /> Meal Planner Schedule
        </h2>
        
        <div className="space-y-3">
          {nutrition.meals.sort((a, b) => a.order - b.order).map((meal) => (
            <div 
              key={meal.id}
              className="bg-card hover:bg-sky-500/[0.01] border border-sky-500/5 hover:border-sky-500/20 rounded-xl p-4 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 group active:scale-[0.995]"
              onClick={() => setSelectedMeal(meal)}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase bg-sky-500/10 text-sky-500 px-2 py-0.5 rounded font-bold tracking-wider select-none">
                    {meal.mealType}
                  </span>
                  <h3 className="font-bold text-sm text-foreground/80 group-hover:text-sky-500 transition-colors duration-200">
                    {meal.name}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground/80 line-clamp-1 pr-4">{meal.description}</p>
              </div>

              <div className="flex items-center gap-4 text-xs shrink-0 self-end sm:self-auto">
                <span className="flex items-center gap-1 text-muted-foreground/60 font-medium">
                  <Clock size={13} className="text-muted-foreground/40" />
                  {meal.preparationTime} mins
                </span>
                <span className="bg-sky-500/5 text-sky-500 font-bold px-3 py-1.5 rounded-lg text-[11px] border border-sky-500/0 group-hover:bg-sky-500 group-hover:text-white transition-all duration-200">
                  View Details
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Nutrition;