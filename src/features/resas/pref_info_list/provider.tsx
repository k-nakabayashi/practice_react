import { createContext, useState} from 'react';
import { PrefInfo } from "@/features/resas/common/dto";

// ===================================
// 都道府県の取得処理
// ===================================
  
export type PrefInfoListResasResponseDto = {
  message: string | null;
  result: PrefInfo[];
}

type PrefInfoListResasContextType = {
  prefInfoList: PrefInfo[];
  setPrefInfoList: (data: any) => void;
  deletePrefInfoList: () => void;
};

const PrefInfoListResasContext = createContext<PrefInfoListResasContextType>({
    prefInfoList: [],
    setPrefInfoList: () => {},
    deletePrefInfoList: () => {}
});


type PrefInfoListResasProps = {
  children: React.ReactNode
}

const PrefInfoListResasProvider = ({ children }: PrefInfoListResasProps) => {
    const [prefInfoList, setPrefInfoList] = useState([]);
  
    const deletePrefInfoList = () => {
        setPrefInfoList([]);
    };

    return (
      <PrefInfoListResasContext.Provider value={{ prefInfoList, setPrefInfoList, deletePrefInfoList }}>
        {children}
      </PrefInfoListResasContext.Provider>
    );
};

const isPrefInfoListResasResponseDto = function(obj: any): obj is PrefInfoListResasResponseDto {
    return (
        obj &&
        (typeof obj.message === 'string' || obj.message === null) &&
        Array.isArray(obj.result) &&
        obj.result.every((data: any) => (
        typeof data.prefCode === 'number' &&
        typeof data.prefName === 'string'
        ))
    );
}

export { PrefInfoListResasContext, PrefInfoListResasProvider, isPrefInfoListResasResponseDto }
