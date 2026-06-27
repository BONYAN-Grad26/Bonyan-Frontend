"use server"

import { baseUrl } from "@/lib/constants"
import { Ingredient, ResponseData } from "@/lib/interfaces";
import { LogoutWhenStatusEqual401, refreshToken } from "./auth";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";


export const getIngredients = async(currentPage:number):Promise<Ingredient[]> => {
    const response = await fetch(`${baseUrl}/ingredients?pageIdx=${currentPage}`,{
        cache:'force-cache',
        next:{tags:["ingredients"]}
    });

    if(response.status===404) {
        return [] ;
    }
    const responseData = await response.json() as ResponseData;
    if(!response.ok) {
        throw new Error(responseData.error.message);
    }
    return responseData.data as Ingredient[];

}