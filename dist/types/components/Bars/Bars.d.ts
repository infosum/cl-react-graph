import { FC } from 'react';
import { SpringConfig } from 'react-spring';
import { EChartDirection } from '../../BarChart';
import { EGroupedBarLayout, IBarChartDataSet, IGroupDataItem, IHistogramBar } from '../../Histogram';
import { TLabelComponent } from '../Label';
import { TTipFunc } from '../ToolTip';
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
    showLabels?: boolean[];
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
