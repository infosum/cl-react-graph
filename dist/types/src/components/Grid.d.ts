import { FC, SVGAttributes } from 'react';
interface IProps {
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
}
declare const Grid: FC<IProps>;
export default Grid;
