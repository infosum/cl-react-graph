import { AnyChartPoint } from '../LineChart';
type UseBrush = {
    initialPosition: {
        start: number;
        end: number;
    };
    data: AnyChartPoint[];
    scaleFunction: () => any;
    width: number;
};
export declare const useBrush: ({ initialPosition, data, scaleFunction, width, }: UseBrush) => {
    brushedData: AnyChartPoint[];
    makeBrushedData: (pos: {
        start: number;
        end: number;
    }) => void;
};
export {};
