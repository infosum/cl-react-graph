/// <reference types="react" />
import { EChartDirection } from "../BarChart";
import { ExtendedGroupItem } from "./Bars/Bars";
type Props = {
    direction?: EChartDirection;
    label?: string;
    item: ExtendedGroupItem;
    fill?: string;
    inverse?: boolean;
};
export type TLabelComponent = (props: Props) => JSX.Element;
export declare const Label: ({ direction, label, item, fill, inverse, }: Props) => JSX.Element;
export {};
