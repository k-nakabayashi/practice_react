// https://github.com/highcharts/highcharts-react

import { useRef, useState, useEffect, useContext } from 'react';
import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official'
import { HighchartsReassContext } from '@/pages/graph/provider';


export type HighchartsResasPopulation = {
    name: string;
    data: number[];
};

export type HighchartsReasComponentDto = {
    xAxis_year: string[];
    yAxis_series: HighchartsResasPopulation[];
};

export const HighchartsReasComponent = () =>  {

    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    const { data } = useContext(HighchartsReassContext);
    const genearteOptions = (
        xAxis_year: string[],
        yAxis_series: HighchartsResasPopulation[]
    ): Highcharts.Options => {
        // https://api.highcharts.com/highcharts/
        return {
            
            title: {
                text: '人口の推移'
            },
            subtitle: {

            },
            
            // ==============
            // X軸
            // ==============

            xAxis: {
                title: {
                    text: '年'
                },
                categories: xAxis_year
            },


            // ==============
            // Y軸
            // ==============

            yAxis: {
                title: {
                    text: '人口数'
                }
            },

            tooltip: {
                valueSuffix: '人'
            },
            series: yAxis_series,
        };
    }

    const [options, updateOpitions] = useState(genearteOptions([], []));

    useEffect(() => {
        
        updateOpitions(
            genearteOptions(data.target.xAxis_year, data.target.yAxis_series)
        )
    }, [data.target]);

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
        />
    )

};
