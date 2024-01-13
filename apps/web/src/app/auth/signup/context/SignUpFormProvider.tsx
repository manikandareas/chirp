'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { accountSchema } from '../form/account';
import { profileSchema } from '../form/profile';

type TSignUpFormContex = {
    accountForm: UseFormReturn<
        {
            email: string;
            password: string;
            confirmPassword: string;
        },
        any,
        undefined
    >;
    profileForm: UseFormReturn<
        {
            username: string;
            firstName: string;
            lastName: string;
            dob: string;
            gender: 'male' | 'female';
            address: string;
        },
        any,
        undefined
    >;
};

const SignUpFormContex = React.createContext<TSignUpFormContex | null>(null);

export const SignUpFormProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const accountForm = useForm<z.infer<typeof accountSchema>>({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const profileForm = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            username: '',
            firstName: '',
            lastName: '',
            dob: '',
            gender: 'male',
            address: '',
        },
    });
    return (
        <SignUpFormContex.Provider value={{ accountForm, profileForm }}>
            {children}
        </SignUpFormContex.Provider>
    );
};

export const useSignUpFormContext = () => {
    const context = React.useContext(SignUpFormContex);
    if (!context)
        throw new Error(
            'useSignUpFormContext must be used within SignUpFormProvider',
        );
    return context;
};
