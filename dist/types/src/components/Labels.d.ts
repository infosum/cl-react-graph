import { FC } from 'react';
import { EChartDirection } from '../BarChart';
import { ExtendedGroupItem } from './Bars/Bars';
import { TLabelComponent } from './Label';
interface IProps {
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
}
export declare const Labels: FC<IProps>;
export {};
