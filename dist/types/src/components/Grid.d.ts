import { SVGAttributes } from "react";
import { GridProps } from "../";
type Props = {
    left?: number;
    top?: number;
    width: number;
    height: number;
    /** @deprecated use x/y instead */
    stroke?: string;
    /** @deprecated use x/y instead */
    lines?: {
        horizontal: number;
        vertical: number;
    };
    /** @deprecated use x/y instead */
    svgProps?: SVGAttributes<SVGLineElement>;
} & Partial<GridProps>;
export declare const Grid: (props: Props) => JSX.Element;
export {};
