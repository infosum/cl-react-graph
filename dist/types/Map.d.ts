import { FeatureCollection } from 'geojson';
import { FC } from 'react';
import { DeepPartial } from './utils/types';
export interface IMapProps {
    className: string;
    data: any;
    geojson: FeatureCollection<any, any>;
    height: number;
    width: number | string;
}
declare const Map: FC<DeepPartial<IMapProps>>;
export default Map;
