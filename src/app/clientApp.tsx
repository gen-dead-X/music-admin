'use client';

import client from '@/config/apolloClient';
import { queryClient } from '@/config/querryConfig';
import { UserContextProvider } from '@/context/User/UserContext';
import { ApolloProvider } from '@apollo/client';
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';

export default function ClientApp({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary>
            <UserContextProvider>
              <main>{children}</main>
              <ToastContainer autoClose={3000} />
            </UserContextProvider>
          </HydrationBoundary>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ApolloProvider>
    </body>
  );
}
