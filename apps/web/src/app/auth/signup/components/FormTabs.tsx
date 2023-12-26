'use client';
import TitlePage from '../../components/TitlePage';
import SubTitlePage from '../../components/SubTitlePage';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/common/components/ui/tabs';

import { Label } from '@/common/components/ui/label';
import { Input } from '@/common/components/ui/input';
import { Button } from '@/common/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/common/components/ui/form';

import { TbMinusVertical } from 'react-icons/tb';
import { IoIosArrowRoundBack } from 'react-icons/io';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import RequiredSign from '@/common/components/elements/RequiredSign';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/common/components/ui/radio-group';
import { toast } from 'sonner';
import { IoMdInformationCircleOutline } from 'react-icons/io';

import { registerUser } from '@chirp/api';
import { signIn } from 'next-auth/react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/common/components/ui/tooltip';

import { useAuthStore } from '@chirp/zustand';

const accountSchema = z
    .object({
        email: z.string().email({ message: 'Invalid email address.' }),
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters.' }),
        confirmPassword: z
            .string()
            .min(8, { message: 'Please confirm your password.' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

const profileSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    gender: z.enum(['male', 'female']),
    address: z.string().min(3),
});

type TabsValue = 'account' | 'profile';

export default function FormTabs() {
    const [tabValue, setTabValue] = useState<TabsValue>('account');

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
            firstName: '',
            lastName: '',
            gender: 'male',
            address: '',
        },
    });

    const onTabsChange = (value: string) => {
        setTabValue(value as TabsValue);
    };

    function onAccountFormSubmit(values: z.infer<typeof accountSchema>) {
        console.log(values);
        onTabsChange('profile');
        toast.success('A little more guys, complete your profile!');
    }

    async function onProfileFormSubmit(values: z.infer<typeof profileSchema>) {
        try {
            const user = await registerUser({
                ...values,
                email: accountForm.getValues('email'),
                password: accountForm.getValues('password'),
                image: '',
            });

            if (user) {
                toast.success('Account created successfully!');
                signIn('credentials', {
                    email: accountForm.getValues('email'),
                    password: accountForm.getValues('password'),
                    redirect: true,
                    callbackUrl: '/',
                });
                // setAuthStore(...user.data)
                console.log(user);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="grid place-items-center relative">
            <div className="space-y-8 lg:w-1/2">
                <div className="text-center">
                    <TitlePage>
                        Create an account
                        <span className="animate-pulse">!</span>
                    </TitlePage>
                    <SubTitlePage>Let's jump to chirp worlds!</SubTitlePage>
                </div>

                <Tabs
                    value={tabValue}
                    onValueChange={onTabsChange}
                    className="w-[400px] mx-auto"
                >
                    <TabsList className="bg-transparent" asChild>
                        <div className="absolute top-1/2 -translate-y-1/2 right-4 flex flex-col">
                            <TabsTrigger value="account" disabled>
                                <TbMinusVertical />
                            </TabsTrigger>
                            <TabsTrigger value="profile" disabled>
                                <TbMinusVertical />
                            </TabsTrigger>
                        </div>
                    </TabsList>
                    <TabsContent value="account" className="space-y-6">
                        <Form {...accountForm}>
                            <form
                                onSubmit={accountForm.handleSubmit(
                                    onAccountFormSubmit
                                )}
                                className="mx-auto space-y-6"
                                data-aos="fade up"
                            >
                                <FormField
                                    control={accountForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Email
                                                <RequiredSign />
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="johnDoe@mail.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Your Email Address.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={accountForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Password
                                                <RequiredSign />
                                            </FormLabel>
                                            <div className="relative">
                                                <FormControl>
                                                    <Input
                                                        placeholder="********"
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                className="absolute -right-8 top-1/2 -translate-y-1/2"
                                                                variant={
                                                                    'ghost'
                                                                }
                                                            >
                                                                <IoMdInformationCircleOutline
                                                                    size={24}
                                                                />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className="max-w-sm">
                                                                Ensure that your
                                                                password is at
                                                                least 8
                                                                characters long
                                                                and includes a
                                                                combination of
                                                                uppercase and
                                                                lowercase
                                                                letters,
                                                                numbers, and
                                                                special
                                                                characters for
                                                                security
                                                                purposes.
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                            <FormDescription></FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={accountForm.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Confirmation Password
                                                <RequiredSign />
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="********"
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    // onClick={() => setTabValue('profile')}
                                    className="w-full"
                                >
                                    Continue
                                </Button>
                            </form>
                        </Form>
                    </TabsContent>
                    <TabsContent value="profile" className="relative">
                        <Form {...profileForm}>
                            <form
                                onSubmit={profileForm.handleSubmit(
                                    onProfileFormSubmit
                                )}
                                className="mx-auto space-y-6"
                                data-aos="fade up"
                            >
                                <Button
                                    variant={'ghost'}
                                    size={'icon'}
                                    type="button"
                                    onClick={() => onTabsChange('account')}
                                >
                                    <IoIosArrowRoundBack size={24} />
                                </Button>
                                <FormField
                                    control={profileForm.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                First Name
                                                <RequiredSign />
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>
                                            {/* <FormDescription>
            This is your public display name.
        </FormDescription> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={profileForm.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Last Name
                                                <RequiredSign />
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Doe"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>
                                            {/* <FormDescription>
            This is your public display name.
        </FormDescription> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={profileForm.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Gender
                                                <RequiredSign />
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="male" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Male
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="female" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Female
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            {/* <FormDescription>
            This is your public display name.
        </FormDescription> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={profileForm.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Address
                                                <RequiredSign />
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Newyork city 34"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>
                                            {/* <FormDescription>
            This is your public display name.
        </FormDescription> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">
                                    Create Account
                                </Button>
                            </form>
                        </Form>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
