"use server";
import { apiClient } from "@/configs/Axios"
import { baseUrl } from "@/lib/constants";
import { AllergenType, Allergy, AllergyFromServer, ResponseData } from "@/lib/interfaces";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies} from "next/headers";


export const createAllergy = async(allergy:Allergy,id:string) => {
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
            ingredientId: Number(id)

        },
        {
            headers:{
                'Authorization' : `Bearer ${accessToken}`
            }
        } 

    );
    const responseData = response.data as ResponseData;
    revalidateTag('allergies',"max")
    return {
        id:responseData.data!.id,
        type:AllergenType.CRUSTACEAN,
        name:responseData.data!.name,
        severity:"high",
        notes:responseData.data!.description


    } as Allergy




    } catch (error:any) {
        console.error(error.response?.data);
        if(axios.isAxiosError(error)) {
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
        const response = await fetch(`${baseUrl}/allergy/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            next: { tags: ['allergies'] ,revalidate: 60 } // Optional: for caching and revalidation
            
        }) ;

        if(response.status===404) {
            return [];
        }
        const responseData = await response.json() as ResponseData  ;
        if (!response.ok) {
            throw new Error(`Error fetching user allergies: ${responseData.error.message}`);
        }
        let alleries = responseData.data as AllergyFromServer[] ;
        

        return alleries.map((allergy):Allergy=> {
            return {
                name:allergy.name,
                notes:allergy.description,
                type:allergy.type as AllergenType,
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
        revalidateTag('allergies',"max");
        



    } catch(error:any) {
        console.error(error)
        if(!axios.isAxiosError(error)) {
            const data = error.response?.data as ResponseData ;
            throw new Error(data.error.message || "Request failed");


        }
        throw new Error(error.message || "something went wrong!")

    }
}