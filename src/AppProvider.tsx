import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Error500 } from '@/pages'
import { PrefInfoListResasProvider } from '@/features/resas'
import { ErrorModal, ErrorProvider } from '@/components/Modal/ErrorModal';


// TODO: Suspenceでトップから括る

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ErrorBoundary fallback={<Error500 />}>
      <HelmetProvider>
        <ErrorProvider>
          <ErrorModal />
          <PrefInfoListResasProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </PrefInfoListResasProvider>
        </ErrorProvider>
      </HelmetProvider>
    </ErrorBoundary>
    
  );
};
