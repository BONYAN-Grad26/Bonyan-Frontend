'use client';

import { WorkoutData } from '@/lib/interfaces';
import { ClipboardList, Timer, Activity } from 'lucide-react';
import React from 'react';

interface WorkoutProps {
  workout: WorkoutData;
}

const Workout = ({ workout }: WorkoutProps) => {
  return (
    <div className="space-y-6">
      
      {/* Session Info Header - زجاجي ناعم وبسيط جداً */}
      <div className="bg-card border border-sky-500/5 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs transition-all duration-300 hover:border-sky-500/10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-sky-500/10 text-sky-500 rounded-xl border border-sky-500/0">
            <Activity size={20} className="animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-wider block mb-0.5 select-none">Assigned Plan</span>
            <h2 className="text-lg font-extrabold text-foreground/90 tracking-tight">{workout.session}</h2>
          </div>
        </div>
        
        <div className="bg-sky-500/5 text-sky-500 border border-sky-500/10 px-4 py-2 rounded-xl self-start sm:self-auto text-xs">
          <span className="text-[10px] block text-muted-foreground/60 font-bold uppercase tracking-wider mb-0.5 select-none">Focus Area</span>
          <span className="font-extrabold">{workout.focus}</span>
        </div>
      </div>

      {/* Exercises Layout */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-foreground/80 flex items-center gap-2 tracking-tight select-none">
          <ClipboardList size={14} className="text-sky-500" /> Routine Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workout.exercises.map((exercise, index) => (
            <div 
              key={index} 
              className="bg-card border border-sky-500/5 hover:border-sky-500/15 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all duration-200 group hover:bg-sky-500/[0.005]"
            >
              <div>
                <h4 className="font-bold text-sm text-foreground/80 border-b border-sky-500/5 pb-2 mb-3.5 tracking-tight group-hover:text-sky-500 transition-colors duration-200">
                  {exercise.name}
                </h4>
                
                {/* Metric Widgets - مصممة بنقاء فائق وخفيف جداً */}
                <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                  <div className="bg-sky-500/[0.02] p-2.5 rounded-xl border border-sky-500/5">
                    <span className="text-[10px] text-muted-foreground/50 block font-bold mb-0.5 select-none">SETS</span>
                    <span className="font-black text-foreground/80 text-sm tracking-tight">{exercise.sets}</span>
                  </div>
                  
                  <div className="bg-sky-500/[0.02] p-2.5 rounded-xl border border-sky-500/5">
                    <span className="text-[10px] text-muted-foreground/50 block font-bold mb-0.5 select-none">REPS</span>
                    <span className="font-black text-foreground/80 text-sm tracking-tight">{exercise.reps}</span>
                  </div>
                  
                  <div className="bg-sky-500/[0.02] p-2.5 rounded-xl border border-sky-500/5 flex flex-col justify-center items-center">
                    <span className="text-[10px] text-muted-foreground/50 block font-bold mb-0.5 select-none">REST</span>
                    <span className="font-black text-foreground/80 text-sm tracking-tight flex items-center gap-0.5">
                      <Timer size={12} className="text-sky-500/70" /> {exercise.rest_seconds}s
                    </span>
                  </div>
                </div>
              </div>

              {/* Exercise Notes - صندوق إرشادي متناسق ومريح للعين */}
              {exercise.notes && (
                <div className="bg-amber-500/[0.02] text-xs text-muted-foreground/90 p-3 rounded-xl border-l-2 border-amber-400/60 leading-relaxed font-medium">
                  <span className="font-bold block text-amber-600 dark:text-amber-400 text-[10px] uppercase tracking-wider mb-0.5 select-none">Coaching Note:</span>
                  {exercise.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workout;