export type PrefInfo = {
    prefCode: number;
    prefName: string;
    xAxis_year: string | null;
    yAxis_total_population: number | null;
}

export type PopulationInfo = {
    label: string;
    data: {
        year: number;
        value: number;
    }
}