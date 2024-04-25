highcharts
import { highcharts } from "highcharts";
const draw_cart = function (xAxis_year: number, yAxis_series: any) {

    Highcharts.chart('chart', {

        chart: {
            type: 'spline'
        },
        title: {
            text: '人口の推移'
        },
        subtitle: {
            text: '2021年版',
        },

        // ==============
        // X軸
        // ==============s

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
        series: yAxis_series
    });
}