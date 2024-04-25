import React from 'react';
import axios from 'axios';
import { PrefInfo } from '@/features/resas/pref_info_list'
axios.defaults.headers.common['Accept'] = 'application/json';


// ===================================
// 人口の取得処理
// ===================================

type PopulationResasContextType = {
    population: string;
    setPopulation: (data: any) => void;
};

const PopulationResasContext = React.createContext<PopulationResasContextType>({
    population: "",
    setPopulation: () => {},
});

type PopulationResasProps = {
    children: React.ReactNode
}


const PopulationResasProvider = ({ children }: PopulationResasProps) => {
    const [population, setPopulation] = React.useState("");
  
    return (
      <PopulationResasContext.Provider value={{population, setPopulation }}>
        {children}
      </PopulationResasContext.Provider>
    );
};

export { PopulationResasContext, PopulationResasProvider }


// const isPrefInfoListResasResponseDto = function(obj: any): obj is PrefInfoListResasResponseDto {
//     return (
//       obj &&
//       (typeof obj.message === 'string' || obj.message === null) &&
//       Array.isArray(obj.result) &&
//       obj.result.every((prefecture: any) => (
//         typeof prefecture.prefCode === 'number' &&
//         typeof prefecture.prefName === 'string'
//       ))
//     );
//   }
  
export const getPopulationByPrefCode = async (resas_api_key: string, prefCode: string) => {
    // https://opendata.resas-portal.go.jp/docs/api/v1/population/sum/estimate.html
    const url = `https://opendata.resas-portal.go.jp/api/v1/population/sum/estimate?prefCode=${prefCode}`;

    try {
        const res = await axios.get(
            url, {
            headers: {
                "X-API-KEY": resas_api_key
            }
        });
        
        return res.data.result

        throw new Error()

    } catch (error) {
      console.error(error);
      throw new Error()
    }
}

