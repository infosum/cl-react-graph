import { FeatureCollection } from 'geojson';
import React, {
  FC,
  useRef,
} from 'react';

import { mapD3 } from './MapD3';
import { DeepPartial } from './utils/types';
import { useChart } from './utils/useChart';

export interface IMapProps {
  className: string;
  data: any;
  geojson: FeatureCollection<any, any>;
  height: number;
  width: number | string;
}

const chart = mapD3();

const Map: FC<DeepPartial<IMapProps>> = ({ children, ...rest }) => {
  const [refs] = useChart(useRef(), chart, rest);
  return <div ref={refs} className="map-chart-container"></div>;
};

export default Map;
