"use client"
import React, { useState } from 'react'
import { AllergyForm } from './Form'
import { Plus, ShieldAlert } from 'lucide-react'
import { Allergy } from '@/lib/interfaces';
import { AllergyCard } from './AllergyCard';

interface ClientAllergyProps {
    allergies2: Allergy[];
    id:string;
    name:string

}

const ClientAllergy = ({allergies2,id,name}:ClientAllergyProps) => {

    const [allergies, setAllergies] = useState<Allergy[]>(allergies2);
  return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Side: Add Allergy Form */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 lg:sticky lg:top-6">
            <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
              <Plus size={20} className="text-indigo-600" />
              Add New Allergy
            </h2>
            <AllergyForm name={name} id={id} setAllergies={setAllergies} allergies={allergies} />
          </div>

          {/* Right Side: Allergies Grid List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-slate-800">Active Allergies ({allergies.length})</h2>
            </div>

            {allergies.length === 0 ? (
              /* Empty State view */
              <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <ShieldAlert size={28} />
                </div>
                <h3 className="text-base font-semibold text-slate-700">No allergies recorded</h3>
                <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">Log any known allergies here to ensure proper documentation for your medical profile.</p>
              </div>
            ) : (
              /* Items Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allergies.map((allergy ,index) => (
                  <AllergyCard setAllergies={setAllergies} key={index+1} allergy={allergy} />

                ))}
              </div>
            )}
          </div>

        </div>
      )
}

export default ClientAllergy