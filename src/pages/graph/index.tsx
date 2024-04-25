import { useContext, useEffect, useRef } from 'react';
import {BaseLayout} from '@/layout/BaseLayout';
import { useNavigate } from 'react-router-dom';
import { local_storage } from '@/utils/storage';
import { resas_api_key_name } from "@/features/resas";
import { getPrefInfoList, PrefInfoListResasContext } from '@/features/resas/pref_info_list';
import { getPopulationByPrefCode } from '@/features/resas/population';


export const GraphPage = () => {

    // ==========================
    // 事前処理
    // ==========================

    const title = 'graph';
    const navigate = useNavigate();
    const api_key = local_storage.get(resas_api_key_name);
    const { prefInfoList, setPrefInfoList } = useContext(PrefInfoListResasContext)

    // ==========================
    // Hook
    // ==========================

    const target_pref_code_for_chart = useRef([""])
    const addPrefCodeForChart = (pref_code: string) => {
        target_pref_code_for_chart.current = [...target_pref_code_for_chart.current, pref_code];
    };

    
    // このページを直接指定した場合、都道府県情報を取得する
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
    }, [prefInfoList]);

    // ==========================
    // コールバック
    // ==========================

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        

        let checkboxes = document.querySelectorAll('input[name="pref_code"]:checked');
        let checkedValues: any = Array.from(checkboxes).map(function(checkbox) {
            return checkbox.value;
        });
        
        let config = []

        for (let i=0; i < Object.keys(checkedValues).length; ++i) {
            // =============
            // 事前処理をする
            // =============

            const pref_code = String(checkedValues[i])
            addPrefCodeForChart(pref_code)
            
            // if (prefInfoList[pref_code-1].hasOwnProperty("xAxis_year")) {
            //     continue;
            // }
            
            // ============================
            // 都道府県別に人口を取得する
            // ============================

            const res = await getPopulationByPrefCode(api_key, pref_code)
            // const total_population_list_by_year = res.result.data[0].data

            // // 以下、人口データをセットする
            // let xAxis_year = []
            // let yAxis_total_population = []

            // for (let t = 0; t < Object.keys(total_population_list_by_year).length; ++t) {
            //     let total_population = total_population_list_by_year[t]
            //     xAxis_year.push(total_population.year)
            //     yAxis_total_population.push(total_population.value)
            // }
        
            // prefInfoList[pref_code-1].xAxis_year = xAxis_year
            // prefInfoList[pref_code-1].yAxis_total_population = yAxis_total_population
        }
    }

    return (
        <BaseLayout
            title={title}
        >
            <div className="container">
                <form onSubmit={submit}>
                    {prefInfoList.map((prefInfo, index) => (
                        <label key={String(prefInfo.prefCode)} htmlFor={"pref_code_" + String(prefInfo.prefCode)}>
                            <input 
                            value={prefInfo.prefCode} 
                            id={"pref_code_" + String(prefInfo.prefCode)} 
                            type="checkbox" 
                            name="pref_code"
                            />
                            {prefInfo.prefName}
                        </label>
                    ))}
                    <button type="submit">送信</button>
                </form>

            </div>
        </BaseLayout>
    )
}