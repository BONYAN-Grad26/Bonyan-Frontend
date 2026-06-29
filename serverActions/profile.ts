"use server"
import { apiClient } from "@/configs/Axios";
import { baseUrl } from "@/lib/constants";
import { HealthData, HealthProfileData, ResponseData } from "@/lib/interfaces";
import axios from "axios";
import { revalidateTag, updateTag } from "next/cache";
import { cookies } from "next/headers";
import { LogoutWhenStatusEqual401, refreshToken, refreshTokenAndRedirct } from "./auth";
import { redirect } from "next/navigation";

export const getUserProfile = async () => { 
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    if(!accessToken) {
        throw new Error("Access token not found");
    }


    try {
        const response = await fetch(`${baseUrl}/health-profile/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            cache:"force-cache",
            next: { tags: ['profile','commen-tag']  } // Optional: for caching and revalidation
            
        });
        if(response.status===401) {
        //await refreshTokenAndRedirct("/profile")

        }
        if(response.status===404) {
            return null ;
        }
        const dataOfResponse :ResponseData = await response.json();

        if (!response.ok) {
            throw new Error(dataOfResponse.error.message);
        }
        console.log(dataOfResponse);


        return dataOfResponse.data as HealthProfileData ;

    } catch (error) { 
        if(axios.isAxiosError(error)) {

            const message = error.response?.data.error.message || 'something went wrong' ;
            throw new Error(message);

        }

        throw new Error(`Error fetching user profile: ${error}`);
    }
}


export const editProfile = async(id:string,formData:HealthData) => { 
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    if(!accessToken) {
        throw new Error("Access token not found");
    }
    try {

        const response = await apiClient.put(`/health-profile/${id}` , formData  , {
            headers :{
                'Authorization' :`Bearer ${accessToken}`
                
            }
        })
        const responseData = response.data as ResponseData ;
        updateTag("profile")
        return responseData.error.message as string;


    } catch (error: unknown) {

    if (axios.isAxiosError(error)) {

    throw new Error(
        error.response?.data?.error?.message ||
        error.message ||
        "Something went wrong"
    );
    }

    if (error instanceof Error) {
        throw new Error(error.message);
    }

    throw new Error("Unknown error occurred");
    }
}