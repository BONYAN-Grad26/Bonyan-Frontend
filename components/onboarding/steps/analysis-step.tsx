'use client';

import { Button } from '@/components/ui/button';
import { stepsInfo } from '@/lib/constants';
import { OnboardingData } from '@/lib/interfaces';
import { createHealtheMatrix } from '@/serverActions/auth';
import { CheckCircle2, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {toast} from "react-hot-toast"

interface AnalysisStepProps {
  data: OnboardingData;
  setCurrentStep:React.Dispatch<React.SetStateAction<number>>
}

export function AnalysisStep({ data ,setCurrentStep }: AnalysisStepProps) {
  const [loading,setLoading] = useState(false);
  const router = useRouter();

  const calculateBMI = () => {
    if (data.height && data.weight) {
      const heightInMeters = data.height / 100;
      return (data.weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return 0;
  };

  const calculateTDEE = () => {
    // Simplified TDEE calculation
    const baseCalories = 10 * data.weight + 6.25 * data.height - 5 * data.age;
    const activityMultipliers: Record<string, number> = {
      'sedentary': 1.2,
      'lightly-active': 1.375,
      'moderately-active': 1.55,
      'very-active': 1.725,
      'extremely-active': 1.9,
    };
    const multiplier = activityMultipliers[data.activityLevel] || 1.5;
    return Math.round(baseCalories * multiplier);
  };
  const handleSendingHealthMatrix = async (e:React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    if(data.age<20 || data.age>120) {
      toast.error("Age must be between 20 & 120");
      setCurrentStep(stepsInfo.personalInfo)
      return
    }
    if(data.weight<20 || data.weight>500) {
      toast.error("Weight must be between 20 & 500");
      setCurrentStep(stepsInfo.personalInfo)
      return 
    }
    if(data.height<20 || data.height>500) {
      toast.error("Height must be between 20 & 500")
      setCurrentStep(stepsInfo.personalInfo)
      return
    }
    if(data.fatPercentage<1 || data.fatPercentage>70) {
      toast.error("Fatpercentage must be between 1 & 70");
      setCurrentStep(stepsInfo.bodyInfo)
      return
    }
    if(data.musclePercentage<1 || data.fatPercentage>200) {
      toast.error("MusclePercentage must be between 1 & 200")
      setCurrentStep(stepsInfo.bodyInfo)

      return
    }
    if(data.targetWeight<20 || data.targetWeight>500) {
      toast.error("TargetWeight must be between 20 & 500")
      setCurrentStep(stepsInfo.targetInfo);

      return
    }
    if(data.dailyCalories<1000) {
      toast.error("DailyCalories must be greater than 1000");
      setCurrentStep(stepsInfo.targetInfo)

      return
    }
    if(!data.medicalNotes.length) {
      toast.error("Please enter medicalNotes ");
      setCurrentStep(stepsInfo.medicalInfo);
      return;

    }
    try {
      await createHealtheMatrix(data) ;
      toast.success("Healtmatrix is created")
      router.refresh()
      router.replace("dashboard");
      
    }catch(error:any) {
      toast.error(error.message)

    } finally {
      setLoading(false)

    }

  }

  const leanMass = data.weight * ((100 - data.fatPercentage) / 100);
  const fatMass = data.weight * (data.fatPercentage / 100);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4 mb-8">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-sky-500 to-sky-400 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Your AI Health Plan is Ready!</h2>
          <p className="text-slate-500">Based on your information, here&apos;s your personalized analysis</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* BMI */}
        <div className="bg-sky-50/40 border border-sky-100 rounded-xl p-6 space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">BMI</h3>
            <Zap className="w-5 h-5 text-sky-500" />
          </div>
          <p className="text-4xl font-black text-sky-600 tracking-tight">{calculateBMI()}</p>
          <p className="text-sm text-slate-600 font-medium">
            {calculateBMI() < 18.5
              ? 'Underweight - Consider gaining healthy weight'
              : calculateBMI() < 25
                ? 'Normal weight - Maintain or optimize'
                : calculateBMI() < 30
                  ? 'Overweight - Healthy weight loss recommended'
                  : 'Obese - Medical consultation recommended'}
          </p>
        </div>

        {/* TDEE */}
        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-6 space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Daily Calorie Needs</h3>
            <TrendingUp className="w-5 h-5 text-slate-600" />
          </div>
          <p className="text-4xl font-black text-slate-800 tracking-tight">{calculateTDEE()}</p>
          <p className="text-sm text-slate-500 font-medium">kcal/day at your current activity level</p>
        </div>
      </div>

      {/* Body Composition */}
      {data.weight && (
        <div className="border border-slate-100 bg-white rounded-xl p-6 space-y-4 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Body Composition</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Lean Mass</span>
                <span className="font-semibold text-slate-800">{leanMass.toFixed(1)} kg</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 to-sky-500"
                  style={{ width: `${data.musclePercentage}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Fat Mass</span>
                <span className="font-semibold text-slate-800">{fatMass.toFixed(1)} kg</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-slate-400 to-slate-500"
                  style={{ width: `${data.fatPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Recommendations */}
      <div className="border border-slate-100 bg-white rounded-xl p-6 space-y-4 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4">AI Recommendations</h3>
        <ul className="space-y-3">
          <li className="flex gap-3 items-start">
            <CheckCircle2 className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-600">
              Your personalized {data.dietType || 'balanced'} meal plan is ready with AI-optimized recipes
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <CheckCircle2 className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-600">
              Daily workouts tailored to your {data.activityLevel?.replace('-', ' ')} activity level
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <CheckCircle2 className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-600">
              All {data.allergies.length} allergies will be avoided in your meal suggestions
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <CheckCircle2 className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-600">
              Real-time health tracking with AI insights to keep you motivated
            </span>
          </li>
        </ul>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3 pt-4">
          <Button disabled={loading} onClick={handleSendingHealthMatrix}  className="w-full h-11 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-semibold rounded-xl transition-all shadow-md shadow-sky-600/10 active:scale-[0.99]">
            Go to Dashboard
            <CheckCircle2 className="w-4 h-4 ml-2" />
          </Button>
        <Link  href="/">
          <Button disabled={loading} variant="outline" className="w-full h-11 rounded-xl border-slate-200 hover:bg-slate-50 text-slate-700 font-medium active:scale-[0.99] transition-transform">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}