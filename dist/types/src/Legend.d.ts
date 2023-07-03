import { BarChartDataSet } from './Histogram';
type Props = {
    className?: string;
    theme?: string[];
    data: {
        bins: string[];
        counts: BarChartDataSet[];
    };
    onSelect: (label: string) => void;
    visible: {
        [key: string]: boolean;
    };
};
export declare const Legend: ({ className, theme, data, onSelect, visible, }: Props) => JSX.Element;
export {};
