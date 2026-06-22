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
        className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
      >
        <Utensils size={15} />
        {!loading1?"Generate Nutrition":"generating"}
      </button>
    ) : !workout &&(
      <button 
         disabled={loading2}
        onClick={() => generateWorkoutHandling()}
        className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
      >
        <Dumbbell size={15} />
        {!loading2?"Generate Workout":"generating"}

        
      </button>
    )}
  </div>
</header>
      )
}

export default Header