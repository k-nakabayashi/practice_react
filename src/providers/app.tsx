import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Error500 } from '@/pages/error'
import { PrefInfoListResasProvider } from '@/features/resas/pref_info_list'

// TODO: Suspenceでトップから括る

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ErrorBoundary FallbackComponent={Error500}>
      <HelmetProvider>
          <PrefInfoListResasProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </PrefInfoListResasProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};
