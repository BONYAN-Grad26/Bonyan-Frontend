'use client';

import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, TrendingUp, Brain, Leaf, Sparkles } from 'lucide-react';
import Link from 'next/link';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 px-4">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-sky-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-[10%] left-[-10%] w-100 h-100 bg-sky-400/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div data-aos-delay="200" data-aos="fade-right" className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
              <div className="space-y-5">
                {/* شارة علوية محددة بلون اللوجو اللبني */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-500/10 rounded-full border border-sky-500/20">
                  <Zap className="w-3.5 h-3.5 text-sky-400" />
                  <span className="text-xs font-semibold text-sky-400 tracking-wide uppercase">Your AI Health Companion</span>
                </div>

                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-foreground text-balance leading-[1.15]">
                  Your AI{' '}
                  <span className="bg-linear-to-b from-sky-400 to-sky-600 bg-clip-text text-transparent">
                    Diet Coach & Doctor
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground text-balance max-w-xl leading-relaxed">
                  Get personalized meal plans, AI-powered workouts, and real-time health insights tailored to your unique goals.
                </p>
              </div>

              {/* أزرار تفاعلية متناسقة مع الـ Navbar */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-base font-semibold"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-sky-500/20 text-foreground/80 hover:text-sky-400 hover:bg-sky-400/5 hover:border-sky-500/40 transition-all"
                >
                  Watch Demo
                </Button>
              </div>

              {/* Social Proof تم ضبطه ليلائم الثيم اللبني والأسود */}
              <div className="flex items-center gap-6 pt-4 border-t border-border/40 max-w-md">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-b from-sky-400 to-sky-500 border-2 border-background flex items-center justify-center text-white text-xs font-bold shadow-sm"
                    >
                      {i}K
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="font-bold text-foreground">10K+ health enthusiasts</p>
                  <p>transformed their bodies with Bonyan</p>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Card */}
            <div data-aos-delay="200" data-aos="fade-left" className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-b from-card to-card/50 border border-sky-500/10 shadow-2xl shadow-sky-500/5 animate-in fade-in zoom-in-95 duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-sky-400/5 flex items-center justify-center">
                <div className="text-center space-y-4 p-6">
                  <div className="w-20 h-20 bg-sky-500/10 border border-sky-500/20 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                    <Brain className="w-10 h-10 text-sky-400 animate-pulse" />
                  </div>
                  <p className="text-sm font-medium text-foreground/60 tracking-wide">AI Health Dashboard Preview</p>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-sky-400/80 bg-sky-400/5 px-3 py-1 rounded-md border border-sky-400/10">
                    <Sparkles className="w-3.5 h-3.5" />
                    Ultra-Minimalist Interface
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section   id="features" className="py-20 sm:py-32 px-4 border-t border-sky-500/10 relative">
        <div data-aos="fade-down" className="max-w-7xl mx-auto">
          <div  className="text-center space-y-4 mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground text-balance">
              Why Choose Bonyan?
            </h2>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Combining AI intelligence with medical expertise for comprehensive health transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 - AI Coaching */}
            <div className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-sky-500/30 shadow-sm transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Brain className="w-6 h-6 text-sky-400" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">AI-Powered Coaching</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Personalized meal plans and workout routines created by advanced AI algorithms that learn from your preferences and progress.
              </p>
            </div>

            {/* Feature 2 - Smart Meal Planning */}
            <div className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-sky-500/30 shadow-sm transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Leaf className="w-6 h-6 text-sky-400" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Smart Meal Planning</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Never wonder what to eat. Get weekly meal plans with macro tracking, allergen warnings, and nutritional insights.
              </p>
            </div>

            {/* Feature 3 - Tracking */}
            <div className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-sky-500/30 shadow-sm transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-6 h-6 text-sky-400" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Real-Time Health Tracking</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Monitor your progress with interactive dashboards, health metrics, and AI-generated insights about your fitness journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section data-aos="fade-down" id="how-it-works" className="py-20 sm:py-32 px-4 bg-muted/30 border-t border-b border-sky-500/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-center text-balance mb-24">
            Your Journey in 3 Steps
          </h2>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {/* Step 1 */}
            <div className="relative text-center space-y-4">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm shadow-md">
                1
              </div>
              <h3 className="text-xl font-bold text-foreground pt-4">Tell Us About You</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                Share your health metrics, goals, allergies, and lifestyle preferences in our intuitive onboarding wizard.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center space-y-4">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-sky-500/20">
                2
              </div>
              <h3 className="text-xl font-bold text-foreground pt-4">Get Your AI Plan</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                Our AI instantly generates personalized meal plans and workout routines designed specifically for your body and goals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center space-y-4">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-foreground/60 text-background flex items-center justify-center font-bold text-sm shadow-md">
                3
              </div>
              <h3 className="text-xl font-bold text-foreground pt-4">Track & Transform</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                Follow your personalized plan, track your progress, and receive continuous AI coaching as you reach your health goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-aos="fade-down" className="py-20 sm:py-32 px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground text-balance">
            Ready to Transform Your Health?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-balance max-w-xl mx-auto">
            Join thousands who have already started their AI-powered health journey
          </p>
          <Link href="/auth/register" className="inline-block">
            <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-base font-semibold">
              Get Started for Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer data-aos="fade-down" className="border-t border-border/40 bg-card/50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4 col-span-2 md:col-span-1">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-sky-400" />
                <span className="font-bold text-lg tracking-tight">Bonyan</span>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed max-w-[200px]">Your AI Diet Coach & Doctor</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-sky-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-sky-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-sky-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/30 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground">
            <p>&copy; 2026 Bonyan. All rights reserved.</p>
            <div className="flex gap-5 mt-4 sm:mt-0">
              <a href="#" className="hover:text-sky-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-sky-400 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-sky-400 transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}