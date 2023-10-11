import { SpringConfig } from '@react-spring/web';
import { TLabelComponent } from './components/Label';
import { TipFunc } from './components/ToolTip';
import { ELabelOrientation, TAxisLabelFormat } from './components/YAxis';
import { BarChartData, EGroupedBarLayout, Grid as GridProps, HistogramBar } from './Histogram';
import { ColorScheme } from './utils/colorScheme';
export declare enum EChartDirection {
    HORIZONTAL = "HORIZONTAL",
    VERTICAL = "VERTICAL"
}
type Props = {
    animation?: SpringConfig;
    axisLabelFormat?: TAxisLabelFormat;
    colorScheme?: ColorScheme;
    data: BarChartData;
    direction?: EChartDirection;
    id?: string;
    grid?: GridProps;
    groupLayout?: EGroupedBarLayout;
    height: number;
    LabelComponent?: TLabelComponent;
    padding?: HistogramBar;
    showLabels?: boolean[];
    /** An array of tick values to show on the numerical axis */
    tickValues?: number[];
    tip?: TipFunc;
    /** @description Chart <title /> */
    title?: string;
    visible?: Record<string, boolean>;
    width: number;
    xAxisHeight?: number;
    xAxisLabelOrientation?: ELabelOrientation;
    yAxisWidth?: number;
    bars?: {
        rx?: number;
        ry?: number;
    };
};
export declare const BarChart: ({ animation, axisLabelFormat, colorScheme, data, direction, grid, id, groupLayout, height, LabelComponent, padding, showLabels, tip, visible, width, xAxisHeight, xAxisLabelOrientation, yAxisWidth, tickValues, bars, title, }: Props) => JSX.Element | null;
export {};
