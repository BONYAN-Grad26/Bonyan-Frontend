'use server';
import { apiClient } from "@/configs/Axios"
import { baseUrl, workoutUrl } from "@/lib/constants";
import { NutritionData, ResponseData, WorkoutData } from "@/lib/interfaces";
import axios from "axios";
import { revalidateTag, updateTag } from "next/cache";
import { cookies, headers } from "next/headers";


export const getNutrition = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if(!accessToken) {
        throw new Error("Access token not found");
    }

    const response = await fetch(`${baseUrl}/diet-plan/today`,{
        method:'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        cache:"force-cache",
        next:{
            tags:['diet-plans']
        }
            
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
export const generateNutrition = async()=> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if(!accessToken) {
        throw new Error("Access token not found");
    }
    try {
        const response = await apiClient.post(`/diet-plan/generate-weekly`,null , {
            headers:{
                'Authorization': `Bearer ${accessToken}`
            },
            params: {
                startDate: new Date().toISOString().split('T')[0],
                weekNumber: 1,
            },
        });
        const responseData = response.data as ResponseData ;
        updateTag('diet-plans');
        return responseData.data ;
        

    } catch(error:any) {
        if(axios.isAxiosError(error)) {
            const message = error.response?.data.error.message ;
            throw new Error(message || "something went wrong in server");
        }
        throw error;

    }


}
export const getWorkout = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if(!accessToken) {
        throw new Error("Access token not found");
    }

    const response = await fetch(`${workoutUrl}/today`,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        cache:"force-cache",
        next:{
            tags:['workout-plans']
        }
            
    });
    if(response.status===404) {
        return null
    }  
    const responseData = await response.json() as ResponseData;

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
        const response = await axios.post(`${workoutUrl}/generate-weekly`,null,{
            headers:{
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const responseData = response.data as ResponseData ;
        updateTag('workout-plans')


        return responseData.data ;
        

    } catch(error:any) {
        console.error(error);

        if(axios.isAxiosError(error)) {
            const message = error.response?.data.error.message ;
            throw new Error(message || "something went wrong in server");
        }
        throw error;

    }


}


