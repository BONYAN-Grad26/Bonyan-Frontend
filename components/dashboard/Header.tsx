"use client"
import { NutritionData, WorkoutData } from '@/lib/interfaces'
import { generateNutrition, generateWorkout } from '@/serverActions/dashboard'
import { Calendar, Dumbbell, Utensils } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface HeaderProps {
    nutrition:NutritionData | null ,
    activeTab:'nutrition' | 'workout',
    workout:WorkoutData | null,
    setActiveTab:React.Dispatch<React.SetStateAction<'nutrition' | 'workout'>>
}

const Header = ({nutrition,activeTab,setActiveTab,workout}:HeaderProps) => {

  const router = useRouter();
const [loading1, setLoading1] = useState(false);
const [loading2, setLoading2] = useState(false);


  const generateWorkoutHandling = async()=> {
    setLoading2(true);

    try {
      const data = await generateWorkout();
      toast.success('Generated successfully !');

    } catch(error:any) {
      toast.error(error.message)

      
    } finally {
      router.refresh();
      setLoading2(false)



    }

  }

  const generateNutritionHandling = async()=> {
    setLoading1(true);
    try {
      const data = await generateNutrition();
      toast.success('Generated successfully !');
      router.refresh()
      
    } catch (error:any) {
      toast.error(error.message)
      
    } finally {
      setLoading1(false)


    }

  }
    
  return (
<header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5 gap-4">
  <div className="flex flex-col md:flex-row md:items-center gap-4">
    {
      <div>
        {
          nutrition?      <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
        <Calendar size={16} className="text-slate-400" />
        <span>{nutrition.date || ""}</span>
        <span className="text-xs bg-slate-200/70 px-2.5 py-0.5 rounded-full text-slate-600 font-medium">
          Day {nutrition.dayOfWeek ||""}
        </span>
      </div>:<h1 className=' capitalize text-sm text-slate-600'>create new nutrition & workout-plan</h1>
        }

      <h1 className="text-2xl font-semibold capitalize text-slate-900 tracking-tight">
        diet & workout today plans
      </h1>
      </div>
    }


    {/* TABS CONTROL */}
    <div className="flex bg-slate-200/60 p-1 rounded-xl self-start md:self-center border border-slate-200">
      <button
        disabled={loading1 || loading2}
        onClick={() => setActiveTab('nutrition')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
          activeTab === 'nutrition'
            ? 'bg-white text-emerald-600 shadow-sm'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Utensils size={15} />
        Nutrition
      </button>
      <button
        disabled={loading1 || loading2}
        onClick={() => setActiveTab('workout')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
          activeTab === 'workout'
            ? 'bg-white text-sky-600 shadow-sm'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Dumbbell size={15} />
        Workout
      </button>
    </div>
  </div>

  {/* DYNAMIC GENERATE BUTTON */}
<div className="self-start sm:self-auto">
  {activeTab === 'nutrition' && !nutrition ? (
    <button 
      onClick={() => generateNutritionHandling()}
      disabled={loading1}
      className={`flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm transition-all
        ${loading1 ? 'opacity-75 cursor-not-allowed bg-emerald-700' : 'hover:bg-emerald-700'}`}
    >
      {loading1 ? (
        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <Utensils size={15} />
      )}
      {loading1 ? "Generating..." : "Generate Nutrition"}
    </button>
  ) : !workout && activeTab !== 'nutrition' && (
    <button 
      disabled={loading2}
      onClick={() => generateWorkoutHandling()}
      className={`flex items-center gap-2 px-4 py-2.5 bg-sky-600 text-white rounded-xl text-xs font-bold shadow-sm transition-all
        ${loading2 ? 'opacity-75 cursor-not-allowed bg-sky-700' : 'hover:bg-sky-700'}`}
    >
      {loading2 ? (
        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <Dumbbell size={15} />
      )}
      {loading2 ? "Generating..." : "Generate Workout"}
    </button>
  )}
</div>
</header>
      )
}

export default Header