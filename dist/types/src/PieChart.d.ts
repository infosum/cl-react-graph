import { RingItem } from './components/Ring';
import { TipFunc } from './components/ToolTip';
import { BarChartDataSet } from './Histogram';
export type Props = {
    data: {
        bins: string[];
        counts: BarChartDataSet[];
    };
    backgroundColor?: string;
    className?: string;
    colorScheme?: readonly string[];
    donutWidth?: number;
    height: number;
    hoverColorScheme?: readonly string[];
    tip?: TipFunc;
    visible?: {
        [key: string]: boolean;
    };
    width: number;
    /** @description Chart <title /> */
    title?: string;
    description?: string;
    id?: string;
    /** @description Format the label that appears above each pie chart's segment */
    labelFormat?: (item: RingItem) => string;
};
export declare const PieChart: (props: Props) => JSX.Element | null;
