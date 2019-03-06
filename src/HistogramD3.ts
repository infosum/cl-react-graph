import { extent } from 'd3-array';
import {
  axisBottom,
  axisLeft,
} from 'd3-axis';
import {
  scaleBand,
  scaleLinear,
  ScaleLinear,
  scaleOrdinal,
} from 'd3-scale';
import { select } from 'd3-selection';
import * as merge from 'deepmerge';
import * as get from 'lodash.get';

import colorScheme from './colors';
import attrs from './d3/attrs';
import {
  drawGrid,
  gridHeight,
  gridWidth,
  xAxisHeight,
  yAxisWidth,
} from './grid';
import {
  IChartAdaptor,
  IHistogramData,
  IHistogramDataSet,
  IHistogramProps,
} from './Histogram';
import tips, { makeTip } from './tip';

interface IGroupDataItem {
  label: string;
  value: number;
}

type IGroupData = IGroupDataItem[][];

export const histogramD3 = ((): IChartAdaptor => {
  let svg;
  let tipContainer;
  let tipContent;
  const y = scaleLinear();
  const x = scaleBand();
  const innerScaleBand = scaleBand();
  // @TODO make this a prop
  const stacked = false;

  const defaultProps: IHistogramProps = {
    axis: {
      x: {
        height: 20,
        label: '',
        margin: 10,
        style: {
          'fill': 'none',
          'shape-rendering': 'crispEdges',
          'stroke': '#666',
          'stroke-opacity': 1,
          'stroke-width': 1,
        },
        text: {
          style: {
            fill: '#666',
          },
        },
      },
      y: {
        label: '',
        style: {
          'fill': 'none',
          'shape-rendering': 'crispEdges',
          'stroke': '#666',
          'stroke-opacity': 1,
          'stroke-width': 1,
        },
        text: {
          style: {
            fill: '#666',
          },
        },
        ticks: 10,
        width: 25,
      },
    },
    bar: {
      groupMargin: 0.1,
      margin: 0,
      width: 50,
    },
    className: 'histogram-d3',
    colorScheme,
    data: {
      bins: [],
      counts: [],
    },
    delay: 0,
    domain: {
      max: null,
      min: null,
    },
    duration: 400,
    grid: {
      x: {
        style: {
          'fill': 'none',
          'stroke': '#bbb',
          'stroke-opacity': 0.7,
          'stroke-width': 1,
        },
        ticks: 5,
        visible: true,
      },
      y: {
        style: {
          'fill': 'none',
          'stroke': '#bbb',
          'stroke-opacity': 0.7,
          'stroke-width': 1,
        },
        ticks: 5,
        visible: true,
      },
    },
    height: 200,
    margin: {
      left: 5,
      top: 5,
    },
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

  const HistogramD3 = {
    /**
     * Initialization
     */
    create(el: HTMLElement, props: Partial<IHistogramProps> = {}) {
      this.mergeProps(props);
      this._makeSvg(el);
      this.makeGrid();
      this.makeScales();
      this.container = svg
        .append('g')
        .attr('class', 'histogram-container');

      this.update(el, props);
    },

    mergeProps(newProps: Partial<IHistogramProps>) {
      this.props = merge<IHistogramProps>(defaultProps, newProps);
      this.props.data = newProps.data;
      if (newProps.colorScheme) {
        this.props.colorScheme = newProps.colorScheme;
      }
    },

    /**
     * Make the SVG container element
     * Recreate if it previously existed
     */
    _makeSvg(el) {
      if (svg) {
        svg.selectAll('svg > *').remove();
        svg.remove();
        const childNodes = el.getElementsByTagName('svg');
        if (childNodes.length > 0) {
          el.removeChild(childNodes[0]);
        }
      }
      const { margin, width, height, className } = this.props;
      const scale = {
        x: 1 - (margin.left / width),
        y: 1 - (margin.top / height),
      };

      // Reference to svg element containing chart
      svg = select(el).append('svg')
        .attr('class', className)
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top}) scale(${scale.x},${scale.y})`);

      const r = makeTip(this.props.tipContainer, tipContainer);
      tipContent = r.tipContent;
      tipContainer = r.tipContainer;
    },

    valuesCount(counts: IHistogramDataSet[]): number {
      return counts.reduce((a: number, b: IHistogramDataSet): number => {
        return b.data.length > a ? b.data.length : a;
      }, 0);
    },

    /**
     * Update a linear scale with range and domain values taken either from the compiled
     * group data
     */
    appendDomainRange(scale: ScaleLinear<number, number>, data: IGroupData): void {
      const yDomain: number[] = [];
      const { domain, margin, height } = this.props;
      const allCounts: number[] = data.reduce((prev: number[], next): number[] => {
        return [...prev, ...next.map((n) => n.value)];
      }, [0]);

      const thisExtent = extent(allCounts, (d) => d);
      yDomain[1] = domain && domain.hasOwnProperty('max') && domain.max !== null
        ? domain.max
        : thisExtent[1];
      yDomain[0] = domain && domain.hasOwnProperty('min') && domain.min !== null
        ? domain.min
        : thisExtent[0];
      const yRange = [height - (margin.top * 2) - xAxisHeight(this.props.axis), 0];
      scale.range(yRange)
        .domain(yDomain);
    },

    makeScales() {
      this.xAxis = svg.append('g').attr('class', 'x-axis');
      this.yAxis = svg.append('g').attr('class', 'y-axis');

      this.xAxisLabel = svg.append('g');
      this.yAxisLabel = svg.append('g');
    },

    /**
     * Draw scales
     */
    _drawScales(data: IHistogramData) {
      const { axis, margin, height } = this.props;
      const valuesCount = this.valuesCount(data.counts);
      const w = gridWidth(this.props);

      let xAxis;
      const dataLabels = data.counts.map((c) => c.label);
      console.log('dataLabels', dataLabels);
      x
        .domain(data.bins)
        .rangeRound([0, w])
        .paddingInner(this.groupedMargin());

      if (stacked) {
        innerScaleBand
          .domain(['main'])
          .rangeRound([0, x.bandwidth()])
          .paddingInner(this.barMargin());
      } else {
        innerScaleBand
          .domain(dataLabels)
          .rangeRound([0, x.bandwidth()])
          .paddingInner(this.barMargin());
      }
      xAxis = axisBottom(x);

      const tickSize = get(axis, 'x.tickSize', undefined);
      if (tickSize !== undefined) {
        xAxis.tickSize(tickSize);
      } else {
        if (w / valuesCount < 10) {
          // Show one in 10 x axis labels
          xAxis.tickValues(x.domain().filter((d, i) => !(i % 10)));
        }
      }

      this.xAxis
        .attr('transform', 'translate(' + (yAxisWidth(axis) + axis.y.style['stroke-width']) + ',' +
          (height - xAxisHeight(this.props.axis) - (margin.left * 2)) + ')')
        .call(xAxis);

      this.appendDomainRange(y, this.dataSets);

      const yAxis = axisLeft(y).ticks(axis.y.ticks);

      const yTickSize = get(axis, 'y.tickSize', undefined);
      if (yTickSize !== undefined) {
        yAxis.tickSize(yTickSize);
      }

      this.yAxis
        .attr('transform', 'translate(' + yAxisWidth(axis) + ', 0)')
        .transition()
        .call(yAxis);

      attrs(svg.selectAll('.y-axis .domain, .y-axis .tick line'), axis.y.style);
      attrs(svg.selectAll('.y-axis .tick text'), axis.y.text.style);

      attrs(svg.selectAll('.x-axis .domain, .x-axis .tick line'), axis.x.style);
      attrs(svg.selectAll('.x-axis .tick text'), axis.x.text.style);
    },

    /**
     * Returns the margin between similar bars in different data sets
     */
    groupedMargin(): number {
      const m = get(this.props.bar, 'groupMargin', 0.1);
      return m >= 0 && m <= 1
        ? m
        : 0.1;
    },

    barMargin(): number {
      const m = get(this.props.bar, 'margin', 0);
      return m >= 0 && m <= 1
        ? m
        : 0.1;
    },

    barWidth() {
      return innerScaleBand.bandwidth();
    },

    /**
     * Draw a single data set into the chart
     */
    updateChart(
      bins: string[],
      groupData: IGroupData,
    ) {
      const { axis, height, width, margin, delay, duration, tip } = this.props;
      const barWidth = this.barWidth();

      // const borderColors = set.borderColors ? d3.scaleOrdinal(set.borderColors) : null;
      const colors = scaleOrdinal(this.props.colorScheme);
      const gHeight = gridHeight(this.props);

      const g = this.container
        .selectAll('g')
        .data(groupData);

      const bars = g.enter()
        .append('g')
        .merge(g)
        .attr('transform', (d) => {
          const xdelta = yAxisWidth(axis)
            + axis.y.style['stroke-width']
            + x(d[0].label);
          return `translate(${xdelta}, 0)`;
        })
        .selectAll('rect')
        .data((d) => d);

      // Don't ask why but we must reference tipContentFn as this.props.tipContentFn otherwise
      // it doesn't update with props changes
      const onMouseOver = (d: IGroupDataItem, i: number) => {
        const ix = bins.findIndex((b) => b === d.label);
        tipContent.html(() => this.props.tipContentFn(bins, ix, d.value));
        tip.fx.in(tipContainer);
      };

      console.log('bins', bins, 'group data', groupData);

      bars
        .enter()
        .append('rect')
        .attr('height', 0)
        .attr('y', (d: IGroupDataItem, stackIndex: number): number => {
          const setIndex = bins.findIndex((b) => b === d.label);
          const thisSetData = groupData[setIndex];
          console.log('------------------');
          console.log('default y:', d);
          console.log('setIndex,', setIndex);
          console.log('stackIndex', stackIndex);
          console.log('thisSetData', thisSetData);
          // @TODO stack charts
          // const offset = stackIndex > 0
          //   ? y(10)
          //   : 0;
          const offset = 0;
          return gHeight - offset;
        })
        .attr('class', 'bar')
        .on('mouseover', onMouseOver)
        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', () => tip.fx.out(tipContainer))
        .merge(bars)
        .attr('x', (d) => {
          // console.log('group label', d.groupLabel);
          return innerScaleBand(d.groupLabel);
        })
        .attr('width', (d) => barWidth)
        .attr('fill', (d, i) => colors(i))
        .transition()
        .duration(duration)
        .delay(delay)
        .attr('y', (d: IGroupDataItem, stackIndex: number): number => {
          // const setIndex = bins.findIndex((b) => b === d.label);
          // const thisSetData = groupData[setIndex];
          // @TODO stack charts
          // const offset = stackIndex > 0
          //   ? 5
          //   : 0;
          const offset = 0;
          return y(d.value + offset);
        })
        // Hide bar's bottom border
        .attr('stroke-dasharray',
          (d: IGroupDataItem): string => {
            const currentHeight = gHeight - (y(d.value));
            return `${barWidth} 0 ${currentHeight} ${barWidth}`;
          })
        .attr('height', (d: IGroupDataItem): number => gHeight - (y(d.value)));

      bars.exit().remove();
      g.exit().remove();

      const xText = this.xAxisLabel
        .selectAll('text')
        .data([axis.x.label]);

      xText.enter().append('text')
        .attr('class', 'x-axis-label')
        .merge(xText)
        .attr('transform',
          'translate(' + (width / 2) + ' ,' +
          ((height - xAxisHeight(this.props.axis) - (margin.left * 2)) + axis.x.margin) + ')')
        .style('text-anchor', 'middle')
        .text((d) => d);

      const yText = this.yAxisLabel
        .selectAll('text')
        .data([axis.y.label]);

      yText.enter().append('text')
        .attr('class', 'y-axis-label')
        .merge(yText)
        .attr('transform', 'rotate(-90)')
        .attr('y', 0)
        .attr('x', 0 - (gHeight / 2 - (margin.top * 2)))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text((d) => d);
    },

    makeGrid() {
      this.gridX = svg.append('g')
        .attr('class', 'grid gridX');
      this.gridY = svg.append('g')
        .attr('class', 'grid gridY');
    },
    /**
     * Update chart
     */
    update(el: HTMLElement, props: IHistogramProps) {
      if (!props.data) {
        return;
      }
      this.mergeProps(props);
      if (!this.props.data.bins) {
        return;
      }

      const { data, visible } = this.props;
      this.dataSets = [] as IGroupData;

      data.counts.forEach((count) => {
        count.data.forEach((value, i) => {
          if (!this.dataSets[i]) {
            this.dataSets[i] = [];
          }
          this.dataSets[i].push({
            groupLabel: count.label,
            label: data.bins[i],
            value: visible[data.bins[i]] !== false && visible[count.label] !== false ? value : 0,
          } as IGroupDataItem);
        });
      });

      this._drawScales(this.props.data);
      drawGrid(x, y, this.gridX, this.gridY, this.props, this.valuesCount(data.counts));
      this.updateChart(data.bins, this.dataSets);
    },

    /**
     * Any necessary clean up
     */
    destroy(el: HTMLElement) {
      svg.selectAll('svg > *').remove();
    },
  };
  return HistogramD3;
});
