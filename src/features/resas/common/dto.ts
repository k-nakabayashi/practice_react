export type PrefInfo = {
    prefCode: number;
    prefName: string;
}

export type PopulationInfo = {
    label: string;
    data: {
        year: number;
        value: number;
    }
}