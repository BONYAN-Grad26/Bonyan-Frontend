import { Sparkles } from 'lucide-react';
import React from 'react';

interface AiDailyTipsProps {
  aiDailyTips: string;
}

export const AiDailyTips = ({ aiDailyTips }: AiDailyTipsProps) => {
  return (
    <div className="relative overflow-hidden bg-sky-500/[0.02] border border-sky-500/10 rounded-2xl p-4 flex items-start gap-3.5 transition-all duration-300 hover:border-sky-500/20">
      {/* تأثير ضوئي خلفي ناعم يرمز للـ AI */}
      <div className="absolute -right-6 -top-6 w-12 h-12 bg-sky-500/10 blur-xl rounded-full pointer-events-none" />
      
      {/* الأيقونة باللون اللبني المعتمد للمنصة */}
      <div className="p-2 bg-sky-500/10 rounded-xl text-sky-500 shrink-0 shadow-sm shadow-sky-500/5">
        <Sparkles size={16} className="animate-pulse" />
      </div>
      
      <div className="space-y-0.5">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-sky-500/90 select-none">
          AI Health Advisor
        </h4>
        <p className="text-muted-foreground text-sm leading-relaxed font-medium">
          {aiDailyTips}
        </p>
      </div>
    </div>
  );
};

export default AiDailyTips;