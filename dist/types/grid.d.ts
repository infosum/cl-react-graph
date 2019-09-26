import { IAxes, IHistogramProps } from './Histogram';
import { AnyScale } from './utils/scales';
import { TSelection } from './utils/svg';
export declare const makeYGridLines: (y: any, ticks?: number) => import("d3-axis").Axis<import("d3-axis").AxisDomain>;
export declare const makeXGridLines: (x: any, ticks?: number) => import("d3-axis").Axis<import("d3-axis").AxisDomain>;
export declare const drawGrid: (x: any, y: any, gridX: any, gridY: any, props: any, ticks: any) => void;
interface IProps<T = IHistogramProps> {
    x: AnyScale;
    y: AnyScale;
    gridX: TSelection;
    gridY: TSelection;
    props: T;
    ticks: number;
}
export declare const drawHorizontalGrid: <T extends IHistogramProps>(props: IProps<T>) => void;
export declare const gridHeight: (props: any) => number;
export declare const yAxisWidth: (axis: IAxes) => number;
export declare const xAxisHeight: (axis: IAxes) => any;
export declare const gridWidth: (props: any) => number;
export {};
