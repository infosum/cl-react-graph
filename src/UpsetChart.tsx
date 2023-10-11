import {
  ScaleBand,
  scaleBand,
} from 'd3-scale';
import { schemeSet3 } from 'd3-scale-chromatic';
import React, { useMemo } from 'react';

import {
  Bars,
  XAxis,
  YAxis,
} from './';
import { EChartDirection } from './BarChart';
import {
  defaultPadding,
  Props as BarProps,
} from './components/Bars/Bars';
import { Base } from './components/Base';
import { TLabelComponent } from './components/Label';
import {
  BarChartDataSet,
  EGroupedBarLayout,
} from './Histogram';
import {
  paddingInner,
  paddingOuter,
} from './utils/bars';
import { ColorScheme } from './utils/colorScheme';
import { useHistogramDomain } from './utils/useDomain';

export type TUpsetData = { keys: string[], value: number }[];

type TBarProps = Pick<BarProps, 'width' | 'height' | 'top' | 'left' | 'colorScheme' | 'LabelComponent'> & {
  data: TUpsetData,
  axisSpace: number;
  axisWidth?: number;
  textFill?: string;
};

export type Props = {
  colorScheme?: ColorScheme;
  data: TUpsetData;
  height: number;
  hoverColorScheme?: ColorScheme;
  showLabels?: boolean[];
  visible?: Record<string, boolean>;
  width: number;
  xAxisHeight?: number;
  yAxisWidth?: number;
  textFill?: string;
  distribution?: {
    colorScheme: ColorScheme;
    fill: {
      active: string;
      inactive: string;
    };
    label?: string;
  };
  setSize?: {
    dimensions: {
      chartWidth: number;
      axisWidth: number;
      height: number;
    },
    label?: string;
    colorScheme: ColorScheme;
    LabelComponent?: TLabelComponent;
  }
  axisSpace?: number;
  radius?: number;
  /** @description accessible title */
  title: string;
  /** @description accessible description */
  description: string;
}

export const UpsetChart = ({
  data,
  width,
  height,
  setSize = {
    dimensions: { chartWidth: 100, axisWidth: 100, height: 200 },
    colorScheme: [schemeSet3[0]],
  },
  axisSpace = 30,
  textFill = '#a9a9a9',
  radius = 7,
  distribution = {
    colorScheme: [schemeSet3[1]],
    fill: {
      active: schemeSet3[1],
      inactive: '#eee',
    },
    label: 'Intersection size',
  },
  title,
  description,
}: Props) => {

  const left = (setSize.dimensions.chartWidth + setSize.dimensions.axisWidth);
  const h = height - setSize.dimensions.height;

  const { bins, setBandScale } = useMemo(() => {
    const bins = Array.from(data.reduce((prev, next) => {
      return union<string>(new Set<string>(next.keys), prev);
    }, new Set<string>()));
    const setBandScale = scaleBand().domain(bins as string[])
      .rangeRound([0, setSize.dimensions.height - axisSpace - axisSpace])
      .paddingInner(paddingInner(defaultPadding))
      .paddingOuter(paddingOuter(defaultPadding))
      .align(0.5);
    return { bins, setBandScale };
  }, [data]);

  return <Base
    width={width}
    title={title}
    description={description}
    height={height}>

    <text
      textAnchor={'middle'}
      fill={textFill}
      fontSize="12px"
      style={{ border: '1px solid red' }}
      transform={`translate(${left - 20}, ${h - (h / 2)}) rotate(270)`}>
      {distribution.label ?? 'Intersection size'}
    </text>
    <SetSizeBars
      width={setSize.dimensions.chartWidth}
      axisWidth={setSize.dimensions.axisWidth}
      height={setSize.dimensions.height - axisSpace}
      top={height - setSize.dimensions.height + axisSpace}
      colorScheme={setSize.colorScheme}
      data={data}
      axisSpace={axisSpace}
      textFill={textFill}
      setBandScale={setBandScale}
      bins={bins}
      left={0}
      label={setSize.label ?? 'Set size'}
    />

    <DistributionBars
      width={width - left}
      height={height - setSize.dimensions.height}
      colorScheme={distribution.colorScheme}
      left={left}
      data={data}
      top={0}
      axisSpace={axisSpace}
      textFill={textFill}
    />

    <ActiveCircles
      data={data}
      left={left + axisSpace}
      radius={radius}
      colors={distribution.fill}
      width={width - left - axisSpace}
      height={setSize.dimensions.height - axisSpace}
      top={height - setSize.dimensions.height + axisSpace}
      setBandScale={setBandScale}
    />
  </Base>
}

type ActiveCirclesProps = {
  data: TUpsetData;
  left: number;
  width: number;
  height: number;
  top: number;
  radius: number;
  colors?: {
    active: string;
    inactive: string;
  },
  setBandScale: ScaleBand<string>
}

const tickValues = [];
/**
 * Renders a grid of circles. Highlighted if the column's data contains that key
 */
