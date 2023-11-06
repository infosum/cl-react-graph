import { SpringConfig } from "@react-spring/web";
import { EChartDirection } from "../../BarChart";
import { BarChartDataSet } from "../../Histogram";
import { ColorScheme } from "../../utils/colorScheme";
import { TLabelComponent } from "../Label";
import { TipFunc } from "../ToolTip";
type Props = {
    bins: [number, number][];
    config?: SpringConfig;
    colorScheme?: ColorScheme;
    continuousDomain: [number, number];
    direction?: EChartDirection;
    domain: [number, number];
    height: number;
    hoverColorScheme?: ColorScheme;
    id: string;
    labels?: string[];
    left?: number;
    showLabels?: boolean[];
    LabelComponent?: TLabelComponent;
    stroke?: string;
    top?: number;
    tip?: TipFunc;
    values: BarChartDataSet[];
    visible?: Record<string, boolean>;
    width: number;
    rx?: number;
    ry?: number;
};
export declare const HistogramBars: ({ bins, config, colorScheme, continuousDomain, direction, domain, height, hoverColorScheme, id, LabelComponent, labels, left, showLabels, stroke, top, tip, values, visible, width, rx, ry, }: Props) => JSX.Element | null;
export {};
