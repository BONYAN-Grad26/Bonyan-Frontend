'use client';

import Link from "next/link";
import { SearchX, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-background">
      {/* لمسة خلفية مضيئة (Glow Effect) ناعمة باللون اللبني تليق بالتصميم الـ Minimalist */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-lg text-center space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
        
        {/* الأيقونة العلوية مع خلفية لبنية ناعمة متناسقة مع اللوجو */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-sky-500/10 border border-sky-500/20 shadow-lg shadow-sky-500/5">
          <SearchX className="h-12 w-12 text-sky-400" />
        </div>

        <div>
          {/* رقم 404 كبير مع تدرج لوني خفيف */}
          <h1 className="text-7xl font-extrabold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            Page Not Found
          </h2>
          <p className="mt-3 text-muted-foreground max-w-sm mx-auto text-sm sm:text-base leading-relaxed">
            Sorry, the page you're looking for doesn't exist,
            has been moved, or was removed.
          </p>
        </div>

        {/* الأزرار مع التنسيق الجديد */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          {/* زر العودة للرئيسية - بلون اللوجو اللبني */}
          <Button 
            asChild
            className="bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] font-semibold"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>

          {/* زر الرجوع للخلف - Outline متناسق */}
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="border-sky-500/20 text-foreground/80 hover:text-sky-400 hover:bg-sky-400/5 hover:border-sky-500/40 transition-all active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}