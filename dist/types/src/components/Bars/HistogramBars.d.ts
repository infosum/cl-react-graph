import { FC } from 'react';
import { SpringConfig } from 'react-spring';
import { IBarChartDataSet } from '../../Histogram';
import { EChartDirection } from '../../v3/BarChart';
import { TLabelComponent } from '../Label';
import { TTipFunc } from '../ToolTip';
interface IProps {
    bins: [number, number][];
    config?: SpringConfig;
    colorScheme?: readonly string[];
    continuousDomain: [number, number];
    direction?: EChartDirection;
    domain: [number, number];
    height: number;
    hoverColorScheme?: readonly string[];
    labels?: string[];
    left?: number;
    showLabels?: boolean;
    LabelComponent?: TLabelComponent;
    stroke?: string;
    top?: number;
    tip?: TTipFunc;
    values: IBarChartDataSet[];
    visible?: Record<string, boolean>;
    width: number;
}
declare const HistogramBars: FC<IProps>;
export default HistogramBars;
