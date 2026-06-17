"use server";
import { apiClient } from "@/configs/Axios"
import { baseUrl } from "@/lib/constants";
import { Allergy, AllergyFromServer, ResponseData } from "@/lib/interfaces";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies} from "next/headers";


export const createAllergy = async(allergy:Allergy) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if(!accessToken) {
        throw new Error("Access token not found");
    }
    try {
        const response = await apiClient.post("/allergy" ,{
            name:allergy.name,
            description: allergy.notes,
            type:allergy.type,
            userId:1
        },
        {
            headers:{
                'Authorization' : `Bearer ${accessToken}`
            }
        } 

    );
    //const responseData = response.data as ResponseData;
    revalidateTag('allergies',"max")



    } catch (error:any) {
        console.error(error)
        if(!axios.isAxiosError(error)) {
            const data = error.response?.data as ResponseData ;
            throw new Error(data.error.message || "Request failed");


        }
        throw new Error(error.message || "something went wrong!")



    }

}

export const getAllAllergies= async() : Promise<Allergy[]> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if(!accessToken) {
        throw new Error("Access token not found");
    }
        const response = await fetch(`${baseUrl}/allergy/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            next: { tags: ['allergies'] ,revalidate: 60 } // Optional: for caching and revalidation
            
        }) ;
        if (!response.ok) {
            throw new Error(`Error fetching user allergies: ${response.statusText}`);
        }
        const responseData = await response.json() as ResponseData  ;
        let alleries = responseData.data as AllergyFromServer[] ;
        

        return alleries.map((allergy):Allergy=> {
            return {
                name:allergy.name,
                notes:allergy.description,
                type:allergy.type as "food" | "medicine" | "environmental" | "other",
                severity:"high",
                id:allergy.id.toString()

            }
        }) 
}

export const deleteAllergy = async (id:string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if(!accessToken) {
        throw new Error("Access token not found");
    }
    try {
        const response = await apiClient.delete(`allergy/${id}`,{
            headers :{
                'Authorization':`Bearer ${accessToken}`
            }
        })
        const resposeData = response.data as ResponseData ;
        revalidateTag('allergies',"max")
        



    } catch(error:any) {
        console.error(error)
        if(!axios.isAxiosError(error)) {
            const data = error.response?.data as ResponseData ;
            throw new Error(data.error.message || "Request failed");


        }
        throw new Error(error.message || "something went wrong!")

    }
}