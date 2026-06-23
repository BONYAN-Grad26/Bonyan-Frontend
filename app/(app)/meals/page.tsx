import { ApiMealPlanResponse } from '@/lib/interfaces';
import MealsPage from './MainMeals'
import { getWeeklyPlans } from '@/serverActions/meals'
import Link from 'next/link';

const page = async () => {

  const apiData = await getWeeklyPlans();

  if( !apiData || !apiData.length ){
    return (
<div className="w-full min-h-screen flex flex-col justify-center items-center gap-6 bg-slate-50 p-6">
        <span className="text-6xl animate-bounce">🍽️</span>
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-800">No Weekly Diet Plan Found</h1>
          <p className="text-slate-500 max-w-sm mx-auto">
            It looks like you haven't generated or assigned a meal plan for this week yet.
          </p>
        </div>
        
        {/* Optional Action Button to guide the user */}
        <Link
          href="/dashboard" 
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
        >
          Go to Dashboard
        </Link>
      </div>
    )

  }
  return (
    <MealsPage apiData={apiData}  />
  )
}

export default page
