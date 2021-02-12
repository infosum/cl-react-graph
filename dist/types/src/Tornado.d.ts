import { FC } from 'react';
import { EChartDirection } from './BarChart';
import { EGroupedBarLayout, IHistogramBar } from './Histogram';
import { ITornadoData } from './legacy/Tornado';
export interface IProps {
    data: ITornadoData;
    direction?: EChartDirection;
    groupLayout: EGroupedBarLayout;
    height: number;
    id?: string;
    /** @description Height in px of the axis which labels the left/right values */
    splitAxisHeight?: number;
    /** @description labels for the left/right split axis  */
    splitBins: [string, string];
    visible?: Record<string, boolean>;
    xAxisHeight?: number;
    yAxisWidth?: number;
    width: number;
    /** @description Padding inside the chart svg */
    chartPadding?: number;
    /** @description bar chart bar padding */
    padding?: IHistogramBar;
    showBinPercentages: boolean;
}
declare const Tornado: FC<IProps>;
export default Tornado;
