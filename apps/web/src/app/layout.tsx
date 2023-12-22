import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/common/components/provider/AuthProvider';
import { ThemeProvider } from '@/common/components/provider/ThemeProvider';
import { cn } from '@/common/lib/utils';
import { fontPoppins } from '@/common/lib/fonts';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={cn(fontPoppins.className, 'antialiased')}>
                <AuthProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Toaster />
                        {children}
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
