import { SpringConfig } from "@react-spring/web";
import { EChartDirection } from "./BarChart";
import { TLabelComponent } from "./components/Label";
import { TipFunc } from "./components/ToolTip";
import { ELabelOrientation, TAxisLabelFormat } from "./components/YAxis";
import { SVGLineStyle } from "./utils/types";
export declare enum EGroupedBarLayout {
    GROUPED = 0,
    STACKED = 1,
    OVERLAID = 2
}
export type BarChartDataSet = {
    borderColors?: string[];
    colors?: string[];
    label: string;
    data: number[];
};
export declare enum EColorManipulations {
    "negate" = "negate",
    "lighten" = "lighten",
    "darken" = "darken",
    "saturate" = "saturate",
    "desaturate" = "desaturate",
    "whiten" = "whiten",
    "blacken" = "blacken",
    "fade" = "fade",
    "opaquer" = "opaquer",
    "rotate" = "rotate"
}
export type GroupDataItem = {
    label: string;
    groupLabel?: string;
    colorRef?: string;
    value: number;
    side?: "left" | "right";
};
export type HistogramBar = {
    grouped: {
        paddingInner: number;
        paddingOuter: number;
    };
    paddingOuter: number;
    paddingInner: number;
    hover?: Partial<Record<EColorManipulations, number>>;
    /**
     * @description When bars are rendered as EGroupedBarLayout.OVERLAID (offset between the two overlaid bars)
     * If < 1 then use it as a percentage offset of the bar width otherwise use as a pixel offset
     */
    overlayMargin: number;
    rx?: number;
    ry?: number;
};
export type HistogramData = {
    bins: [number, number][];
    counts: BarChartDataSet[];
    colorScheme?: string[];
    title?: string;
};
export type GroupData = GroupDataItem[][];
export type BarChartData = {
    bins: string[];
    counts: BarChartDataSet[];
    colorScheme?: string[];
    title?: string;
};
export type Grid = {
    x: {
        height: number;
        ticks: number;
        visible: boolean;
        style: SVGLineStyle;
    };
    y: {
        style: SVGLineStyle;
        ticks: number;
        visible: boolean;
    };
};
export type Props = {
    animation?: SpringConfig;
    axisLabelFormat?: TAxisLabelFormat;
    colorScheme?: string[];
    data: HistogramData;
    direction?: EChartDirection;
    id?: string;
    grid?: Grid;
    height: number;
    LabelComponent?: TLabelComponent;
    hoverColorScheme?: string[];
    showLabels?: boolean[];
    tip?: TipFunc;
    visible?: Record<string, boolean>;
    width: number;
    xAxisHeight?: number;
    xAxisLabelOrientation?: ELabelOrientation;
    yAxisWidth?: number;
    /** @description Chart <title /> */
    title?: string;
    description?: string;
    bars?: {
        rx?: number;
        ry?: number;
    };
};
/**
 * A Histogram renders continuous data and thus use a ScaleLinear x & y axis
 */
export declare const Histogram: ({ animation, axisLabelFormat, colorScheme, data, direction, id, grid, height, hoverColorScheme, LabelComponent, showLabels, tip, visible, width, xAxisHeight, xAxisLabelOrientation, yAxisWidth, title, description, bars, }: Props) => JSX.Element | null;
