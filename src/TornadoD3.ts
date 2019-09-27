import {
  axisBottom,
  axisLeft,
} from 'd3-axis';
import { format } from 'd3-format';
import {
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  scalePoint,
} from 'd3-scale';
import { Selection } from 'd3-selection';
import { timeFormat } from 'd3-time-format';
import merge from 'lodash/merge';

import colorScheme from './colors';
import attrs from './d3/attrs';
import {
  drawHorizontalGrid,
  gridHeight,
  gridWidth,
  xAxisHeight,
  yAxisWidth,
} from './grid';
import {
  EGroupedBarLayout,
  IChartAdaptor,
} from './Histogram';
import {
  IGroupData,
  IGroupDataItem,
} from './HistogramD3';
import tips, { makeTip } from './tip';
import {
  ITornadoDataSet,
  ITornadoProps,
} from './Tornado';
import {
  barMargin,
  getBarWidth,
  groupedBarsUseSameXAxisValue,
  groupedMargin,
} from './utils/bars';
import {
  axis as defaultAxis,
  grid as defaultGrid,
} from './utils/defaults';
import {
  isStacked,
  shouldFormatTick,
  ticks,
  tickSize,
} from './utils/domain';
import {
  onClick,
  onMouseOut,
  onMouseOver,
} from './utils/mouseOver';
import {
  makeGrid,
  makeScales,
  makeSvg,
  sizeSVG,
  TSelection,
} from './utils/svg';
import { DeepPartial } from './utils/types';

export const maxValueCount = (counts: ITornadoDataSet[]): number => {
  return counts.reduce((a: number, b: ITornadoDataSet): number => {
    return b.data.length > a ? b.data.length : a;
  }, 0);
};

