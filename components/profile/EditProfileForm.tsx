"use client";
import { ActivityLevel, DietGoal, DietType, Gender, HealthData, HealthProfileData } from '@/lib/interfaces'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import { editProfile } from '@/serverActions/profile';

const EditProfileForm = ({id,user}:{id:string,user:HealthProfileData }) => {
 const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState<HealthData>({
    age: user.age ,
    weightKg: user.weightKg,
    heightCm: user.heightCm,
    muscleMassKg: user.muscleMassKg,
    fatPercentage: user.fatPercentage,
    gender: user.gender,
    activityLevel:user.activityLevel ,
    medicalNotes: user.medicalNotes || "",
    dietType: user.dietType,
    dietGoal: user.dietGoal,
    targetWeightKg: user.targetWeightKg || 70,
    dailyCalorieTarget: user.dailyCalorieTarget 
  });



  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    let parsedValue:string | number = value;
    if (type === "number" && value.length) {
        parsedValue = value.includes(".") ? parseFloat(value) : parseInt(value, 10);
    }

    setFormData((prev:HealthData) => ({
        ...prev,
        [name]: parsedValue,
    }));
  };

    const handleSubmit = async (e:React.SubmitEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        if(formData.age<15 || formData.age > 120) {
          toast.error("Please enter valid age between 15 and 120 ");
          return;
        }
        
        try {
          const message = await editProfile(id,formData);
          router.refresh();

          toast.success(message || 'Profile is updated successfully !')


        } catch(error:any) {
          setError(error.message);

        } finally {
          setLoading(false)
        }

    };
    return (
      <>
      {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        
        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input min={15}  max={120} disabled={loading} type="number" name="age" value={formData.age} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 p-2 border" required />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select disabled={loading} name="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 p-2 border">
            <option value={Gender.MALE}>Male</option>
            <option value={Gender.FEMALE}>Female</option>
            <option value={Gender.OTHER}>Other</option>
          </select>
        </div>

        {/* Weight & Height */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input min={50} max={500} disabled={loading} type="number" step="0.1" name="weightKg" value={formData.weightKg} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 p-2 border" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
          <input min={50} max={500} disabled={loading} type="number" step="0.1" name="heightCm" value={formData.heightCm} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 p-2 border" />
        </div>

        {/* Muscle Mass & Fat Percentage */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Muscle Mass (kg)</label>
          <input disabled={loading} type="number" step="0.1" name="muscleMassKg" value={formData.muscleMassKg} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 p-2 border" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fat Percentage (%)</label>
          <input disabled={loading} type="number" step="0.1" name="fatPercentage" value={formData.fatPercentage} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 p-2 border" />
        </div>

        {/* Activity Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Activity Level</label>
          <select disabled={loading} name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 p-2 border">
            <option value={ActivityLevel.SEDENTARY}>Sedentary</option>
            <option value={ActivityLevel.LIGHTLY_ACTIVE}>Lightly Active</option>
            <option value={ActivityLevel.MODERATELY_ACTIVE}>Moderately Active</option>
            <option value={ActivityLevel.VERY_ACTIVE}>Very Active</option>
          </select>
        </div>

        {/* Diet Type & Diet Goal */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Diet Type</label>
          <select disabled={loading} name="dietType" value={formData.dietType} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 p-2 border">
            <option value={DietType.BALANCED}>Balanced</option>
            <option value={DietType.PALEO}>Paleo</option>
            <option value={DietType.VEGAN}>Vegan</option>
            <option value={DietType.HIGH_PROTEIN}>High Protein</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Diet Goal</label>
          <select disabled={loading} name="dietGoal" value={formData.dietGoal} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 p-2 border">
            <option value={DietGoal.LOSE_WEIGHT}>Lose Weight</option>
            <option value={DietGoal.MAINTAIN_WEIGHT}>Maintain Weight</option>
            <option value={DietGoal.GAIN_MUSCLE}>Gain Muscle</option>
            <option value={DietGoal.IMPROVE_HEALTH }>Improve Health</option>

          </select>
        </div>

        {/* Target Weight & Calorie Target */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Target Weight (kg)</label>
          <input min={50} disabled={loading} type="number" step="0.1" name="targetWeightKg" value={formData.targetWeightKg} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 p-2 border" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Daily Calorie Target</label>
          <input min={1000} disabled={loading} type="number" name="dailyCalorieTarget" value={formData.dailyCalorieTarget} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 p-2 border" />
        </div>

        {/* Medical Notes */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Medical Notes</label>
          <textarea disabled={loading} name="medicalNotes" value={formData.medicalNotes} onChange={handleChange} rows="3" className="mt-1 block w-full rounded border-gray-300 p-2 border"></textarea>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 mt-4">
            <Button type="submit" disabled={loading} className="w-full bg-green-800 text-white p-2 rounded-lg hover:bg-green-900 transition disabled:bg-green-300">
            {loading ? "Saving Changes..." : "Save Metrics"}
            </Button>
        </div>

      </form>
      </>
  )
}

export default EditProfileForm