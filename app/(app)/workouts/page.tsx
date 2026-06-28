import React from 'react'
import WorkoutsPage from './MainWorkout'
import { getWeeklyWorkout } from '@/serverActions/workout'
import { Button } from '@/components/ui/button'
import { Dumbbell, Plus } from 'lucide-react'
import Link from 'next/link'
import Instead from './Instead'

const page = async () => {
  const planData = await getWeeklyWorkout();

  if (!planData) {
    return (
      <Instead />

    );
  }

  return (
    <WorkoutsPage planData={planData} />
  )
}

export default page