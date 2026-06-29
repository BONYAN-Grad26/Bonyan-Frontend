'use client'

import { Button } from '@/components/ui/button'
import { generateWorkout } from '@/serverActions/dashboard'
import { Dumbbell, Plus } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Instead = () => {
  const [loading, setLoading] = useState(false)

  const generationHandle = async () => {
    setLoading(true)
    try {
      await generateWorkout();
      toast.success('Workout generated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center antialiased">
      <div className="bg-card border border-sky-500/5 rounded-3xl p-8 max-w-md shadow-xs space-y-6 flex flex-col items-center transition-all duration-300 hover:border-sky-500/10">
        
        {/* حاوية الأيقونة - نفس التصميم الموحد المينيماليست الفخم */}
        <div className="relative p-5 bg-sky-500/5 rounded-2xl border border-sky-500/10 shadow-xs text-sky-500 shrink-0">
          <Dumbbell size={28} className="animate-pulse" />
          <div className="absolute -inset-1 bg-sky-500/5 blur-lg rounded-full pointer-events-none" />
        </div>

        {/* النصوص بعد تكبير الخطوط وتحسين تباينها البصري */}
        <div className="space-y-2.5 select-none">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground/90 tracking-tight">
            No Active Workout Plan
          </h1>
          <p className="text-xs sm:text-sm font-medium text-muted-foreground/80 max-w-xs mx-auto leading-relaxed">
            You haven&apos;t generated your personalized training program yet. Let&apos;s build one tailored to your fitness goals!
          </p>
        </div>

        {/* الزر الرئيسي المتناسق مع نظام تصميم Bonyan */}
        <Link href="/dashboard" passHref className="w-full">
          <Button 
            onClick={() => generationHandle()} 
            disabled={loading}  
            className="w-full h-12 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/40 text-white font-bold rounded-xl shadow-lg shadow-sky-500/10 cursor-pointer active:scale-95 transition-all text-sm sm:text-base"
          >
            <Plus className="w-5 h-5 mr-2 shrink-0" />
            {loading ? 'Generating Your Plan...' : 'Create Your AI Plan'}
          </Button>
        </Link>

      </div>
    </div>
  )
}

export default Instead