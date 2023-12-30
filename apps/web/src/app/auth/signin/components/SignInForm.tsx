'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FcGoogle } from 'react-icons/fc';
import { SiGithub } from 'react-icons/si';

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

import TitlePage from '../../components/TitlePage';
import { toast } from 'sonner';
import { Separator } from '@/common/components/ui/separator';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import SubTitlePage from '../../components/SubTitlePage';
import { useState } from 'react';
import Loading from '@/common/components/ui/loading';

const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters.' }),
});

export default function SignInForm() {
    const [submmittingFormIsLoading, setSubmmittingFormIsLoading] =
        useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const promise = () =>
            new Promise(async (resolve, reject) => {
                setSubmmittingFormIsLoading(true);
                try {
                    const signInResponse = await signIn('credentials', {
                        email: values.email,
                        password: values.password,
                        redirect: true,
                        callbackUrl: '/',
                    });
                    if (signInResponse?.error) {
                        throw new Error('Unable to sign in');
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
                form.reset();
                return `Hey welcome back dude!`;
            },
            error: () => 'Unable to sign in',
        });
    }

    return (
        <div className="grid place-items-center">
            <div className="space-y-8 lg:w-1/2 ">
                <div className="text-center">
                    <TitlePage>
                        Welcome <span className="animate-pulse">Back</span>
                    </TitlePage>
                    <SubTitlePage>Please enter your details.</SubTitlePage>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
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
                                    <FormLabel>Password</FormLabel>
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

                <div className="flex items-center mx-auto">
                    <Separator className="flex-1" />
                    <span>or</span>
                    <Separator className="flex-1" />
                </div>

                <div className="flex flex-col md:flex-row gap-2 justify-around">
                    <Button className="space-x-2" variant={'secondary'}>
                        <FcGoogle size={20} /> <span>Continue with Google</span>
                    </Button>
                    <Button className="space-x-2" variant={'secondary'}>
                        <SiGithub size={20} /> <span>Continue with Github</span>
                    </Button>
                </div>

                <div className="text-center text-sm">
                    Don't have any account?{' '}
                    <Link href={'/auth/signup'} className="text-blue-500">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}
