import { IHistogramData } from '../Histogram';
export declare const useJoyPlot: ({ data, height, }: {
    data: IHistogramData[];
    height: number;
}) => {
    chartHeight: number;
    bins: string[];
    domain: [number, number];
    values: IHistogramData[];
};
