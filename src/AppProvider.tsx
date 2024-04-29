import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { PrefInfoListResasProvider } from '@/features/resas'
import { ErrorModal, ErrorProvider } from '@/components/Modal/ErrorModal';
import { Fallback } from '@/Falback';


type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ErrorBoundary fallback={<Fallback />}>
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
