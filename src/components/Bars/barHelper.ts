import { ScaleBand, ScaleLinear } from "d3-scale";

import { SpringConfig } from "@react-spring/web";

import { EChartDirection } from "../../BarChart";
import {
  BarChartDataSet,
  EGroupedBarLayout,
  HistogramBar,
} from "../../Histogram";
import { ColorScheme, getFill, getSchemeItem } from "../../utils/colorScheme";
import { ExtendedGroupItem } from "./Bars";

/**
 * Calculate the bar's band position based in the axis layout type.
 * This is the offset applied depending on the group layout setting.
 * x for vertical
 * y for horizontal
 */
const getBandPosition = (
  item: ExtendedGroupItem,
  props: BarSpringProps,
  itemWidths: number[]
) => {
  const { innerScaleBand, innerDomain, groupLayout } = props;
  const groupLabel = item.groupLabel ?? "main";
  let bandX = 0;
  switch (groupLayout) {
    case EGroupedBarLayout.OVERLAID:
      // Move to the right for each subsequent dataset to reveal the previous dataset's bars.
      const overlaidOffset =
        item.datasetIndex === 0
          ? 0
          : Math.floor(
              (itemWidths[item.datasetIndex - 1] -
                itemWidths[item.datasetIndex]) /
                2
            );

      bandX = Number(innerScaleBand(String(innerDomain[0]))) + overlaidOffset;
      break;
    case EGroupedBarLayout.STACKED:
      // Each bar will be on top of the other, so they should all have the same starting x value
      bandX = Number(innerScaleBand(String(innerDomain[0])));
      break;
    case EGroupedBarLayout.GROUPED:
      // Position bars next to each other using the x axis inner scale band
      bandX = Number(innerScaleBand(String(groupLabel)));
      break;
  }

  return bandX;
};

export type BarSpringProps = {
  values: BarChartDataSet[];
  height: number;
  width: number;
  dataSets: ExtendedGroupItem[];
  numericScale: ScaleLinear<any, any>;
  bandScale: ScaleBand<string>;
  colorScheme: ColorScheme;
  hoverColorScheme?: ColorScheme;
  innerDomain: string[];
  innerScaleBand: ScaleBand<string>;
  groupLayout: EGroupedBarLayout;
  paddings: HistogramBar;
  config: SpringConfig;
  direction: EChartDirection;
  /** @description - inverse the bars e.g if direction = horizontal run the bars from right to left */
  inverse?: boolean;
  itemWidths: number[];
  radius?: number;
};
/**
 * Build the from / to spring animation properties to animate the bars.
 */
export const buildBarSprings = (props: BarSpringProps) => {
  const {
    direction,
    config,
    height,
    dataSets,
    numericScale,
    bandScale,
    colorScheme,
    hoverColorScheme,
    inverse = false,
    itemWidths,
    radius = 4,
  } = props;
  const [_, width] = numericScale.range();
  const concreteHoverScheme = hoverColorScheme ?? colorScheme;
  const maxDatasetIndex = dataSets.reduce(
    (prev, next) => (next.datasetIndex > prev ? next.datasetIndex : prev),
    0
  );
  const s = dataSets.map((item, i) => {
    const outerDataset = item.datasetIndex === maxDatasetIndex;
    const bandValue = Number(bandScale(item.label));
    const bandPosition = getBandPosition(item, props, itemWidths);
    const valueOffset = getValueOffset(item, props);
    const itemWidth = itemWidths[item.datasetIndex];
    const itemHeight = numericScale(item.value);
    const hoverFill = getFill(
      getSchemeItem(concreteHoverScheme, item.datasetIndex)
    );

    const fill = getFill(getSchemeItem(colorScheme, item.datasetIndex));

    const builderProps = {
      bandPosition,
      bandValue,
      config,
      fill,
      hoverFill,
      itemHeight,
      itemWidth,
      radius:
        props.groupLayout === EGroupedBarLayout.STACKED && !outerDataset
          ? 0
          : radius,
      valueOffset,
      width,
      height,
    };
    if (direction === EChartDirection.HORIZONTAL) {
      if (!inverse) {
        return horizontalSpring(builderProps);
      } else {
        return horizontalInverseSpring(builderProps);
      }
    } else {
      if (!inverse) {
        return verticalSpring(builderProps);
      } else {
        return verticalInverseSpring(builderProps);
      }
    }
  });
  return s;
};

