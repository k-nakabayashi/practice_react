import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { local_storage } from '@/utils/storage';
import { BaseLayout } from '@/layout/BaseLayout';
import { resas_api_key_name, PrefInfoListResasContext, getPrefInfoList, PrefInfoListResultDto } from "@/features/resas";
import { MyError } from '@/utils/error';
import { ErrorContext } from '@/components/Modal/ErrorModal';

export const TopPage = () => {
    console.log("top")
    // ==========================
    // 事前処理
    // ==========================

    const title = 'top';
    const navigate = useNavigate();
    const { setPrefInfoList } = useContext(PrefInfoListResasContext);
    const { setStatusCode } = useContext(ErrorContext);

    // ==========================
    // コールバック
    // ==========================

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {

        try {

            console.log("================")
            e.preventDefault();
           
            // 都道府県一覧を取得する
            const api_key: any = document.getElementById("app_key").value;
            const res: PrefInfoListResultDto = await getPrefInfoList(api_key)
 
            if (res.status_code != "200") {
                throw new MyError(res.status_code, "予期せぬエラー発生")
            }

            // 必要情報を設定する
            local_storage.set(resas_api_key_name, api_key)
            setPrefInfoList(res.result)

            // 遷移する
            navigate("/graph");

        } catch (error) {
            console.log("catch!")
            if (!(error instanceof MyError)) {
                error = new MyError("500", "予期せぬエラー発生")
            }
            setStatusCode(error.status_code);

        }

    }

    return (
        <BaseLayout
            title={title}
        >
            <div className="container">
                <form onSubmit={submit}>
                    <label htmlFor="app_key">
                        app_key:
                        <input id="app_key" type="text" required/>
                    </label>
                    <button type="submit">送信</button>
                </form>
            </div>
        </BaseLayout>
    )
}