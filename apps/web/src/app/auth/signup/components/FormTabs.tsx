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

import { registerUser } from '@chirp/api';
import { signIn } from 'next-auth/react';
import Loading from '@/common/components/ui/loading';
import { accountSchema } from '../form/account';
import { profileSchema } from '../form/profile';
import {
    CustomDatePicker,
    DateField,
} from '@/common/components/elements/BirthDayPicker';
import AuthPrompt from '../../components/AuthPrompt';

type TabsValue = 'account' | 'profile';

export default function FormTabs() {
    const [tabValue, setTabValue] = useState<TabsValue>('account');

    const [submmittingFormIsLoading, setSubmmittingFormIsLoading] =
        useState<boolean>(false);

    const [dateOfBirth, setDateOfBirth] = useState({
        day: 0,
        month: 0,
        year: 0,
    });

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

    const onTabsChange = (value: string) => {
        setTabValue(value as TabsValue);
    };

    function onAccountFormSubmit(values: z.infer<typeof accountSchema>) {
        console.log(values);
        onTabsChange('profile');
        toast.success('A little more guys, complete your profile!');
    }

    async function onProfileFormSubmit(values: z.infer<typeof profileSchema>) {
        const promise = () =>
            new Promise(async (resolve, reject) => {
                setSubmmittingFormIsLoading(true);

                try {
                    const user = await registerUser({
                        ...values,
                        dob: `${dateOfBirth.year}-${dateOfBirth.month}-${dateOfBirth.day}`,
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
        <div className="grid place-items-center relative">
            <div className="space-y-8 lg:max-w-lg max-w-[90%]">
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
                    className="mx-auto"
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
                                            <FormControl>
                                                <Input
                                                    placeholder="********"
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Ensure that your password is at
                                                least 8 characters long and
                                                includes a combination of
                                                uppercase and lowercase letters,
                                                numbers, and special characters
                                                for security purposes.
                                            </FormDescription>
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
                                            <FormDescription>
                                                Enter your password again
                                                correctly.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">
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
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Username
                                                <RequiredSign />
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="johnxixi13"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is your public display
                                                username.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex gap-x-2 w-full">
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
                                </div>
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
                                    name="dob"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date of Birth</FormLabel>
                                            <FormControl>
                                                <CustomDatePicker
                                                    label="Pick a date"
                                                    onChange={(e) =>
                                                        setDateOfBirth({
                                                            day: e.day,
                                                            month: e.month,
                                                            year: e.year,
                                                        })
                                                    }
                                                >
                                                    <DateField />
                                                </CustomDatePicker>
                                            </FormControl>
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
                                {submmittingFormIsLoading ? (
                                    <Button
                                        type="submit"
                                        className="text-center w-full"
                                        disabled
                                        aria-disabled
                                    >
                                        <Loading /> Loading...
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full">
                                        Create Account
                                    </Button>
                                )}
                            </form>
                        </Form>
                    </TabsContent>
                </Tabs>

                <AuthPrompt variant="signin" />
            </div>
        </div>
    );
}
