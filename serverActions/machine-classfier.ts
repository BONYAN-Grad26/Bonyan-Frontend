'use server';
import { machineUrl } from "@/lib/constants"
import { MachineData } from "@/lib/interfaces";
import axios from "axios"


export const classfiyMachine = async(formData:FormData) => {
    
    const {data}  = await axios.post(`${machineUrl}/predict`,formData , {
        validateStatus:(status)=>true
    }) as  {data: MachineData} ;


    if(data.label==='unknown') {
        throw new Error("Please enter valid image to the machine")
    }

    return data ;
    
    
}