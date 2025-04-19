import axios, { type AxiosError, type AxiosInstance } from "axios";
import { httpErrorMessages } from "constants/httpErrors";

// import { useAuthStore } from '../store/auth';

export const BASE_URL = "https://tu-api.com/api"; // Cambia esto por tu URL base

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  useFormData: false,
  isAuth: false,
});

// Interceptor de request para agregar el token
api.interceptors.request.use(
  async (config) => {
    // Aquí deberías obtener el token desde tu store/context
    const token = ""; // Reemplaza con tu método para obtener el token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de response para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      const message = httpErrorMessages[status] || "Ocurrió un error inesperado.";

      console.error(`Error ${status}:`, message);

      if (status === 401) {
        // useAuthStore.getState().logout?.();
      }
    } else {
      console.error("Error de red:", "Revisa tu conexión a internet.");
    }

    return Promise.reject(error);
  }
);

export default api;
