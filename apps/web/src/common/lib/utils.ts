import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getRelativeSize = (indexLength: number) => {
    switch (indexLength) {
        case 1:
            return 510 - 4;
        case 2:
            return 510 / 2 - 4;
        case 3:
            return 510 / 3 - 4;
        case 4:
            return 510 / 2 - 4;
    }
};
