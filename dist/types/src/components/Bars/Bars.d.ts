import { FC } from 'react';
import { SpringConfig } from 'react-spring';
import { IGroupDataItem } from '../../BaseHistogramD3';
import { IHistogramBar, IHistogramDataSet } from '../../Histogram';
import { EChartDirection } from '../../HistogramNativeReact';
import { TTipFunc } from './ToolTip';
declare enum EGroupedBarLayout {
    GROUPED = 0,
    STACKED = 1,
    OVERLAID = 2
}
interface IProps {
    padding?: IHistogramBar;
    values: IHistogramDataSet[];
    domain: number[];
    height: number;
    width: number;
    left?: number;
    top?: number;
    groupLayout?: EGroupedBarLayout;
    bins: string[];
    colorScheme?: string[];
    hoverColorScheme?: string[];
    config?: SpringConfig;
    visible?: Record<string, boolean>;
    tip?: TTipFunc;
    direction?: EChartDirection;
}
export declare type ExtendedGroupItem = IGroupDataItem & {
    datasetIndex: number;
    binIndex: number;
};
declare const Bars: FC<IProps>;
export default Bars;