const ActiveCircles = ({
  data,
  left,
  width,
  top,
  radius,
  colors = {
    active: '#000',
    inactive: '#eee',
  },
  setBandScale,
}: ActiveCirclesProps) => {
  const bins = Array.from(data.reduce((prev, next) => union<string>(new Set<string>(next.keys), prev), new Set<string>()));
  const yPoints = bins.map((bin) => Number(setBandScale(bin)) + (setBandScale.bandwidth() / 2));
  const labels = data.map((d) => d.keys.join(' & '))
  const bandScale = scaleBand().domain(labels as string[])
    .rangeRound([0, width])
    .paddingInner(paddingInner(defaultPadding))
    .paddingOuter(paddingOuter(defaultPadding))
    .align(0.5);

  return (
    <g transform={`translate(${left},${top})`}>
      {
        data.map((d) => {
          const x = Number(bandScale(d.keys.join(' & '))) + (bandScale.bandwidth() / 2);
          const active = bins.map((bin) => d.keys.includes(bin));
          const bounds = active.reduce((prev, next, index) => {
            if (!next) {
              return prev;
            }
            if (prev.length === 0) {
              prev[0] = yPoints[index];
            } else {
              prev[1] = yPoints[index];
            }
            return prev;
          }, [] as number[]);
          return (
            <g
              key={d.keys.join('.')}
              transform={`translate(${x}, 0)`}>
              <line x1="0" y1={bounds[0]} x2="0" y2={bounds[1] ?? bounds[0]} stroke={colors.active} />
              {
                bins.map((bin, i) => {
                  return (
                    <circle key={bin} cy={yPoints[i]}
                      cx={(0 * i)} r={radius} fill={active[i] ? colors.active : colors.inactive} />
                  )
                })
              }
            </g>
          )
        })
      }
    </g>
  );
};

const DistributionBars = ({
  LabelComponent,
  colorScheme,
  width,
  height,
  left,
  top,
  data,
  axisSpace,
}: TBarProps) => {
  const bins = useMemo(() => data.map((d) => d.keys.join(' & ')), [data]);
  const values: BarChartDataSet[] = useMemo(() => ([{
    label: 'segments',
    data: data.map((d) => d.value),
  }]), [data]);

  const domain = useHistogramDomain({
    groupLayout: EGroupedBarLayout.GROUPED,
    bins,
    values,
    tickValues,
  });
  return (
    <>
      <Bars
        bins={bins}
        colorScheme={colorScheme}
        direction={EChartDirection.VERTICAL}
        domain={domain}
        showLabels={[true]}
        groupLayout={EGroupedBarLayout.GROUPED}
        height={height}
        LabelComponent={LabelComponent}
        left={(left ?? 0) + axisSpace}
        top={top}
        padding={defaultPadding}
        values={values}
        width={width - axisSpace}
      />
      <YAxis
        width={20}
        height={height}
        label="intersection size"
        top={top}
        left={left}
        scale={'linear'}
        values={undefined}
        domain={domain}
      />
    </>
  )
}

type SetSizeBarProps = TBarProps & { 
  setBandScale: ScaleBand<string>;
  bins: string[];
  label: string;
}

/**
 * Shows a bar chat of the accumulated total number of records in each data point.
 */
const SetSizeBars = ({
  width,
  height,
  colorScheme,
  data,
  top,
  axisSpace,
  axisWidth,
  textFill = '#a9a9a9',
  setBandScale,
  bins,
  label,
}: SetSizeBarProps) => {
  const values = useMemo(() => {
    const empty = new Array(bins.length).fill(0);
    const counts = data.reduce((prev, next) => {
      next.keys.forEach((key) => {
        const index = bins.findIndex((bin) => bin === key);
        prev[index] = prev[index] + next.value;
      })
      return prev;
    }, empty);
    const values: BarChartDataSet[] = [{
      label: 'tets',
      data: counts,
    }];
    return values;
  }, [data, bins]);

  const domain = useHistogramDomain({
    groupLayout: EGroupedBarLayout.GROUPED,
    bins: bins.reverse(),
    values,
    tickValues,
  });
  return (
    <g className="size-bars" transform={`translate(${0},${top})`}>
      <Bars
        bins={bins}
        colorScheme={colorScheme}
        direction={EChartDirection.HORIZONTAL}
        domain={domain}
        groupLayout={EGroupedBarLayout.GROUPED}
        height={height - axisSpace}
        inverse={true}
        showLabels={[true]}
        padding={defaultPadding}
        values={values}
        width={width}
      />
      {
        bins.map((bin) => <text
          key={bin}
          x={(axisWidth ?? 0) + width}
          fontSize="12px"
          textAnchor="end"
          fill={textFill}
          y={Number(setBandScale(bin)) + (setBandScale.bandwidth() / 2)}
        >
          {bin}
        </text>)
      }
      <XAxis
        width={width}
        height={20}
        label="Set size"
        top={height - axisSpace}
        scale="linear"
        values={undefined}
        inverse={true}
        domain={domain}
      />
      <text
        x={width / 2}
        textAnchor="middle"
        fontSize="12px"
        fill={textFill}
        y={height}>{label}
      </text>
    </g>
  )
}


function union<T>(...iterables: any): Set<T> {
  const set = new Set<T>();
  for (const iterable of iterables) {
    for (const item of iterable) {
      set.add(item);
    }
  }
  return set;
}
