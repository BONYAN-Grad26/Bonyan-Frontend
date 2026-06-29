import { ActivityLevel, OnboardingData } from "@/lib/interfaces";

interface LifestyleStepProps {
  data: Partial<OnboardingData>;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const activityLevels = [
  {
    id: ActivityLevel.SEDENTARY,
    label: 'Sedentary',
    description: 'Little or no exercise',
    emoji: '🪑',
  },
  {
    id: ActivityLevel.LIGHTLY_ACTIVE,
    label: 'Lightly Active',
    description: 'Exercise 1-3 days/week',
    emoji: '🚶',
  },
  {
    id: ActivityLevel.MODERATELY_ACTIVE,
    label: 'Moderately Active',
    description: 'Exercise 3-5 days/week',
    emoji: '🏃',
  },
  {
    id: ActivityLevel.VERY_ACTIVE,
    label: 'Very Active',
    description: 'Exercise 6-7 days/week',
    emoji: '💪',
  },
];

export function LifestyleStep({ data, updateData }: LifestyleStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Your Lifestyle</h2>
        <p className="text-slate-500 text-sm">How active is your daily routine?</p>
      </div>

      <div className="grid gap-4">
        {activityLevels.map((level) => (
          <button
            key={level.id}
            onClick={() => updateData({ activityLevel: level.id })}
            className={`p-4 rounded-xl border-2 transition-all text-left group ${
              data.activityLevel === level.id
                ? 'border-sky-500 bg-sky-50/50 shadow-sm shadow-sky-500/[0.03]'
                : 'border-slate-100 hover:border-sky-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className={`font-semibold mb-1 transition-colors ${
                  data.activityLevel === level.id ? 'text-sky-600' : 'text-slate-800 group-hover:text-sky-600'
                }`}>
                  {level.label}
                </p>
                <p className="text-sm text-slate-500">{level.description}</p>
              </div>
              <span className="text-3xl select-none">{level.emoji}</span>
            </div>
          </button>
        ))}
      </div>

      {data.activityLevel && (
        <div className="bg-sky-50/40 border border-sky-100 rounded-xl p-6">
          <h3 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wider text-sky-700">What This Means</h3>
          <p className="text-sm text-slate-700 font-medium">
            {activityLevels.find((l) => l.id === data.activityLevel)?.description}
          </p>
          <p className="text-xs text-slate-400 font-medium mt-3 leading-relaxed">
            Based on your activity level, we&apos;ll calculate your daily calorie needs and adjust your meal plan accordingly.
          </p>
        </div>
      )}
    </div>
  );
}