"use client"
import { Allergy } from '@/lib/interfaces'
import React from 'react'
import { ShieldAlert, Plus, Trash2, Info, Egg, ShieldAlert as MedicineIcon, Leaf, Form } from 'lucide-react';
import {toast} from 'react-hot-toast'
import { deleteAllergy } from '@/serverActions/allergy';
import { getSeverityBadge } from '@/lib/constants';
interface AllergyCardProps {
  allergy: Allergy;
  key:number ;
  setAllergies: React.Dispatch<React.SetStateAction<Allergy[]>>;
}

export const AllergyCard = ({allergy,setAllergies}:AllergyCardProps) => {



    const handleDelete = async(id: string) => {
      try {
        await deleteAllergy(id)
        toast.success("Allergy is deleted successfully!")
        setAllergies((allergies) =>
          allergies.filter(item => item.id !== id)
        );

      } catch(error:any) {
        toast.error(error.message)

      } finally {

      }

    };


  return (
                  <div 
                    className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Card Header (Icon, Name, Severity Badge) */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-xl ${
                            allergy.type === 'food' ? 'bg-amber-50 text-amber-600' : 
                            allergy.type === 'medicine' ? 'bg-purple-50 text-purple-600' : 'bg-emerald-50 text-emerald-600'
                          }`}>
                            {allergy.type === 'food' ? <Egg size={18} /> : 
                            allergy.type === 'medicine' ? <MedicineIcon size={18} /> : <Leaf size={18} />}
                          </div>
                          <h3 className="font-bold text-slate-800 text-base capitalize">{allergy.name}</h3>
                        </div>
                        
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border uppercase ${getSeverityBadge(allergy.severity)}`}>
                          {allergy.severity}
                        </span>
                      </div>

                      {/* Symptoms & Info Box */}
                      {allergy.notes && (
                        <div className="bg-slate-50 rounded-xl p-3 text-slate-600 text-xs flex items-start gap-2 mb-4">
                          <Info size={14} className="text-slate-400 shrink-0 mt-0.5" />
                          <p className="leading-relaxed">{allergy.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Card Footer Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400">
                      <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs capitalize">
                        {allergy.type === 'environmental' ? 'Environmental' : allergy.type}
                      </span>
                      
                      <button 
                        onClick={() => handleDelete(allergy.id)}
                        className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors opacity-100 md:opacity-0 group-hover:opacity-100"
                        title="Delete Allergy"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
  )
}
