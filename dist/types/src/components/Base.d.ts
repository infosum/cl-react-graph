import { FC, HTMLAttributes } from 'react';
interface IProps {
    width: number;
    height: number;
    padding?: number;
}
declare const Base: FC<IProps & HTMLAttributes<SVGElement>>;
export default Base;
