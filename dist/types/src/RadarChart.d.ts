import { PointStyle } from "./components/Points";
import { ColorScheme } from "./utils/colorScheme";
export type RadarChartData = {
    label?: string;
    axes: {
        axis: string;
        value: number;
    }[];
};
export type Props = {
    /** @description Chart colour scheme */
    colorScheme?: ColorScheme;
    /** @description Chart height */
    height: number;
    /** @description Chart id */
    id?: string;
    /** @description Padding in pixels around the radar chat SVG elements */
    padding?: number;
    /** @description Chart width */
    width: number;
    /** @description Chart data, array of plots each one will be rendered as as filled path inside the radar */
    data: RadarChartData[];
    /** @description Custom component to override the default <circle /> used to plot points */
    points?: PointStyle[];
    /** @description Chart <title /> */
    title?: string;
};
export declare const RadarChart: ({ colorScheme, data, height, id, padding, points, title, width, }: Props) => JSX.Element;
