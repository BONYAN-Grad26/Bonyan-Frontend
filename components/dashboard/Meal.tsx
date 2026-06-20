'use clent'
import type { Meal } from '@/lib/interfaces'
import React from 'react'

interface MealProps {
  selectedMeal:Meal ,
  setSelectedMeal:React.Dispatch<React.SetStateAction<Meal | null>>
}

const MealComponent = ({selectedMeal,setSelectedMeal}:MealProps) => {
  return (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 w-full max-w-xl rounded-2xl overflow-hidden max-h-[85vh] flex flex-col shadow-xl animate-in fade-in zoom-in-95 duration-150">
              
              {/* Modal Top Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded">
                    {selectedMeal.mealType}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{selectedMeal.name}</h3>
                </div>
                <button 
                  onClick={() => setSelectedMeal(null)}
                  className="text-slate-400 hover:text-slate-600 text-xs bg-slate-200 h-6 w-6 rounded-full flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 overflow-y-auto space-y-5 text-xs leading-relaxed">
                <div>
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider mb-1">Description</h4>
                  <p className="text-slate-600 text-sm">{selectedMeal.description}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider mb-2">Ingredients Formula</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedMeal.ingredients.map((ing) => (
                      <div key={ing.ingredientId} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex justify-between items-center">
                        <span className="text-slate-700 font-semibold">{ing.ingredientName}</span>
                        <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                          {ing.quantity} {ing.measurementUnit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider mb-1.5">Preparation Instructions</h4>
                  <p className="text-slate-600 whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono text-[11px] leading-relaxed">
                    {selectedMeal.preparationInstructions}
                  </p>
                </div>
              </div>

              {/* Modal Bottom Footer */}
              <div className="p-3 border-t border-slate-100 bg-slate-50 text-right">
                <button 
                  onClick={() => setSelectedMeal(null)}
                  className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
  )
}

export default MealComponent 