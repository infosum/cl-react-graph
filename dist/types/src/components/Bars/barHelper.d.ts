import { ScaleBand, ScaleLinear } from "d3-scale";
import { SpringConfig } from "@react-spring/web";
import { EChartDirection } from "../../BarChart";
import { BarChartDataSet, EGroupedBarLayout, HistogramBar } from "../../Histogram";
import { ColorScheme } from "../../utils/colorScheme";
import { ExtendedGroupItem } from "./Bars";
export type BarSpringProps = {
    values: BarChartDataSet[];
    height: number;
    width: number;
    dataSets: ExtendedGroupItem[];
    numericScale: ScaleLinear<any, any>;
    bandScale: ScaleBand<string>;
    colorScheme: ColorScheme;
    hoverColorScheme?: readonly string[];
    innerDomain: string[];
    innerScaleBand: ScaleBand<string>;
    groupLayout: EGroupedBarLayout;
    paddings: HistogramBar;
    config: SpringConfig;
    direction: EChartDirection;
    /** @description - inverse the bars e.g if direction = horizontal run the bars from right to left */
    inverse?: boolean;
    itemWidths: number[];
};
/**
 * Build the from / to spring animation properties to animate the bars.
 */
export declare const buildBarSprings: (props: BarSpringProps) => ({
    from: {
        width: number;
        fill: string;
        hoverFill: string;
        x: any;
        y: number;
        height: number;
    };
    to: {
        width: any;
        fill: string;
        hoverFill: string;
        x: any;
        y: number;
        height: number;
    };
    config: Partial<import("@react-spring/core").AnimationConfig>;
} | {
    from: {
        height: number;
        fill: string;
        hoverFill: string;
        x: number;
        y: number;
        width: number;
    };
    to: {
        height: any;
        fill: string;
        hoverFill: string;
        x: number;
        y: any;
        width: number;
    };
    config: Partial<import("@react-spring/core").AnimationConfig>;
})[];
/**
 * If we are using a STACKED group layout the work out the total height
 * of the bars which should be stacked under the current item.
 * This should provide us with the finishing location for the bar's y position.
 */
export declare const getValueOffset: (item: ExtendedGroupItem, props: BarSpringProps) => any;
