import { FC } from 'react';
import { SpringConfig } from 'react-spring';
import { IGroupDataItem } from '../../BaseHistogramD3';
import { IBarChartDataSet, IHistogramBar } from '../../Histogram';
import { EChartDirection } from '../../v3/BarChart';
import { TLabelComponent } from '../Label';
import { TTipFunc } from '../ToolTip';
declare enum EGroupedBarLayout {
    GROUPED = 0,
    STACKED = 1,
    OVERLAID = 2
}
interface IProps {
    bins: (string | [number, number])[];
    config?: SpringConfig;
    colorScheme?: readonly string[];
    domain: number[];
    direction?: EChartDirection;
    groupLayout?: EGroupedBarLayout;
    height: number;
    hoverColorScheme?: readonly string[];
    LabelComponent?: TLabelComponent;
    labels?: string[];
    left?: number;
    padding?: IHistogramBar;
    top?: number;
    tip?: TTipFunc;
    showLabels?: boolean;
    values: IBarChartDataSet[];
    visible?: Record<string, boolean>;
    width: number;
}
export declare type ExtendedGroupItem = IGroupDataItem & {
    datasetIndex: number;
    binIndex: number;
    percentage: string;
};
declare const Bars: FC<IProps>;
export default Bars;
