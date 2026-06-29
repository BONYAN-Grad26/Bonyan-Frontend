import { Input } from '@/components/ui/input';
import { DietGoal, DietType, OnboardingData } from '@/lib/interfaces';

interface GoalsStepProps {
  data: Partial<OnboardingData>;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const dietGoals = [
  { id: DietGoal.LOSE_WEIGHT, label: 'Weight Loss', icon: '⬇️' },
  { id: DietGoal.GAIN_MUSCLE, label: 'Muscle Gain', icon: '💪' },
  { id: DietGoal.MAINTAIN_WEIGHT, label: 'Maintenance', icon: '⚖️' },
  { id: DietGoal.IMPROVE_HEALTH, label: "Improve Health", icon: '🏹' }
];

const dietTypes = [
  { id: DietType.BALANCED, label: 'Balanced Diet', description: 'Moderate macros' },
  { id: DietType.VEGAN, label: 'Vegan', description: 'Plant-based' },
  { id: DietType.PALEO, label: 'Paleo', description: 'Whole foods' },
  { id: DietType.HIGH_PROTEIN, label: 'High Protein', description: 'For muscle building' },
  { id: DietType.MEDITERRANEAN, label: "Mediterranean", description: "Healthy fats and whole grains" }
];

export function GoalsStep({ data, updateData }: GoalsStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Your Goals</h2>
        <p className="text-slate-500 text-sm">What are you trying to achieve?</p>
      </div>

      {/* Diet Goal */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">Primary Goal</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {dietGoals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => updateData({ dietGoal: goal.id })}
              className={`p-4 rounded-xl border-2 transition-all text-center group ${
                data.dietGoal === goal.id
                  ? 'border-sky-500 bg-sky-50/50 shadow-sm shadow-sky-500/[0.03]'
                  : 'border-slate-100 hover:border-sky-300'
              }`}
            >
              <div className="text-3xl mb-2 select-none">{goal.icon}</div>
              <p className={`font-semibold text-xs sm:text-sm transition-colors ${
                data.dietGoal === goal.id ? 'text-sky-600' : 'text-slate-700 group-hover:text-sky-600'
              }`}>
                {goal.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Target Weight */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Target Weight (kg)</label>
        <Input
          type="number"
          placeholder="Enter your target weight"
          value={data.targetWeight || ''}
          onChange={(e) => updateData({ targetWeight: parseInt(e.target.value) || 0 })}
          className="h-11 rounded-xl border-slate-200 focus-visible:ring-sky-500"
          min={20}
          max={500}
        />
      </div>

      {/* Daily Calorie Target */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Daily Calorie Target</label>
        <Input
          type="number"
          placeholder="Enter daily calorie goal (e.g., 2000)"
          value={data.dailyCalories || ''}
          onChange={(e) => updateData({ dailyCalories: parseInt(e.target.value) || 0 })}
          className="h-11 rounded-xl border-slate-200 focus-visible:ring-sky-500"
          min={1000}
        />
        <p className="text-xs text-slate-400 font-medium">Leave empty for AI to calculate based on your metrics</p>
      </div>

      {/* Diet Type */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">Preferred Diet Type</h3>
        <div className="grid gap-3">
          {dietTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => updateData({ dietType: type.id })}
              className={`p-4 rounded-xl border-2 transition-all text-left group ${
                data.dietType === type.id
                  ? 'border-sky-500 bg-sky-50/50 shadow-sm shadow-sky-500/[0.03]'
                  : 'border-slate-100 hover:border-sky-300'
              }`}
            >
              <p className={`font-semibold transition-colors ${
                data.dietType === type.id ? 'text-sky-600' : 'text-slate-800 group-hover:text-sky-600'
              }`}>
                {type.label}
              </p>
              <p className="text-sm text-slate-500">{type.description}</p>
            </button>
          ))}
        </div>
      </div>

      {data.dietGoal && data.dietType && (
        <div className="bg-sky-50/40 border border-sky-100 rounded-xl p-6">
          <h3 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wider text-sky-700">Your Plan Overview</h3>
          <p className="text-sm text-slate-700 font-medium">
            We&apos;ll create a personalized {data.dietType} meal plan to help you achieve your{' '}
            {dietGoals.find((g) => g.id === data.dietGoal)?.label.toLowerCase()} goal.
          </p>
        </div>
      )}
    </div>
  );
}