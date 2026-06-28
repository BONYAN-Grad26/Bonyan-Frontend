'use client';

import { Loader2 } from 'lucide-react';

export default function GlobalLoading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
      <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
    </div>
  );
}