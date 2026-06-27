import { baseUrl } from '@/lib/constants';
import { refreshToken } from '@/serverActions/auth';
import axios from 'axios';  

export const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // مهم جداً إذا كنت تتعامل مع Cookies أو Server Actions
}); 

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {

        const newToken = await refreshToken(); 

        if (newToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        }

        return apiClient(originalRequest); 

      } catch (refreshError) {

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);