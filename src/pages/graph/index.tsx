import { useContext, useEffect } from 'react';
import { BaseLayout } from '@/layout/BaseLayout';
import { useNavigate } from 'react-router-dom';
import { local_storage } from '@/utils/storage';
import { MyError } from '@/utils/error';
import { resas_api_key_name, getPrefInfoList, PrefInfoListResasContext, PrefInfoListResultDto, HighchartsReasComponent } from '@/features/resas';
import { HighchartsReassProvider } from '@/pages/graph/provider';
import { PrefCheckBoxComponent } from '@/pages/graph/component';

export const GraphPage = () => {
    
    // ==========================
    // 事前処理
    // ==========================
    const navigate = useNavigate();
    const api_key = local_storage.get(resas_api_key_name);
    const { prefInfoList, setPrefInfoList } = useContext(PrefInfoListResasContext);

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // このページを直接指定した場合、
    // 都道府県情報を取得する
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    useEffect(() => {
        const fetchData = async () => {
         
            try {
                if (prefInfoList.length == 0) {
                    const result_dto: PrefInfoListResultDto = await getPrefInfoList(api_key)
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
        <BaseLayout>
            <div className="container u-ch-mt-2">
                <HighchartsReassProvider>
                    <PrefCheckBoxComponent/>
                    <HighchartsReasComponent/>
                </HighchartsReassProvider>
            </div>
        </BaseLayout>
    )
}