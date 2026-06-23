'use client';

import { Button } from '@/components/ui/button';
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
      setCurrentStep(0)
      return
    }
    if(data.weight<20 || data.weight>500) {
      toast.error("Weight must be between 20 & 500");
      setCurrentStep(0)
      return 
    }
    if(data.height<20 || data.height>500) {
      toast.error("Height must be between 20 & 500")
      setCurrentStep(0)
      return
    }
    if(data.fatPercentage<1 || data.fatPercentage>70) {
      toast.error("Fatpercentage must be between 1 & 70");
      setCurrentStep(1)
      return
    }
    if(data.musclePercentage<1 || data.fatPercentage>200) {
      toast.error("MusclePercentage must be between 1 & 200")
      setCurrentStep(1)

      return
    }
    if(data.targetWeight<20 || data.targetWeight>500) {
      toast.error("TargetWeight must be between 20 & 500")
      setCurrentStep(3)

      return
    }
    if(data.dailyCalories<1000) {
      toast.error("DailyCalories must be greater than 1000");
      setCurrentStep(3)

      return
    }
    if(!data.medicalNotes.length) {
      toast.error("Please enter medicalNotes ");
      setCurrentStep(5);
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
          <div className="w-16 h-16 rounded-full bg-gradient-health flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground">Your AI Health Plan is Ready!</h2>
          <p className="text-foreground/60">Based on your information, here&apos;s your personalized analysis</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* BMI */}
        <div className="glass-primary rounded-xl p-6 space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">BMI</h3>
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <p className="text-4xl font-bold text-primary">{calculateBMI()}</p>
          <p className="text-sm text-foreground/70">
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
        <div className="glass-primary rounded-xl p-6 space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Daily Calorie Needs</h3>
            <TrendingUp className="w-5 h-5 text-secondary" />
          </div>
          <p className="text-4xl font-bold text-secondary">{calculateTDEE()}</p>
          <p className="text-sm text-foreground/70">kcal/day at your current activity level</p>
        </div>
      </div>

      {/* Body Composition */}
      {data.weight && (
        <div className="glass rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-foreground mb-4">Body Composition</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Lean Mass</span>
                <span className="font-semibold text-foreground">{leanMass.toFixed(1)} kg</span>
              </div>
              <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-health"
                  style={{ width: `${data.musclePercentage}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Fat Mass</span>
                <span className="font-semibold text-foreground">{fatMass.toFixed(1)} kg</span>
              </div>
              <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-nutrition"
                  style={{ width: `${data.fatPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Recommendations */}
      <div className="glass rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-foreground mb-4">AI Recommendations</h3>
        <ul className="space-y-3">
          <li className="flex gap-3 items-start">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground/70">
              Your personalized {data.dietType || 'balanced'} meal plan is ready with AI-optimized recipes
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground/70">
              Daily workouts tailored to your {data.activityLevel?.replace('-', ' ')} activity level
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground/70">
              All {data.allergies.length} allergies will be avoided in your meal suggestions
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground/70">
              Real-time health tracking with AI insights to keep you motivated
            </span>
          </li>
        </ul>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3 pt-4">
          <Button disabled={loading} onClick={handleSendingHealthMatrix}  className="w-full h-11 bg-primary hover:bg-primary/90 text-white">
            Go to Dashboard
            <CheckCircle2 className="w-4 h-4 ml-2" />
          </Button>
        <Link  href="/">
          <Button disabled={loading} variant="outline" className="w-full h-11">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
