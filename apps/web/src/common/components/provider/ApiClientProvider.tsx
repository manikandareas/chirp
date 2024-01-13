'use client';

import React from 'react';
import { AxiosManager } from '@/common/lib/axios';
import { ApiClientProvider as ApiClientProviderDefault } from '@chirp/api';

export default function ApiClientProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const axiosManager = new AxiosManager();
    return (
        <ApiClientProviderDefault axiosInstance={axiosManager.axios}>
            {/* @ts-ignore */}
            {children}
        </ApiClientProviderDefault>
    );
}
