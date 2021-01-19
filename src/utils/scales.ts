import {
  ScaleBand,
  scaleLinear,
  ScaleLinear,
  scaleLog,
  ScaleLogarithmic,
  ScalePoint,
  scaleTime,
  ScaleTime,
} from 'd3-scale';

import { IAxes } from '../';

export type AnyScale = ScaleLinear<number, number>
  | ScaleTime<any, any>
  | ScaleLogarithmic<any, any>
  | ScaleBand<string>
  | ScalePoint<string>;

export const buildScales = (axis: IAxes) => {
  let x: AnyScale;
  let y: AnyScale;

  switch (axis.x.scale) {
    case 'log':
      x = scaleLog().clamp(true); // clamp values below 1 to be equal to 0
      break;
    case 'time':
      x = scaleTime();
      break;
    default:
      x = scaleLinear();
      break;
  }

  switch (axis.y.scale) {
    case 'log':
      y = scaleLog().clamp(true); // clamp values below 1 to be equal to 0
      break;
    case 'time':
      y = scaleTime();
      break;
    default:
      y = scaleLinear();
      break;
  }
  return [x, y];
};
