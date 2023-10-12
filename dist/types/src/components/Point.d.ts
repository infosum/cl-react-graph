import React from "react";
import { PointStyle } from "./Points";
export declare const defaultPointStyle: PointStyle;
export type PointProps<V = number | string | Date> = {
    id?: string;
    /** @description Pixel x value */
    cx: number;
    /** @description Pixel y value */
    cy: number;
    /** @description Actual X value */
    x?: V;
    /** @description Actual Y value */
    y?: V;
    z?: number;
    className?: string;
    opacity?: number;
    children?: React.ReactNode;
};
export declare const Point: ({ children, cx, cy, fill, id, PointComponent, z, stroke, x, y, opacity, }: PointStyle & PointProps) => JSX.Element;
