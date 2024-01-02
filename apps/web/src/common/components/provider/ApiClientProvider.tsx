'use client';
import { AxiosManager } from '@/common/lib/axios';
import { ApiClientProvider as ApiClientProviderDefault } from '@chirp/api';
import React from 'react';
export default function ApiClientProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const axiosManager = new AxiosManager();
    return (
        <ApiClientProviderDefault axiosInstance={axiosManager.axios}>
            {children}
        </ApiClientProviderDefault>
    );
}
