import { createContext, useState } from 'react';

type ErrorContextType = {
  status_code: string;
  setStatusCode: (data: any) => void;
  hideModal: () => void;
};


type ErrorContextProps = {
    children: React.ReactNode
}

const ErrorContext = createContext<ErrorContextType>({
  status_code: "200",
  setStatusCode: (data: any) => {data},
  hideModal: () => {},
});


const ErrorProvider = ({ children }: ErrorContextProps) => {
  const [status_code, _setStatusCode] = useState("200");

  const setStatusCode = (status_code: string) => {
    _setStatusCode(status_code)
  }

  const hideModal = () => {
    _setStatusCode("200")
  }

  return (
    <ErrorContext.Provider value={{ status_code, setStatusCode, hideModal }}>
      {children}
    </ErrorContext.Provider>
  );
};

export { ErrorContext, ErrorProvider }