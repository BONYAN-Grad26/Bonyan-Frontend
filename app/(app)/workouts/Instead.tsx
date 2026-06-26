'use client'
import { Button } from '@/components/ui/button'
import { generateWorkout } from '@/serverActions/dashboard'
import { Dumbbell, Plus } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Instead = () => {
  const [loading,setLoading] = useState(false)
  const generationHandle = async() => {
    setLoading(true)
    try {
      await generateWorkout();
      toast.success('workout generated successfully');
      
    } catch (error:any) {
      toast.error(error.message)
      
    } finally {
      setLoading(false)

    }
  }
  return (
      <div className="min-h-screen bg-stone-50/60 flex flex-col items-center justify-center p-4 text-center antialiased">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md shadow-sm space-y-6 flex flex-col items-center">
          
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-xs">
            <Dumbbell className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              No Active Workout Plan
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              You haven&apos;t generated your personalized training program yet. Let&apos;s build one tailored to your fitness goals!
            </p>
          </div>

          <Link href="/dashboard" passHref className="w-full">
            <Button onClick={()=>generationHandle()} disabled={loading}  className="w-full disabled:bg-emerald-300 bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-xs py-6 rounded-xl transition-colors">
              <Plus className="w-5 h-5 mr-2" />
              Create Your AI Plan
            </Button>
          </Link>

        </div>
      </div>
  )
}

export default Instead
