'use server';
import { apiClient } from "@/configs/Axios"
import { baseUrl } from "@/lib/constants";
import { NutritionData, ResponseData, WorkoutData } from "@/lib/interfaces";
import axios from "axios";
import { cookies } from "next/headers";


export const getNutrition = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if(!accessToken) {
        throw new Error("Access token not found");
    }
    console.log({accessToken})

    const response = await fetch(`${baseUrl}/deit-plan/today`,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        next: { tags: ['deit-plan'] ,revalidate: 60 } // Optional: for caching and revalidation
            
    });
    if(response.status===404) {
        return null
    }  

    const responseData = await response.json() as ResponseData;
    console.log({response})

    if (!response.ok){
        throw new Error(responseData.error.message)
    }

    return responseData.data as NutritionData


    
}

export const getWorkout = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if(!accessToken) {
        throw new Error("Access token not found");
    }

    const response = await fetch(`${baseUrl}/workout-plan/today`,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        next: { tags: ['workout-plan'] ,revalidate: 60 } // Optional: for caching and revalidation
            
    });
    if(response.status===404) {
        return null
    }  
    const responseData = await response.json() as ResponseData;
    console.log({response})

    if (!response.ok){
        throw new Error(responseData.error.message)
    }

    return responseData.data as WorkoutData


    
}

export const generateWorkout = async()=> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if(!accessToken) {
        throw new Error("Access token not found");
    }
    try {
        const response = await apiClient.post("/workout-plan/generate-weekly");
        const responseData = response.data as ResponseData ;
        return responseData.data ;
        

    } catch(error:any) {
        if(axios.isAxiosError(error)) {
            const message = error.response?.data.error.message ;
            throw new Error(message || "something went wrong in server");
        }
        throw error;

    }


}
export const generateNutrition = async()=> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if(!accessToken) {
        throw new Error("Access token not found");
    }
    try {
        const response = await apiClient.post("/deit-plan/generate-weekly");
        const responseData = response.data as ResponseData ;
        return responseData.data ;
        

    } catch(error:any) {
        if(axios.isAxiosError(error)) {
            const message = error.response?.data.error.message ;
            throw new Error(message || "something went wrong in server");
        }
        throw error;

    }


}