export const tornadoD3 = ((): IChartAdaptor<ITornadoProps> => {
  let svg: Selection<any, any, any, any>;;
  let tipContainer;
  let tipContent;
  const x = scaleLinear();
  const y = scaleBand();
  const innerScaleBand = scaleBand();
  let container: Selection<SVGElement, any, any, any>;
  let dataSets: IGroupData;
  let gridX: TSelection;
  let gridY: TSelection;
  let yAxisContainer: TSelection;
  let xAxisContainer: TSelection;
  let xAxisContainer2: TSelection;
  let yAxisLabel: TSelection;
  let xAxisLabel: TSelection;
  let domain: [number, number];

  const props: ITornadoProps = {
    axis: defaultAxis,
    bar: {
      groupMargin: 0.1,
      margin: 10,
      overlayMargin: 5,
    },
    className: 'torando-d3',
    colorScheme,
    center: true,
    data: {
      bins: [],
      colorScheme: [],
      counts: [],
    },
    delay: 0,
    domain: {
      max: null,
      min: null,
    },
    duration: 400,
    grid: defaultGrid,
    groupLayout: EGroupedBarLayout.GROUPED,
    height: 200,
    margin: {
      bottom: 0,
      left: 5,
      right: 0,
      top: 5,
    },
    splitBins: ['Left', 'Right'],
    stroke: {
      color: '#005870',
      dasharray: '',
      linecap: 'butt',
      width: 0,
    },
    tip: tips,
    tipContainer: 'body',
    tipContentFn: (bins: string[], i: number, d: number): string =>
      bins[i] + '<br />' + d,
    visible: {},
    width: 200,
  };

  const TornadoD3 = {
    /**
     * Initialization
     */
    create(el: Element, newProps: DeepPartial<ITornadoProps> = {}) {
      merge(props, newProps);
      svg = makeSvg(el, svg);
      const { margin, width, height, className } = props;
      sizeSVG(svg, { margin, width, height, className });
      const r = makeTip(props.tipContainer, tipContainer);
      tipContent = r.tipContent;
      tipContainer = r.tipContainer;
      [gridX, gridY] = makeGrid(svg);
      [xAxisContainer, yAxisContainer, xAxisLabel, yAxisLabel] = makeScales(svg);

      // Used to display the 2 split bin labels
      xAxisContainer2 = svg.append('g').attr('class', 'xAxisContainer2');
      container = svg
        .append<SVGElement>('g')
        .attr('class', 'histogram-container');

      this.update(el, newProps);
    },

    /**
    * Draw Axes
    */
    drawAxes() {
      const { bar, data, groupLayout, margin, width, height, axis } = props;
      const SPLIT_AXIS_HEIGHT = 20;
      const valuesCount = maxValueCount(data.counts);
      const w = gridWidth(props);
      const h = gridHeight(props) - SPLIT_AXIS_HEIGHT;
      const dataLabels = data.counts.map((c) => c.label);

      y.domain(data.bins)
        .rangeRound([h, 0])
        .paddingInner(groupedMargin(bar));

      innerScaleBand
        .domain(groupedBarsUseSameXAxisValue({ groupLayout }) ? ['main'] : dataLabels)
        .rangeRound([0, y.bandwidth()])
        .paddingInner(barMargin(props.bar));

      const xAxis = axisBottom<number>(x)
        .tickFormat((v) => {
          const n = v.toString().replace('-', '');

          if (shouldFormatTick(axis.x)) {
            if (axis.x.scale === 'TIME') {
              return timeFormat(axis.x.dateFormat)(new Date(n));
            }
            return isNaN(Number(v)) ? n : format(axis.x.numberFormat)(Number(n))
          }
          return n;
        });

      tickSize({
        axis: xAxis,
        axisLength: w,
        scaleBand: x,
        axisConfig: axis.x,
        limitByValues: false,
        valuesCount: 10,
      });

      this.calculateDomain();

      const x2 = scalePoint<any>();

      const xGroupAxis = axisBottom(x2).tickPadding(SPLIT_AXIS_HEIGHT)
        .tickSize(0)

      x2.range([Number(width) / 4, Number(width) * (3 / 4) - (margin.top * 2) - axis.y.width])
        .domain(props.splitBins);

      /** Y-Axis (label axis) set up */
      const yAxis = axisLeft<string>(y);
      ticks({
        axis: yAxis,
        valuesCount,
        axisLength: h,
        axisConfig: axis.y,
        scaleBand: y,
        limitByValues: true,
      });

      yAxisContainer
        .attr('transform', 'translate(' + yAxisWidth(axis) + ', ' + margin.top + ' )')
        .call(yAxis);

      // @TODO - Stacked? (was using appendDomainRange())
      x.range([0, Number(width) - (margin.top * 2) - axis.y.width])
        .domain(domain)
        .nice();

      const xAxisY = height - xAxisHeight(props.axis) - margin.top - SPLIT_AXIS_HEIGHT;
      xAxisContainer
        .attr('transform', 'translate(' + yAxisWidth(axis) + ',' +
          xAxisY + ')')
        .call(xAxis);

      xAxisContainer2
        .attr('transform', 'translate(' + yAxisWidth(axis) + ',' +
          (xAxisY) + ')')
        .call(xGroupAxis);

      attrs(svg.selectAll('.y-axis .domain, .y-axis .tick line'), axis.y.style);
      attrs(svg.selectAll('.y-axis .tick text'), axis.y.text.style as any);

      attrs(svg.selectAll('.x-axis .domain, .x-axis .tick line'), axis.x.style);
      attrs(svg.selectAll('.x-axis .tick text'), axis.x.text.style as any);
    },

    calculateDomain() {
      const { data, center } = props;
      const leftValues = data.counts.reduce((prev, next) => prev.concat(next.data[0]), [] as number[]);
      const rightValues = data.counts.reduce((prev, next) => prev.concat(next.data[1]), [] as number[]);
      domain = [-Math.max(...leftValues), Math.max(...rightValues)];
      // Center the 0 axis value in the middle of the chart
      if (center) {
        const max = Math.max(Math.max(...leftValues), domain[1]);
        domain = [-max, max];
      }
      return domain;
    },

    /**
     * Draw a single data set into the chart
     */
    updateChart(
      bins: string[],
      groupData: IGroupData,
    ) {
      const { axis, height, margin, delay, duration, tip, groupLayout } = props;

      const stackedOffset = (d: IGroupDataItem, stackIndex: number) => {
        const thisGroupData = groupData.find((gData) => {
          return gData.find((dx) => dx.label === d.label) !== undefined;
        });
        const oSet = (thisGroupData || [])
          .filter((_, i) => i < stackIndex)
          .reduce((prev, next) => prev + next.value, 0);
        const isItStacked = isStacked({ groupLayout });
        const offset = isItStacked && stackIndex > 0
          ? oSet
          : 0;
        // @TODO  reapply offset
        const w = d.side === 'left' ? -d.value : d.value;
        return x(Math.min(0, w));
        // return isItStacked ? x(offset) : x(0);
      }

      const colors = scaleOrdinal(props.colorScheme);
      const gWidth = gridWidth(props);

      const g = container
        .selectAll<SVGElement, {}>('g')
        .data(groupData);

      const bars = g.enter()
        .append<SVGElement>('g')
        .merge(g)
        .attr('transform', (d: any[]) => {
          let yd = y(d[0].label);
          if (yd === undefined) {
            yd = 0;
          }
          const x = yAxisWidth(axis) + axis.x.style['stroke-width'];
          return `translate(${x}, ${margin.top + yd})`;
        })

        .selectAll<SVGElement, {}>('rect')
        .data((d) => d);

      bars
        .enter()
        .append<SVGElement>('rect')
        .attr('width', 0)
        .attr('x', stackedOffset)
        .attr('class', (d) => `bar ${d.side}`)
        .on('click', onClick(props.onClick))
        .on('mouseover', onMouseOver({ bins, hover: props.bar.hover, colors, tipContentFn: props.tipContentFn, tipContent, tip, tipContainer }))
        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', onMouseOut({ tip, tipContainer, colors }))
        .merge(bars)
        .attr('y', (d: IGroupDataItem, i: number) => {
          const overlay = (props.groupLayout === EGroupedBarLayout.OVERLAID)
            ? Math.floor(i / 2) * props.bar.overlayMargin
            : Number(innerScaleBand(String(d.groupLabel)));
          return overlay;
        })
        .attr('height', (d, i) => getBarWidth(Math.floor(i / 2), props.groupLayout, props.bar, innerScaleBand))
        .attr('fill', (d, i) => colors(String(d.groupLabel)))
        .transition()
        .duration(duration)
        .delay(delay)
        .attr('x', stackedOffset)
        // Hide bar's bottom border
        .attr('stroke-dasharray',
          (d: IGroupDataItem, i): string => {
            const currentHeight = gWidth - (x(d.value));
            const barWidth = getBarWidth(i, props.groupLayout, props.bar, innerScaleBand);
            return `${barWidth} 0 ${currentHeight} ${barWidth}`;
          })
        .attr('width', (d: IGroupDataItem): number => {
          const w = d.side === 'left' ? -d.value : d.value;
          return Math.abs(x(w) - x(0))
        });

      bars.exit().remove();
      g.exit().remove();

      const yText = yAxisLabel
        .selectAll<any, any>('text')
        .data([axis.y.label]);

      yText.enter().append('text')
        .attr('class', 'y-axis-label')
        .merge(yText)
        .attr('transform',
          'translate(' + (Number(height) / 2) + ' ,' +
          ((height - yAxisWidth(props.axis) - (margin.left * 2)) + axis.x.margin) + ')')
        .style('text-anchor', 'middle')
        .text((d) => d);

      const xText = yAxisLabel
        .selectAll<any, any>('text')
        .data([axis.x.label]);

      xText.enter().append('text')
        .attr('class', 'x-axis-label')
        .merge(xText)
        .attr('transform', 'rotate(-90)')
        .attr('y', 0)
        .attr('x', 0 - (gWidth / 2 - (margin.top * 2)))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text((d) => d);
    },

    /**
     * Update chart
     */
    update(el: Element, newProps: DeepPartial<ITornadoProps>) {
      if (!props.data) {
        return;
      }
      merge(props, newProps);
      if (!props.data.bins) {
        return;
      }
      const { margin, width, height, className, data, visible } = props;
      sizeSVG(svg, { margin, width, height, className });
      dataSets = [];

      data.counts.forEach((count) => {
        count.data.forEach((value, genderIndex) => {
          value.forEach((aValue, rowIndex) => {
            if (!dataSets[rowIndex]) {
              dataSets[rowIndex] = [];
            }
            dataSets[rowIndex].push({
              side: genderIndex === 0 ? 'left' : 'right',
              groupLabel: count.label,
              colorRef: count.label,
              label: data.bins[rowIndex],
              value: visible[data.bins[rowIndex]] !== false && visible[count.label] !== false ? aValue : 0,
            });
          })

        });
      });
      this.drawAxes();
      // @TODO add back in,
      // drawHorizontalGrid<any>({ x, y, gridX, gridY, props, ticks: maxValueCount(data.counts) });
      this.updateChart(data.bins, dataSets);
    },

    /**
     * Any necessary clean up
     */
    destroy(el: Element) {
      svg.selectAll('svg > *').remove();
    },
  };
  return TornadoD3;
});
