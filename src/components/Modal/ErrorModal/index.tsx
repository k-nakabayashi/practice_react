import { BaseButton } from '@/components/Button';
import { selectError } from '@/utils/error';
import { createContext, useContext, useState } from 'react';

type ErrorContextType = {
  status_code: string;
  setStatusCode: (data: any) => void;
  hideErrorModal: () => void;
};

export const ErrorContext = createContext<ErrorContextType>({
  status_code: "200",
  setStatusCode: (data: any) => {},
  hideErrorModal: () => {},
});

type ErrorContextProps = {
  children: React.ReactNode
}

export const ErrorProvider = ({ children }: ErrorContextProps) => {
  const [status_code, _setStatusCode] = useState("200");

  const setStatusCode = (status_code: string) => {
    _setStatusCode(status_code)
  }

  const hideErrorModal = () => {
    _setStatusCode("200")
  }

  return (
    <ErrorContext.Provider value={{ status_code, setStatusCode, hideErrorModal }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const btn_style = {
  position: 'absolute', top: '16px', right: '16px',
}

export const ErrorModal = () => {
    const { status_code, hideErrorModal } = useContext(ErrorContext);
  
    if ([null, "", "200"].includes(status_code)) {
      return null;
    }


    return (
      <div 
        style={{
          zIndex: 1000, 
          position: "fixed", top: '0',  bottom: '0', left: '0', right: '0',
          height: "100%" , width: "100%",
          display: "block",
          backgroundColor: 'rgba(128, 128, 128, 0.8)',
        }}
        onClick={hideErrorModal}
      >
        <div className="container" style={{ 
          position: 'absolute', top: '50%', left: '50%', 
          transform: 'translate(-50%, -50%)', 
          background: 'white', 
          padding: '20px', 
          borderRadius: '8px',
        }}>
          <BaseButton callback={hideErrorModal} style={btn_style} text={"Close"}></BaseButton>
          {selectError(status_code)}
        </div>
      </div>
    );
  };
  