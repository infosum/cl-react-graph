/// <reference types="react" />
type Props = {
    axis?: {
        stroke?: string;
        strokeWidth?: number;
    };
    labels: string[];
    /** @description The number of radial lines to render */
    ticks?: number;
    center: [number, number];
    radial?: {
        stroke?: string;
        strokeWidth?: number;
    };
};
export declare const polar2cart: (degree: number, radius: number) => [number, number];
export declare const Web: ({ axis, ticks, labels, center, radial }: Props) => JSX.Element;
export {};
