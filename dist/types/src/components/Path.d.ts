import { FC, HTMLAttributes } from 'react';
interface IPathProps {
    fill: string;
    stroke?: string;
    d: string;
    opacity: number;
}
declare const Path: FC<IPathProps & HTMLAttributes<SVGElement>>;
export default Path;
