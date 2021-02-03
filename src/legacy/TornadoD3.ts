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
import cloneDeep from 'lodash/cloneDeep';
import mergeWith from 'lodash/mergeWith';

import colorScheme from '../colors';
import attrs from '../d3/attrs';
import {
  gridHeight,
  gridWidth,
  xAxisHeight,
  yAxisWidth,
} from '../grid';
import {
  EGroupedBarLayout,
  IGroupData,
  IGroupDataItem,
} from '../Histogram';
import tips, { makeTip } from '../tip';
import {
  getBarWidth,
  groupedBarsUseSameXAxisValue,
  groupedPaddingInner,
  paddingInner,
} from '../utils/bars';
import {
  axis as defaultAxis,
  grid as defaultGrid,
} from '../utils/defaults';
import {
  applyDomainAffordance,
  shouldFormatTick,
  ticks,
  tickSize,
} from '../utils/domain';
import {
  onClick,
  onMouseOut,
  onMouseOver,
} from '../utils/mouseOver';
import {
  makeGrid,
  makeScales,
  makeSvg,
  sizeSVG,
  TSelection,
} from '../utils/svg';
import { DeepPartial } from '../utils/types';
import {
  ITornadoDataSet,
  ITornadoProps,
} from './Tornado';

export const maxValueCount = (counts: ITornadoDataSet[]): number => {
  return counts.reduce((a: number, b: ITornadoDataSet): number => {
    return b.data.length > a ? b.data.length : a;
  }, 0);
};

// The height for the x axis labels showing the left/right labels.
const SPLIT_AXIS_HEIGHT = 20;

const calculatePercents = (groupData: IGroupData) => {
  const totals = groupData.reduce((prev, next) => {

    next.forEach((datum, i) => {
      const side = datum.side!;
      const groupLabel = datum.groupLabel!;
      if (!prev[groupLabel]) {
        prev[groupLabel] = { left: 0, right: 0 };
      }
      prev[groupLabel][side] = prev[groupLabel][side] + datum.value;
    })
    return prev;
  }, {} as Record<string, { left: number, right: number }>);


  return groupData.map((data, i) => {
    return data.map((datum) => {
      const side = datum.side!;
      const groupLabel = datum.groupLabel!;
      const total = totals[groupLabel][side];
      return {
        ...datum,
        percent: total === 0 ? 0 : Math.round(datum.value / total * 100),
      }
    })

  });
}

export class TornadoD3 {
  svg: undefined | Selection<any, any, any, any>;;
  tipContainer;
  tipContent;
  x = scaleLinear();
  y = scaleBand();
  innerScaleBand = scaleBand();
  container: undefined | Selection<SVGElement, any, any, any>;
  dataSets: IGroupData = [[]];
  gridX: undefined | TSelection;
  gridY: undefined | TSelection;
  yAxisContainer: undefined | TSelection;
  xAxisContainer: undefined | TSelection;
  xAxisContainer2: undefined | TSelection;
  yAxisLabel: undefined | TSelection;
  xAxisLabel: undefined | TSelection;
  domain: [number, number] = [0, 0];

