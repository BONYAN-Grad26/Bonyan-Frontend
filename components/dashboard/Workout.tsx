import { WorkoutData } from '@/lib/interfaces'
import { ClipboardList, Timer } from 'lucide-react'
import React, { Activity } from 'react'

interface WorkoutProps {
  workout:WorkoutData
}

const Workout = ({workout}:WorkoutProps) => {
  return (
          <div className="space-y-6">
            {/* Session Info Header */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-sky-50 text-sky-600 border border-sky-100 rounded-xl">
                  <Activity size={22} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Assigned Plan</span>
                  <h2 className="text-lg font-black text-slate-800 tracking-tight">{workout.session}</h2>
                </div>
              </div>
              <div className="bg-sky-50 text-sky-700 border border-sky-100 px-4 py-1.5 rounded-xl self-start sm:self-auto text-xs">
                <span className="text-[10px] block text-slate-400 font-bold uppercase">Focus Area</span>
                <span className="font-bold">{workout.focus}</span>
              </div>
            </div>

            {/* Exercises Layout */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 tracking-tight">
                <ClipboardList size={16} className="text-sky-500" /> Routine Breakdown
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workout.exercises.map((exercise, index) => (
                  <div key={index} className="bg-white border border-slate-200/80 rounded-xl p-5 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-slate-800 border-b border-slate-100 pb-2 mb-3 tracking-tight">
                        {exercise.name}
                      </h4>
                      
                      {/* Metric Widgets */}
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="text-[10px] text-slate-400 block font-semibold mb-0.5">SETS</span>
                          <span className="font-black text-slate-800">{exercise.sets}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="text-[10px] text-slate-400 block font-semibold mb-0.5">REPS</span>
                          <span className="font-black text-slate-800">{exercise.reps}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex flex-col justify-center items-center">
                          <span className="text-[10px] text-slate-400 block font-semibold mb-0.5">REST</span>
                          <span className="font-black text-slate-800 flex items-center gap-0.5">
                            <Timer size={12} className="text-sky-500" /> {exercise.rest_seconds}s
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Exercise Notes */}
                    {exercise.notes && (
                      <div className="bg-amber-50/50 text-xs text-slate-600 p-3 rounded-lg border-l-2 border-amber-400/80 leading-relaxed">
                        <span className="font-bold block text-amber-800 text-[10px] uppercase mb-0.5">Coaching Note:</span>
                        {exercise.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>  )
}

export default Workout