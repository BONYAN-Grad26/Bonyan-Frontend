import React from 'react'
import { Button } from '../ui/button'

export const UpdateForm = () => {
  return (
    <form>
        <Button 
          type="submit" 
          variant="outline" 
          className="w-full border-sky-500/10 hover:bg-sky-500/5 text-foreground/80 hover:text-sky-500 rounded-xl cursor-pointer transition-all duration-200"
        >
          Update Medical Information
        </Button>
    </form>
  )
}