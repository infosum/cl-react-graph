import { ScaleLinear } from "d3-scale";

import { SpringConfig } from "@react-spring/web";

import { EChartDirection } from "../../BarChart";
import { BarChartDataSet } from "../../Histogram";
import { ColorScheme, getFill } from "../../utils/colorScheme";
import { ExtendedGroupItem } from "./Bars";

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
  config: SpringConfig;
  direction: EChartDirection;
  radius?: number;
};
/**
 * Build the from / to spring animation properties to animate the bars.
 */
export const buildHistogramSprings = (props: HistogramSpringProps) => {
  const {
    bins,
    direction,
    config,
    height,
    dataSets,
    numericScale,
    continuousScale,
    colorScheme,
    hoverColorScheme,
    radius = 4,
  } = props;
  const s = dataSets.map((item, index) => {
    const bandPosition = continuousScale(bins[index][0]);

    // Ensure that if we have bins that don't start at 0 our bars will still have the correct width
    const startValue = bins[0][0];
    const binWidth = bins[index][1] - bins[index][0];
    const itemWidth = continuousScale(binWidth + startValue);

    const itemHeight = numericScale(item.value);
    const fill = getFill(colorScheme[item.datasetIndex]);
    const hoverFill = getFill(
      hoverColorScheme?.[item.datasetIndex] ?? colorScheme[item.datasetIndex]
    );

    if (direction === EChartDirection.HORIZONTAL) {
      return horizontalSpring({
        fill,
        hoverFill,
        bandPosition,
        height,
        itemWidth,
        config,
        itemHeight,
        radius,
      });
    }

    return verticalSpring({
      fill,
      hoverFill,
      bandPosition,
      height,
      itemWidth,
      config,
      itemHeight,
      radius,
    });
  });
  return s;
};

type FnProps = {
  fill: string;
  hoverFill: string;
  bandPosition: number;
  height: number;
  itemWidth: number;
  itemHeight: number;
  config: SpringConfig;
  radius: number;
};

const horizontalSpring = ({
  fill,
  hoverFill,
  bandPosition,
  height,
  itemWidth,
  itemHeight,
  config,
  radius,
}: FnProps) => {
  const from = {
    x: 0,
    y: height - itemWidth - bandPosition,
  };

  const to = {
    x: 0,
    y: height - itemWidth - bandPosition,
  };
  let r = radius * 2 < itemHeight ? radius : itemHeight / 2;
  const topRightCurve = `a${r} ${r} 0 0 1 ${r} ${r}`;
  const bottomRightCurve = `a${r} ${r} 0 0 1 -${r} ${r}`;
  const vertical = itemWidth;
  const horizontal = itemHeight;

  return {
    from: {
      width: 0,

      d: `m${from.x} ${from.y} h${0} ${topRightCurve} v${
        vertical - 2 * r
      } ${bottomRightCurve} h-${0}  v-${vertical - 2 * r}`,

      fill,
      hoverFill,
      x: 0,
      y: height - itemWidth - bandPosition,
      height: itemWidth,
    },
    to: {
      d: `m${to.x} ${to.y} h${horizontal - r} ${topRightCurve} v${
        vertical - 2 * r
      } ${bottomRightCurve} h-${horizontal - r} v-${vertical - 2 * r}`,

      width: itemHeight,
      fill,
      hoverFill,
      x: 0,
      y: height - itemWidth - bandPosition,
      height: itemWidth,
    },
    config,
  };
};

const verticalSpring = ({
  fill,
  hoverFill,
  bandPosition,
  height,
  itemWidth,
  itemHeight,
  config,
  radius,
}: FnProps) => {
  const r = radius * 2 < itemWidth ? radius : itemWidth / 2;
  const topLeftCurve = `a${r},${r} 0 0 1 ${r},-${r}`;
  const topRightCurve = `a${r} ${r} 0 0 1 ${r} ${r}`;

  const from = {
    x: bandPosition,
    y: height,
  };
  const to = {
    x: bandPosition,
    y: height,
  };
  return {
    from: {
      height: 0,
      d: `m${from.x} ${from.y} v0 ${topLeftCurve} h${
        itemWidth - 2 * r
      } ${topRightCurve} v0 h-${itemHeight} z`,
      fill,
      hoverFill,
      x: bandPosition,
      y: height,
      width: itemWidth,
    },
    to: {
      height: itemHeight,
      d: `m${to.x} ${to.y} v-${itemHeight} ${topLeftCurve} h${
        itemWidth - 2 * r
      } ${topRightCurve} v${itemHeight} h-${itemWidth} z`,
      fill,
      hoverFill,
      x: bandPosition,
      y: height - itemHeight,
      width: itemWidth,
    },
    config,
  };
};
