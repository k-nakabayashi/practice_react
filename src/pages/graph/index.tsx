import { useContext, useEffect, useRef } from 'react';
import {BaseLayout} from '@/layout/BaseLayout';
import { useNavigate } from 'react-router-dom';
import { local_storage } from '@/utils/storage';
import { resas_api_key_name } from "@/features/resas";
import { getPrefInfoList, PrefInfoListResasContext } from '@/features/resas/pref_info_list';
import { getPopulationByPrefCode, PopulationInfoResult } from '@/features/resas/population';


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

    // TOOD: 余裕あれば、後ほどReduxにかえる
    // 妥協
    const prefInfoListForChart = useRef([]);
    prefInfoListForChart.current = prefInfoList;
 
    const updatePrefInfoListForChart = (pref_code: number, xAxis_year: string[], yAxis_total_population: Number[]) => {

        const updatedArray = [...prefInfoListForChart.current];
        updatedArray[pref_code-1] = { ...updatedArray[pref_code-1], xAxis_year: xAxis_year, yAxis_total_population: yAxis_total_population};
        prefInfoListForChart.current = updatedArray;
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
        
        var target_pref_code_for_chart = []

        for (let i=0; i < Object.keys(checkedValues).length; ++i) {

            // =============
            // 事前処理をする
            // =============

            const pref_code = String(checkedValues[i]);
            let pref_info = prefInfoList[Number(pref_code)-1];
            target_pref_code_for_chart.push(pref_code);
            
            if (pref_info.hasOwnProperty("xAxis_year") && pref_info.xAxis_year !== null) {
                continue;
            }
            
            // ============================
            // 都道府県別に人口を取得する
            // ============================

            const result: PopulationInfoResult = await getPopulationByPrefCode(api_key, pref_code)
            const total_population_list_by_year = result.data[0].data

            // 以下、人口データをセットする
            let xAxis_year = []
            let yAxis_total_population = []

            for (let t = 0; t < Object.keys(total_population_list_by_year).length; ++t) {
                let total_population = total_population_list_by_year[t]
                xAxis_year.push(total_population.year)
                yAxis_total_population.push(total_population.value)
            }
            updatePrefInfoListForChart(Number(pref_code), xAxis_year, yAxis_total_population)
        }

        console.log(prefInfoListForChart)
    }

    return (
        <BaseLayout
            title={title}
        >
            <div className="container">
                <form onSubmit={submit}>
                    {prefInfoList.map((prefInfo, _) => (
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