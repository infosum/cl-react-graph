import { FC } from 'react';
import { IBarChartDataSet } from './Histogram';
interface IProps {
    className?: string;
    theme?: string[];
    data: {
        bins: string[];
        counts: IBarChartDataSet[];
    };
    onSelect: (label: string) => void;
    visible: {
        [key: string]: boolean;
    };
}
declare const Legend: FC<IProps>;
export default Legend;
