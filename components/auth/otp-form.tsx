"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { toast } from 'react-hot-toast';
import { Mail } from 'lucide-react';
import { sendOtp } from '@/serverActions/auth';
import { useRouter } from 'next/navigation';

export const OtpForm = () => {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp.trim().length !== 6) {
        toast.error('Please enter a valid 6-digit OTP');
        return ;
    } 

    setIsLoading(true);
    try {
        await sendOtp(otp.trim());
        toast.success('OTP sent successfully');
        router.refresh();
        router.replace('/onboarding'); // Redirect to dashboard after successful OTP submission


    } catch (error:any) { 
        
        toast.error(error?.message || 'Failed to send OTP');
    } finally { 
        setIsLoading(false);
    }

    }


    
    
    return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

        <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">OTP</label>
        <div className="relative">
            <Input 
            type="text"
            placeholder="Enter OTP"
            className="mb-4 h-11"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
        />
        </div>
        </div>


    <Button disabled={isLoading} type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 text-white">
        Send OTP
    </Button>
    </form>
    
    )
}
