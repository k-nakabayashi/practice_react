import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { local_storage } from '@/utils/storage';
import { BaseLayout } from '@/layout/BaseLayout';
import { resas_api_key_name, PrefInfoListResasContext, getPrefInfoList, PrefInfoListResultDto } from "@/features/resas";
import { MyError } from '@/utils/error';
import { ErrorContext } from '@/components/Modal/ErrorModal';
import { BaseButton } from '@/components/Button';

export const useSubmit = () => {

    const navigate = useNavigate();
    const { setPrefInfoList } = useContext(PrefInfoListResasContext);
    const { setStatusCode } = useContext(ErrorContext);

    // ==========================
    // コールバック
    // ==========================

    const submit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        try {

            e.preventDefault();
           
            // 都道府県一覧を取得する
            // const api_key: any = document.getElementById("app_key").value;
            const input_element = document.getElementById("app_key") as HTMLInputElement | null;
            
            if (input_element === null) {
                throw new MyError("500", "予期せぬエラー発生");
            }

            const res: PrefInfoListResultDto = await getPrefInfoList(input_element.value)
 
            if (res.status_code != "200") {
                throw new MyError(res.status_code, "予期せぬエラー発生")
            }

            // 必要情報を設定する
            local_storage.set(resas_api_key_name, input_element.value)
            setPrefInfoList(res.result)

            // 遷移する
            navigate("/graph");

        } catch (_error) {
            if (!(_error instanceof MyError)) {
                const error = new MyError("500", "予期せぬエラー発生");
                setStatusCode(error.status_code);
            } else {
                setStatusCode(_error.status_code);
            }
        }

    }

    return submit;
}

type TopPageProps = {
    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>| null;
}

export const TopPage = ({ callback }: TopPageProps) => {
    const submit = useSubmit()
    return <Inner callback={submit}/> 
}


const Inner = ( { callback }: TopPageProps ) => {
    
    return (
        <BaseLayout>
            <div className="container">
                <form>
                    <div className='u-ch-mr-2'>
                        <label htmlFor="app_key">
                            app_key:
                            <input id="app_key" type="text" required/>
                        </label>
                        <BaseButton callback={callback} style={{}}>送信</BaseButton>
                    </div>

                </form>
            </div>
        </BaseLayout>
    )
}