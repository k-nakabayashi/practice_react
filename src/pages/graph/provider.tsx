import { createContext, useState} from 'react';
import { PrefInfo } from "@/features/resas/common/dto";
import { HighchartsReasComponentDto, HighchartsResasPopulation } from '@/features/resas/highcharts';


type HighchartsReassContextType = {
    data: {
      prefInfoListForChart: PrefInfo[]
      target: HighchartsReasComponentDto;

    },
    updateData: (data1: any, data2: any, data3: any) => void;
    initData: (data1: any, data2: any, data3: any, data4: any) => void;
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
    initData: () => {},
});


type HighchartsReassProps = {
  children: React.ReactNode
}

export type UpdatedPrefInfoDto = {
  pref_index: number;
  xAxis_year: string[] | [];
  yAxis_total_population: number[] | [];
}

const HighchartsReassProvider = ({ children }: HighchartsReassProps) => {


    const [data, setData] = useState({
      prefInfoListForChart: [],
      target: {
        xAxis_year: [],
        yAxis_series: []
      },
    });

    const __updateData = (
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

    const updateData = (
      updated_pref_info_list: UpdatedPrefInfoDto[],
      xAxis_year: string[], yAxis_series: HighchartsResasPopulation[]
    ) => {
      const updatedArray: PrefInfo[] = [...data.prefInfoListForChart];

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
    };
    
    const initData = (
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
      <HighchartsReassContext.Provider value={{ data, updateData, initData}}>
        {children}
      </HighchartsReassContext.Provider>
    );
};

export { HighchartsReassContext, HighchartsReassProvider }
