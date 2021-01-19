import { IBarChartData } from '../Histogram';
export declare const useJoyPlot: ({ data, height, clampToZero, }: {
    data: IBarChartData[];
    height: number;
    clampToZero?: boolean | undefined;
}) => {
    chartHeight: number;
    bins: string[];
    domain: [number, number];
    values: IBarChartData[];
};
