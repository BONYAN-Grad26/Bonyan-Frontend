"use client";

import { ActivityLevel, DietGoal, DietType, Gender, HealthData, HealthProfileData } from '@/lib/interfaces';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import { editProfile } from '@/serverActions/profile';
import CustomInput from '../ui/CustomInput';
import CustomSelect from '../ui/CustomSelect';

const EditProfileForm = ({ id, user }: { id: string; user: HealthProfileData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<HealthData>({
    age: user.age,
    weightKg: user.weightKg,
    heightCm: user.heightCm,
    muscleMassKg: user.muscleMassKg,
    fatPercentage: user.fatPercentage,
    gender: user.gender,
    activityLevel: user.activityLevel,
    medicalNotes: user.medicalNotes || "",
    dietType: user.dietType,
    dietGoal: user.dietGoal,
    targetWeightKg: user.targetWeightKg || 70,
    dailyCalorieTarget: user.dailyCalorieTarget,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    let parsedValue: string | number = value;
    if (type === "number" && value.length) {
      parsedValue = value.includes(".") ? parseFloat(value) : parseInt(value, 10);
    }

    setFormData((prev: HealthData) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.age < 15 || formData.age > 120) {
      toast.error("Please enter a valid age between 15 and 120");
      setLoading(false);
      return;
    }

    try {
      const message = await editProfile(id, formData);
      router.refresh();
      toast.success(message || 'Profile updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="p-3 mb-4 text-rose-500 bg-rose-500/10 border border-rose-500/10 text-sm font-medium rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Age */}
        <CustomInput
          label="Age"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          disabled={loading}
          min={15}
          max={120}
          required
        />

        {/* Gender */}
        <CustomSelect
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          disabled={loading}
        >
          <option value={Gender.MALE}>Male</option>
          <option value={Gender.FEMALE}>Female</option>
          <option value={Gender.OTHER}>Other</option>
        </CustomSelect>

        {/* Weight */}
        <CustomInput
          label="Weight (kg)"
          type="number"
          name="weightKg"
          value={formData.weightKg}
          onChange={handleChange}
          disabled={loading}
          min={30}
          max={300}
          step="0.1"
          required
        />

        {/* Height */}
        <CustomInput
          label="Height (cm)"
          type="number"
          name="heightCm"
          value={formData.heightCm}
          onChange={handleChange}
          disabled={loading}
          min={50}
          max={250}
          step="0.1"
          required
        />

        {/* Muscle Mass */}
        <CustomInput
          label="Muscle Mass (kg)"
          type="number"
          name="muscleMassKg"
          value={formData.muscleMassKg}
          onChange={handleChange}
          disabled={loading}
          step="0.1"
          required
        />

        {/* Fat Percentage */}
        <CustomInput
          label="Fat Percentage (%)"
          type="number"
          name="fatPercentage"
          value={formData.fatPercentage}
          onChange={handleChange}
          disabled={loading}
          step="0.1"
          required
        />

        {/* Activity Level */}
        <CustomSelect
          label="Activity Level"
          name="activityLevel"
          value={formData.activityLevel}
          onChange={handleChange}
          disabled={loading}
        >
          <option value={ActivityLevel.SEDENTARY}>Sedentary</option>
          <option value={ActivityLevel.LIGHTLY_ACTIVE}>Lightly Active</option>
          <option value={ActivityLevel.MODERATELY_ACTIVE}>Moderately Active</option>
          <option value={ActivityLevel.VERY_ACTIVE}>Very Active</option>
        </CustomSelect>

        {/* Diet Type */}
        <CustomSelect
          label="Diet Type"
          name="dietType"
          value={formData.dietType}
          onChange={handleChange}
          disabled={loading}
        >
          <option value={DietType.BALANCED}>Balanced</option>
          <option value={DietType.PALEO}>Paleo</option>
          <option value={DietType.VEGAN}>Vegan</option>
          <option value={DietType.HIGH_PROTEIN}>High Protein</option>
          <option value={DietType.KETOGENIC}>Ketogenic</option>
          <option value={DietType.VEGETARIAN}>Vegetarian</option>
          <option value={DietType.MEDITERRANEAN}>Mediterranean</option>
          <option value={DietType.LOW_CARB}>Low Carb</option>
          <option value={DietType.INTERMITTENT_FASTING}>Intermittent Fasting</option>
        </CustomSelect>

        {/* Diet Goal */}
        <CustomSelect
          label="Diet Goal"
          name="dietGoal"
          value={formData.dietGoal}
          onChange={handleChange}
          disabled={loading}
        >
          <option value={DietGoal.LOSE_WEIGHT}>Lose Weight</option>
          <option value={DietGoal.MAINTAIN_WEIGHT}>Maintain Weight</option>
          <option value={DietGoal.GAIN_MUSCLE}>Gain Muscle</option>
          <option value={DietGoal.IMPROVE_HEALTH}>Improve Health</option>
        </CustomSelect>

        {/* Target Weight */}
        <CustomInput
          label="Target Weight (kg)"
          type="number"
          name="targetWeightKg"
          value={formData.targetWeightKg}
          onChange={handleChange}
          disabled={loading}
          min={30}
          step="0.1"
          required
        />

        {/* Calorie Target */}
        <CustomInput
          label="Daily Calorie Target"
          type="number"
          name="dailyCalorieTarget"
          value={formData.dailyCalorieTarget}
          onChange={handleChange}
          disabled={loading}
          min={1000}
          required
        />

        {/* Medical Notes */}
        <div className="md:col-span-2 space-y-1">
          <label className="block text-sm font-medium text-muted-foreground">
            Medical Notes
          </label>
          <textarea
            disabled={loading}
            name="medicalNotes"
            value={formData.medicalNotes}
            onChange={handleChange}
            rows={3}
            className="block w-full rounded-xl border border-sky-500/30 bg-card p-2 text-foreground/80 focus:border-sky-500/70 focus:outline-none transition-colors disabled:opacity-50 text-sm font-medium"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 mt-4">
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-md shadow-sky-500/10 cursor-pointer active:scale-95 transition-all disabled:bg-sky-500/40 text-sm"
          >
            {loading ? "Saving Changes..." : "Save Metrics"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditProfileForm;