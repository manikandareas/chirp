'use client';

import { useState } from 'react';
import {
    CustomDatePicker,
    DateField,
} from '@/common/components/elements/BirthDayPicker';
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
import { Input } from '@/common/components/ui/input';
import Loading from '@/common/components/ui/loading';
import { RadioGroup, RadioGroupItem } from '@/common/components/ui/radio-group';
import RequiredSign from '@/common/components/ui/RequiredSign';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/common/components/ui/tabs';
import { registerUser } from '@chirp/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { TbMinusVertical } from 'react-icons/tb';
import { toast } from 'sonner';
import * as z from 'zod';

import AuthPrompt from '../../components/AuthPrompt';
import AuthSubTitlePage from '../../components/AuthSubTitlePage';
import AuthTitlePage from '../../components/AuthTitlePage';
import { accountSchema } from '../form/account';
import { profileSchema } from '../form/profile';

type TabsValue = 'account' | 'profile';

export default function SignUpFormTabs() {
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
                        <Form {...accountForm}>
                            <form
                                onSubmit={accountForm.handleSubmit(
                                    onAccountFormSubmit,
                                )}
                                data-testid="account-form"
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
                                                    data-testid="input-email"
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
                                                    data-testid="input-password"
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
                                                    data-testid="input-confirm-password"
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
                                    onProfileFormSubmit,
                                )}
                                data-testid="profile-form"
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
                                                    data-testid="input-username"
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
                                <div className="flex w-full gap-x-2">
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
                                                        data-testid="input-first-name"
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
                                                        data-testid="input-last-name"
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
                                                    data-testid="input-gender"
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
                                                    data-testid="input-dob"
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
                                                    data-testid="input-address"
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
                                        className="w-full text-center"
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
