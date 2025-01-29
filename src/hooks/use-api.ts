import axios from 'axios';
import { useEffect } from 'react';
import { decodeJWT } from '../lib/utils';

const axiosInstance = axios.create({
  withCredentials: true,
});

export const useApi = (checkAuth = false) => {
  useEffect(() => {
    if (!checkAuth) return;

    // Request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
          redirectToLogin();
          return Promise.reject('No access token found');
        }

        if (isTokenExpired(token)) {
          redirectToLogin();
          return Promise.reject('Access token expired');
        }

        config.headers.Authorization = `Bearer ${token}`;
        return config;
      }
    );

    // Response interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          redirectToLogin();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [checkAuth]);

  return axiosInstance;
};

const redirectToLogin = () => {
  localStorage.removeItem('accessToken');
  window.location.href = '/sign-in'; // Update with your login route
};

const isTokenExpired = (token: string): boolean => {
  const decoded = decodeJWT(token);
  return decoded.exp * 1000 < Date.now();
};
