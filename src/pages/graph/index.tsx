import { useContext, useEffect } from 'react';
import { BaseLayout } from '@/layout/BaseLayout';
import { useNavigate } from 'react-router-dom';
import { local_storage } from '@/utils/storage';
import { resas_api_key_name } from "@/features/resas";
import { getPrefInfoList, PrefInfoListResasContext, PrefInfoListResultDto } from '@/features/resas/pref_info_list';
import { HighchartsReasComponent} from '@/features/resas/highcharts';
import { HighchartsReassProvider } from '@/pages/graph/provider';
import { PrefCheckBoxComponent } from '@/pages/graph/component';
import { MyError } from '@/utils/error';

export const GraphPage = () => {
    console.log("GraphPage")
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
                    let result_dto: PrefInfoListResultDto = await getPrefInfoList(api_key)
                    if (result_dto.status_code != "200") {
                        throw new MyError("result_dto.status_code")
                    }
                    setPrefInfoList(result_dto.result)
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
                    <PrefCheckBoxComponent/>
                </HighchartsReassProvider>
            </div>
        </BaseLayout>
    )
}