"use server";

import { chatUrl } from "@/lib/constants";
import { ChatResponse, HealthProfileData } from "@/lib/interfaces";
import axios from "axios";

export const sendMessageToAI = async (userMessage: string, profile: HealthProfileData) => {
    try {
        const response = await axios.post(chatUrl, {
            message: userMessage,
            profile: profile
        });
        const data = response.data as ChatResponse; 
        return data.response ;
    } catch (error) {
        throw new Error("Failed to send message to AI: ");
        
    }


}