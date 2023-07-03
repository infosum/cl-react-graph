import { SVGAttributes } from 'react';
type Props = {
    left?: number;
    top?: number;
    width: number;
    height: number;
    stroke?: string;
    lines?: {
        horizontal: number;
        vertical: number;
    };
    svgProps?: SVGAttributes<SVGLineElement>;
};
export declare const Grid: ({ left, top, width, height, stroke, lines, svgProps, }: Props) => JSX.Element;
export {};
