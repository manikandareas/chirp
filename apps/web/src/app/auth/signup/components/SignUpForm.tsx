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

const formSchema = z
    .object({
        email: z.string().email({ message: 'Invalid email address.' }),
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters.' }),
        confirmPassword: z
            .string()
            .min(8, { message: 'Please confirm your password.' }),
        firstName: z.string().min(3),
        lastName: z.string().min(3),

        gender: z.enum(['male', 'female']),

        address: z.string().min(3),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

type TabsValue = 'account' | 'profile';

export default function SignUpForm() {
    const [tabValue, setTabValue] = useState<TabsValue>('account');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            address: '',
            firstName: '',
            lastName: '',
            gender: 'male',
        },
    });
    const fieldAccountChecker =
        form.getValues('email') &&
        form.getValues('password') &&
        form.getValues('confirmPassword')
            ? true
            : false;

    const onTabsChange = (value: string) => {
        setTabValue(value as TabsValue);
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="grid place-items-center relative">
            <div className="space-y-8 lg:w-1/2">
                <div className="text-center">
                    <TitlePage>Create an account!</TitlePage>
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
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="mx-auto"
                        >
                            <TabsContent value="account" className="space-y-6">
                                <FormField
                                    control={form.control}
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
                                            {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
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
                                            {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
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
                                    type="button"
                                    onClick={() => setTabValue('profile')}
                                    className="w-full"
                                    disabled={fieldAccountChecker}
                                >
                                    Continue
                                </Button>
                            </TabsContent>
                            <TabsContent
                                value="profile"
                                className="space-y-6 relative"
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
                                    control={form.control}
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
                                    control={form.control}
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
                                    control={form.control}
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
                                    control={form.control}
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
                            </TabsContent>
                        </form>
                    </Form>
                </Tabs>
            </div>
        </div>
    );
}
