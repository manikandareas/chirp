'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Separator } from '@/common/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { SiGithub } from 'react-icons/si';
import { toast } from 'sonner';
import * as z from 'zod';

import AuthPrompt from '../../components/AuthPrompt';
import AuthSubTitlePage from '../../components/AuthSubTitlePage';
import AuthTitlePage from '../../components/AuthTitlePage';
import { formSchema } from '../form/signin';

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

    const router = useRouter();

    function onSubmit(values: z.infer<typeof formSchema>) {
        const promise = () =>
            new Promise(async (resolve, reject) => {
                setSubmmittingFormIsLoading(true);
                try {
                    const signInRes = await signIn('credentials', {
                        email: values.email,
                        password: values.password,
                        redirect: false,
                    });
                    if (!signInRes?.ok) {
                        throw new Error('Unable to sign in');
                    }
                    resolve(true);
                    router.replace('/');
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
            <div className="w-full max-w-[90%] space-y-8 lg:max-w-lg">
                <div className="text-center">
                    <AuthTitlePage>
                        Welcome <span className="animate-pulse">Back</span>
                    </AuthTitlePage>
                    <AuthSubTitlePage>
                        Please enter your details.
                    </AuthSubTitlePage>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                        data-aos="fade up"
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
                                            data-testid="input-email"
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
                                            data-testid="input-password"
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
                            <Button
                                type="submit"
                                className="w-full"
                                data-testid="button-signin"
                            >
                                Sign In
                            </Button>
                        )}
                    </form>
                </Form>

                <div className="mx-auto flex items-center">
                    <Separator className="flex-1" />
                    <span>or</span>
                    <Separator className="flex-1" />
                </div>

                <div className="flex flex-col justify-around gap-2 md:flex-row">
                    <Button className="space-x-2" variant={'secondary'}>
                        <FcGoogle size={20} /> <span>Continue with Google</span>
                    </Button>
                    <Button className="space-x-2" variant={'secondary'}>
                        <SiGithub size={20} /> <span>Continue with Github</span>
                    </Button>
                </div>

                <AuthPrompt variant="signup" />
            </div>
        </div>
    );
}
