import { IAnyChartPoint } from '../LineChart';
interface IUseBrush {
    initialPosition: {
        start: number;
        end: number;
    };
    data: IAnyChartPoint[];
    scaleFunction: () => any;
    width: number;
}
export declare const useBrush: ({ initialPosition, data, scaleFunction, width, }: IUseBrush) => {
    brushedData: IAnyChartPoint[];
    makeBrushedData: (pos: {
        start: number;
        end: number;
    }) => void;
};
export {};
