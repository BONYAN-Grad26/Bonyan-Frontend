"use server"
import { apiClient } from "@/configs/Axios";
import { baseUrl } from "@/lib/constants";
import { ApiMealPlanResponse, ResponseData } from "@/lib/interfaces";
import { cookies } from "next/headers";
import { LogoutWhenStatusEqual401, refreshToken, refreshTokenAndRedirct } from "./auth";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";

export const getWeeklyPlans = async() => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    if(!accessToken) {
        throw new Error("Access token not found");
    }


    const response = await fetch(`${baseUrl}/diet-plan/weekly` ,{
        method:"GET",
        headers :{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        cache:"force-cache",
        next: { tags: ['weekly-diet-plan','diet-plans','commen-tag']  } 

    })

    if(response.status===401) {
        //await refreshTokenAndRedirct("/meals")

    }
    if(response.status===404) {
        return []
    }
    const dataResponse = await response.json() as ResponseData;
    if(!response.ok) {
        throw new Error(dataResponse.error.message || "something went wrong")
    }

    return dataResponse.data as ApiMealPlanResponse[]


} 