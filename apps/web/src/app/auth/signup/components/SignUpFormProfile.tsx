'use client';

import { Dispatch, SetStateAction } from 'react';
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
import { IoIosArrowRoundBack } from 'react-icons/io';
import { z } from 'zod';

import { useSignUpFormContext } from '../context/SignUpFormProvider';
import { profileSchema } from '../form/profile';
import { TTabsValue } from './SignUpFormTabs';

type SignUpFormProfileProps = {
    onSubmit: (values: z.infer<typeof profileSchema>) => void;
    onTabsChange: (tab: TTabsValue) => void;
    submmittingFormIsLoading: boolean;
    setDateOfBirth: Dispatch<
        SetStateAction<{
            day: number;
            month: number;
            year: number;
        }>
    >;
};
export default function SignUpFormProfile({
    onSubmit,
    onTabsChange,
    submmittingFormIsLoading,
    setDateOfBirth,
}: SignUpFormProfileProps) {
    const { profileForm } = useSignUpFormContext();

    return (
        <Form {...profileForm}>
            <form
                onSubmit={profileForm.handleSubmit(onSubmit)}
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
                                This is your public display username.
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
                                    onValueChange={field.onChange}
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
                    render={() => (
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
    );
}
