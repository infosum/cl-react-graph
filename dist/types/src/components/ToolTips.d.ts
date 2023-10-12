import { RefObject } from "react";
import { ExtendedGroupItem } from "./Bars/Bars";
import { TipFunc } from "./ToolTip";
type Props = {
    items: ExtendedGroupItem[];
    springs: any[];
    refs: RefObject<any>[];
    bins: (string | [number, number])[];
    tip?: TipFunc;
};
export declare const ToolTips: ({ items, springs, refs, bins, tip }: Props) => JSX.Element;
export {};
