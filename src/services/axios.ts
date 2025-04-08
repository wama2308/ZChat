import axios, { AxiosError, AxiosInstance } from 'axios';
// Si usas un store/context para el token, impórtalo aquí
// import { useAuthStore } from '../store/auth';

const BASE_URL = 'https://tu-api.com/api'; // Cambia esto por tu URL base

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor de request para agregar el token
api.interceptors.request.use(
  async (config) => {
    // Aquí deberías obtener el token desde tu store/context
    const token = ''; // Reemplaza con tu método para obtener el token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor de response para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.error('Sesión expirada', 'Por favor, inicia sesión nuevamente');
        // Aquí puedes hacer logout o redirigir al login
      } else if (status === 500) {
        console.error('Error del servidor', 'Intenta más tarde');
      }
    } else {
      console.error('Error de red', 'Revisa tu conexión a internet');
    }

    return Promise.reject(error);
  },
);

export default api;
