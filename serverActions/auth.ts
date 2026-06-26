"use server";   
import { apiClient } from "@/configs/Axios";
import { HealthData, HealthProfileData, OnboardingData, RegisterUserData, ResponseData } from "@/lib/interfaces";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export const registerUser = async (userData: RegisterUserData) : Promise<ResponseData> =>  {
    try {
        const response = await  apiClient.post('/auth/register', userData);
        const cookieStore = await cookies();
        cookieStore.set('email', userData.email,
            { 
                maxAge:  60*5, 
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            }
        );
        return response.data;

    } catch (error:any) {
        console.error(error.response?.data);
        const errorMessage = axios.isAxiosError(error) ? error.response?.data?.error.message : null;
        throw new Error(errorMessage || 'An error occurred during resgister');
    }
}
export const sendOtp = async (otp:string) => {
        const cookieStore = await cookies();
        const email = cookieStore.get('email')?.value;
        if(!email) {
            throw new Error('You must register before');
        }


    try {
        const {data} : {data: ResponseData} = await apiClient.post('/auth/confirm-email', { otp, email });
        if(!data.success) {
            throw new Error(data.error.message);
        }
        if(!data.data?.accessToken) { 
            throw new Error("Access token not found in response");

        }
        cookieStore.set('temp_token', data.data?.accessToken,
            { 
                maxAge:  5*60, 
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',

            }
        ); 
        cookieStore.delete('email');


    } catch (error) {
        console.error("Error during otp:", error);

        const errorMessage = axios.isAxiosError(error) ? error.response?.data?.error.message : null;
        
        throw new Error(errorMessage || 'An error occurred during sending OTP');
    }

}



export const logoutUser = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('access_token');
}

export const createHealtheMatrix = async (data:OnboardingData) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('temp_token')?.value ;
    if(!accessToken) {
        throw new Error("please register before")
    }

    try {
        const healthdata: HealthData = {
            age: data.age,
            weightKg: data.weight,
            heightCm: data.height,
            muscleMassKg: (data.weight * data.musclePercentage) / 100,
            fatPercentage: data.fatPercentage,
            gender: data.gender,
            activityLevel: data.activityLevel,
            medicalNotes: data.medicalNotes,
            dietType: data.dietType,
            dietGoal: data.dietGoal,
            targetWeightKg: data.targetWeight,
            dailyCalorieTarget: data.dailyCalories
        }

        const resposne = await apiClient.post('/health-profile', healthdata ,{
            headers:{
                "Authorization" : `Bearer ${accessToken}`
            }
        });
    
        const responseData = resposne.data as ResponseData;
        if(!responseData.success) {
            throw new Error(responseData.error.message || 'Failed to create health matrix');
        }
        cookieStore.set('access_token', accessToken,
            { 
                maxAge: 60*60, 
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',

            }
        ); 
        cookieStore.delete('temp_token');


        return responseData.data as HealthProfileData || null



    } catch (error) { 
        console.error(error);
        const errorMessage = axios.isAxiosError(error) ? error.response?.data?.error.message : null;
        
        throw new Error(errorMessage || 'An error occurred during creating health-matrix');
    }

}
export const loginUser = async (email:string,password:string) => {
    try {
        const {data} : {data: ResponseData} = await apiClient.post('/auth/login', { email, password });
        if(!data.success) {
            throw new Error(data.error.message || 'Login failed');
        }
        if(!data.data?.accessToken) {
            throw new Error("Access token not found in response");
        }
        const cookieStore = await cookies();
        cookieStore.set('access_token', data.data?.accessToken,
            { 
                maxAge: calcSeconds(data.data!.expiresIn), //calcSeconds(data.data.expiresIn as string),
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',

            }
        ); 

        return data.data?.message || 'Login successful!'; // Return the message from the response or a default message


    } catch (error) {
        console.error("Error during login:", error);

        const errorMessage = axios.isAxiosError(error) ? error.response?.data?.error.message : null;
        
        throw new Error(errorMessage || 'An error occurred during login');
    }
}
const calcSeconds = (expires_in: string): number => {
  const endTime = new Date(expires_in);
  const currentTime = new Date();

  const diffInSeconds = Math.floor(
    (endTime.getTime() - currentTime.getTime()) / 1000
  );

  return diffInSeconds;
};

export const LogoutWhenStatusEqual401 = async(status:number) => {
    if(status===401) {

    revalidatePath("/", "layout");

    redirect("/");
    }


}