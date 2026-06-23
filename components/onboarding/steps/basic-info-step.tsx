import { Input } from '@/components/ui/input';
import { Gender, OnboardingData } from '@/lib/interfaces';

interface BasicInfoStepProps {
  data: Partial<OnboardingData>;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export function BasicInfoStep({ data, updateData }: BasicInfoStepProps) {
  const calculateBMI = () => {
    if (data.height && data.weight) {
      const heightInMeters = data.height / 100;
      return (data.weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return 0;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Tell Us About You</h2>
        <p className="text-foreground/60">Start with your basic measurements</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Age */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Age</label>
          <Input
            type="number"
            placeholder="Enter your age"
            value={data.age || ''}
            onChange={(e) => {
              
              updateData({ age: parseInt(e.target.value) || 0 })
            }}
            className="h-11"
            min={10}
            max={120}
            required
          />
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Gender</label>
          <select
            required
            value={data.gender}
            onChange={(e) => updateData({ gender: e.target.value as Gender })}
            className="w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground"
          >
            <option value={Gender.MALE}>Male</option>
            <option value={Gender.FEMALE}>Female</option>
            <option value={Gender.OTHER}>OTHER</option>

          </select>
        </div>

        {/* Height */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Height (cm)</label>
          <Input
            type="number"
            placeholder="Enter your height"
            value={data.height || ''}
            onChange={(e) => updateData({ height: parseInt(e.target.value) || 0 })}
            className="h-11"
            min={50}
            max={500}
            required
          />
        </div>

        {/* Weight */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Weight (kg)</label>
          <Input
            type="number"
            placeholder="Enter your weight"
            value={data.weight || "" }
            onChange={(e) => updateData({ weight: parseInt(e.target.value) || 0 })}
            className="h-11"
            min={20}
            max={500}
            required
          />
        </div>
      </div>

      {/* BMI Display */}
      {data.height && data.weight && (
        <div className="glass-primary rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground/60 mb-1">Your Current BMI</p>
            <p className="text-3xl font-bold text-primary">{calculateBMI()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-foreground mb-1">Category</p>
            <p className="text-lg text-foreground">
              {calculateBMI() < 18.5
                ? 'Underweight'
                : calculateBMI() < 25
                  ? 'Normal'
                  : calculateBMI() < 30
                    ? 'Overweight'
                    : 'Obese'}
            </p>
          </div>
        </div>
      )}

      <p className="text-sm text-foreground/60">This information helps us create your personalized health plan.</p>
    </div>
  );
}
