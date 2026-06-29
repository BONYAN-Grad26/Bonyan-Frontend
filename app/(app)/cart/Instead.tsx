import Link from 'next/link'
import React from 'react'

const Instead = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center bg-sky-50/30 rounded-2xl max-w-md mx-auto my-8">
      <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
      <p className="text-slate-500 mb-6 text-sm">Looks like you haven't added anything to your cart yet.</p>
      
      <Link 
        href="/ingredients?currentPage=1" 
        className="bg-sky-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-sky-700 active:bg-sky-800 shadow-md shadow-sky-600/10 transition-all"
      >
        Start Shopping
      </Link>
    </div>
  )
}

export default Instead