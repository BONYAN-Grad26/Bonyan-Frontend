"use client";

import { baseUrl } from "@/lib/constants";
import { Ingredient } from "@/lib/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IngredientsPageProps {
    ingredients:Ingredient[],
    currentPage:number
}

export default function IngredientsPage({ingredients,currentPage}:IngredientsPageProps) {
  const router = useRouter();



  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-800">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Ingredients Matrix</h1>
            <p className="text-slate-500 mt-1">Manage and view all available dietary ingredients.</p>
          </div>
          <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-medium text-sm border border-emerald-200">
            Page {currentPage}
          </div>
        </div>

        <hr className="border-slate-200 mb-8" />



            {ingredients.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-400 text-lg">No ingredients found on this page.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {ingredients.map((ingredient) => (
                  <Link  
                    href={`/alleries?id=${ingredient.id}&name=${ingredient.name}`}
                    key={ingredient.id} 
                    className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      {/* Badge / ID */}
                      <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center font-mono text-xs font-bold group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                        #{ingredient.id}
                      </span>
                      {/* Name */}
                      <span className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                        {ingredient.name}
                      </span>
                    </div>
                    
                    {/* Decorative Dot Indicator (Green for health context) */}
                    <span className="w-2 h-2 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-3 mt-12">
              <button
                disabled={currentPage <= 1}
                onClick={() => router.push(`/ingredients?currentPage=${currentPage-1}`) }                
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>
              
              <span className="text-sm font-semibold text-slate-600 px-3">
                {currentPage}
              </span>

              <button
                disabled={ingredients.length === 0} 
                onClick={() => router.push(`/ingredients?currentPage=${currentPage+1}`) }
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>


      </div>
    </div>
  );
}