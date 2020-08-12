import { FC } from 'react';
import { EChartDirection } from '../v3/BarChart';
import { ExtendedGroupItem } from './Bars/Bars';
interface IProps {
    direction: EChartDirection;
    label?: string;
    item: ExtendedGroupItem;
    fill?: string;
}
export declare type TLabelComponent = (props: IProps) => JSX.Element;
export declare const Label: FC<IProps>;
export {};
