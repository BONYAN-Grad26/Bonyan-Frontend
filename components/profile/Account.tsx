'use client';
import React from 'react'
import { Button } from '../ui/button';

export const Account = () => {
  return (
        <div className="bg-card border border-sky-500/5 rounded-2xl p-6 space-y-3 shadow-xs">
          <h3 className="font-bold text-foreground/90">Account</h3>
          
          <Button 
            variant="outline" 
            className="w-full border-sky-500/10 hover:bg-sky-500/5 text-foreground/80 hover:text-sky-500 rounded-xl cursor-pointer transition-all duration-200"
          >
            Download My Data
          </Button>
          
          <Button
            variant="outline"
            className="w-full text-rose-500 hover:text-white border-rose-500/10 hover:border-rose-500 hover:bg-rose-500 rounded-xl cursor-pointer transition-all duration-200"
          >
            Delete Account
          </Button>
        </div>  
    )
}