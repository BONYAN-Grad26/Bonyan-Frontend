import MainDashborad from "@/components/dashboard/MainDashborad";
import { getNutrition, getWorkout } from "@/serverActions/dashboard";






const DashboardPage: React.FC = async () => {

  const nutrition = await getNutrition();
  const workout = await getWorkout()


  return (<MainDashborad nutrition={nutrition} workout={workout} />)
};

export default DashboardPage ;