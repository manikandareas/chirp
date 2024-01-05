'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type ReactQueryProviderProps = {
    children: React.ReactNode;
};
export const queryClient = new QueryClient();

const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({
    children,
}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;
