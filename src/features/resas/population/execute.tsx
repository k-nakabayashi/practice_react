import axios from 'axios';
axios.defaults.headers.common['Accept'] = 'application/json';
import { PopulationInfo } from "@/features/resas/common/dto";



// ===================================
// 人口の取得処理
// ===================================
export type PopulationInfoResult = {
    boundaryYear: number | string
    data: PopulationInfo[];
}

export type PopulationInfoResasResponseDto = {
    status_code: string;
    message: string | null;
    result: PopulationInfoResult | null;
}


const isPopulationInfoResasResponseDtoResponseDto = function(obj: any): obj is PopulationInfoResasResponseDto {
    return (
        typeof obj === 'object' && obj !== null &&
        (typeof obj.message === 'string' || obj.message === null) &&
        typeof obj.result === 'object' && obj.result !== null &&
        (typeof obj.result.boundaryYear === 'number' || typeof obj.result.boundaryYear === 'string') &&
        typeof obj.result.data === 'object' && obj.result.data !== null &&
        Array.isArray(obj.result.data) &&
        obj.result.data.every((populationInfo: { label: any; }) =>
            typeof populationInfo.label === 'string'
            // TODO: うまくかない。後で考える。
            // typeof populationInfo.data.year === 'number' &&
            // typeof populationInfo.data.value === 'number'
        )
    );
}

export const getPopulationByPrefCode = async (resas_api_key: string, pref_code: string): Promise<PopulationInfoResasResponseDto>  => {
    // https://opendata.resas-portal.go.jp/docs/api/v1/population/sum/estimate.html
    const url = `https://opendata.resas-portal.go.jp/api/v1/population/sum/estimate?prefCode=${pref_code}`;

    const res = await axios.get(
        url, 
        {
            headers: {
            "X-API-KEY": resas_api_key
            }
        }
    );

    const status_code: string = res.data.statusCode;

    if (!isPopulationInfoResasResponseDtoResponseDto(res.data)) {
        return {
            status_code: status_code,
            message: res.data.message,
            result: null,
        }
    }
    return {
        status_code: "200",
        message: res.data.message,
        result: res.data.result,
    }

}

