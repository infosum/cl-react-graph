import { scaleOrdinal } from "d3-scale";
import { schemeSet3 } from "d3-scale-chromatic";
import { arc, pie } from "d3-shape";
import React, { RefObject, useState } from "react";

import { BarChartDataSet } from "../Histogram";
import { ColorScheme, getFill, getSchemeItem } from "../utils/colorScheme";
import { TipFunc } from "./ToolTip";
import { ToolTips } from "./ToolTips";

export type RingItem = {
  binIndex: number;
  datasetIndex: number;
  label: string;
  value: number;
  percentage: string;
};

type Props = {
  data: BarChartDataSet;
  setIndex: number;
  bins: string[];
  width: number;
  height: number;
  colorScheme?: ColorScheme;
  hoverColorScheme?: ColorScheme;
  tip?: TipFunc;
  outerRadius: number;
  innerRadius: number;
  labelFormat?: (item: RingItem) => string;
};

/**
 * Render a ring of data - most often used inside a PieChart
 */
export const Ring = ({
  colorScheme,
  height,
  hoverColorScheme,
  width,
  data,
  bins,
  setIndex,
  tip,
  outerRadius,
  innerRadius,
  labelFormat,
}: Props) => {
  const colorScale = scaleOrdinal<string>().domain(bins).range(schemeSet3);
  const centerTransform = `translate(${width / 2},${height / 2})`;
  const [hover, setHover] = useState(-1);
  const refs: RefObject<any>[] = [];

  const makeArc = arc();
  const pieData = pie().sort(null)(data.data);
  const total = data.data.reduce((p, n) => p + n, 0);

  const arcs = pieData.map((c) =>
    makeArc({
      endAngle: c.endAngle,
      startAngle: c.startAngle,
      innerRadius,
      outerRadius,
    })
  );

  const centroids = pieData.map((c) =>
    arc().centroid({
      endAngle: c.endAngle,
      startAngle: c.startAngle,
      innerRadius,
      outerRadius,
    })
  );

  const tipItems: {
    transform: string;
    item: RingItem;
  }[] = centroids.map((path, i) => ({
    transform: `translate(${path[0] + width / 2},${path[1] + height / 2})`,
    item: {
      binIndex: i,
      datasetIndex: setIndex,
      label: bins[i],
      value: data.data[i],
      percentage: Math.round((data.data[i] / total) * 100).toString(),
    },
  }));

  const chooseFill = (hover: number, i: number) => {
    if (hover === i && hoverColorScheme) {
      return getFill(getSchemeItem(hoverColorScheme, i));
    }
    if (colorScheme) {
      return getFill(getSchemeItem(colorScheme, i));
    }
    return colorScale(bins[i]);
  };

  return (
    <>
      <g className="pie-container">
        {arcs.map((path, i) => {
          refs[i] = React.createRef<any>();

          return (
            <path
              key={bins[i]}
              ref={refs[i]}
              data-testid={`ring-${setIndex}-${i}`}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
              transform={centerTransform}
              stroke="#FFF"
              fill={chooseFill(hover, i)}
              d={path ?? ""}
              style={{ opacity: 1 }}
            />
          );
        })}
      </g>
      <g className="pie-labels">
        {centroids.map((path, i) => (
          <text
            key={bins[i]}
            textAnchor="middle"
            transform={`translate(${path[0] + width / 2},${
              path[1] + height / 2
            })`}
            className="label"
          >
            {labelFormat ? labelFormat(tipItems[i].item) : data.data[i]}
          </text>
        ))}
      </g>
      <ToolTips
        springs={tipItems}
        refs={refs}
        bins={bins}
        tip={tip}
        items={tipItems.map(({ item }) => item)}
      />
    </>
  );
};
