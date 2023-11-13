/// <reference types="react" />
import { SpringValue } from "@react-spring/web";
import { EChartDirection } from "../BarChart";
import { ExtendedGroupItem } from "./Bars/Bars";
export type Props = {
    direction?: EChartDirection;
    fill?: string;
    inverse?: boolean;
    item: ExtendedGroupItem;
    height: SpringValue<number>;
    containerHeight: number;
    x: SpringValue<number>;
    y: SpringValue<number>;
    width: SpringValue<number>;
    label?: string;
};
export type TLabelComponent = (props: Props) => JSX.Element;
export declare const Label: ({ fill, height, width, x, y, direction, item, inverse, containerHeight, label, }: Props) => JSX.Element;
