import axios, { AxiosInstance } from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env'

export const api: AxiosInstance = axios.create({
    baseURL: EXPO_PUBLIC_API_URL,
    timeout: 3 * 60 * 1000,
});