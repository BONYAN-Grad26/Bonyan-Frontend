'use client'
import { macros } from '@/lib/constants';
import { Meal, NutritionData } from '@/lib/interfaces';
import { Clock, Droplet, Flame, Utensils } from 'lucide-react'
import React from 'react'

interface NutritionProps {
    nutrition:NutritionData,
    setSelectedMeal:React.Dispatch<React.SetStateAction<Meal | null>>

}

const Nutrition = ({nutrition,setSelectedMeal}:NutritionProps) => {


  return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* LEFT SIDEBAR: GOALS & MACROS */}
            <div className="lg:col-span-1 space-y-4">
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                {/* Calories Card */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Target Energy</span>
                    <Flame className="text-orange-500" size={18} />
                  </div>
                  <div>
                    <span className="text-2xl font-black text-slate-900 tracking-tight">{nutrition.targetCalories}</span>
                    <span className="text-xs text-slate-500 font-semibold ml-1">kcal</span>
                  </div>
                </div>

                {/* Water Card */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Hydration Target</span>
                    <Droplet className="text-sky-500" size={18} />
                  </div>
                  <div>
                    <span className="text-2xl font-black text-slate-900 tracking-tight">{nutrition.waterGoal}</span>
                    <span className="text-xs text-slate-500 font-semibold ml-1">Liters</span>
                  </div>
                </div>
              </div>

              {/* Macros Panel */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Daily Breakdown</h3>
                <div className="space-y-3.5">
                  {macros(nutrition).map((macro, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-semibold">{macro.name}</span>
                        <span className={`${macro.textColor} font-bold`}>{macro.value}{macro.unit}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className={`${macro.color} h-full rounded-full`} style={{ width: macro.progress }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT MAIN: MEALS LIST */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 tracking-tight">
                <Utensils size={16} className="text-emerald-500" /> Meal Planner Schedule
              </h2>
              
              <div className="space-y-3">
                {nutrition.meals.sort((a, b) => a.order - b.order).map((meal) => (
                  <div 
                    key={meal.id}
                    className="bg-white hover:bg-slate-50/50 border border-slate-200/80 hover:border-emerald-200 rounded-xl p-4 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 group"
                    onClick={() => setSelectedMeal(meal)}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded font-bold tracking-wider">
                          {meal.mealType}
                        </span>
                        <h3 className="font-bold text-sm text-slate-800 group-hover:text-emerald-600 transition-colors">
                          {meal.name}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{meal.description}</p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0 self-end sm:self-auto">
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock size={13} />
                        {meal.preparationTime} mins
                      </span>
                      <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[11px] font-bold group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                        View Details
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
    )
}

export default Nutrition