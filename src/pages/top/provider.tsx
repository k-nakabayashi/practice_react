
import { createContext, useState} from 'react';

type TopPageContextType = {
  handleChange: (e: any) => void;
};

const TopPageContext = createContext<TopPageContextType>({
  handleChange: () => {},
});

type TopPageProviderProps = {
  children: React.ReactNode
}

const TopPageProvider = ({ children }: TopPageProviderProps) => {

    // ==========================
    // 事前処理
    // ==========================
    const [_, setApiKey] = useState('')

    const handleChange = (e: any) => {
      setApiKey(e.target.value)
    }

    // ==========================
    // まとめ
    // ==========================

    var value = {
      handleChange: handleChange,
    }

    return (
      <TopPageContext.Provider value={value}>
        {children}
      </TopPageContext.Provider>
    );
};

export { TopPageContext, TopPageProvider }

