import { createContext, useState} from 'react';
import { PrefInfo, HighchartsReasComponentDto, HighchartsResasPopulation } from '@/features/resas';

type HighchartsReassData = {
    prefInfoListForChart: PrefInfo[]
    target: HighchartsReasComponentDto;
}
type HighchartsReassContextType = {
    data: HighchartsReassData,
    updateData: (data1: any, data2: any, data3: any, data4: any) => void;
};

const HighchartsReassContext = createContext<HighchartsReassContextType>({

    data: {
      prefInfoListForChart: [],
      target: {
        xAxis_year: [],
        yAxis_series: []
      },
    },
    updateData: () => {},
});

type HighchartsReassProps = {
  children: React.ReactNode
}

export type UpdatedPrefInfoDto = {
  pref_index: number;
  xAxis_year: string[] | [];
  yAxis_total_population: number[] | [];
}

const init_xAxis_year = ['1960', '1965', '1970', '1975', '1980', '1985', '1990', '1995', '2000', '2005', '2010', '2015', '2020', '2025', '2030', '2035', '2040', '2045']
// const init_yAxis_total_population = [
//   {
//     data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     name: "",
//     type: "line",
//   }
// ]
const HighchartsReassProvider = ({ children }: HighchartsReassProps) => {
    
    const [data, setData] = useState<HighchartsReassData>({
      prefInfoListForChart: [],
      target: {
        xAxis_year: init_xAxis_year,
        yAxis_series: [],
      },
    });

    const updateData = (
      pref_info_list: PrefInfo[],
      updated_pref_info_list: UpdatedPrefInfoDto[],
      xAxis_year: string[], yAxis_series: HighchartsResasPopulation[]  
    ) => {
 
      const updatedArray: PrefInfo[] = [...pref_info_list];

      for (let i=0; i < Object(updated_pref_info_list).length; ++i) {
        const pref_info = updated_pref_info_list[i];
        const pref_index = pref_info.pref_index;
        updatedArray[pref_index].xAxis_year = pref_info.xAxis_year;
        updatedArray[pref_index].yAxis_total_population = pref_info.yAxis_total_population;
      }

      setData({
        prefInfoListForChart: updatedArray,
        target: {
          xAxis_year: xAxis_year,
          yAxis_series: yAxis_series,
        }
      });
    }

    return (
      <HighchartsReassContext.Provider value={{ data, updateData}}>
        {children}
      </HighchartsReassContext.Provider>
    );
};

export { HighchartsReassContext, HighchartsReassProvider }
