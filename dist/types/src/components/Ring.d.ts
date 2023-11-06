import { BarChartDataSet } from "../Histogram";
import { ColorScheme } from "../utils/colorScheme";
import { TipFunc } from "./ToolTip";
export type RingItem = {
    binIndex: number;
    datasetIndex: number;
    label: string;
    value: number;
    percentage: string;
};
type Props = {
    data: BarChartDataSet;
    setIndex: number;
    bins: string[];
    width: number;
    height: number;
    colorScheme?: ColorScheme;
    hoverColorScheme?: ColorScheme;
    tip?: TipFunc;
    outerRadius: number;
    innerRadius: number;
    labelFormat?: (item: RingItem) => string;
};
/**
 * Render a ring of data - most often used inside a PieChart
 */
export declare const Ring: ({ colorScheme, height, hoverColorScheme, width, data, bins, setIndex, tip, outerRadius, innerRadius, labelFormat, }: Props) => JSX.Element;
export {};
