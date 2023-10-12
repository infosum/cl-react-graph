import { CurveFactory, CurveFactoryLineOnly } from "d3-shape";
import { AnyChartPoint, ChartPoint, LineProps } from "../LineChart";
import { Axes } from "../utils/types";
export type Props<T extends AnyChartPoint = ChartPoint> = {
    data: T[];
    axis: Axes;
    line: LineProps;
    curveType?: CurveFactory | CurveFactoryLineOnly;
    width: number;
    left?: number;
    height: number;
};
export declare const useScales: (props: Omit<Props, "line" | "curveType">) => {
    xScale: any;
    yScale: any;
};
export declare const useMakeLine: (props: Props) => {
    previous: string;
    current: string;
};
export declare const useMakeArea: (props: Props) => {
    previous: string;
    current: string;
};
