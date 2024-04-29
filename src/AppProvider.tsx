import { ErrorBoundary } from 'react-error-boundary';
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
      <ErrorProvider>
        <ErrorModal />
        <PrefInfoListResasProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </PrefInfoListResasProvider>
      </ErrorProvider>
    </ErrorBoundary>
    
  );
};
