import { FC } from 'react';
import { IPointStyle } from './components/Points';
export interface IRadarChartData {
    label?: string;
    axes: {
        axis: string;
        value: number;
    }[];
}
export interface IProps {
    /** @description Chart colour scheme */
    colorScheme?: string[];
    /** @description Chart height */
    height: number;
    /** @description Chart id */
    id?: string;
    /** @description Padding in pixels around the radar chat SVG elements */
    padding?: number;
    /** @description Chart width */
    width: number;
    /** @description Chart data, array of plots each one will be rendered as as filled path inside the radar */
    data: IRadarChartData[];
    /** @description Custom component to override the default <circle /> used to plot points */
    points?: IPointStyle[];
    /** @description Chart <title /> */
    title?: string;
}
declare const RadarChart: FC<IProps>;
export default RadarChart;
