'use client';

import type { Meal } from '@/lib/interfaces';
import { X } from 'lucide-react';
import React from 'react';

interface MealProps {
  selectedMeal: Meal;
  setSelectedMeal: React.Dispatch<React.SetStateAction<Meal | null>>;
}

const MealComponent = ({ selectedMeal, setSelectedMeal }: MealProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-background/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* الـ Overlay لإغلاق المودال عند الضغط بالخارج */}
      <div className="absolute inset-0" onClick={() => setSelectedMeal(null)} />
      
      <div className="bg-card border border-sky-500/5 w-full max-w-xl rounded-2xl overflow-hidden max-h-[85vh] flex flex-col shadow-xl relative z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Top Header */}
        <div className="p-4 border-b border-sky-500/5 flex items-center justify-between bg-sky-500/[0.01]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase bg-sky-500/10 text-sky-500 px-2 py-0.5 rounded select-none">
              {selectedMeal.mealType}
            </span>
            <h3 className="text-sm font-extrabold text-foreground/90 tracking-tight">{selectedMeal.name}</h3>
          </div>
          <button 
            onClick={() => setSelectedMeal(null)}
            className="text-muted-foreground/60 hover:text-foreground h-7 w-7 rounded-xl flex items-center justify-center transition-colors hover:bg-sky-500/5 cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs leading-relaxed">
          {/* Description */}
          <div className="space-y-1">
            <h4 className="font-bold text-muted-foreground/50 uppercase tracking-wider select-none">Description</h4>
            <p className="text-muted-foreground text-sm font-medium">{selectedMeal.description}</p>
          </div>

          {/* Ingredients Formula */}
          <div className="space-y-2">
            <h4 className="font-bold text-muted-foreground/50 uppercase tracking-wider select-none">Ingredients Formula</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedMeal.ingredients.map((ing) => (
                <div key={ing.ingredientId} className="bg-sky-500/[0.01] p-2.5 rounded-xl border border-sky-500/5 flex justify-between items-center transition-colors hover:border-sky-500/10">
                  <span className="text-foreground/80 font-bold">{ing.ingredientName}</span>
                  <span className="text-sky-500 font-extrabold bg-sky-500/10 px-2 py-0.5 rounded text-[11px] tracking-tight">
                    {ing.quantity} {ing.measurementUnit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Preparation Instructions */}
          <div className="space-y-2">
            <h4 className="font-bold text-muted-foreground/50 uppercase tracking-wider select-none">Preparation Instructions</h4>
            <p className="text-muted-foreground/90 whitespace-pre-line bg-sky-500/[0.01] p-4 rounded-xl border border-sky-500/5 font-medium text-[12px] leading-relaxed">
              {selectedMeal.preparationInstructions}
            </p>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-3 border-t border-sky-500/5 bg-sky-500/[0.01] text-right">
          <button 
            onClick={() => setSelectedMeal(null)}
            className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-sky-500/10 transition-colors cursor-pointer active:scale-95"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default MealComponent;