"use client"
import { Allergy } from '@/lib/interfaces'
import { createAllergy } from '@/serverActions/allergy'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {toast} from "react-hot-toast"

interface AllergyFormProps  {
  allergies: Allergy[] ;
  setAllergies: React.Dispatch<React.SetStateAction<Allergy[]>>;
}

export const AllergyForm = ({allergies,setAllergies} : AllergyFormProps) => {
    const [loading,setLoading] = useState(false);
    //const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        type: 'food',
        severity: 'low',
        notes: ''
    });
    

  const handleSubmit = async(e: React.SubmitEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Please enter allergy name");
      return ;

    }
    if(!formData.notes.trim()) {
      toast.error("Please enter allergy notes");
      return ;

    }

    const newAllergy: Allergy = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type as any,
      severity: formData.severity as any,
      notes: formData.notes
    };

    try {
      setLoading(true);
      await createAllergy(newAllergy)
      toast.success("Allergy is added successfully!")
      //router.refresh();
      setAllergies([newAllergy, ...allergies]);


    } catch(error:any) {
      toast.error(error.message);


    } finally {
      setLoading(false);
      setFormData({ name: '', type: 'food', severity: 'low', notes: '' }); // Reset Form
    }


    
  };

  return (
        <form onSubmit={handleSubmit} className="space-y-5">
              {/* Allergen Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Allergen / Trigger</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Penicillin, Peanuts, Gluten"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                />
              </div>

              {/* Allergy Type Selector */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Allergy Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                >
                  <option value="food">Food Allergy</option>
                  <option value="medicine">Medication / Drug</option>
                  <option value="environmental">Environmental (Pollen, Dust)</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Severity Level (Custom Styled Radio) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Severity Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'low', label: 'Low', color: 'peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-checked:border-blue-500' },
                    { value: 'medium', label: 'Medium', color: 'peer-checked:bg-amber-50 peer-checked:text-amber-700 peer-checked:border-amber-500' },
                    { value: 'high', label: 'High', color: 'peer-checked:bg-red-50 peer-checked:text-red-700 peer-checked:border-red-500' },
                  ].map((item) => (
                    <label key={item.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="severity"
                        value={item.value}
                        checked={formData.severity === item.value}
                        onChange={(e) => setFormData({...formData, severity: e.target.value})}
                        className="sr-only peer"
                      />
                      <div className={`text-center py-2 text-xs font-medium rounded-lg border border-slate-200 bg-white text-slate-600 transition-all ${item.color}`}>
                        {item.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Emergency Notes */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Symptoms or Emergency Notes</label>
                <textarea
                  rows={3}
                  placeholder="Describe your reaction or any required first-aid steps..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                disabled={loading}
                type="submit"
                className={`w-full py-3 ${loading? "bg-slate-500":"bg-slate-900"}  hover:bg-slate-800 text-white font-medium rounded-xl shadow-sm transition-colors text-sm flex items-center justify-center gap-2 mt-2`}
              >
                <Plus size={18} />
                Save Allergy
              </button>
            </form>
  )
}
