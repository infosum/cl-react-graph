import { extent } from 'd3-array';
import {
  axisBottom,
  axisLeft,
} from 'd3-axis';
import {
  scaleBand,
  scaleLinear,
  scaleOrdinal,
} from 'd3-scale';
import {
  select,
  Selection,
} from 'd3-selection';
import merge from 'lodash/merge';

import colorScheme from './colors';
import attrs from './d3/attrs';
import {
  EGroupedBarLayout,
  IChartAdaptor,
  IHistogramData,
  IHistogramDataSet,
  IHistogramProps,
} from './Histogram';
import tips, { makeTip } from './tip';
import {
  axis as defaultAxis,
  grid as defaultGrid,
} from './utils/defaults';
import { DeepPartial } from './utils/types';

export const horizontalHistogramD3 = ((): IChartAdaptor<IHistogramProps> => {
  let svg: Selection<any, any, any, any>;;
  let tipContainer;
  let tipContent;
  const x = scaleLinear();
  const y = scaleBand();

  // Gridlines in y axis function
  function make_y_gridlines(ticks: number = 5) {
    return axisBottom(x)
      .ticks(ticks);
  }

  // Gridlines in x axis function
  function make_x_gridlines(ticks: number = 5) {
    return axisLeft(y)
      .ticks(ticks);
  }

  const props: IHistogramProps = {
    axis: defaultAxis,
    bar: {
      groupMargin: 0.1,
      margin: 10,
      overlayMargin: 5,
      width: 50,
    },
    className: 'histogram-d3',
    colorScheme,
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
    stacked: false, // Deprecated use groupLayout instead
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

  const HorizontalHistogramD3 = {
    /**
     * Initialization
     */
    create(el: Element, newProps: DeepPartial<IHistogramProps> = {}) {
      merge(props, newProps);
      this.update(el, newProps);
    },

    /**
     * Make the SVG container element
     * Recreate if it previously existed
     */
    _makeSvg(el: Element) {
      if (svg) {
        svg.selectAll('svg > *').remove();
        svg.remove();
        const childNodes = el.getElementsByTagName('svg');
        if (childNodes.length > 0) {
          el.removeChild(childNodes[0]);
        }
      }
      const { margin, width, height, className } = props;

      // Reference to svg element containing chart
      svg = select(el).append('svg')
        .attr('class', className)
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .append('g')
        .attr('transform',
          'translate(' + margin.left + ',' + margin.top + ')');
      const r = makeTip(props.tipContainer, tipContainer);
      tipContent = r.tipContent;
      tipContainer = r.tipContainer;
    },

    /**
     * Get a max count of values in each data set
     */
    valuesCount(counts: IHistogramDataSet[]): number {
      return counts.reduce((a: number, b: IHistogramDataSet): number => {
        return b.data.length > a ? b.data.length : a;
      }, 0);
    },

    /**
     * Draw scales
     */
    _drawScales(data: IHistogramData) {
      const { margin, width, height, axis } = props;
      const valuesCount = this.valuesCount(data.counts);

      svg.selectAll('.y-axis').remove();
      svg.selectAll('.x-axis').remove();

      const h = this.gridHeight();
      let xDomain;
      let xAxis;
      let yAxis;
      let xRange;
      const allCounts = data.counts.reduce((a: number[], b: IHistogramDataSet): number[] => {
        return [...a, ...b.data];
      }, []);

      y.domain(data.bins)
        .rangeRound([0, h]);

      xAxis = axisBottom(x).ticks(axis.x.ticks);
      yAxis = axisLeft(y).ticks(axis.y.ticks);

      if (h / valuesCount < 10) {
        // Show one in 10 x axis labels
        xAxis.tickValues(x.domain().filter((d, i) => !(i % 10)));
      }

      xDomain = extent(allCounts, (d) => d);
      xDomain[0] = 0;
      xRange = [0, Number(width) - (margin.top * 2) - axis.y.width];
      x.range(xRange)
        .domain(xDomain);

      svg.append('g').attr('class', 'y-axis')
        .attr('transform', 'translate(' + axis.y.width + ', 0)')
        .call(yAxis);

      svg.append('g').attr('class', 'x-axis')
        .attr('transform', 'translate(' + axis.y.width + ',' +
          (height - axis.x.height - (margin.left * 2)) + ')')
        .call(xAxis);

      attrs(svg.selectAll('.y-axis .domain, .y-axis .tick line'), axis.y.style);
      attrs(svg.selectAll('.y-axis .tick text'), axis.y.text.style as any);

      attrs(svg.selectAll('.x-axis .domain, .x-axis .tick line'), axis.x.style);
      attrs(svg.selectAll('.x-axis .tick text'), axis.x.text.style as any);
    },

    /**
     * Draw the bars
     * @param {Object} info Bar data etc
     */
    _drawBars(info: IHistogramData) {
      const valuesCount = this.valuesCount(info.counts);
      info.counts.forEach((set: IHistogramDataSet, setIndex: number) => {
        this.drawDataSet(info.bins, set, setIndex, info.counts.length);
      });
    },

    /**
     * Calculate the width of the area used to display the
     * chart bars. Removes chart margins and Y axis from
     * chart total width.
     */
    gridWidth(): number {
      const { axis, width, margin } = props;
      return Number(width) - (margin.left * 2) - axis.y.width;
    },

    /**
     * Calculate the height of the area used to display the
     * chart bars. Removes chart margins and X axis from
     * chart total height.
     */
    gridHeight(): number {
      const { height, margin, axis } = props;
      return height - (margin.top * 2) - axis.x.height;
    },

    /**
     * Returns the margin between similar bars in different data sets
     * @return {Number} Margin
     */
    groupedMargin(): number {
      const { data } = props;
      return ((data.counts.length - 1) * 3);
    },

    /**
     * Calculate the bar height
     * @return {number} bar height
     */
    barHeight() {
      const { data, bar } = props;
      const h = this.gridHeight();
      const valuesCount = this.valuesCount(data.counts);
      const setCount = data.counts.length;
      let barHeight = (h / valuesCount) - (bar.margin * 2) - this.groupedMargin();

      // Small bars - reduce margin and re-calcualate bar width
      if (barHeight < 5) {
        bar.margin = 1;
        barHeight = Math.max(1, (h - (valuesCount + 1) * bar.margin) /
          valuesCount);
      }

      // show data sets next to each other...
      return barHeight / setCount;
    },

    /**
     * Draw a single data set into the chart
     * @param {Array} bins Data set labels
     * @param {Object} set HistogramDataSet
     * @param {number} setIndex Data set index
     * @param {number} setCount Total number of data sets
     */
    drawDataSet(
      bins: string[], set: IHistogramDataSet,
      setIndex: number, setCount: number,
    ) {
      const { bar, delay, duration,
        axis, stroke, tip, tipContentFn } = props;
      let barItem;
      const barHeight = this.barHeight();
      const colors = scaleOrdinal(set.colors || props.colorScheme);
      const borderColors = set.borderColors ? scaleOrdinal(set.borderColors) : null;

      const selector = '.bar-' + setIndex;
      const multiLineOffset = (index) => setCount === 1
        ? 0
        : ((index + setIndex) * (barHeight + this.groupedMargin()));

      svg.selectAll(selector).remove();

      const onClick = (d: any) => {
        if (props.onClick) {
          props.onClick(d);
        }
      }
      // Set up bar initial props
      barItem = svg.selectAll(selector)
        .data(set.data)
        .enter()
        .append('rect')
        .attr('class', 'bar ' + selector)
        .attr('y', (d, index, all) => {
          return bar.margin
            + (barHeight + (bar.margin * 2)) * (index)
            + multiLineOffset(index);
        })
        .attr('height', (d) => barHeight)
        .attr('fill', (d, i) => colors(String(i)))
        .on('mouseover', (d: number, i: number) => {
          tipContent.html(() => tipContentFn(bins, i, d));
          tip.fx.in(tipContainer);
        })
        .on('click', onClick)
        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', () => tip.fx.out(tipContainer))
        .attr('x', (d: number): number => axis.y.width + axis.y.style['stroke-width'])
        .attr('width', 0);

      barItem.attr('stroke', (d, i) => {
        if (borderColors) {
          return borderColors(i);
        }
        return typeof stroke.color === 'function'
          ? stroke.color(d, i, (j: number) => colors[j])
          : stroke.color;
      })
        .attr('shape-rendering', 'crispEdges')
        .attr('stroke-width', stroke.width)
        .attr('stroke-linecap', stroke.linecap);

      barItem.attr('stroke-dasharray', stroke.dasharray);

      // Animate in bar
      barItem
        .transition()
        .duration(duration)
        .delay(delay)
        // Hide bar's left border
        .attr('stroke-dasharray',
          (d: number): string => {
            const currentWidth = x(d);
            return `${currentWidth + barHeight + currentWidth} ${barHeight}`;
          })
        .attr('width',
          (d: number): number => x(d));

      barItem.exit().remove();
    },

    /**
     * Draw a grid onto the chart background
     */
    _drawGrid() {
      const { data, height, width, axis, grid, margin } = props;
      const ticks = this.valuesCount(data.counts);
      const axisWidth = axis.y.style['stroke-width'];
      const offset = {
        x: axis.y.width + this.groupedMargin() / 2,
        y: 0,
      };
      let g;
      let gy;

      // Horizontal lines
      if (grid.x.visible) {
        // Add the X gridlines
        g = svg.append('g')
          .attr('class', 'grid gridX')
          .attr('transform', `translate(${offset.x}, ${offset.y})`);

        g.call(make_x_gridlines(grid.x.ticks || ticks)
          .tickSize(-width + (margin.left * 2) + axis.y.width)
          .tickFormat(() => ''));

        attrs(g.selectAll('.tick line'), grid.x.style);
        attrs(g.selectAll('.domain'), { ...axis.y.style, stroke: 'transparent' });
      }

      // Vertical lines.....
      if (grid.y.visible) {
        // add the Y gridlines
        gy = svg.append('g')
          .attr('class', 'grid gridY')
          .attr('transform', 'translate(' + (axis.y.width + axisWidth) + ', '
            + (height - axis.x.height - (margin.top * 2)) + ')')
          .call(make_y_gridlines(grid.y.ticks || ticks)
            .tickSize(-height + (margin.left * 2) + axis.x.height) // Line Length
            .tickFormat(() => ''),
          );
        attrs(gy.selectAll('.tick line'), grid.y.style);

        attrs(gy.selectAll('.domain'), { ...axis.x.style, stroke: 'transparent' });
      }
    },

    /**
     * Update chart
     */
    update(el: Element, newProps: DeepPartial<IHistogramProps>) {
      if (!props.data) {
        return;
      }
      merge(props, newProps);
      this._makeSvg(el);
      if (!props.data.bins) {
        return;
      }

      this._drawScales(props.data);
      this._drawGrid();
      this._drawBars(props.data);
    },

    /**
     * Any necessary clean up
     */
    destroy(el: Element) {
      svg.selectAll('svg > *').remove();
    },
  };
  return HorizontalHistogramD3;
});
