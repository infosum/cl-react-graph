import { HTMLAttributes } from 'react';
type Props = {
    width: number;
    height: number;
    padding?: number;
    description?: string;
};
export declare const Base: ({ children, width, height, padding, id, className, style, title, description, }: Props & HTMLAttributes<SVGElement>) => JSX.Element | null;
export {};
