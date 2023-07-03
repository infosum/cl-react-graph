import { EChartDirection } from '../BarChart';
import { ExtendedGroupItem } from './Bars/Bars';
import { TLabelComponent } from './Label';
type Props = {
    colorScheme?: readonly string[];
    direction: EChartDirection;
    items: ExtendedGroupItem[];
    LabelComponent?: TLabelComponent;
    labels?: string[];
    showLabels?: boolean[];
    springs: any[];
    visible?: Record<string, boolean>;
    inverse?: boolean;
    width: number;
};
export declare const Labels: ({ colorScheme, springs, items, direction, labels, LabelComponent, showLabels, visible, inverse, width, }: Props) => JSX.Element;
export {};
