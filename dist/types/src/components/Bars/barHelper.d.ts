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
    hoverColorScheme?: ColorScheme;
    innerDomain: string[];
    innerScaleBand: ScaleBand<string>;
    groupLayout: EGroupedBarLayout;
    paddings: HistogramBar;
    config: SpringConfig;
    direction: EChartDirection;
    /** @description - inverse the bars e.g if direction = horizontal run the bars from right to left */
    inverse?: boolean;
    itemWidths: number[];
    radius?: number;
};
/**
 * Build the from / to spring animation properties to animate the bars.
 */
export declare const buildBarSprings: (props: BarSpringProps) => {
    from: {
        width: number;
        d: string;
        fill: string;
        hoverFill: string;
        x: number;
        y: number;
        height: number;
    };
    to: {
        width: number;
        d: string;
        fill: string;
        hoverFill: string;
        x: number;
        y: number;
        height: number;
    };
    config: Partial<import("@react-spring/core").AnimationConfig>;
}[];
/**
 * If we are using a STACKED group layout then work out the total height
 * of the bars which should be stacked under the current item.
 * This should provide us with the finishing location for the bar's y position.
 */
export declare const getValueOffset: (item: ExtendedGroupItem, props: BarSpringProps) => any;
export declare const shouldShowLabel: (item: ExtendedGroupItem, visible: Record<string, boolean>, showLabels: boolean[]) => boolean;
