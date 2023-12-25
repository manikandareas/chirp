'use client';

import { useEffect } from 'react';
import AOS from 'aos';

export const AOSInit = () => {
    useEffect(() => {
        AOS.init({
            startEvent: 'DOMContentLoaded',
        });
    }, []);

    return null;
};
