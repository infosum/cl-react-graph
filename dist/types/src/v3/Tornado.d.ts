import { FC } from 'react';
import { ITornadoData } from '../Tornado';
interface IProps {
    data: ITornadoData;
    splitBins: [string, string];
}
declare const Tornado: FC<IProps>;
export default Tornado;
