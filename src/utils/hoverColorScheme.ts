import { color } from 'd3-color';

import {
  ColorScheme,
  isGradient,
} from './colorScheme';

export const getHoverColorScheme = (colorScheme: ColorScheme) => {
  return colorScheme.map((c) => {
      if (isGradient(c)) {
        return {
          ...c,
          stops: c.stops.map((stop) => ({... stop, stopColor: color(stop.stopColor)?.brighter(0.1).toString()}))
        }
      } else {
        return color(c)?.brighter(0.1).toString();
      }
    }) as readonly string[];
}
