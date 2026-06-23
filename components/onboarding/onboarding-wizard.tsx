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


const steps = [
  { title: 'Basic Info', description: 'Your measurements' },
  { title: 'Body Composition', description: 'Muscle & fat %' },
  { title: 'Lifestyle', description: 'Activity level' },
  { title: 'Goals', description: 'Your targets' },
  { title: 'Allergies', description: 'Dietary restrictions' },
  { title: 'Medical Notes', description: 'Health info' },
  { title: 'Analysis', description: 'Your AI plan' },
];

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const params = useSearchParams();
  const [data, setData] = useState<OnboardingData>({
    age: 0,
    gender: Gender.MALE,
    height: 20,
    weight: 20,
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
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">Let&apos;s Get Started</h1>
            <p className="text-sm text-foreground/60">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex gap-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex-1 h-1.5 rounded-full transition-colors ${
                  index <= currentStep
                    ? 'bg-primary'
                    : 'bg-border'
                }`}
              />
            ))}
          </div>

          {/* Step Labels */}
          <div className="hidden md:flex gap-2 mt-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex-1 text-xs transition-opacity ${
                  index === currentStep
                    ? 'text-foreground font-semibold'
                    : index < currentStep
                      ? 'text-foreground/50 opacity-50'
                      : 'text-foreground/30 opacity-30'
                }`}
              >
                <p className="font-medium">{step.title}</p>
                <p className="text-foreground/60">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="glass rounded-2xl p-8 sm:p-10 mb-6">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        {currentStep < steps.length - 1 && (
          <div className="flex gap-4">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={nextStep}
              className="flex-1 bg-primary hover:bg-primary/90 text-white"
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
