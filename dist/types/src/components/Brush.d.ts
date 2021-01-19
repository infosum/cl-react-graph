import { FC, ReactNode } from 'react';
interface IPosition {
    start: number;
    end: number;
}
interface IProps {
    width: number;
    height: number;
    brushWidth: number;
    top?: number;
    left?: number;
    chart: () => ReactNode;
    initialPosition?: IPosition;
    onChange?: ({ start, end }: IPosition) => void;
}
declare const Brush: FC<IProps>;
export default Brush;
