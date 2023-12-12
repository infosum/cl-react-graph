/// <reference types="react" />
export type Gradient = {
    gradientTransform?: string;
    stops: {
        offset: string;
        stopColor: string;
        stopOpacity?: number;
    }[];
};
export type ColorSchemeItem = string | Gradient;
export type ColorScheme = readonly ColorSchemeItem[];
export declare const isGradient: (scheme: string | Gradient) => scheme is Gradient;
export declare const getFill: (schemeItem: ColorSchemeItem) => string;
export declare const getGradientId: (schemeItem: Gradient) => string;
export declare const ColorSchemeDefs: ({ schemes }: {
    schemes: ColorScheme[];
}) => JSX.Element;
export declare const getSchemeItem: (scheme: ColorScheme, index: number) => ColorSchemeItem;
