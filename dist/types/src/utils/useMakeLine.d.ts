import { CurveFactory, CurveFactoryLineOnly } from 'd3-shape';
import { IAxes } from '../legacy/types';
import { IChartPoint, IChartPointValue, ILineProps } from '../LineChart';
export interface IProps<T extends IChartPoint<IChartPointValue, IChartPointValue> = IChartPoint> {
    data: T[];
    axis: IAxes;
    line: ILineProps;
    curveType?: CurveFactory | CurveFactoryLineOnly;
    width: number;
    left?: number;
    height: number;
}
export declare const useScales: (props: Omit<IProps, 'line' | 'curveType'>) => {
    xScale: any;
    yScale: any;
};
export declare const useMakeLine: (props: IProps) => {
    previous: string;
    current: string;
};
export declare const useMakeArea: (props: IProps) => {
    previous: string;
    current: string;
};
