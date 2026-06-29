'use server'
import { baseUrl, workoutUrl } from "@/lib/constants";
import { PlanData, ResponseData } from "@/lib/interfaces";
import { cookies } from "next/headers";
import { LogoutWhenStatusEqual401, refreshToken, refreshTokenAndRedirct } from "./auth";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";

export const getWeeklyWorkout = async()=> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    if(!accessToken) {
        throw new Error("Access token not found");
    }

    const url = `${baseUrl}/workout-plan/user/me`;
    const response = await fetch(url,{
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        cache:"force-cache",
        next:{tags:['workout-plans','commen-tag']}

    });
    if(response.status===401) {
        //await refreshTokenAndRedirct("/workout")

    }
    if(response.status===404) {
        return null
    }
    const responseData = await response.json() as ResponseData ;
    if(!response.ok) {
        throw new Error(responseData.error.message);
    }
    return responseData.data as PlanData;


}

