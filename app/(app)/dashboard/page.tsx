import MainDashborad from "@/components/dashboard/MainDashborad";
import { defaultNutrition, defaultWorkout } from "@/lib/constants";
import { getNutrition, getWorkout } from "@/serverActions/dashboard";






const DashboardPage: React.FC = async () => {

  const nutrition = await getNutrition();
  const workout = await getWorkout()


  return (<MainDashborad nutrition={nutrition} workout={workout} />)
};

export default DashboardPage ;