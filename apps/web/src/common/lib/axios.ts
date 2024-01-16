import { useAuthStore } from '@chirp/zustand';
// import axios, { AxiosInstance, AxiosPromise } from "axios";

import Axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export class AxiosManager {
    public readonly axios: AxiosInstance;

    constructor() {
        this.axios = Axios.create({
            baseURL: BASE_URL,
        });

        this.axios.interceptors.request.use(this.authRequestInterceptor);
    }

    private async authRequestInterceptor(
        axiosConfig: InternalAxiosRequestConfig,
    ) {
        const token = useAuthStore.getState().backendTokens?.accessToken;

        if (axiosConfig.headers) {
            if (token) {
                axiosConfig.headers.Authorization = `Bearer ${token}`;
            }
            axiosConfig.headers.Accept = 'application/json';
        }

        return axiosConfig;
    }
}

// will be used in SSR API Requests
export const { axios } = new AxiosManager();
