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
    radius?: number;
};
/**
 * Build the from / to spring animation properties to animate the bars.
 */
export declare const buildHistogramSprings: (props: HistogramSpringProps) => {
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
        d: string;
        width: number;
        fill: string;
        hoverFill: string;
        x: number;
        y: number;
        height: number;
    };
    config: Partial<import("@react-spring/core").AnimationConfig>;
}[];
export {};
