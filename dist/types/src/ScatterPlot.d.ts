import { FC } from 'react';
import { DeepPartial } from './utils/types';
export interface IScatterPlotProps {
    choices: string[];
    className: string;
    data: {
        keys: string[];
        values: any[];
    };
    delay: number;
    distModels: string[];
    duration: number;
    height: number;
    legendWidth: number;
    colorScheme: string[];
    padding: number;
    radius: number;
    split: string;
    width: string | number;
}
declare const ScatterPlot: FC<DeepPartial<IScatterPlotProps>>;
export default ScatterPlot;
