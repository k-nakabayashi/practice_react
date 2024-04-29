import { SeriesLineOptions } from 'highcharts';


export type HighchartsResasPopulation = SeriesLineOptions;

export type HighchartsReasComponentDto = {
    xAxis_year: string[];
    yAxis_series: HighchartsResasPopulation[];
};


type DisplaySize = {
    width: number;
    height: number;
}
type ChartSize = {
    width: string;
    height: string;
}


export const resizeChart = (size: DisplaySize) => {
    switch (true) {
        case size.width * 0.8 >= 800:
            return {
                width: "800",
                height: "600"
            }
        
        default:
            return {
                width: String(size.width * 0.8),
                height: String(size.width * 0.8),
            }
    }
};

export const genearteOptions = (
    xAxis_year: string[],
    yAxis_series: HighchartsResasPopulation[],
    chart_size: ChartSize,
): Highcharts.Options => {
    // https://api.highcharts.com/highcharts/

    
    return {
        chart: {
            type: 'line',
            width: chart_size.width,
            height: chart_size.height,
        },
        title: {
            text: '人口の推移'
        },
        subtitle: {
            text: '2021年版',
        },

        responsive: {
            rules: [{
              condition: {
                maxWidth: 500  // 500px 以下の場合に適用される
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom',
                  enabled: false  // 小さい画面では凡例を非表示にする
                },
                title: {
                  text: 'Small Screen Chart',
                  style: {
                    fontSize: '12px'
                  }
                },
                plotOptions: {
                  series: {
                    marker: {
                      radius: 2  // マーカーのサイズを小さくする
                    }
                  }
                }
              }
            }]
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
