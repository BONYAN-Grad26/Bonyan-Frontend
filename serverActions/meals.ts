import { apiClient } from "@/configs/Axios";
import { baseUrl } from "@/lib/constants";
import { ApiMealPlanResponse, ResponseData } from "@/lib/interfaces";
import { cookies } from "next/headers";

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
        next: { tags: ['weekly-diet-plan','diet-plans']  } 

    })


    if(response.status===404) {
        return []
    }
    const dataResponse = await response.json() as ResponseData;
    if(!response.ok) {
        throw new Error(dataResponse.error.message || "something went wrong")
    }
    console.log(dataResponse.data );

    return dataResponse.data as ApiMealPlanResponse[]


} 