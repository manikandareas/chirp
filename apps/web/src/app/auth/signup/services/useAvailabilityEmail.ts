import { checkAvailabilityEmail } from '@chirp/api';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type AvailabilityEmailProps = {
    accountForm: UseFormReturn<
        {
            email: string;
            password: string;
            confirmPassword: string;
        },
        any,
        undefined
    >;
};

const useAvailabilityEmail = ({ accountForm }: AvailabilityEmailProps) => {
    useEffect(() => {
        const emailSubscription = accountForm.watch(
            async (value, { name, type }) => {
                if (name === 'email') {
                    const validEmail = z
                        .string()
                        .email()
                        .safeParse(value.email);
                    if (validEmail.success) {
                        try {
                            const isAvailableEmail =
                                await checkAvailabilityEmail(validEmail.data);

                            if (isAvailableEmail) {
                                accountForm.clearErrors('email');
                            }
                        } catch (error) {
                            accountForm.setError('email', {
                                message: 'Email already exist',
                            });
                        }
                    }
                }
            }
        );

        return () => emailSubscription.unsubscribe();
    }, [accountForm.watch]);
};

export default useAvailabilityEmail;
