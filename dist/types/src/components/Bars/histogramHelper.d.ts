import { ScaleLinear } from "d3-scale";
import { SpringConfig } from "@react-spring/web";
import { EChartDirection } from "../../BarChart";
import { BarChartDataSet } from "../../Histogram";
import { ExtendedGroupItem } from "./Bars";
type HistogramSpringProps = {
    bins: [number, number][];
    values: BarChartDataSet[];
    height: number;
    width: number;
    dataSets: ExtendedGroupItem[];
    numericScale: ScaleLinear<any, any>;
    continuousScale: ScaleLinear<any, any>;
    colorScheme: readonly string[];
    hoverColorScheme?: readonly string[];
    config: SpringConfig;
    direction: EChartDirection;
};
/**
 * Build the from / to spring animation properties to animate the bars.
 */
export declare const buildHistogramSprings: (props: HistogramSpringProps) => ({
    from: {
        width: number;
        fill: string;
        hoverFill: string;
        x: number;
        y: number;
        height: any;
    };
    to: {
        width: any;
        fill: string;
        hoverFill: string;
        x: number;
        y: number;
        height: any;
    };
    config: Partial<import("@react-spring/core").AnimationConfig>;
} | {
    from: {
        height: number;
        fill: string;
        hoverFill: string;
        x: any;
        y: number;
        width: any;
    };
    to: {
        height: any;
        fill: string;
        hoverFill: string;
        x: any;
        y: number;
        width: any;
    };
    config: Partial<import("@react-spring/core").AnimationConfig>;
})[];
export {};
