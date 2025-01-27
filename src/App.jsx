import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider.jsx';
import ChannelProvider from './contexts/Channel.jsx';
import router from './routes.jsx';
import { AnimatePresence } from 'framer-motion';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <AnimatePresence>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <ChannelProvider>
                <RouterProvider router={router} />
              </ChannelProvider>
            </AuthProvider>
          </QueryClientProvider>
        </HelmetProvider>
        <Toaster />
      </AnimatePresence>
    </>
  );
}

export default App;
