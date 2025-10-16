import { ReactNode } from 'react';
type Position = {
    start: number;
    end: number;
};
type Props = {
    width: number;
    height: number;
    brushWidth: number;
    top?: number;
    left?: number;
    chart: () => ReactNode;
    initialPosition?: Position;
    onChange?: ({ start, end }: Position) => void;
};
export declare const Brush: ({ onChange, brushWidth, width, height, top, left, chart, initialPosition, }: Props) => JSX.Element;
export {};
