import { HTMLAttributes } from "react";
type Props = {
    fill: string;
    stroke?: string;
    d: string;
    opacity: number;
};
export declare const Path: ({ d, fill, stroke, id, opacity, onMouseEnter, onMouseLeave, }: Props & HTMLAttributes<SVGElement>) => JSX.Element;
export {};
