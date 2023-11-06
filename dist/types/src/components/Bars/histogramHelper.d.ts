import { ScaleLinear } from "d3-scale";
import { SpringConfig } from "@react-spring/web";
import { EChartDirection } from "../../BarChart";
import { BarChartDataSet } from "../../Histogram";
import { ColorScheme } from "../../utils/colorScheme";
import { ExtendedGroupItem } from "./Bars";
type HistogramSpringProps = {
    bins: [number, number][];
    values: BarChartDataSet[];
    height: number;
    width: number;
    dataSets: ExtendedGroupItem[];
    numericScale: ScaleLinear<any, any>;
    continuousScale: ScaleLinear<any, any>;
    colorScheme: ColorScheme;
    hoverColorScheme?: ColorScheme;
    config: SpringConfig;
    direction: EChartDirection;
};
/**
 * Build the from / to spring animation properties to animate the bars.
 */
export declare const buildHistogramSprings: (props: HistogramSpringProps) => ({
    from: {
        width: number;
        fill: import("../../utils/colorScheme").ColorSchemeItem;
        hoverFill: import("../../utils/colorScheme").ColorSchemeItem;
        x: number;
        y: number;
        height: any;
    };
    to: {
        width: any;
        fill: import("../../utils/colorScheme").ColorSchemeItem;
        hoverFill: import("../../utils/colorScheme").ColorSchemeItem;
        x: number;
        y: number;
        height: any;
    };
    config: Partial<import("@react-spring/core").AnimationConfig>;
} | {
    from: {
        height: number;
        fill: import("../../utils/colorScheme").ColorSchemeItem;
        hoverFill: import("../../utils/colorScheme").ColorSchemeItem;
        x: any;
        y: number;
        width: any;
    };
    to: {
        height: any;
        fill: import("../../utils/colorScheme").ColorSchemeItem;
        hoverFill: import("../../utils/colorScheme").ColorSchemeItem;
        x: any;
        y: number;
        width: any;
    };
    config: Partial<import("@react-spring/core").AnimationConfig>;
})[];
export {};
