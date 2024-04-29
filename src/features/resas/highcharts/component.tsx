// https://github.com/highcharts/highcharts-react

import { useRef, useState, useEffect, useContext } from 'react';
import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official'
import { HighchartsReassContext } from '@/pages/graph/provider';
import { resizeChart, genearteOptions } from '@/features/resas/highcharts/utils';


const useChartSize = () => {
    // ==========================
    // 画面のリサイズを監視する
    // ==========================

  
    const [chart_size, setChartSize] = useState(resizeChart({
        width: window.innerWidth,
        height: window.innerHeight
    }));

    useEffect(() => {
        function handleResize() {
            const temp = resizeChart({
                width: window.innerWidth,
                height: window.innerHeight
            })
            setChartSize(temp);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, [resizeChart({
        width: window.innerWidth,
        height: window.innerHeight
    })]); // 空の依存配列で、マウント時にのみ実行
    
    return chart_size;

};
export const HighchartsReasComponent = () =>  {

    // ==========================
    // 画面のリサイズを監視する
    // ==========================

    const chart_size = useChartSize();

    // ==========================
    // highchartのオプション
    // ==========================

    const { data } = useContext(HighchartsReassContext);
    const [options, updateOpitions] = useState(genearteOptions([], [], chart_size));

    useEffect(() => {
        updateOpitions(
            genearteOptions(data.target.xAxis_year, data.target.yAxis_series, chart_size)
        )
    }, [data.target, chart_size]);


    // ==========================
    // highchartのオブジェクト
    // ==========================

    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chartComponentRef}
            />
        </div>
    )

};
