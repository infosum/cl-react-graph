import { FC } from 'react';
import { IAxes, IDomain, IGrid, IHistogramBar, IHistogramData, IMargin, IStroke, TipContentFn } from './Histogram';
import { DeepPartial } from './utils/types';
export interface IJoyPlotProps {
    axis: IAxes;
    bar: IHistogramBar;
    className: string;
    data: IHistogramData[];
    delay: number;
    duration: number;
    colorScheme: string[];
    domain: IDomain;
    grid: IGrid;
    height: number;
    margin: IMargin;
    stroke: IStroke;
    tip: any;
    tipContainer: string;
    tipContentFn: TipContentFn<string>;
    visible: {
        [key: string]: boolean;
    };
    width: number | string;
}
declare const JoyPlot: FC<DeepPartial<IJoyPlotProps>>;
export default JoyPlot;
