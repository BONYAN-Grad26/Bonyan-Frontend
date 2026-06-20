import { Sparkles } from 'lucide-react'
import React from 'react'

interface AidailyTapsProps {
  aiDailyTips:string

}

const AidailyTaps = ({aiDailyTips}:AidailyTapsProps) => {
  return (
          <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 flex items-start gap-3.5 shadow-xs">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-600 shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-0.5">AI Health Advisor</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{aiDailyTips}</p>
            </div>
          </div>
      )
}

export default AidailyTaps