'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/common/lib/utils';
import { Button } from '@/common/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/common/components/ui/command';
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/common/components/ui/popover';
import { toast } from '@/common/components/ui/use-toast';
import {
    CustomDatePicker,
    DateField,
} from '@/common/components/elements/BirthDayPicker';

const languages = [
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Spanish', value: 'es' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Russian', value: 'ru' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Korean', value: 'ko' },
    { label: 'Chinese', value: 'zh' },
] as const;

const accountFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: 'Name must be at least 2 characters.',
        })
        .max(30, {
            message: 'Name must not be longer than 30 characters.',
        }),
    dob: z.date({
        required_error: 'A date of birth is required.',
    }),
    language: z.string({
        required_error: 'Please select a language.',
    }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
    // name: "Your name",
    // dob: new Date("2023-01-23"),
};

export function AccountForm() {
    const form = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues,
    });

    function onSubmit(data: AccountFormValues) {
        toast({
            title: 'You submitted the following values:',
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the name that will be displayed on your
                                profile and in emails.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dob"
                    render={() => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of birth</FormLabel>
                            <FormControl>
                                <CustomDatePicker
                                    label="Pick a date"
                                    data-testid="input-dob"
                                    // onChange={(e) =>
                                    //     setDateOfBirth({
                                    //         day: e.day,
                                    //         month: e.month,
                                    //         year: e.year,
                                    //     })
                                    // }
                                >
                                    <DateField />
                                </CustomDatePicker>
                            </FormControl>
                            <FormDescription>
                                Your date of birth is used to calculate your
                                age.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Language</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                'w-[200px] justify-between',
                                                !field.value &&
                                                    'text-muted-foreground',
                                            )}
                                        >
                                            {field.value
                                                ? languages.find(
                                                      (language) =>
                                                          language.value ===
                                                          field.value,
                                                  )?.label
                                                : 'Select language'}
                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search language..." />
                                        <CommandEmpty>
                                            No language found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {languages.map((language) => (
                                                <CommandItem
                                                    value={language.label}
                                                    key={language.value}
                                                    onSelect={() => {
                                                        form.setValue(
                                                            'language',
                                                            language.value,
                                                        );
                                                    }}
                                                >
                                                    <CheckIcon
                                                        className={cn(
                                                            'mr-2 h-4 w-4',
                                                            language.value ===
                                                                field.value
                                                                ? 'opacity-100'
                                                                : 'opacity-0',
                                                        )}
                                                    />
                                                    {language.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                This is the language that will be used in the
                                dashboard.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Update account</Button>
            </form>
        </Form>
    );
}
