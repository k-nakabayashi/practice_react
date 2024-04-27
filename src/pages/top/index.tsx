import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { local_storage } from '@/utils/storage';
import { BaseLayout } from '@/layout/BaseLayout';
import { resas_api_key_name, PrefInfo, PrefInfoListResasContext, getPrefInfoList } from "@/features/resas";


export const TopPage = () => {

    // ==========================
    // 事前処理
    // ==========================

    const title = 'top';
    const navigate = useNavigate();
    const { setPrefInfoList } = useContext(PrefInfoListResasContext);

    // ==========================
    // コールバック
    // ==========================

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 都道府県一覧を取得する
        const api_key: any = document.getElementById("app_key").value;
        const pref_info_list: PrefInfo[] = await getPrefInfoList(api_key)

        // 必要情報を設定する
        local_storage.set(resas_api_key_name, api_key)
        setPrefInfoList(pref_info_list)

        // 遷移する
        navigate("/graph");
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