

export type PopulationInfoData = {
    year: string;
    value: number;
}

export type PopulationInfo = {
    label: string;
    data: PopulationInfoData[],
}

export enum PopulationInfoLabel {
    // 総人口
    Total = 0,
    // 転入数
    Immigration = 1,
    // 転出数:
    Emigration = 2,
    // 出生数
    birth = 3,
    // 死亡数
    Deaths = 4,
}


export type PrefInfo = {
    prefCode: number;
    prefName: string;
    xAxis_year: string[] | [];
    yAxis_total_population: number[] | [];
}
