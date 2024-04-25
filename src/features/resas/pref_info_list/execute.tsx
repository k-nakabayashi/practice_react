import axios from 'axios';
axios.defaults.headers.common['Accept'] = 'application/json';
import { PrefInfo } from "@/features/resas/common/dto";
import { executeResas, callbackFunctionType, validationType } from "@/features/resas/common/utils";
import { isPrefInfoListResasResponseDto } from "@/features/resas/pref_info_list/provider";


// ===================================
// 都道府県の取得処理
// ===================================

export const getPrefInfoList = async (resas_api_key: string): Promise<PrefInfo[]>  => {

  const callbackFunction: callbackFunctionType  = async (resas_api_key: string): Promise<any> => {
    let url = "https://opendata.resas-portal.go.jp/api/v1/prefectures";
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
    if (isPrefInfoListResasResponseDto(data)) {
      return true
    }
    return false;
  }
  return await executeResas(resas_api_key, callbackFunction, validation);
}

