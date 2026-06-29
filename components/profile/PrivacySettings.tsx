'use client';
import React from 'react'
import { Button } from '../ui/button'

export const PrivacySettings = () => {
  return (
    <div className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full justify-start border-sky-500/10 hover:bg-sky-500/5 text-foreground/80 hover:text-sky-500 rounded-xl cursor-pointer transition-all duration-200"
        >
          Change Password
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start border-sky-500/10 hover:bg-sky-500/5 text-foreground/80 hover:text-sky-500 rounded-xl cursor-pointer transition-all duration-200"
        >
          Two-Factor Auth
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start border-sky-500/10 hover:bg-sky-500/5 text-foreground/80 hover:text-sky-500 rounded-xl cursor-pointer transition-all duration-200"
        >
          Connected Devices
        </Button>
    </div>
  )
}