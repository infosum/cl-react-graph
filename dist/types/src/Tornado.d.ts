import { FC } from 'react';
import { EChartDirection } from './BarChart';
import { EGroupedBarLayout } from './Histogram';
import { ITornadoData } from './legacy/Tornado';
interface IProps {
    data: ITornadoData;
    direction?: EChartDirection;
    groupLayout: EGroupedBarLayout;
    height: number;
    /** @description Height in px of the axis which labels the left/right values */
    splitAxisHeight?: number;
    /** @description labels for the left/right split axis  */
    splitBins: [string, string];
    visible?: Record<string, boolean>;
    xAxisHeight?: number;
    yAxisWidth?: number;
    width: number;
    padding?: number;
    showBinPercentages: boolean;
}
declare const Tornado: FC<IProps>;
export default Tornado;
