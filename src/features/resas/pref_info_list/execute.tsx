import axios from 'axios';
axios.defaults.headers.common['Accept'] = 'application/json';
import { PrefInfo } from "@/features/resas/common/dto";
import { isPrefInfoListResasResponseDto } from "@/features/resas/pref_info_list/provider";

// ===================================
// 都道府県の取得処理
// ===================================

export type PrefInfoListResultDto = {
  status_code: string;
  message: string | null;
  result: PrefInfo[];
}

export const getPrefInfoList = async (resas_api_key: string): Promise<PrefInfoListResultDto> => {

  const url = "https://opendata.resas-portal.go.jp/api/v1/prefectures";
  
  const res = await axios.get(
      url, 
      {
        headers: {
          "X-API-KEY": resas_api_key
        }
      }
  );
  const status_code: string = res.data.statusCode;

  if (!isPrefInfoListResasResponseDto(res.data)) {

    return {
      status_code: status_code,
      message: res.data.message,
      result: [],
    }
  }

  return {
    status_code: "200",
    message: res.data.message,
    result: res.data.result,
  }
}
