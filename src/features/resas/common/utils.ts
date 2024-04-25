// TODO: 人口情報取得APIにも対応させる

import { MyError } from '@/utils/error';

export type callbackFunctionType = (data: any) => any;
export type validationType =  (data: any) => boolean;

export const executeResas = async (resas_api_key: string, callback: callbackFunctionType, validation: validationType) => {
  try {
      const res = await callback(resas_api_key)

      if (validation(res.data)) {
        return res.data.result
      }

      const status_code: string = res.data.statusCode;
      throw new MyError(status_code);

  } catch (error) {
    if (error instanceof MyError) {
      throw new MyError(error.status_code, error.message);
    } else {
      throw new MyError("500", "予期せぬエラー発生")
    }
  }
}