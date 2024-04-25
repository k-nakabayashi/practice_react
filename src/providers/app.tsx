import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Error500 } from '@/pages/error'


// TODO: Suspenceでトップから括る

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ErrorBoundary FallbackComponent={Error500}>
      <HelmetProvider>
          <BrowserRouter>{children}</BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
};
