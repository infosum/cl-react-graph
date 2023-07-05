import { HTMLAttributes } from 'react';
export type Props = {
    width: number;
    height: number;
    padding?: number;
    description?: string;
} & HTMLAttributes<SVGElement>;
export declare const Base: ({ children, width, height, padding, id, className, style, title, description, }: Props) => JSX.Element | null;
