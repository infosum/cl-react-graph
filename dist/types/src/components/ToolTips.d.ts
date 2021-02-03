import { FC, RefObject } from 'react';
import { ExtendedGroupItem } from './Bars/Bars';
import { TTipFunc } from './ToolTip';
interface IProps {
    items: ExtendedGroupItem[];
    springs: any[];
    refs: RefObject<any>[];
    bins: (string | [number, number])[];
    tip?: TTipFunc;
}
export declare const ToolTips: FC<IProps>;
export {};
