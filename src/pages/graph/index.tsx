import { useContext, useEffect } from 'react';
import {BaseLayout} from '@/layout/BaseLayout';
import { useNavigate } from 'react-router-dom';
import { local_storage } from '@/utils/storage';
import { resas_api_key_name } from "@/features/resas";
import { getPrefInfoList, PrefInfoListResasContext } from '@/features/resas/pref_info_list';
import { HighchartsReasComponent} from '@/features/resas/highcharts';
import { HighchartsReassProvider } from '@/pages/graph/provider';
import { PrefCheckBoxComponent } from '@/pages/graph/component';


export const GraphPage = () => {
    // ==========================
    // 事前処理
    // ==========================

    const title = 'graph';
    const navigate = useNavigate();
    const api_key = local_storage.get(resas_api_key_name);
    const { prefInfoList, setPrefInfoList } = useContext(PrefInfoListResasContext);

    // ==========================
    // Hook
    // ==========================

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // このページを直接指定した場合、
    // 都道府県情報を取得する
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (prefInfoList.length == 0) {
                let __prefInfoList: any = await getPrefInfoList(api_key)
                setPrefInfoList(__prefInfoList)
                }
   
            } catch (error) {
                navigate("/")
            }
        };
        fetchData();
    }, []);

    return (
        <BaseLayout
            title={title}
        >
            <div className="container">
                <HighchartsReassProvider>
                    <HighchartsReasComponent/>
                    <PrefCheckBoxComponent navigate={navigate}/>
                </HighchartsReassProvider>
            </div>
        </BaseLayout>
    )
}