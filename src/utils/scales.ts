import {
  scaleLinear,
  ScaleLinear,
  scaleLog,
  ScaleLogarithmic,
  scaleTime,
  ScaleTime,
  ScaleBand,
} from 'd3-scale';

import { IAxes } from '../';

export type AnyScale = ScaleLinear<number, number>
  | ScaleTime<any, any>
  | ScaleLogarithmic<any, any>
  | ScaleBand<string>;

export const buildScales = (axis: IAxes) => {
  let x: AnyScale;
  let y: AnyScale;
  switch (axis.x.scale) {
    case 'LOG':
      x = scaleLog().clamp(true); // clamp values below 1 to be equal to 0
      break;
    case 'TIME':
      x = scaleTime();
      break;
    default:
      x = scaleLinear();
      break;
  }

  switch (axis.y.scale) {
    case 'LOG':
      y = scaleLog().clamp(true); // clamp values below 1 to be equal to 0
      break;
    case 'TIME':
      y = scaleTime();
      break;
    default:
      y = scaleLinear();
      break;
  }
  return [x, y];
};
