import {
    Bebas_Neue,
    IBM_Plex_Mono,
    Poppins,
    Source_Code_Pro,
} from 'next/font/google';

export const fontPoppins = Poppins({
    weight: ['300', '500', '700'],
    subsets: ['latin'],
    variable: '--font-poppins',
});

export const fontBebasNeue = Bebas_Neue({
    weight: ['400'],
    subsets: ['latin'],
});

export const fontSourceCodePro = Source_Code_Pro({
    subsets: ['latin'],
});

export const fontIBMPlexMono = IBM_Plex_Mono({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
});
