'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, ChevronLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { BasicInfoStep } from './steps/basic-info-step';
import { BodyCompositionStep } from './steps/body-composition-step';
import { LifestyleStep } from './steps/lifestyle-step';
import { GoalsStep } from './steps/goals-step';
import { AllergiesStep } from './steps/allergies-step';
import { MedicalNotesStep } from './steps/medical-notes-step';
import { AnalysisStep } from './steps/analysis-step';
import { OnboardingData, Gender, ActivityLevel, DietType, DietGoal } from '@/lib/interfaces';
import { useSearchParams } from 'next/navigation';
import { steps } from '@/lib/constants';

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  //const params = useSearchParams();
  const [data, setData] = useState<OnboardingData>({
    age: 0,
    gender: Gender.MALE,
    height: 0,
    weight: 0,
    musclePercentage: 0,
    fatPercentage: 0,
    activityLevel: ActivityLevel.LIGHTLY_ACTIVE,
    dietGoal: DietGoal.GAIN_MUSCLE,
    targetWeight: 0,
    dailyCalories: 0,
    dietType: DietType.BALANCED,
    allergies: [],
    medicalNotes: '',
  });

  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep data={data} updateData={updateData} onNext={nextStep} />;
      case 1:
        return <BodyCompositionStep data={data} updateData={updateData} onNext={nextStep} />;
      case 2:
        return <LifestyleStep data={data} updateData={updateData} onNext={nextStep} />;
      case 3:
        return <GoalsStep data={data} updateData={updateData} onNext={nextStep} />;
      case 4:
        return <AllergiesStep data={data} updateData={updateData} onNext={nextStep} />;
      case 5:
        return <MedicalNotesStep data={data} updateData={updateData} onNext={nextStep} />;
      case 6:
        return <AnalysisStep setCurrentStep={setCurrentStep} data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-gray-50 to-sky-50/30 py-8 px-4 antialiased">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Let&apos;s Get Started</h1>
            <p className="text-sm font-mono font-bold text-sky-700">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex gap-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${
                  index <= currentStep
                    ? 'bg-sky-500 shadow-sm shadow-sky-500/20'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>

          {/* Step Labels */}
          <div className="hidden md:flex gap-2 mt-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex-1 text-xs transition-opacity duration-200 ${
                  index === currentStep
                    ? 'text-slate-900 font-bold'
                    : index < currentStep
                      ? 'text-sky-600 opacity-80'
                      : 'text-slate-400 opacity-40'
                }`}
              >
                <p className="font-semibold">{step.title}</p>
                <p className={index === currentStep ? "text-sky-600/80" : "text-slate-500"}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-2xl p-8 sm:p-10 mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        {currentStep < steps.length - 1 && (
          <div className="flex gap-4">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
              className="flex-1 border-slate-200 hover:bg-slate-50 text-slate-700 font-medium h-[44px] rounded-xl active:scale-[0.99] transition-transform"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={nextStep}
              className="flex-1 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-semibold h-[44px] rounded-xl shadow-md shadow-sky-600/10 active:scale-[0.99] transition-all"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}