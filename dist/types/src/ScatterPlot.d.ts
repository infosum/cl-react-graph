import { FC } from 'react';
import { PointComponentProps } from './components/Points';
import { TAxisLabelFormat } from './components/YAxis';
import { IGrid } from './Histogram';
import { IAxes } from './legacy/types';
import { IAnyChartPoint, IChartPoint } from './LineChart';
export interface IScatterPlotDataSet<T> {
    label: string;
    point: {
        radius: number;
        stroke: string;
        fill: string;
        show: boolean;
        showTitle?: boolean;
    };
    data: T[];
}
export interface IProps<T extends IAnyChartPoint = IChartPoint> {
    axis: IAxes;
    data: IScatterPlotDataSet<T>[];
    grid?: IGrid;
    height: number;
    id?: string;
    width: number;
    xAxisHeight?: number;
    yAxisWidth?: number;
    title?: string;
    description?: string;
    /**
     * @description if true then adds a 0 to the data domain. Useful if you don't want your lowest value to appear on top of the x axis
     */
    clampToZero?: boolean;
    axisLabelFormat?: TAxisLabelFormat;
    /** @description Custom component to override the default <circle /> used to plot points */
    PointComponent?: FC<PointComponentProps>;
}
declare const ScatterPlot: FC<IProps>;
export default ScatterPlot;
