import { BarChartDataSet } from '../Histogram';
import { TipFunc } from './ToolTip';
type Props = {
    data: BarChartDataSet;
    setIndex: number;
    bins: string[];
    width: number;
    height: number;
    colorScheme?: readonly string[];
    hoverColorScheme?: readonly string[];
    tip?: TipFunc;
    outerRadius: number;
    innerRadius: number;
};
/**
 * Render a ring of data - most often used inside a PieChart
 */
export declare const Ring: ({ colorScheme, height, hoverColorScheme, width, data, bins, setIndex, tip, outerRadius, innerRadius, }: Props) => JSX.Element;
export {};
