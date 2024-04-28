import { MyError } from '@/utils/error';

export type callbackFunctionType = (data: any) => any;
export type validationType =  (data: any) => boolean;
import { useDispatch } from 'react-redux';
import { setError } from '@/store/error';

export const executeResas = async (resas_api_key: string, callback: callbackFunctionType, validation: validationType) => {
  const res = await callback(resas_api_key)
  console.log("== executeResas ==")
  if (validation(res.data)) {
    return res.data.result
  }

  const status_code: string = res.data.statusCode;
  throw new MyError(status_code);
}