type FnProps = {
  itemHeight: number;
  itemWidth: number;
  radius: number;
  bandPosition: number;
  bandValue: number;
  valueOffset: number;
  fill: string;
  hoverFill: string;
  config: SpringConfig;
  width: number;
  height: number;
};

const horizontalSpring = ({
  itemHeight,
  itemWidth,
  radius,
  bandPosition,
  bandValue,
  valueOffset,
  fill,
  hoverFill,
  config,
}: FnProps) => {
  /**
   *  from(x,y)                                                 to(x,y)
   *  ----------------------------------------------------------                -
   *  |   |                                                 |   |               |
   *  |___|                                                 |___|  _            |
   *  | r                                                     r |  |            |
   *  |                                                         |  | vertical   | itemWidth
   *  |                                                         |  |            |
   *  |___                                                   ___|  _            |
   *  |   |                                                 |   |               |
   *  |   |                                                 |   |               |
   *  ----------------------------------------------------------                -
   *      <--------------------horizontal------------------>
   *  <----------------------------itemHeight-------------------->
   */
  const vertical = itemWidth;
  const horizontal = itemHeight;
  let r = radius * 2 < itemHeight ? radius : itemHeight / 2;

  const { topRightCurve, bottomRightCurve } = makeCurves(r);

  const from = {
    x: 0,
    y: bandPosition + bandValue,
  };
  const to = {
    x: valueOffset,
    y: bandPosition + bandValue,
  };

  return {
    from: {
      width: 0,
      d: `m${from.x} ${from.y} h${0} ${topRightCurve} v${
        vertical - 2 * r
      } ${bottomRightCurve} h-${0}  v-${vertical - 2 * r}`,
      fill,
      hoverFill,
      x: 0,
      y: bandPosition + bandValue,
      height: itemWidth,
    },
    to: {
      width: itemHeight,
      d: `m${to.x} ${to.y} h${horizontal - r} ${topRightCurve} v${
        vertical - 2 * r
      } ${bottomRightCurve} h-${horizontal - r} v-${vertical - 2 * r}`,
      fill,
      hoverFill,
      x: to.x,
      y: bandPosition + bandValue,
      height: itemWidth,
    },
    config,
  };
};

const horizontalInverseSpring = ({
  itemHeight,
  itemWidth,
  radius,
  width,
  bandPosition,
  bandValue,
  valueOffset,
  fill,
  hoverFill,
  config,
}: FnProps) => {
  const vertical = itemWidth;
  const horizontal = itemHeight;

  const r = radius * 2 < horizontal ? radius : horizontal / 2;
  const { topLeftCurve, bottomLeftCurve } = makeCurves(r);
  const from = {
    x: width,
    y: bandPosition + bandValue,
  };
  const to = {
    x: width - horizontal + valueOffset + r,
    y: bandPosition + bandValue,
  };

  return {
    from: {
      width: 0,
      d: `m${from.x} ${from.y} h${0} v${vertical} h-${0} ${bottomLeftCurve} v-${
        vertical - 2 * r
      } ${topLeftCurve} z`,
      fill,
      hoverFill,
      x: width,
      y: bandPosition + bandValue,
      height: vertical,
    },
    to: {
      width: horizontal,
      d: `m${to.x} ${to.y} h${horizontal - r} v${vertical} h-${
        horizontal - r
      } ${bottomLeftCurve} v-${vertical - 2 * r} ${topLeftCurve} z`,
      fill,
      hoverFill,
      x: to.x,
      y: bandPosition + bandValue,
      height: vertical,
    },
    config,
  };
};