  props: ITornadoProps = {
    axis: cloneDeep(defaultAxis),
    bar: {
      grouped: {
        paddingInner: 0.1,
        paddingOuter: 0,
      },
      paddingInner: 0.1,
      paddingOuter: 0,
      overlayMargin: 0.1,
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
    showBinPercentages: false,
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

  /**
   * Initialization
   */
  create(el: Element, newProps: DeepPartial<ITornadoProps> = {}) {
    const { props } = this;
    this.mergeProps(newProps);
    this.svg = makeSvg(el, undefined);
    const { margin, width, height, className } = props;
    sizeSVG(this.svg, { margin, width, height, className });
    const r = makeTip(props.tipContainer, this.tipContainer);
    this.tipContent = r.tipContent;
    this.tipContainer = r.tipContainer;
    [this.gridX, this.gridY] = makeGrid(this.svg);

    // Used to display the 2 split bin labels
    this.xAxisContainer2 = this.svg.append('g').attr('class', 'xAxisContainer2');
    this.container = this.svg
      .append<SVGElement>('g')
      .attr('class', 'histogram-container');

    // Render Axis above bars so that we can see the y axis overlaid
    [this.xAxisContainer, this.yAxisContainer, this.xAxisLabel, this.yAxisLabel] = makeScales(this.svg);

    this.update(props);
  }

  /**
   * Draw Axes
   */
  drawAxes() {
    const { props, svg, x, y, innerScaleBand, yAxisContainer, domain, xAxisContainer, xAxisContainer2 } = this;
    const { bar, data, groupLayout, margin, width, height, axis } = props;
    const valuesCount = maxValueCount(data.counts);
    const w = gridWidth(props);
    const h = gridHeight(props) - SPLIT_AXIS_HEIGHT;
    const dataLabels = data.counts.map((c) => c.label);

    y.domain(data.bins)
      .rangeRound([h, 0])
      .paddingInner(groupedPaddingInner(bar));

    innerScaleBand
      .domain(groupedBarsUseSameXAxisValue({ groupLayout }) ? ['main'] : dataLabels)
      .rangeRound([0, y.bandwidth()])
      .paddingInner(paddingInner(props.bar));

    const xAxis = axisBottom<number>(x)
      .tickFormat((v) => {
        const n = v.toString().replace('-', '');

        if (shouldFormatTick(axis.x)) {
          if (axis.x.scale === 'time') {
            return timeFormat(axis.x.dateFormat ?? '')(new Date(n));
          }
          return isNaN(Number(v)) ? n : format(axis.x.numberFormat ?? '')(Number(n))
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


    // @TODO - Stacked? (was using appendDomainRange())
    x.range([0, Number(width) - (margin.top * 2) - axis.y.width])
      .domain(this.domain)
      .nice();

    const xAxisY = height - xAxisHeight(props.axis) - margin.top - SPLIT_AXIS_HEIGHT;
    xAxisContainer
      ?.attr('transform', 'translate(' + yAxisWidth(axis) + ',' +
        xAxisY + ')')
      .call(xAxis);

    xAxisContainer2
      ?.attr('transform', 'translate(' + yAxisWidth(axis) + ',' +
        (xAxisY) + ')')
      .call(xGroupAxis);


    // Move the y axis ticks to the left of the chart (need to go after the x axis range set up)
    yAxis.tickPadding(x(0) + 10)
    yAxisContainer
      // Place the y axis in the middle of the chart
      ?.attr('transform', 'translate(' + (yAxisWidth(axis) + x(0)) + ', ' + margin.top + ' )')
      .call(yAxis);
    attrs(svg?.selectAll('.y-axis .domain, .y-axis .tick line'), axis.y?.style ?? {} as any);
    attrs(svg?.selectAll('.y-axis .tick text'), axis.y?.text?.style ?? {} as any);

    attrs(svg?.selectAll('.x-axis .domain, .x-axis .tick line'), axis.x?.style ?? {} as any);
    attrs(svg?.selectAll('.x-axis .tick text'), axis.x?.text?.style ?? {} as any);
  }

  calculateDomain() {
    const { props } = this;
    const { data, center } = props;
    const leftValues = data.counts.reduce((prev, next) => prev.concat(next.data[0]), [] as number[]);
    const rightValues = data.counts.reduce((prev, next) => prev.concat(next.data[1]), [] as number[]);

    // Use applyDomainAffordance to allow space for percentage labels
    this.domain = [
      applyDomainAffordance(-Math.max(...leftValues)),
      applyDomainAffordance(Math.max(...rightValues)),
    ];

    // Center the 0 axis value in the middle of the chart
    if (center) {
      const max = Math.max(Math.max(...leftValues), this.domain[1]);
      this.domain = [
        applyDomainAffordance(-max),
        applyDomainAffordance(max)];
    }
    return this.domain;
  }

  /**
   * Draw a single data set into the chart
   */
  updateChart(
    bins: string[],
    groupData: IGroupData,
  ) {
    const { props, container, tipContainer, yAxisLabel, x, innerScaleBand, tipContent, y } = this;
    const { axis, height, margin, delay, duration, tip, showBinPercentages } = props;

    const percentData = calculatePercents(groupData);

    const stackedOffset = (d: IGroupDataItem, stackIndex: number) => {
      const w = d.side === 'left' ? -d.value : d.value;
      return x(Math.min(0, w));
    }

    const colors = scaleOrdinal(props.colorScheme);
    const gWidth = gridWidth(props);

    const g = container
      ?.selectAll<SVGElement, {}>('g')
      .data(percentData);

    const bars = g?.enter()
      .append<SVGElement>('g')
      .merge(g)
      .attr('transform', (d: any[]) => {
        let yd = y(d[0].label);
        if (yd === undefined) {
          yd = 0;
        }
        const xX = yAxisWidth(axis);
        return `translate(${xX}, ${margin.top + yd})`;
      })

      .selectAll<SVGElement, {}>('rect')
      .data((d) => d);

    bars
      ?.enter()
      .append<SVGElement>('rect')
      .attr('width', 0)
      .attr('x', (d) => x(0))
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
      .attr('width', (d: IGroupDataItem): number => {
        const w = d.side === 'left' ? -d.value : d.value;
        return Math.abs(x(w) - x(0));
      });

    const percents = g?.enter()
      .append<SVGElement>('g')
      .merge(g)
      .attr('transform', (d: any[]) => {
        let yd = y(d[0].label);
        if (yd === undefined) {
          yd = 0;
        }
        const xX = yAxisWidth(axis);
        return `translate(${xX}, ${margin.top + yd})`;
      })

      .selectAll<SVGElement, {}>('text')
      .data((d) => d);

    percents
      ?.enter()
      .append<SVGElement>('text')
      .attr('width', 0)
      .attr('x', (d) => {
        const w = d.side === 'left' ? -40 : 40;
        return x(0) + w;
      })
      .attr('class', 'percentage-label')
      .style('text-anchor', 'middle')
      .style('font-size', '0.675rem')
      .merge(percents)
      .text((d, i) => {
        return showBinPercentages ? `${d.percent}%` : '';
      })
      .attr('y', (d: IGroupDataItem, i: number) => {
        const h = getBarWidth(0, props.groupLayout, props.bar, innerScaleBand);
        const offset = h / 2;

        // Ensure that percentage labels don't overlap
        const verticalOffset = i < 2 ? 0 : 14;
        return offset + verticalOffset;
      })
      .attr('fill', (d, i) => colors(String(d.groupLabel)))
      .transition()
      .duration(duration)
      .delay(delay)
      .attr('x', (d) => {
        const w = d.side === 'left' ? - 20 : 20;
        const v = d.side === 'left' ? -d.value : d.value;
        return x(v) + w;
      })
      .attr('width', (d: IGroupDataItem): number => {
        const w = d.side === 'left' ? -d.value : d.value;
        return Math.abs(x(w) - x(0));
      });

    percents?.exit().remove();

    bars?.exit().remove();
    g?.exit().remove();

    const yText = yAxisLabel
      ?.selectAll<any, any>('text')
      .data([axis.y.label ?? '']);

    yText?.enter().append('text')
      .attr('class', 'y-axis-label')
      .merge(yText)
      .attr('transform',
        'translate(' + 0 + ' ,' +
        ((height - yAxisWidth(props.axis) - (margin.left * 2))) + ')')
      .style('text-anchor', 'middle')
      .text((d) => d);

    const xText = yAxisLabel
      ?.selectAll<any, any>('text')
      .data([axis.x.label ?? '']);

    xText?.enter().append('text')
      .attr('class', 'x-axis-label')
      .merge(xText)
      .attr('transform', 'rotate(-90)')
      .attr('y', 0)
      .attr('x', 0 - (gWidth / 2 - (margin.top * 2)))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text((d) => d);
  }

  mergeProps(newProps: DeepPartial<ITornadoProps>) {
    const { props } = this;

    const customerizer = (objValue, srcValue, key, object, source, stack) => {
      if (['data'].includes(key)) {
        return srcValue;
      }
    }
    mergeWith(props, newProps, customerizer);
  }

  /**
   * Update chart
   */
  update(newProps: DeepPartial<ITornadoProps>) {
    const { props } = this;
    if (!props.data) {
      return;
    }
    if (!props.data.bins) {
      return;
    }
    this.mergeProps(newProps);
    const { margin, width, height, className, data, visible } = props;
    sizeSVG(this.svg, { margin, width, height, className });
    this.dataSets = [];

    data.counts.forEach((count) => {
      count.data.forEach((value, genderIndex) => {
        value.forEach((aValue, rowIndex) => {
          if (!this.dataSets[rowIndex]) {
            this.dataSets[rowIndex] = [];
          }
          this.dataSets[rowIndex].push({
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
    this.updateChart(data.bins, this.dataSets);
  }

  /**
   * Any necessary clean up
   */
  destroy() {
    this.svg?.selectAll('svg > *').remove();
  }
}
