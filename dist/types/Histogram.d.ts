import { FC } from 'react';
import { SpringConfig } from 'react-spring';
import { EChartDirection } from './BarChart';
import { TLabelComponent } from './components/Label';
import { TTipFunc } from './components/ToolTip';
import { ELabelOrientation, TAxisLabelFormat } from './components/YAxis';
import { ISVGLineStyle } from './legacy/types';
export declare enum EGroupedBarLayout {
    GROUPED = 0,
    STACKED = 1,
    OVERLAID = 2
}
export interface IBarChartDataSet {
    borderColors?: string[];
    colors?: string[];
    label: string;
    data: number[];
}
export declare enum EColorManipulations {
    'negate' = "negate",
    'lighten' = "lighten",
    'darken' = "darken",
    'saturate' = "saturate",
    'desaturate' = "desaturate",
    'whiten' = "whiten",
    'blacken' = "blacken",
    'fade' = "fade",
    'opaquer' = "opaquer",
    'rotate' = "rotate"
}
export interface IGroupDataItem {
    label: string;
    groupLabel?: string;
    colorRef?: string;
    value: number;
    side?: 'left' | 'right';
}
export interface IHistogramBar {
    grouped: {
        paddingInner: number;
        paddingOuter: number;
    };
    paddingOuter: number;
    paddingInner: number;
    hover?: Partial<Record<EColorManipulations, number>>;
    overlayMargin: number;
}
export interface IHistogramData {
    bins: [number, number][];
    counts: IBarChartDataSet[];
    colorScheme?: string[];
    title?: string;
}
export declare type IGroupData = IGroupDataItem[][];
export interface IBarChartData {
    bins: string[];
    counts: IBarChartDataSet[];
    colorScheme?: string[];
    title?: string;
}
export interface IGrid {
    x: {
        height: number;
        ticks: number;
        visible: boolean;
        style: ISVGLineStyle;
    };
    y: {
        style: ISVGLineStyle;
        ticks: number;
        visible: boolean;
    };
}
export interface IHistogramProps {
    animation?: SpringConfig;
    axisLabelFormat?: TAxisLabelFormat;
    colorScheme?: string[];
    data: IHistogramData;
    direction?: EChartDirection;
    grid?: IGrid;
    height: number;
    LabelComponent?: TLabelComponent;
    hoverColorScheme?: string[];
    showLabels?: boolean[];
    tip?: TTipFunc;
    visible?: Record<string, boolean>;
    width: number;
    xAxisHeight?: number;
    xAxisLabelOrientation?: ELabelOrientation;
    yAxisWidth?: number;
}
/**
 * A Histogram renders continuous data and thus use a ScaleLinear x & y axis
 */
declare const Histogram: FC<IHistogramProps>;
export default Histogram;
