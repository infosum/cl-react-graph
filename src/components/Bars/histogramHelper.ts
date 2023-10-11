import { ScaleLinear } from 'd3-scale';

import { SpringConfig } from '@react-spring/web';

import { EChartDirection } from '../../BarChart';
import { BarChartDataSet } from '../../Histogram';
import {
  ColorScheme,
  getFill,
} from '../../utils/colorScheme';
import { ExtendedGroupItem } from './Bars';

type HistogramSpringProps = {
  bins: [number, number][];
  values: BarChartDataSet[];
  height: number;
  width: number;
  dataSets: ExtendedGroupItem[];
  numericScale: ScaleLinear<any, any>;
  continuousScale: ScaleLinear<any, any>;
  colorScheme: ColorScheme;
  hoverColorScheme?: ColorScheme;
  config: SpringConfig,
  direction: EChartDirection;
}
/**
 * Build the from / to spring animation properties to animate the bars.
 */
export const buildHistogramSprings = (props: HistogramSpringProps) => {
  const { bins, direction, config, height, dataSets, numericScale, continuousScale, colorScheme, hoverColorScheme } = props;
  const s = dataSets.map((item, index) => {
    const bandPosition = continuousScale(bins[index][0]);

    // Ensure that if we have bins that don't start at 0 our bars will still have the correct width
    const startValue = bins[0][0];
    const binWidth = bins[index][1] - bins[index][0];
    const itemWidth = continuousScale(binWidth + startValue);

    const itemHeight = numericScale(item.value);
    const hoverFill = getFill(
      hoverColorScheme
        ? hoverColorScheme[item.datasetIndex]
        : colorScheme[item.datasetIndex]
    );
    const fill = getFill(colorScheme[item.datasetIndex]);
    if (direction === EChartDirection.HORIZONTAL) {
      return {
        from: {
          width: 0,
          fill,
          hoverFill,
          x: 0,
          y: height - itemWidth - bandPosition,
          height: itemWidth,
        },
        to: {
          width: itemHeight,
          fill,
          hoverFill,
          x: 0,
          y: height - itemWidth - bandPosition,
          height: itemWidth,
        },
        config,
      }
    }

    return {
      from: {
        height: 0,
        fill,
        hoverFill,
        x: bandPosition,
        y: height,
        width: itemWidth,
      },
      to: {
        height: itemHeight,
        fill,
        hoverFill,
        x: bandPosition,
        y: height - itemHeight,
        width: itemWidth,
      },
      config,
    }
  });
  return s;
}
