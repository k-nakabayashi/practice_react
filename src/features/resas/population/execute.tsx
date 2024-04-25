import axios from 'axios';
axios.defaults.headers.common['Accept'] = 'application/json';
import { PrefInfo, PopulationInfo } from "@/features/resas/common/dto";

import { executeResas, callbackFunctionType, validationType } from "@/features/resas/common/utils";


// ===================================
// 人口の取得処理
// ===================================
export type PopulationInfoResult = {
    boundaryYear: number | string
    data: PopulationInfo[];
}

export type PopulationInfoResasResponseDto = {
    message: string | null;
    result: PopulationInfoResult
}

const isPopulationInfoResasResponseDtoResponseDto = function(obj: any): obj is PopulationInfoResasResponseDto {
    return (
        typeof obj === 'object' && obj !== null &&
        (typeof obj.message === 'string' || obj.message === null) &&
        typeof obj.result === 'object' && obj.result !== null &&
        (typeof obj.result.boundaryYear === 'number' || typeof obj.result.boundaryYear === 'string') &&
        typeof obj.result.data === 'object' && obj.result.data !== null &&
        Array.isArray(obj.result.data) &&
        obj.result.data.every(populationInfo =>
            typeof populationInfo.label === 'string'
            // TODO: うまういかない。後で考える。
            // typeof populationInfo.data.year === 'number' &&
            // typeof populationInfo.data.value === 'number'
        )
    );
}

export const getPopulationByPrefCode = async (resas_api_key: string, pref_code: string) => {

    const callbackFunction: callbackFunctionType  = async (resas_api_key: string): Promise<any> => {
        // https://opendata.resas-portal.go.jp/docs/api/v1/population/sum/estimate.html
        const url = `https://opendata.resas-portal.go.jp/api/v1/population/sum/estimate?prefCode=${pref_code}`;

        return await axios.get(
            url, 
            {
              headers: {
                "X-API-KEY": resas_api_key
              }
            }
        );
    }

    const validation: validationType = (data: any): boolean => {
        if (isPopulationInfoResasResponseDtoResponseDto(data)) {
          return true
        }
        return false;
    }

    return await executeResas(resas_api_key, callbackFunction, validation);

}

