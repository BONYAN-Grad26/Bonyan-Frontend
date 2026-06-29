'use client';

import { Loader2 } from 'lucide-react';

export default function GlobalLoading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center gap-3">
        <Loader2 className="w-10 h-10 text-sky-500 animate-spin stroke-[1.5]" />
        
        <span className="text-sm font-medium text-muted-foreground/80 tracking-wide animate-pulse">
          Loading Bonyan...
        </span>
      </div>
    </div>
  );
}