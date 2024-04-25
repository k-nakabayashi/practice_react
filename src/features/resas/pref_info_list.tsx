import { createContext, useState} from 'react';
import axios from 'axios';
axios.defaults.headers.common['Accept'] = 'application/json';


// ===================================
// 都道府県の取得処理
// ===================================

export type PrefInfo = {
    prefCode: number;
    prefName: string;
}
  
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

export { PrefInfoListResasContext, PrefInfoListResasProvider }

const isPrefInfoListResasResponseDto = function(obj: any): obj is PrefInfoListResasResponseDto {
    return (
      obj &&
      (typeof obj.message === 'string' || obj.message === null) &&
      Array.isArray(obj.result) &&
      obj.result.every((prefecture: any) => (
        typeof prefecture.prefCode === 'number' &&
        typeof prefecture.prefName === 'string'
      ))
    );
  }
  
export const get_pref_info_list = async (resas_api_key: string): Promise<PrefInfo[]> => {
    const url = "https://opendata.resas-portal.go.jp/api/v1/prefectures";

    try {
        const res = await axios.get(
            url, {
            headers: {
                "X-API-KEY": resas_api_key
            }
        });
        console.log("aaaa")
        console.log(res);
        if (isPrefInfoListResasResponseDto(res.data)) {
          return res.data.result
        }

        throw new Error()

    } catch (error) {
      console.log("bbb")
      console.error(error);
      throw new Error()
    }
}
