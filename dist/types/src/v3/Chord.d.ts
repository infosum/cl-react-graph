import { FC } from 'react';
export interface IProps {
    width: number;
    height: number;
    padding?: number;
    data: Record<string, number[]>;
    colorScheme?: string[];
    inactive?: {
        stroke: string;
        fill: string;
    };
}
declare const Chord: FC<IProps>;
export default Chord;
