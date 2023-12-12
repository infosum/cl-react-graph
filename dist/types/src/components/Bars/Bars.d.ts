/// <reference types="react" />
import { SpringConfig } from "@react-spring/web";
import { EChartDirection } from "../../BarChart";
import { BarChartDataSet, EGroupedBarLayout, GroupDataItem, HistogramBar } from "../../Histogram";
import { ColorScheme } from "../../utils/colorScheme";
import { TLabelComponent } from "../Label";
import { TipFunc } from "../ToolTip";
export type Props = {
    bins: (string | [number, number])[];
    config?: SpringConfig;
    colorScheme?: ColorScheme;
    domain: number[];
    direction?: EChartDirection;
    id?: string;
    groupLayout?: EGroupedBarLayout;
    /** @description Height of the bar render area */
    height: number;
    hoverColorScheme?: ColorScheme;
    LabelComponent?: TLabelComponent;
    labels?: string[];
    left?: number;
    padding?: HistogramBar;
    top?: number;
    tip?: TipFunc;
    showLabels?: boolean[];
    values: BarChartDataSet[];
    visible?: Record<string, boolean>;
    width: number;
    inverse?: boolean;
    rx?: number;
    ry?: number;
    radius?: number;
};
export type ExtendedGroupItem = GroupDataItem & {
    datasetIndex: number;
    binIndex: number;
    percentage: string;
};
export declare const defaultPadding: HistogramBar;
export declare const Bars: ({ bins, colorScheme, config, direction, domain, id, groupLayout, height, hoverColorScheme, LabelComponent, labels, left, padding, showLabels, tip, top, values, visible, width, inverse, rx, ry, radius, }: Props) => JSX.Element | null;
