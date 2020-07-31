import { IBarChartData } from '../Histogram';
export declare const useJoyPlot: ({ data, height, }: {
    data: IBarChartData[];
    height: number;
}) => {
    chartHeight: number;
    bins: string[];
    domain: [number, number];
    values: IBarChartData[];
};
