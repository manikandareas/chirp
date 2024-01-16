'use client';

import { useState } from 'react';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/common/components/ui/tabs';
import { registerUser } from '@chirp/api';
import { signIn } from 'next-auth/react';
import { TbMinusVertical } from 'react-icons/tb';
import { toast } from 'sonner';
import * as z from 'zod';

import AuthPrompt from '../../components/AuthPrompt';
import AuthSubTitlePage from '../../components/AuthSubTitlePage';
import AuthTitlePage from '../../components/AuthTitlePage';
import { useSignUpFormContext } from '../context/SignUpFormProvider';
import { profileSchema } from '../form/profile';
import SignUpFormAccount from './SignUpFormAccount';
import SignUpFormProfile from './SignUpFormProfile';

export type TTabsValue = 'account' | 'profile';

export default function SignUpFormTabs() {
    const [tabValue, setTabValue] = useState<TTabsValue>('account');

    const [submmittingFormIsLoading, setSubmmittingFormIsLoading] =
        useState<boolean>(false);

    const [dateOfBirth, setDateOfBirth] = useState({
        day: 0,
        month: 0,
        year: 0,
    });

    const { accountForm, profileForm } = useSignUpFormContext();

    const onTabsChange = (value: string) => {
        setTabValue(value as TTabsValue);
    };

    function onAccountFormSubmit() {
        onTabsChange('profile');
        toast.success('A little more guys, complete your profile!');
    }

    async function onProfileFormSubmit(values: z.infer<typeof profileSchema>) {
        const FORMATTED_DOB = new Date(
            dateOfBirth.year,
            dateOfBirth.month - 1,
            dateOfBirth.day,
        ).toISOString();
        const promise = () =>
            new Promise(async (resolve, reject) => {
                setSubmmittingFormIsLoading(true);

                try {
                    const user = await registerUser({
                        ...values,
                        dob: FORMATTED_DOB,
                        email: accountForm.getValues('email'),
                        password: accountForm.getValues('password'),
                    });
                    if (user) {
                        signIn('credentials', {
                            email: accountForm.getValues('email'),
                            password: accountForm.getValues('password'),
                            redirect: true,
                            callbackUrl: '/',
                        });
                    }
                    resolve(true);
                } catch (error) {
                    reject();
                } finally {
                    setSubmmittingFormIsLoading(false);
                }
            });

        toast.promise(promise, {
            loading: 'Loading...',
            success: () => {
                profileForm.reset();
                return `Hey welcome to chirp world dude!`;
            },
            error: () => 'Upps... Something went wrong!',
        });
    }

    return (
        <div className="relative grid place-items-center">
            <div className="max-w-[90%] space-y-8 lg:max-w-lg">
                <div className="text-center">
                    <AuthTitlePage>
                        Create an account
                        <span className="animate-pulse">!</span>
                    </AuthTitlePage>
                    <AuthSubTitlePage>
                        Let's jump to chirp worlds!
                    </AuthSubTitlePage>
                </div>

                <Tabs
                    value={tabValue}
                    onValueChange={onTabsChange}
                    className="mx-auto"
                >
                    <TabsList className="bg-transparent" asChild>
                        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col">
                            <TabsTrigger value="account" disabled>
                                <TbMinusVertical />
                            </TabsTrigger>
                            <TabsTrigger value="profile" disabled>
                                <TbMinusVertical />
                            </TabsTrigger>
                        </div>
                    </TabsList>
                    <TabsContent value="account" className="space-y-6">
                        <SignUpFormAccount onSubmit={onAccountFormSubmit} />
                    </TabsContent>
                    <TabsContent value="profile" className="relative">
                        <SignUpFormProfile
                            onSubmit={onProfileFormSubmit}
                            onTabsChange={onTabsChange}
                            submmittingFormIsLoading={submmittingFormIsLoading}
                            setDateOfBirth={setDateOfBirth}
                        />
                    </TabsContent>
                </Tabs>
                <AuthPrompt variant="signin" />
            </div>
        </div>
    );
}
