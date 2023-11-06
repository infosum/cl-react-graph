/// <reference types="react" />
import { ExtendedGroupItem } from "./Bars/Bars";
export type TipFunc = (props: {
    item: ExtendedGroupItem;
    bin: string | [number, number];
}) => JSX.Element;
export declare const TipContent: TipFunc;
