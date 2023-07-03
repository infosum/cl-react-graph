import { BarChartData } from '../Histogram';
export declare const useJoyPlot: ({ data, height, clampToZero, }: {
    data: BarChartData[];
    height: number;
    clampToZero?: boolean | undefined;
}) => {
    chartHeight: number;
    bins: string[];
    domain: [number, number];
    values: BarChartData[];
};
