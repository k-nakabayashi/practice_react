import { createContext, useState } from 'react';

type ErrorContextType = {
  status_code: string;
  setStatusCode: (data: any) => void;
  hideErrorModal: () => void;
};


type ErrorContextProps = {
    children: React.ReactNode
}

const ErrorContext = createContext<ErrorContextType>({
  status_code: "200",
  setStatusCode: (data: any) => {},
  hideErrorModal: () => {},
});


const ErrorProvider = ({ children }: ErrorContextProps) => {
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

export { ErrorContext, ErrorProvider }