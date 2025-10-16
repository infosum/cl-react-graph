import { AnyChartPoint, ChartPoint, LineProps } from "../LineChart";
import { Axes } from "../utils/types";
type Props<T extends AnyChartPoint = ChartPoint> = {
    label?: string;
    line: LineProps;
    width: number;
    left: number;
    height: number;
    axis: Axes;
    data: T[];
};
export declare const AreaFill: (props: Props) => JSX.Element;
export {};