const verticalSpring = ({
  itemHeight,
  itemWidth,
  radius,
  bandPosition,
  bandValue,
  valueOffset,
  fill,
  height,
  hoverFill,
  config,
}: FnProps) => {
  const vertical = itemHeight;
  const horizontal = itemWidth;

  const r = radius * 2 < vertical ? radius : vertical / 2;
  const { topLeftCurve, topRightCurve } = makeCurves(r);
  const from = {
    x: bandPosition + bandValue,
    y: height,
  };
  const to = {
    x: bandPosition + bandValue,
    y: valueOffset,
  };

  return {
    from: {
      height: 0,
      fill,
      hoverFill,
      d: `m${from.x} ${from.y} v0 ${topLeftCurve} h${
        horizontal - 2 * r
      } ${topRightCurve} v0 h-${horizontal} z`,
      x: from.x,
      y: from.y,
      width: itemWidth,
    },
    to: {
      height: itemHeight,
      fill,
      hoverFill,
      d: `m${to.x} ${to.y} v-${vertical} ${topLeftCurve} h${
        horizontal - 2 * r
      } ${topRightCurve} v${vertical} h-${horizontal} z`,
      x: to.x,
      y: to.y,
      width: itemWidth,
    },
    config,
  };
};

const verticalInverseSpring = ({
  itemHeight,
  itemWidth,
  radius,
  bandPosition,
  bandValue,
  valueOffset,
  fill,
  hoverFill,
  config,
}: FnProps) => {
  const vertical = itemHeight;
  const horizontal = itemWidth;
  const r = radius * 2 < vertical ? radius : vertical / 2;

  const from = {
    x: bandPosition + bandValue,
    y: 0,
  };
  const to = {
    x: bandPosition + bandValue,
    y: valueOffset,
  };

  const bottomRightCurve = `a${r} ${r} 0 0 0 ${r} -${r}`;
  const bottomLeftCurve = `a${r} ${r} 0 0 0 ${r} ${r}`;
  return {
    from: {
      height: 0,
      fill,
      hoverFill,
      d: `m${from.x} ${from.y} v0 ${bottomLeftCurve} h${
        horizontal - 2 * r
      } ${bottomRightCurve} v0 h-${horizontal} z`,
      x: from.x,
      y: from.y,
      width: itemWidth,
    },
    to: {
      height: itemHeight,
      fill,
      hoverFill,
      d: `m${to.x} ${to.y} v${vertical} ${bottomLeftCurve} h${
        horizontal - 2 * r
      } ${bottomRightCurve}  v-${vertical} h-${horizontal} z`,
      x: to.x,
      y: to.y,
      width: itemWidth,
    },
    config,
  };
};

const makeCurves = (radius: number) => {
  const topRightCurve = `a${radius} ${radius} 0 0 1 ${radius} ${radius}`;
  const bottomRightCurve = `a${radius} ${radius} 0 0 1 -${radius} ${radius}`;
  const bottomLeftCurve = `a${radius} ${radius} 0 0 1 -${radius} -${radius}`;
  const topLeftCurve = `a${radius},${radius} 0 0 1 ${radius},-${radius}`;
  return {
    topLeftCurve,
    topRightCurve,
    bottomLeftCurve,
    bottomRightCurve,
  };
};
/**
 * If we are using a STACKED group layout then work out the total height
 * of the bars which should be stacked under the current item.
 * This should provide us with the finishing location for the bar's y position.
 */
export const getValueOffset = (
  item: ExtendedGroupItem,
  props: BarSpringProps
) => {
  const { direction, numericScale, groupLayout, height, dataSets, inverse } =
    props;
  const offSet = dataSets
    .filter((d) => d.label === item.label)
    .filter((_, i) =>
      direction === EChartDirection.HORIZONTAL
        ? i < item.datasetIndex
        : i < item.datasetIndex
    )
    .reduce((p, n) => p + n.value, 0);

  if (direction === EChartDirection.HORIZONTAL) {
    if (groupLayout !== EGroupedBarLayout.STACKED) {
      return 0;
    }
    return numericScale(offSet) * (inverse ? -1 : 1);
  }

  if (groupLayout !== EGroupedBarLayout.STACKED) {
    return inverse ? 0 : height;
  }
  return inverse ? 0 + numericScale(offSet) : height - numericScale(offSet);
};

export const shouldShowLabel = (
  item: ExtendedGroupItem,
  visible: Record<string, boolean>,
  showLabels: boolean[]
) => {
  const k = String(item.groupLabel);
  if (visible?.[k] === false || showLabels?.[item.datasetIndex] === false) {
    return false;
  }
  return true;
};
