import { checkAvailabilityUsername } from '@chirp/api';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type AvailabilityEmailProps = {
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

const useAvaibilityUsername = ({ profileForm }: AvailabilityEmailProps) => {
    useEffect(() => {
        const usernameSubscription = profileForm.watch(
            async (value, { name, type }) => {
                if (name === 'username') {
                    const validUsername = z.string().safeParse(value.username);
                    if (validUsername.success) {
                        try {
                            const isUsernameAvailable =
                                await checkAvailabilityUsername(
                                    validUsername.data
                                );

                            if (isUsernameAvailable) {
                                profileForm.clearErrors('username');
                            }
                        } catch (error) {
                            profileForm.setError('username', {
                                message: 'Username already exist',
                            });
                        }
                    }
                }
            }
        );

        return () => usernameSubscription.unsubscribe();
    }, [profileForm.watch]);
};

export default useAvaibilityUsername;
