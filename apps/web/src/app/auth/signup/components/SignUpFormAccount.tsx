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
import RequiredSign from '@/common/components/ui/RequiredSign';

import { useSignUpFormContext } from '../context/SignUpFormProvider';

type SignUpFormAccountProps = {
    onSubmit: () => void;
};
export default function SignUpFormAccount({
    onSubmit,
}: SignUpFormAccountProps) {
    const { accountForm } = useSignUpFormContext();
    return (
        <Form {...accountForm}>
            <form
                onSubmit={accountForm.handleSubmit(onSubmit)}
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
                                Ensure that your password is at least 8
                                characters long and includes a combination of
                                uppercase and lowercase letters, numbers, and
                                special characters for security purposes.
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
                                Enter your password again correctly.
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
    );
}
