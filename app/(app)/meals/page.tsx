import MealsPage from './MainMeals'
import { getWeeklyPlans } from '@/serverActions/meals'

const page = async () => {

  const apiData = await getWeeklyPlans();
  return (
    <MealsPage apiData={apiData}  />
  )
}

export default page
