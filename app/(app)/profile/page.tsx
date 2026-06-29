import { Account } from '@/components/profile/Account';
import { EditForm } from '@/components/profile/EditForm';
import { PrivacySettings } from '@/components/profile/PrivacySettings';
import { UpdateForm } from '@/components/profile/UpdateForm';
import { Button } from '@/components/ui/button';
import { profile } from '@/lib/constants';
import { Allergy } from '@/lib/interfaces';
import { getAllAllergies } from '@/serverActions/allergy';
import { getUserProfile } from '@/serverActions/profile';
import { User, Heart, Target, AlertCircle } from 'lucide-react';

export default async function ProfilePage() {
  
  const user = profile; 
  const alleries: Allergy[] =[];
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-foreground antialiased">
        <p className="text-muted-foreground text-sm">Unable to load user profile. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-sky-100">
      {/* Header */}
      <div className="border-b border-sky-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-start flex-wrap gap-3">
            <div>
              <h1 className="text-4xl font-bold text-foreground/90 mb-2 tracking-tight">My Profile</h1>
              <p className="text-muted-foreground text-sm">View and manage your health information</p>
            </div>
            <EditForm id={user.id} />  
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-card border border-sky-500/5 rounded-2xl p-8 space-y-6 shadow-xs">
              <div className="flex justify-center sm:justify-start items-center gap-6 flex-wrap">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-md shadow-sky-500/10">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground/90 capitalize">mohammed nabil</h2>
                  <p className="text-muted-foreground text-sm">Member since January 2026</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-sky-500/5">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Age</p>
                  <p className="font-bold text-foreground/80">{user.age}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Gender</p>
                  <p className="font-bold text-foreground/80 capitalize">{user.gender.toLowerCase()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Height</p>
                  <p className="font-bold text-foreground/80">{user.heightCm} cm</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Weight</p>
                  <p className="font-bold text-foreground/80">{user.weightKg} kg</p>
                </div>
              </div>
            </div>

            {/* Health Metrics */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground/90">Health Metrics</h2>

              <div className="bg-card border border-sky-500/5 rounded-2xl p-6 space-y-6 shadow-xs">
                <div className="space-y-2">
                  <p className="font-semibold text-foreground/90 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-sky-500" />
                    BMI & Body Composition
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="bg-sky-500/[0.01] border border-sky-500/5 p-3 rounded-xl">
                      <p className="text-xs text-muted-foreground mb-1">BMI</p>
                      <p className="font-bold text-foreground/80">{user.bmi}</p>
                      <p className="text-[11px] text-sky-500 font-medium capitalize mt-0.5">{user.bmiCategory || "normal"}</p>
                    </div>
                    <div className="bg-sky-500/[0.01] border border-sky-500/5 p-3 rounded-xl">
                      <p className="text-xs text-muted-foreground mb-1">Lean Mass</p>
                      <p className="font-bold text-foreground/80">{user.leanMass} kg</p>
                    </div>
                    <div className="bg-sky-500/[0.01] border border-sky-500/5 p-3 rounded-xl">
                      <p className="text-xs text-muted-foreground mb-1">Fat Mass</p>
                      <p className="font-bold text-foreground/80">{user.fatMass} kg</p>
                      <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{user.fatPercentage}%</p>
                    </div>
                    <div className="bg-sky-500/[0.01] border border-sky-500/5 p-3 rounded-xl">
                      <p className="text-xs text-muted-foreground mb-1">TDEE</p>
                      <p className="font-bold text-foreground/80">{user.tdee}</p>
                      <p className="text-[11px] text-muted-foreground font-medium mt-0.5">kcal/day</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-sky-500/5 pt-6 space-y-2">
                  <p className="font-semibold text-foreground/90 flex items-center gap-2">
                    <Target className="w-5 h-5 text-sky-500" />
                    Goals
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-sky-500/[0.01] border border-sky-500/5 p-3 rounded-xl">
                      <p className="text-xs text-muted-foreground mb-1">Primary Goal</p>
                      <p className="font-semibold text-foreground/80 capitalize">{user.dietGoal.toLowerCase().replace('_', ' ')}</p>
                    </div>
                    <div className="bg-sky-500/[0.01] border border-sky-500/5 p-3 rounded-xl">
                      <p className="text-xs text-muted-foreground mb-1">Target Weight</p>
                      <p className="font-semibold text-foreground/80">{user.targetWeightKg || 70} kg</p>
                    </div>
                    <div className="bg-sky-500/[0.01] border border-sky-500/5 p-3 rounded-xl">
                      <p className="text-xs text-muted-foreground mb-1">Diet Type</p>
                      <p className="font-semibold text-foreground/80 capitalize">{user.dietType.toLowerCase()}</p>
                    </div>
                    <div className="bg-sky-500/[0.01] border border-sky-500/5 p-3 rounded-xl">
                      <p className="text-xs text-muted-foreground mb-1">Daily Calorie Goal</p>
                      <p className="font-semibold text-foreground/80 text-sky-500">{user.dailyCalorieTarget} kcal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical & Allergies */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground/90">Medical & Allergies</h2>

              <div className="bg-card border border-sky-500/5 rounded-2xl p-6 space-y-4 shadow-xs">
                <div className="bg-sky-500/[0.02] border border-sky-500/10 rounded-xl p-4">
                  <div className="text-sm text-foreground/80">
                    <strong className="text-sky-500 font-bold block mb-1">Allergies:</strong>
                    <div className="flex gap-2 flex-wrap items-center mt-2">
                      {alleries.length > 0 ? (
                        alleries.map((allergy, index) => (
                          <span key={index} className="bg-sky-500/10 text-sky-600 px-2.5 py-0.5 rounded-lg text-xs font-semibold">
                            {allergy.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-xs">No recorded allergies</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-sky-500/[0.02] border border-sky-500/10 rounded-xl p-4">
                  <p className="text-sm text-foreground/80">
                    <strong className="text-sky-500 font-bold block mb-1">Medical Notes:</strong>
                    <span className="text-muted-foreground text-xs block mt-1 leading-relaxed">
                      {user.medicalNotes || "Previous shoulder injury from sports. Currently recovered but being monitored."}
                    </span>
                  </p>
                </div>
                
                <UpdateForm />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-card border border-sky-500/5 rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="font-bold text-foreground/90">Profile Stats</h3>

              <div className="space-y-3">
                <div className="border-b border-sky-500/5 pb-2">
                  <p className="text-xs text-muted-foreground mb-1">Account Status</p>
                  <p className="font-semibold text-sky-500 flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                    Active
                  </p>
                </div>
                <div className="border-b border-sky-500/5 pb-2">
                  <p className="text-xs text-muted-foreground mb-1">Membership Tier</p>
                  <p className="font-semibold text-foreground/80 text-sm">Premium</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Streak</p>
                  <p className="font-semibold text-foreground/80 text-sm">23 days</p>
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="bg-card border border-sky-500/5 rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="font-bold text-foreground/90 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-sky-500" />
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