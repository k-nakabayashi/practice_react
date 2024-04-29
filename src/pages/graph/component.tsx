import { MyError } from '@/utils/error';
import { local_storage } from '@/utils/storage';
import { useContext, useRef, useState} from 'react';
import { ErrorContext } from '@/components/Modal/ErrorModal';
import { BaseButton, btn_style } from '@/components/Button';

import { 
    resas_api_key_name, 
    PrefInfoListResasContext, 
    HighchartsResasPopulation,
    PopulationInfoLabel, PopulationInfoData, getPopulationByPrefCode, PopulationInfoResasResponseDto, 
} from "@/features/resas";
import { HighchartsReassContext, UpdatedPrefInfoDto } from '@/pages/graph/provider';
import backgroundImage from '@/assets/image/japan_map.png';



export const PrefCheckBoxComponent = () => {

    // ==========================
    // 事前処理
    // ==========================
    const api_key = local_storage.get(resas_api_key_name);
    const { prefInfoList } = useContext(PrefInfoListResasContext);
    const { data, updateData } = useContext(HighchartsReassContext);
    const init = useRef(false)
    const checkedValues = useRef<string[]>([])
    const ref_xAxis_year = useRef<string[]>([])
    const { setStatusCode } = useContext(ErrorContext);

    const [ isShow, setShow ] = useState(false);
    const showModal = () => {
        setShow(true)
    }

    const hideModal = () => {
        setShow(!setShow)
    }
    
    // ==========================
    // コールバック
    // ==========================
    
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            // ==========================
            // 都道府県情報を取得する
            // ==========================
            
            // 初期は、data.prefInfoListForChartが設定されいないため注意
            let target_prefInfoList = []
            if (init.current === true) {
                target_prefInfoList = data.prefInfoListForChart;
            } else {
                target_prefInfoList = [...prefInfoList];
            }
            // ==========================
            // 選択した都道府県情報を取得する
            // ==========================

            let checkboxes = document.querySelectorAll('input[name="pref_code"]:checked');
            let temp_checkedValues: string[] = Array.from(checkboxes).map(function(checkbox) {
                return checkbox.value;
            });

            if (init.current == false) {
                checkedValues.current = temp_checkedValues
            } else if (JSON.stringify(checkedValues.current) === JSON.stringify(temp_checkedValues)) {
                return;
            }
            checkedValues.current = temp_checkedValues

            // ===============================================
            // 都道府県ごとに、人口情報を設定する
            // ===============================================

            let target_pref_code_for_chart: number[] = [];
            let xAxis_year: string[] = [];
            let updated_pref_info_list: UpdatedPrefInfoDto[] = [];

            // 選択されている都道府県ごとに、人口情報を取得する
            for (let i=0; i < Object.keys(checkedValues.current).length; ++i) {

                // ~~~~~~~~~~~~~~
                // 事前処理をする
                // ~~~~~~~~~~~~~~

                const pref_code: string = checkedValues.current[i];
                const pref_index = Number(pref_code) - 1
        
                let pref_info = target_prefInfoList[pref_index];

                target_pref_code_for_chart.push(Number(pref_code));
                if (pref_info.hasOwnProperty("xAxis_year") && Object(pref_info.xAxis_year).keys.length >= 0) {
                    xAxis_year = ref_xAxis_year.current
                    continue;
                }
                
                // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                // 都道府県別に人口を取得する
                // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                const res: PopulationInfoResasResponseDto = await getPopulationByPrefCode(api_key, pref_code)
                if (res.status_code != "200") {
                    throw new MyError(res.status_code, "予期せぬエラー発生")
                }

                const total_population_list_by_year: PopulationInfoData[] = res.result.data[PopulationInfoLabel.Total].data

                // 以下、人口情報をセットする
                let yAxis_total_population: number[] = []
                for (let t = 0; t < Object.keys(total_population_list_by_year).length; ++t) {
                    let total_population: PopulationInfoData = total_population_list_by_year[t]
                    xAxis_year.push(String(total_population.year))
                    yAxis_total_population.push(total_population.value)
                }

                updated_pref_info_list.push({
                    pref_index: pref_index,
                    xAxis_year: xAxis_year,
                    yAxis_total_population: yAxis_total_population,
                });
            }
    
            // =====================
            // グラフを描画する
            // =====================
            let yAxis_series: HighchartsResasPopulation[] = []

            for (let i=0; i < Object.keys(target_pref_code_for_chart).length; ++i) {
                const pref_index = target_pref_code_for_chart[i] - 1

                const pref_info = target_prefInfoList.filter(prefInfo => prefInfo.prefCode === target_pref_code_for_chart[i])[0];
                const updated_pref_info = updated_pref_info_list.filter(updated_pref_info => updated_pref_info.pref_index === pref_index)[0];
                
                let data = [];
                if (updated_pref_info == undefined) {
                    data = pref_info.yAxis_total_population;
                } else {
                    data = updated_pref_info.yAxis_total_population;
                }
        
                yAxis_series.push({
                    name: pref_info.prefName,
                    data: data,
                })
            }
            
            if (init.current === true) {
                updateData(
                    data.prefInfoListForChart,
                    updated_pref_info_list,
                    xAxis_year, yAxis_series
                )
            } else {
            
                if (target_pref_code_for_chart.length !== updated_pref_info_list.length) {
                    throw new MyError("500", "予期せぬエラー発生")
                }

                updateData(
                    target_prefInfoList,
                    updated_pref_info_list,
                    xAxis_year, yAxis_series,
                )
                init.current = true;
            }

            ref_xAxis_year.current = xAxis_year;

            hideModal()
        } catch (error) {
            if (!(error instanceof MyError)) {
                error = new MyError("500", "予期せぬエラー発生")
            }
            setStatusCode(error.status_code);
        }
    }

    return (
        <>
            <div 
                style={{
                    zIndex: 1000, 
                    position: "fixed", top: '0',  bottom: '0', left: '0', right: '0',
                    height: "100%" , width: "100%",
                    display: isShow === true ? "block" : "none",
                    backgroundColor: 'rgba(128, 128, 128, 0.8)',
                }}
            >
                <div className="container" style={{ 
                    position: 'absolute', top: '50%', left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    height: "550px",
                    width: "550px",
                    
                    background: 'white', 
                    padding: '20px', 
                    borderRadius: '8px',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat'
                }}>
                    <BaseButton callback={hideModal} style={btn_style}>Close</BaseButton>
                    <form className='u-ch-mt-2' onSubmit={submit}>
                        <div style={{textAlign: "left"}}>
                            <BaseButton callback={submit} style={{}}>送信</BaseButton>
                        </div>
                        <div style={{textAlign: "left"}}>
                            <p>都道府県一覧</p>
                            {prefInfoList.map((prefInfo, _) => (
                                <label 
                                    style={{
                                        display: "inline-block",
                                        height: "16px",
                                        width: "96px",
                                        marginTop: "8px",
                                    }}
                                    key={String(prefInfo.prefCode)} htmlFor={"pref_code_" + String(prefInfo.prefCode)}
                                >
                                    <input 
                                        value={prefInfo.prefCode} 
                                        id={"pref_code_" + String(prefInfo.prefCode)} 
                                        type="checkbox" 
                                        name="pref_code"
                                    />
                                    {prefInfo.prefName}
                                </label>
                            ))}
                        </div>
                    </form>
                </div>
            </div>

          
            
            <div style={{textAlign: "left"}}>
                <BaseButton callback={showModal} style={{}}>都道府県</BaseButton>
            </div>

        </>
    )
}