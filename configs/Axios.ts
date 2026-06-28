import { baseUrl } from '@/lib/constants';
import { refreshToken } from '@/serverActions/auth';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        const newToken = await refreshToken();

        if (!newToken) {
          return Promise.reject(error);
        }

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newToken}`,
        };


        return apiClient.request(originalRequest);


      } catch (err) {

        return Promise.reject(err);
      }
    }


    return Promise.reject(error);
  }
);