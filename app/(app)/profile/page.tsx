

import { Account } from '@/components/profile/Account';
import { EditForm } from '@/components/profile/EditForm';
import { PrivacySettings } from '@/components/profile/PrivacySettings';
import { UpdateForm } from '@/components/profile/UpdateForm';
import { Button } from '@/components/ui/button';
import { getAllAllergies } from '@/serverActions/allergy';
import { getUserProfile } from '@/serverActions/profile';
import { User, Edit2, Heart, Target, AlertCircle } from 'lucide-react';

export default async function ProfilePage() {
  
  const user = await getUserProfile(); 
  const alleries = await getAllAllergies();
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground/60">Unable to load user profile. Please try again later.</p>
      </div>
    );
  }




  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-start flex-wrap gap-3">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">My Profile</h1>
              <p className="text-foreground/60">View and manage your health information</p>
            </div>
            <EditForm id={user.id} />  

          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="glass rounded-2xl p-8 space-y-6">
              <div className="flex  justify-center sm:justify-start items-center gap-6 flex-wrap">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">mohammed nabil</h2>
                  <p className="text-foreground/60">Member since January 2026</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border/50">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Age</p>
                  <p className="font-bold text-foreground">{user.age}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">gender</p>
                  <p className="font-bold text-foreground">{user.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Height</p>
                  <p className="font-bold text-foreground">{user.heightCm} cm</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Weight</p>
                  <p className="font-bold text-foreground">{user.weightKg} kg</p>
                </div>
              </div>
            </div>

            {/* Health Metrics */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Health Metrics</h2>

              <div className="glass rounded-2xl p-6 space-y-6">
                <div className="space-y-2">
                  <p className="font-semibold text-foreground flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    BMI & Body Composition
                  </p>
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-foreground/60 mb-1">BMI</p>
                      <p className="font-bold text-foreground">{user.bmi}</p>
                      <p className="text-xs text-foreground/60">{user.bmiCategory || "normal"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60 mb-1">Lean Mass</p>
                      <p className="font-bold text-foreground">{user.leanMass} kg</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60 mb-1">Fat Mass</p>
                      <p className="font-bold text-foreground">{user.fatMass} kg</p>
                      <p className="text-xs text-foreground/60">{user.fatPercentage}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60 mb-1">TDEE</p>
                      <p className="font-bold text-foreground">{user.tdee}</p>
                      <p className="text-xs text-foreground/60">kcal/day</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/50 pt-6 space-y-2">
                  <p className="font-semibold text-foreground flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Goals
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-foreground/60 mb-2">Primary Goal</p>
                      <p className="font-semibold text-foreground">{user.dietGoal.toLowerCase()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60 mb-2">Target Weight</p>
                      <p className="font-semibold text-foreground">{user.targetWeightKg || 100} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60 mb-2">Diet Type</p>
                      <p className="font-semibold text-foreground">{user.dietType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60 mb-2">Daily Calorie Goal</p>
                      <p className="font-semibold text-foreground">{user.dailyCalorieTarget} kcal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical & Allergies */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Medical & Allergies</h2>

              <div className="glass rounded-2xl p-6 space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                  <div className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Allergies:</strong>

                    <div className="flex gap-3 flex-wrap items-center">
                      {alleries.map((allergy, index) => (
                        <span key={index}>-{allergy.name}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Medical Notes:</strong> Previous shoulder injury from sports. Currently recovered but being monitored.
                  </p>
                </div>
                <UpdateForm />


              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="glass rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-foreground">Profile Stats</h3>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-foreground/60 mb-1">Account Status</p>
                  <p className="font-semibold text-green-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-600"></span>
                    Active
                  </p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60 mb-1">Membership Tier</p>
                  <p className="font-semibold text-foreground">Premium</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60 mb-1">Streak</p>
                  <p className="font-semibold text-foreground">23 days</p>
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="glass rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                Privacy & Security
              </h3>

              <PrivacySettings />
            </div>

            {/* Account Actions */}
            <Account />

          </div>
        </div>
      </div>
    </div>
  );
}
