import { ScaleLinear } from 'd3-scale';
import { SpringConfig } from 'react-spring';
import { IBarChartDataSet } from '../../Histogram';
import { EChartDirection } from '../../v3/BarChart';
import { ExtendedGroupItem } from './Bars';
interface IHistogramSpringProps {
    bins: [number, number][];
    values: IBarChartDataSet[];
    height: number;
    width: number;
    dataSets: ExtendedGroupItem[];
    numericScale: ScaleLinear<any, any>;
    continuousScale: ScaleLinear<any, any>;
    colorScheme: readonly string[];
    hoverColorScheme?: readonly string[];
    config: SpringConfig;
    direction: EChartDirection;
}
/**
 * Build the from / to spring animation properties to animate the bars.
 */
export declare const buildHistogramSprings: (props: IHistogramSpringProps) => ({
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
    config: SpringConfig;
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
    config: SpringConfig;
})[];
export {};
