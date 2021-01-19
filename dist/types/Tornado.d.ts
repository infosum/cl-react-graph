import { FC } from 'react';
import { EChartDirection } from './BarChart';
import { EGroupedBarLayout } from './Histogram';
import { ITornadoData } from './legacy/Tornado';
interface IProps {
    data: ITornadoData;
    direction?: EChartDirection;
    groupLayout: EGroupedBarLayout;
    height: number;
    splitAxisHeight?: number;
    splitBins: [string, string];
    visible?: Record<string, boolean>;
    xAxisHeight?: number;
    yAxisWidth?: number;
    width: number;
}
declare const Tornado: FC<IProps>;
export default Tornado;
