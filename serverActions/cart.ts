'use server'
import { apiClient } from "@/configs/Axios";
import { baseUrl } from "@/lib/constants";
import { CartItem, Ingredient, ResponseData } from "@/lib/interfaces";
import axios from "axios";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { refreshToken } from "./auth";
import { redirect } from "next/navigation";


export const addTocart = async(ingredient:Ingredient)=> {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('access_token')?.value;
        
        if(!accessToken) {
            throw new Error("Access token not found");
        }
        const response = await apiClient.post(`/cart/${ingredient.id}`,null,{
            headers:{

                "Authorization":`Bearer ${accessToken}`
            }
        });
        const dataResponse = response.data as ResponseData ;
        updateTag('cart')

    } catch (error) {
        if(axios.isAxiosError(error)) {
            if(error.status===500) {
                throw new Error("Something went wrong in the server")

            }
            throw new Error(error.response?.data.error.message || "Something went wrong")
        }
        throw error
        
    }
}

export const getCart = async() : Promise<CartItem[]>=>  {

        const cookieStore = await cookies();
        const accessToken = cookieStore.get('access_token')?.value;
        
        if(!accessToken) {
            throw new Error("Access token not found");
        }
        const response = await fetch(`${baseUrl}/cart`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            cache:'force-cache',
            next: { tags: ['cart','commen-tag'] } // Optional: for caching and revalidation
            
        });
        if(response.status===401) {
            await refreshToken();
            updateTag('commen-tag')
            redirect("/")
        }
        if(response.status===404) {
            return []
        }
        const responseData = await response.json() as ResponseData;
        if(!response.ok) {
            throw new Error(responseData.error.message)
        }

        return responseData.data as CartItem[] ;

}

export const modifyCartItem = async(cartId:number,quantity:number) => {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('access_token')?.value;
        
        if(!accessToken) {
            throw new Error("Access token not found");
        }

        const response = await apiClient.patch(`${baseUrl}/cart/${cartId}?quantity=${quantity}`,null,{
            headers:{
                "Authorization":`Bearer ${accessToken}`
            }
        })
        const dataResponse = response.data as ResponseData ;
        

        updateTag('cart');


    } catch (error) { 
        if(axios.isAxiosError(error)) {
            if(error.status===500) {
                throw new Error("Something went wrong in the server")

            }
            throw new Error(error.response?.data.error.message || "Something went wrong")
        }
        throw error


    }
        
        
    
}

export const removeFromCart =  async(cartId:number)=> {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('access_token')?.value;
        
        if(!accessToken) {
            throw new Error("Access token not found");
        }

        const response = await apiClient.delete(`${baseUrl}/cart/${cartId}`,{
            headers:{
                "Authorization":`Bearer ${accessToken}`
            }
        })
        const dataResponse = response.data as ResponseData ;

        updateTag('cart');

    } catch (error) {
        if(axios.isAxiosError(error)) {
            if(error.status===500) {
                throw new Error("Something went wrong in the server")

            }
            throw new Error(error.response?.data.error.message || "Something went wrong")
        }
        throw error

    }

}