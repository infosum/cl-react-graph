/// <reference types="react" />
import { ExtendedGroupItem } from './Bars/Bars';
export declare type TTipFunc = (props: {
    item: ExtendedGroupItem;
    bin: string | [number, number];
}) => JSX.Element;
export declare const TipContent: TTipFunc;
