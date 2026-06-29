'use client';

import { Button } from '@/components/ui/button';
import { Settings, Bell, Eye, Lock, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-sky-100">
      {/* Header */}
      <div className="border-b border-sky-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-foreground/90 mb-2 flex items-center gap-3 tracking-tight">
            <Settings className="w-8 h-8 text-sky-500" />
            Settings
          </h1>
          <p className="text-muted-foreground text-sm">Manage your preferences and account settings</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-card border border-sky-500/5 rounded-2xl p-6 space-y-6 shadow-xs">
            <h2 className="text-2xl font-bold text-foreground/90 flex items-center gap-3">
              <Bell className="w-6 h-6 text-sky-500" />
              Notifications
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-sky-500/[0.02] border border-transparent hover:border-sky-500/5 transition-all duration-200">
                <div>
                  <p className="font-semibold text-foreground/80">Meal Reminders</p>
                  <p className="text-sm text-muted-foreground">Get reminded to log your meals</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded-md accent-sky-500 border-sky-500/10 cursor-pointer" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-sky-500/[0.02] border border-transparent hover:border-sky-500/5 transition-all duration-200">
                <div>
                  <p className="font-semibold text-foreground/80">Workout Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when workouts are ready</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded-md accent-sky-500 border-sky-500/10 cursor-pointer" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-sky-500/[0.02] border border-transparent hover:border-sky-500/5 transition-all duration-200">
                <div>
                  <p className="font-semibold text-foreground/80">Progress Updates</p>
                  <p className="text-sm text-muted-foreground">Weekly summary of your progress</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded-md accent-sky-500 border-sky-500/10 cursor-pointer" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-sky-500/[0.02] border border-transparent hover:border-sky-500/5 transition-all duration-200">
                <div>
                  <p className="font-semibold text-foreground/80">AI Insights</p>
                  <p className="text-sm text-muted-foreground">Daily AI-powered health recommendations</p>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded-md accent-sky-500 border-sky-500/10 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-card border border-sky-500/5 rounded-2xl p-6 space-y-6 shadow-xs">
            <h2 className="text-2xl font-bold text-foreground/90 flex items-center gap-3">
              <Lock className="w-6 h-6 text-sky-500" />
              Privacy & Security
            </h2> 

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-sky-500/[0.02] border border-transparent hover:border-sky-500/5 transition-all duration-200">
                <div>
                  <p className="font-semibold text-foreground/80">Private Profile</p>
                  <p className="text-sm text-muted-foreground">Only you can see your health data</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded-md accent-sky-500 border-sky-500/10 cursor-pointer" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-sky-500/[0.02] border border-transparent hover:border-sky-500/5 transition-all duration-200">
                <div>
                  <p className="font-semibold text-foreground/80">Data Analytics</p>
                  <p className="text-sm text-muted-foreground">Allow Bonyan to improve using your data</p>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded-md accent-sky-500 border-sky-500/10 cursor-pointer" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-sky-500/[0.02] border border-transparent hover:border-sky-500/5 transition-all duration-200">
                <div>
                  <p className="font-semibold text-foreground/80">Research Studies</p>
                  <p className="text-sm text-muted-foreground">Participate in health research (optional)</p>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded-md accent-sky-500 border-sky-500/10 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-card border border-sky-500/5 rounded-2xl p-6 space-y-6 shadow-xs">
            <h2 className="text-2xl font-bold text-foreground/90 flex items-center gap-3">
              <Eye className="w-6 h-6 text-sky-500" />
              Appearance
            </h2>

            <div className="space-y-4">
              <div>
                <p className="font-semibold text-foreground/80 mb-3 text-sm">Theme</p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-xl border border-sky-500/20 bg-sky-500/5 text-sky-500 font-bold text-sm cursor-pointer transition-all">
                    Light
                  </button>
                  <button className="px-4 py-2 rounded-xl border border-sky-500/10 hover:border-sky-500/30 font-medium text-foreground/80 text-sm cursor-pointer transition-all">
                    Dark
                  </button>
                  <button className="px-4 py-2 rounded-xl border border-sky-500/10 hover:border-sky-500/30 font-medium text-foreground/80 text-sm cursor-pointer transition-all">
                    System
                  </button>
                </div>
              </div>

              <div>
                <p className="font-semibold text-foreground/80 mb-3 text-sm">Accent Color</p>
                <div className="flex gap-3">
                  {[
                    { name: 'Sky', color: 'bg-sky-500 ring-2 ring-offset-2 ring-sky-500' },
                    { name: 'Blue', color: 'bg-blue-500 opacity-60 hover:opacity-100 transition-opacity' },
                    { name: 'Indigo', color: 'bg-indigo-500 opacity-60 hover:opacity-100 transition-opacity' },
                    { name: 'Slate', color: 'bg-slate-500 opacity-60 hover:opacity-100 transition-opacity' },
                  ].map((accent) => (
                    <button
                      key={accent.name}
                      className={`w-10 h-10 rounded-xl cursor-pointer ${accent.color}`}
                      title={accent.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Language & Region */}
          <div className="bg-card border border-sky-500/5 rounded-2xl p-6 space-y-6 shadow-xs">
            <h2 className="text-2xl font-bold text-foreground/90 flex items-center gap-3">
              <Globe className="w-6 h-6 text-sky-500" />
              Language & Region
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Language</label>
                <select className="w-full p-3 rounded-xl border border-sky-500/10 bg-background text-foreground/80 focus:border-sky-500/30 focus:outline-none transition-colors text-sm font-medium cursor-pointer">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>Arabic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Timezone</label>
                <select className="w-full p-3 rounded-xl border border-sky-500/10 bg-background text-foreground/80 focus:border-sky-500/30 focus:outline-none transition-colors text-sm font-medium cursor-pointer">
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC-6 (Central Time)</option>
                  <option>UTC-7 (Mountain Time)</option>
                  <option>UTC-8 (Pacific Time)</option>
                  <option>UTC+0 (GMT)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Measurement Units</label>
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 rounded-xl border border-sky-500/20 bg-sky-500/5 text-sky-500 font-bold text-sm cursor-pointer transition-all">
                    Metric (kg, cm)
                  </button>
                  <button className="flex-1 px-4 py-2 rounded-xl border border-sky-500/10 hover:border-sky-500/30 font-medium text-foreground/80 text-sm cursor-pointer transition-all">
                    Imperial (lbs, in)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3 pt-2">
            <Button className="flex-1 h-11 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-md shadow-sky-500/10 cursor-pointer active:scale-95 transition-all text-sm">
              Save Changes
            </Button>
            <Button variant="outline" className="flex-1 h-11 border-sky-500/10 hover:bg-sky-500/5 text-foreground/80 hover:text-sky-500 rounded-xl cursor-pointer transition-all duration-200 text-sm">
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}