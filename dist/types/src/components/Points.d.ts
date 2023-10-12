import { FC } from "react";
import { Props } from "../utils/useMakeLine";
import { PointProps } from "./Point";
export type PointComponentProps = PointStyle & PointProps;
export type PointStyle = {
    z?: number;
    fill?: string;
    label?: string;
    stroke?: string;
    showTitle?: boolean;
    show?: boolean;
    /** @description Custom component to override the default <circle /> used to plot points */
    PointComponent?: FC<PointComponentProps>;
};
export type TPoints = Omit<Props, "line" | "curveType"> & PointStyle;
export declare const Points: (props: TPoints) => JSX.Element | null;
