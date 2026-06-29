'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dumbbell, Plus, Clock, Play, Armchair, CheckCircle2 } from 'lucide-react';
import { PlanData, WeeklySchedule } from '@/lib/interfaces';
import "aos/dist/aos.css";
import AOS from "aos";
interface WorkoutsPageProps {
  planData: PlanData;
}

export default function WorkoutsPage({ planData }: WorkoutsPageProps) {
  const plan = planData;
  const schedule = plan.weekly_schedule;
  const daysArray = Object.keys(schedule) as Array<keyof WeeklySchedule>;

  const [selectedDay, setSelectedDay] = useState<keyof WeeklySchedule>('Monday');
  const activeSession = schedule[selectedDay];

  const totalWorkoutDays = daysArray.filter(d => schedule[d].exercises.length > 0).length;
  const totalExercisesThisWeek = daysArray.reduce((acc, d) => acc + schedule[d].exercises.length, 0);
  const estimatedHours = ((totalWorkoutDays * 40) / 60).toFixed(1); 
  const estimatedCalories = totalWorkoutDays * 380;
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div data-aos="fade-up"  className="min-h-screen bg-background text-foreground/90 antialiased selection:bg-sky-100 selection:text-sky-900">
      
      {/* Header - Minimalist & Airy */}
      <div className="bg-card border-b border-sky-500/5 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-500 px-3 py-1 rounded-full bg-sky-500/5 border border-sky-500/10">
                {plan.split_type} Split Plan
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground/90 mt-3 mb-2">
                {plan.plan_name}
              </h1>
              <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
                {plan.split_reasoning}
              </p>
            </div>
            <Button className="bg-sky-500 hover:bg-sky-600 text-white font-medium shadow-xs px-5 py-5 rounded-xl transition-colors cursor-pointer">
              <Plus className="w-5 h-5 mr-2" />
              Custom Workout
            </Button>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Exercise Block */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Weekly Tabs Selector */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Weekly Schedule</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {daysArray.map((day) => {
                  const isRest = schedule[day].session.toUpperCase() === 'REST';
                  const isSelected = selectedDay === day;
                  
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`p-3 rounded-xl text-center space-y-1 transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-sky-500 text-white border-sky-500 shadow-xs scale-[1.01]'
                          : isRest
                            ? 'bg-sky-500/[0.01] border-sky-500/5 text-muted-foreground/40 hover:bg-sky-500/5'
                            : 'bg-card border-sky-500/5 text-foreground/80 hover:border-sky-500/20'
                      }`}
                    >
                      <p className={`text-xs font-semibold ${isSelected ? 'text-sky-100' : 'text-muted-foreground/60'}`}>
                        {day.substring(0, 3)}
                      </p>
                      <p className="text-xs font-bold truncate">
                        {isRest ? 'Rest' : 'Workout'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Workout Header & Items */}
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-sky-500/5 pb-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground/90">
                    {activeSession.session}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Focus: <span className="font-semibold text-sky-500">{activeSession.focus}</span>
                  </p>
                </div>
                {activeSession.exercises.length > 0 && (
                  <Button size="sm" className="bg-sky-500 hover:bg-sky-600 text-white shadow-xs rounded-lg cursor-pointer">
                    <Play className="w-4 h-4 mr-2 fill-current" /> Start Circuit
                  </Button>
                )}
              </div>

              {/* Cards Generation */}
              {activeSession.exercises.length === 0 ? (
                <div className="flex flex-col items-center justify-center border border-dashed border-sky-500/10 rounded-2xl p-12 text-center bg-card shadow-xs">
                  <Armchair className="w-12 h-12 text-sky-500/20 mb-3" />
                  <h3 className="text-base font-bold text-foreground/80">Active Recovery Day</h3>
                  <p className="text-xs text-muted-foreground max-w-xs mt-1">
                    No intense training scheduled for today. Allow your body to rest, repair, and focus on stretching or light walks.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {activeSession.exercises.map((exercise, idx) => (
                    <div 
                      key={idx} 
                      className="bg-card border border-sky-500/5 rounded-xl p-5 hover:border-sky-500/10 transition-all shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-500/5 text-sky-500 text-xs font-bold border border-sky-500/10">
                              {idx + 1}
                            </span>
                            <h3 className="text-base font-bold text-foreground/90">{exercise.name}</h3>
                          </div>
                          <p className="text-xs text-muted-foreground pl-7 leading-relaxed">
                            {exercise.notes}
                          </p>
                        </div>
                        
                        {/* Target Badges */}
                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto pl-7 sm:pl-0">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-sky-500/[0.02] border border-sky-500/5 text-foreground/70">
                            {exercise.sets} Sets
                          </span>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-sky-500/[0.02] border border-sky-500/5 text-foreground/70">
                            {exercise.reps} Reps
                          </span>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-sky-500/5 text-sky-500 border border-sky-500/10 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {exercise.rest_seconds}s
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className=' sticky top-5'>
            {/* Target Stats Box */}
            <div className="bg-card border border-sky-500/5 rounded-2xl p-6 space-y-5 shadow-xs">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground/60 border-b border-sky-500/5 pb-2">
                Weekly Target Analytics
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1.5 text-xs font-bold text-foreground/70">
                    <span>Active Commitment</span>
                    <span>{totalWorkoutDays} / 7 Days</span>
                  </div>
                  <div className="w-full h-1.5 bg-sky-500/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-sky-500 transition-all duration-500" 
                      style={{ width: `${(totalWorkoutDays / 7) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-sky-500/[0.01] border border-sky-500/5 rounded-xl">
                    <p className="text-[11px] font-medium text-muted-foreground mb-0.5">Exercises</p>
                    <p className="text-lg font-bold text-foreground/80">{totalExercisesThisWeek}</p>
                  </div>
                  <div className="p-3 bg-sky-500/[0.01] border border-sky-500/5 rounded-xl">
                    <p className="text-[11px] font-medium text-muted-foreground mb-0.5">Duration</p>
                    <p className="text-lg font-bold text-foreground/80">{estimatedHours} hrs</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-sky-500/5">
                  <p className="text-[11px] font-medium text-muted-foreground mb-0.5">Est. Weekly Calories</p>
                  <p className="text-3xl font-black text-sky-500 tracking-tight">
                    ~{estimatedCalories.toLocaleString()} <span className="text-xs font-bold text-muted-foreground/60">kcal</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Strategic Prompt Card */}
            <div className="bg-sky-500/5 border border-sky-500/10 rounded-2xl p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-sky-500">
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                <h4 className="font-bold text-xs uppercase tracking-wider">Circuit Strategy</h4>
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed">
                Perform these exercises consecutively as a continuous block. Once all structured exercises are completed sequentially, rest up to 2 minutes, and restart the cycle for your next set.
              </p>
            </div>

            {/* Blueprint Legend */}
            <div className="bg-card border border-sky-500/5 rounded-2xl p-5 space-y-3 shadow-xs">
              <h3 className="font-bold text-[11px] text-muted-foreground/60 uppercase tracking-wider">Difficulty Blueprint</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <p className="text-muted-foreground"><span className="font-semibold text-foreground/80">Beginner</span> — Focus on safety & form</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400/40" />
                  <p className="text-muted-foreground"><span className="font-semibold text-foreground/80">Intermediate</span> — Overload pacing</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}