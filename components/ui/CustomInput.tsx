import React from 'react'

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string; 
}
const CustomInput = ({label,...props}:CustomInputProps) => {
  return (
        <div className="space-y-1">
          <label className="block text-sm font-medium text-muted-foreground">{label}</label>
          <input 

            className="block w-full rounded-xl border border-sky-500/30 bg-card p-2 text-foreground/80 focus:border-sky-500/70 focus:outline-none transition-colors disabled:opacity-50 text-sm font-medium"
            {...props }
        />
        </div>
  )
}

export default CustomInput