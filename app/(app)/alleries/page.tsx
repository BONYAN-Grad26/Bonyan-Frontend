import { ShieldAlert, Plus, Trash2, Info, Egg, ShieldAlert as MedicineIcon, Leaf, Form } from 'lucide-react';
import { AllergyForm } from '@/components/alleries/Form';
import { AllergyCard } from '@/components/alleries/AllergyCard';
import { Allergy } from '@/lib/interfaces';
import ClientAllergy from '@/components/alleries/ClientAllergy';
import { getAllAllergies } from '@/serverActions/allergy';



export default async function AllergiesPage() {

  const allergies = await getAllAllergies() ;









  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8" dir="ltr">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Header */}
        <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-5">
          <div className="p-3 bg-red-50 text-red-600 rounded-2xl shadow-sm">
            <ShieldAlert size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Allergies & Medical Risks</h1>
            <p className="text-sm text-slate-500 mt-1">Keep track of your medical allergies to ensure your safety and well-being.</p>
          </div>
        </div>
        
        <ClientAllergy allergies2={allergies} />


      </div>
    </div>
  );
}