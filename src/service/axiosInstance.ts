import axios from 'axios';

// Base API URL from environment variables
const baseAPI = import.meta.env.VITE_APP_API_URL;

// Create axios instance for general use
export const $host = axios.create({
    baseURL: baseAPI,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Create axios instance for authenticated requests
export const $authHost = axios.create({
    baseURL: baseAPI,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor for adding authentication token
$authHost.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Create axios instance for form data requests
export const $hostFormData = axios.create({
    baseURL: baseAPI,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

// Create axios instance for authenticated form data requests
export const $authHostFormData = axios.create({
    baseURL: baseAPI,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

// Interceptor for adding authentication token to form data requests
$authHostFormData.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});
