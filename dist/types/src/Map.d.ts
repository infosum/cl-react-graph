import { ExtendedFeatureCollection, GeoProjection } from 'd3';
import { Props as BaseProps } from './components/Base';
import { TipFunc } from './components/ToolTip';
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
export declare const Map: ({ width, height, description, padding, id, className, bin, colorInterpolate, data, domain, projection, geoJSON, tip, }: Props) => JSX.Element;
export {};
