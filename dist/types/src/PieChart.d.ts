import { FC } from 'react';
import { EColorManipulations, IHistogramDataSet, IMargin, TipContentFn } from './Histogram';
import { DeepPartial } from './utils/types';
interface ILabels {
    display: boolean;
    displayFn: (d: any, ix: number) => string | number;
}
export interface IPieDataItem {
    count: number;
    groupLabel: string;
    label: string;
}
export interface IPieChartProps {
    data: {
        bins: string[];
        counts: IHistogramDataSet[];
    };
    backgroundColor: string;
    className: string;
    colorScheme: string[];
    donutWidth: number;
    height: number;
    hover?: Partial<Record<EColorManipulations, number>>;
    labels: ILabels;
    margin: IMargin;
    tip: any;
    tipContainer: string;
    tipContentFn: TipContentFn<string>;
    visible: {
        [key: string]: boolean;
    };
    width: number | string;
}
declare const PieChart: FC<DeepPartial<IPieChartProps>>;
export default PieChart;
