import { ScaleBand, ScaleLinear } from 'd3-scale';
import { SpringConfig } from 'react-spring';
import { EGroupedBarLayout, IHistogramBar, IHistogramDataSet } from '../../Histogram';
import { EChartDirection } from '../../v3/Histogram';
import { ExtendedGroupItem } from './Bars';
interface IBarSpringProps {
    values: IHistogramDataSet[];
    height: number;
    width: number;
    dataSets: ExtendedGroupItem[];
    numericScale: ScaleLinear<any, any>;
    bandScale: ScaleBand<string>;
    colorScheme: string[];
    hoverColorScheme?: string[];
    innerDomain: string[];
    innerScaleBand: ScaleBand<string>;
    groupLayout: EGroupedBarLayout;
    paddings: IHistogramBar;
    config: SpringConfig;
    direction: EChartDirection;
}
/**
 * Build the from / to spring animation properties to animate the bars.
 */
export declare const buildBarSprings: (props: IBarSpringProps) => ({
    from: {
        width: number;
        fill: string;
        hoverFill: string;
        x: number;
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
    config: SpringConfig;
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
    config: SpringConfig;
})[];
/**
 * If we are using a STACKED group layout the work out the total height
 * of the bars which should be stacked under the current item.
 * This should provide us with the finishing location for the bar's y position.
 */
export declare const getValueOffset: (item: ExtendedGroupItem, props: IBarSpringProps) => any;
export {};
