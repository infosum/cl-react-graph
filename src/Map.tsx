import {
  ExtendedFeatureCollection,
  geoEquirectangular,
  geoPath,
  GeoProjection,
  interpolateSpectral,
  scaleSequential,
} from 'd3';
import React, { RefObject } from 'react';

import {
  Base,
  Props as BaseProps,
} from './components/Base';
import { TipFunc } from './components/ToolTip';
import { ToolTips } from './components/ToolTips';

type MapData = Record<string, number>;

type Props = {
  /** Object name found in feature.properties whose value matches the data's key. This ties the data to the given map area. */
  bin: string;
  /** Map data record each key should correspond to a geoJSON.properties[bin] value*/
  data: MapData;
  /** Colour interpolate function. Defaults to d3 interpolateSpectral. */
  colorInterpolate?: (t: number) => string;
  /** Min / Max values for the data. If not set we will calculate from the data's min / max. */
  domain?: [number, number];
  /** D3 map projection. Defaults to geoEquirectangular */
  projection?: () => GeoProjection;
  /** GeoJSON object used to draw the map */
  geoJSON: ExtendedFeatureCollection;
  /** Tip function */
  tip?: TipFunc;
} & BaseProps;


const isExtendedJSON = (json: any): json is ExtendedFeatureCollection => {
  return json.hasOwnProperty('features')
}

// @TODO allow topoJSON as well (file located here src/assets/uk-region.topo.json)
export const Map = ({
  width,
  height,
  description,
  padding,
  id,
  className,
  bin,
  colorInterpolate = interpolateSpectral,
  data,
  domain,
  projection,
  geoJSON,
  tip,
}: Props) => {

  const refs: RefObject<any>[] = [];

  if (!isExtendedJSON(geoJSON)) {
    throw new Error('not geo json feature set');
  }
  const min =  domain?.[0] ?? Object.values(data).reduce((p, n) => n > p ? n : p, 0);
  const max = domain?.[1] ?? Object.values(data).reduce((p, n) => n < p ? n : p, 0);
  const scale = scaleSequential(colorInterpolate).domain([min, max]);

  const thisProjection = (projection ?? geoEquirectangular)().fitSize([width, height], geoJSON);

  const geoGenerator = geoPath().projection(thisProjection);

  const featurePaths = geoJSON.features.map((f) => ({
    d: geoGenerator(f),
    bin: f?.properties?.[bin]  ?? '',
    center: geoPath().centroid(f),
  }))

  const total = Object.values(data).reduce((p, n) => p + n, 0);

  const tipItems = featurePaths.map(({center, bin}, i) => ({
    transform: `translate(${center[0] + width / 2},${center[1] + height / 2})`,
    item: {
      binIndex: i,
      label: bin,
      datasetIndex: 0,
      value: data[bin],
      percentage: (Math.round(( data[bin] / total) * 100)).toString(),
    }
  }));

  return (
  <Base 
    width={width}
    height={height}
    description={description}
    className={className}
    id={id}
    padding={padding}
  >
    {
      featurePaths.map((d, i) => {
        refs[i] = React.createRef<any>();
        return <path key={d.bin} d={d.d ?? ''}
        ref={refs[i]}
        data-name={d.bin}
        fill={scale(data[d.bin])} stroke="#fff" />;
      })
    }
    <ToolTips
      springs={tipItems}
      refs={refs}
      bins={Object.keys(data)}
      tip={tip}
      items={tipItems.map(({item}) => item)} />
  </Base>
  )
}
