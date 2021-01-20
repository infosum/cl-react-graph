import { ScaleLinear } from 'd3-scale';
import { SpringConfig } from 'react-spring';

import { EChartDirection } from '../../BarChart';
import { IBarChartDataSet } from '../../Histogram';
import { ExtendedGroupItem } from './Bars';

interface IHistogramSpringProps {
  bins: [number, number][];
  values: IBarChartDataSet[];
  height: number;
  width: number;
  dataSets: ExtendedGroupItem[];
  numericScale: ScaleLinear<any, any>;
  continuousScale: ScaleLinear<any, any>;
  colorScheme: readonly string[];
  hoverColorScheme?: readonly string[];
  config: SpringConfig,
  direction: EChartDirection;
}
/**
 * Build the from / to spring animation properties to animate the bars.
 */
export const buildHistogramSprings = (props: IHistogramSpringProps) => {
  const { bins, direction, config, height, dataSets, numericScale, continuousScale, colorScheme, hoverColorScheme } = props;
  const s = dataSets.map((item, index) => {
    const bandPosition = continuousScale(bins[index][0]);

    // Ensure that if we have bins that don't start at 0 our bars will still have the correct width
    const startValue = bins[0][0];
    const binWidth = bins[index][1] - bins[index][0];
    const itemWidth = continuousScale(binWidth + startValue);

    const itemHeight = numericScale(item.value);

    if (direction === EChartDirection.HORIZONTAL) {
      return {
        from: {
          width: 0,
          fill: colorScheme[item.datasetIndex],
          hoverFill: hoverColorScheme?.[item.datasetIndex] ?? colorScheme[item.datasetIndex],
          x: 0,
          y: height - itemWidth - bandPosition,
          height: itemWidth,
        },
        to: {
          width: itemHeight,
          fill: colorScheme[item.datasetIndex],
          hoverFill: hoverColorScheme?.[item.datasetIndex] ?? colorScheme[item.datasetIndex],
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
        fill: colorScheme[item.datasetIndex],
        hoverFill: hoverColorScheme?.[item.datasetIndex] ?? colorScheme[item.datasetIndex],
        x: bandPosition,
        y: height,
        width: itemWidth,
      },
      to: {
        height: itemHeight,
        fill: colorScheme[item.datasetIndex],
        hoverFill: hoverColorScheme?.[item.datasetIndex] ?? colorScheme[item.datasetIndex],
        x: bandPosition,
        y: height - itemHeight,
        width: itemWidth,
      },
      config,
    }
  });
  return s;
}
