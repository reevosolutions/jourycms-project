'use client';
import initLogger from '@lib/logging';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';

const logger = initLogger('APPLICATION', 'ReactQueryDevtoolsProvider');

interface Props {
  readonly children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      retry: (failureCount, error: any) => {
        logger.error('retry', failureCount, { ...error });
        if ([404, 401, 403, 409].includes(error.status)) return false;
        if (failureCount < 3) return true;
        return false;
      },
    },
  },
});

export const ReactQueryDevtoolsProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
