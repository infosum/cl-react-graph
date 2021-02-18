import { FC, HTMLAttributes } from 'react';
interface IPathProps {
    fill: string;
    d: string;
    opacity: number;
}
declare const Path: FC<IPathProps & HTMLAttributes<SVGElement>>;
export default Path;
