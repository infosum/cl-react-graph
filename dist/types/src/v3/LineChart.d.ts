import { FC } from 'react';
import { IAxes, IGrid } from '../Histogram';
import { IChartPoint, IChartPointValue, ILineChartDataSet } from '../LineChart';
interface IProps<T extends IChartPoint<IChartPointValue, IChartPointValue> = IChartPoint> {
    axis: IAxes;
    data: ILineChartDataSet<T>[];
    grid: IGrid;
    height: number;
    width: number;
    xAxisHeight?: number;
    yAxisWidth?: number;
}
declare const LineChart: FC<IProps>;
export default LineChart;
