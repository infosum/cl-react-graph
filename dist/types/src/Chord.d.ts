import { ColorScheme } from './utils/colorScheme';
export type Props = {
    width: number;
    height: number;
    padding?: number;
    data: Record<string, number[]>;
    colorScheme?: ColorScheme;
    /** @description Chart <title /> */
    title?: string;
    inactive?: {
        stroke: string;
        fill: string;
    };
};
export declare const Chord: ({ width, height, padding, data, colorScheme, inactive, title, }: Props) => JSX.Element;
