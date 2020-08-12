import { FC } from 'react';
import { EChartDirection } from '../v3/BarChart';
import { ExtendedGroupItem } from './Bars/Bars';
import { TLabelComponent } from './Label';
interface IProps {
    springs: any[];
    items: ExtendedGroupItem[];
    direction: EChartDirection;
    labels?: string[];
    LabelComponent?: TLabelComponent;
    showLabels?: boolean[];
    visible?: Record<string, boolean>;
}
export declare const Labels: FC<IProps>;
export {};
