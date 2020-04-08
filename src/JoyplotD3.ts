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
import {
  select,
  Selection,
} from 'd3-selection';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import merge from 'lodash/merge';

import colorScheme from './colors';
import attrs from './d3/attrs';
import {
  IChartAdaptor,
  IHistogramData,
  IHistogramDataSet,
} from './Histogram';
import { IJoyPlotProps } from './JoyPlot';
import tips, { makeTip } from './tip';
import {
  groupedPaddingInner,
  groupedPaddingOuter,
  paddingInner,
  paddingOuter,
} from './utils/bars';
import {
  axis as defaultAxis,
  grid as defaultGrid,
} from './utils/defaults';
import { DeepPartial } from './utils/types';

interface IGroupDataItem {
  label: string;
  value: number;
}

type IGroupData = IGroupDataItem[][];

export const joyPlotD3 = ((): IChartAdaptor<IJoyPlotProps> => {
  let svg: Selection<any, any, any, any>;;
  let tipContainer;
  let tipContent;
  let dataSets: IGroupData[];
  let containers: Selection<SVGGElement, any, any, any>[];
  let xAxisContainer: Selection<SVGGElement, any, any, any>;
  let yAxisContainer: Selection<SVGGElement, any, any, any>;
  let gridXContainer: Selection<SVGGElement, any, any, any>;
  let gridYContainer: Selection<SVGGElement, any, any, any>;
  const yOuterScaleBand = scaleBand();
  const y = scaleLinear();
  const x = scaleBand();
  const innerScaleBand = scaleBand();

  // Gridlines in x axis function
  function make_x_gridlines(ticks: number = 5) {
    return axisBottom(x)
      .ticks(ticks);
  }

  // Gridlines in y axis function
  function make_y_gridlines(ticks: number = 5) {
    return axisLeft(yOuterScaleBand)
      .ticks(ticks);
  }

  const props: IJoyPlotProps = {
    axis: cloneDeep(defaultAxis),
    bar: {
      grouped: {
        paddingInner: 0,
        paddingOuter: 0,
      },
      paddingInner: 0,
      paddingOuter: 0,
      overlayMargin: 5,
    },
    className: 'histogram-d3',
    colorScheme,
    data: [{
      bins: [],
      counts: [],
    }],
    delay: 0,
    domain: {
      max: null,
      min: null,
    },
    duration: 400,
    grid: defaultGrid,
    height: 200,
    margin: {
      bottom: 0,
      left: 5,
      right: 0,
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
    tipContentFn: (bins, i, d, joyTitle): string =>
      joyTitle + ': ' +
      bins[i] + '<br />' + d,
    visible: {},
    width: 200,
  };

  const JoyPlotD3 = {
    /**
     * Initialization
     */
    create(el: Element, newProps: DeepPartial<IJoyPlotProps> = {}) {
      this.mergeProps(newProps);
      this._makeSvg(el);
      this.makeGrid();
      this.makeScales();
      containers = props.data.map((d, i) => svg
        .append('g')
        .attr('class', `histogram-container-${i}`),
      );

      this.update(props);
    },

    mergeProps(newProps: DeepPartial<IJoyPlotProps>) {
      merge(props, newProps);
      if (newProps.data) {
        props.data = newProps.data as IJoyPlotProps['data'];
      }
      if (newProps.colorScheme) {
        props.colorScheme = newProps.colorScheme;
      }
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
     * Update a linear scale with range and domain values taken either from the compiled
     * group data
     */
    appendDomainRange(scale: ScaleLinear<number, number>, data: IGroupData[]): void {
      const yDomain: number[] = [];
      const { domain } = props;

      const allCounts: number[] = data.reduce((prev, next) => {
        const thisCounts: number[] = next.reduce((p, n) => {
          return [...p, ...n.map((item) => item.value)];
        }, [] as number[]);
        return [...prev, ...thisCounts];
      }, [0]);

      const thisExtent = extent(allCounts, (d) => d);
      yDomain[1] = domain && domain.hasOwnProperty('max') && domain.max !== null
        ? domain.max
        : Number(thisExtent[1]);
      yDomain[0] = domain && domain.hasOwnProperty('min') && domain.min !== null
        ? domain.min
        : Number(thisExtent[0]);
      const yRange = [yOuterScaleBand.bandwidth(), 0];
      scale.range(yRange)
        .domain(yDomain);
    },

    yAxisWidth() {
      const { axis } = props;
      return axis.y.label === ''
        ? axis.y.width
        : axis.y.width + 30;
    },

    xAxisHeight() {
      const { axis } = props;
      return axis.x.label === ''
        ? axis.x.height
        : axis.x.height + 30;
    },

    makeScales() {
      const { axis, margin, height, width } = props;
      xAxisContainer = svg.append('g').attr('class', 'x-axis');
      yAxisContainer = svg.append('g').attr('class', 'y-axis');

      if (axis.x.label !== '') {
        svg.append('text')
          .attr('class', 'x-axis-label')
          .attr('transform',
            'translate(' + (Number(width) / 2) + ' ,' +
            ((height - this.xAxisHeight() - (margin.left * 2)) + 10 + axis.x.margin) + ')')
          .style('text-anchor', 'middle')
          .text(axis.x.label);
      }

      if (axis.y.label !== '') {
        svg.append('text')
          .attr('class', 'y-axis-label')
          .attr('transform', 'translate(0, -' + this.gridHeight() + ')rotate(-90)')
          .attr('y', 0 - margin.left)
          .attr('x', 0 - (height / 2 - (margin.top * 2)))
          .attr('dy', '1em')
          .style('text-anchor', 'middle')
          .text(axis.y.label);
      }
    },

    getBins() {
      return props.data.reduce((prev, next) => {
        return Array.from(new Set(prev.concat(next.bins)));
      }, [] as string[]);
    },

    /**
     * Draw scales
     */
    _drawScales(data: IHistogramData[]) {
      const { bar, margin, height, axis } = props;
      const valuesCount = data.reduce((prev, next) => {
        const c = this.valuesCount(next.counts);
        return c > prev ? c : prev;
      }, 0);
      const w = this.gridWidth();

      let xAxis;
      const dataLabels = data[0].counts.map((c) => c.label);

      const bins = this.getBins();
      x
        .domain(bins)
        .rangeRound([0, w])
        .paddingInner(paddingInner(bar))
        .paddingOuter(paddingOuter(bar));

      innerScaleBand
        .domain(dataLabels)
        .rangeRound([0, x.bandwidth()])
        .paddingInner(groupedPaddingInner(bar))
        .paddingOuter(groupedPaddingOuter(bar));

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

      xAxisContainer
        .attr('transform', 'translate(' + (this.yAxisWidth() + axis.y.style['stroke-width']) + ',' +
          (height - this.xAxisHeight() - (margin.left * 2)) + ')')
        .call(xAxis);

      const yLabels = data.map((d) => String(d.title));
      const yOuterBounds: [number, number] = [height - (margin.top * 2) - this.xAxisHeight(), 0];
      yOuterScaleBand.domain(yLabels)
        .rangeRound(yOuterBounds);

      this.appendDomainRange(y, dataSets);

      const yAxis = axisLeft(yOuterScaleBand).ticks(axis.y.ticks);

      const yTickSize = get(axis, 'y.tickSize', undefined);
      if (yTickSize !== undefined) {
        yAxis.tickSize(yTickSize);
      }

      yAxisContainer
        .attr('transform', 'translate(' + this.yAxisWidth() + ', 0)')
        .transition()
        .call(yAxis);

      attrs(svg.selectAll('.y-axis .domain, .y-axis .tick line'), axis.y.style);
      attrs(svg.selectAll('.y-axis .tick text'), axis.y.text.style as any);

      attrs(svg.selectAll('.x-axis .domain, .x-axis .tick line'), axis.x.style);
      attrs(svg.selectAll('.x-axis .tick text'), axis.x.text.style as any);
    },

    /**
     * Calculate the width of the area used to display the
     * chart bars. Removes chart margins and Y axis from
     * chart total width.
     */
    gridWidth(): number {
      const { width, margin } = props;
      return Number(width) - (margin.left * 2) - this.yAxisWidth();
    },

    /**
     * Calculate the height of the area used to display the
     * chart bars. Removes chart margins and X axis from
     * chart total height.
     */
    gridHeight(): number {
      const { height, margin } = props;
      return height - (margin.top * 2) - this.xAxisHeight();
    },

    /**
     * Calculate the bar width
     */
    barWidth() {
      return innerScaleBand.bandwidth();
    },

    /**
     * Draw a single data set into the chart
     */
    updateChart(
      groupData: IGroupData[],
    ) {
      const bins = this.getBins();
      const { delay, duration, axis, stroke, tip, tipContentFn } = props;
      const barWidth = this.barWidth();

      const colors = scaleOrdinal(props.colorScheme);
      const borderColors = scaleOrdinal(['#FFF']);

      const yAxisWidth = this.yAxisWidth();

      groupData.forEach((data, i) => {
        const joyTitle = props.data[i].title;
        const g = containers[i]
          .selectAll<SVGGElement, {}>('g')
          .data(data);

        const bars = g.enter()
          .append<SVGGElement>('g')
          .merge(g)
          .attr('transform', (d) => {
            const xdelta = yAxisWidth
              + axis.y.style['stroke-width']
              + (x(d[0].label) || 0);

            const ydelta = yOuterScaleBand(d[0].label);
            return `translate(${xdelta}, ${ydelta})`;
          })
          .selectAll<SVGRectElement, {}>('rect')
          .data((d) => d);

        bars
          .enter()
          .append<SVGRectElement>('rect')
          .attr('height', 0)
          .attr('y', (d: IGroupDataItem): number => yOuterScaleBand.bandwidth())

          .attr('class', 'bar')
          .attr('x', (d) => String(innerScaleBand(d.label)))
          .attr('width', (d) => barWidth)
          .attr('fill', (d, ix) => colors(String(ix)))

          .on('mouseover', (d: IGroupDataItem) => {
            const ix = bins.findIndex((b) => b === d.label);
            tipContent.html(() => tipContentFn(bins, ix, d.value, joyTitle));
            tip.fx.in(tipContainer);
          })
          .on('mousemove', () => tip.fx.move(tipContainer))
          .on('mouseout', () => tip.fx.out(tipContainer))
          .merge(bars)
          .transition()
          .duration(duration)
          .delay(delay)
          .attr('y', (d: IGroupDataItem): number => y(d.value))
          .attr('stroke', (d, ix) => {
            if (borderColors) {
              return borderColors(String(ix));
            }
            return '';
          })
          .attr('shape-rendering', 'crispEdges')
          .attr('stroke-width', stroke.width)
          .attr('stroke-linecap', stroke.linecap)

          // Hide bar's bottom border
          .attr('stroke-dasharray',
            (d: IGroupDataItem): string => {
              const currentHeight = yOuterScaleBand.bandwidth() - y(d.value);
              return `${barWidth} 0 ${currentHeight} ${barWidth}`;
            })
          .attr('height', (d: IGroupDataItem): number =>
            yOuterScaleBand.bandwidth() - y(d.value),
          );

        g.exit().remove();
      });
    },

    makeGrid() {
      gridXContainer = svg.append('g')
        .attr('class', 'grid gridX');
      gridYContainer = svg.append('g')
        .attr('class', 'grid gridY');
    },

    /**
     * Draw a grid onto the chart background
     */
    _drawGrid() {
      const { data, height, width, axis, grid, margin } = props;
      const ticks = data.reduce((prev, next) => {
        const c = this.valuesCount(next.counts);
        return c > prev ? prev : c;
      }, 0);
      const axisWidth = axis.y.style['stroke-width'];

      const offset = {
        x: this.yAxisWidth() + axisWidth,
        y: this.gridHeight(),
      };

      if (grid.x.visible) {
        // Add the X gridlines
        gridXContainer.attr('transform', `translate(${offset.x}, ${offset.y})`);

        gridXContainer.call(make_x_gridlines(get(grid, 'x.ticks', ticks))
          .tickSize(-height + this.xAxisHeight() + (margin.top * 2))
          .tickFormat(() => ''));

        attrs(gridXContainer.selectAll('.tick line'), grid.x.style);
        attrs(gridXContainer.selectAll('.domain'), { ...axis.y.style, stroke: 'transparent' });
      }

      if (grid.y.visible) {
        // add the Y gridlines
        gridYContainer.attr('transform', 'translate(' + (this.yAxisWidth() + axisWidth) + ', 0)')
          .transition()
          .call(make_y_gridlines(get(grid, 'y.ticks', ticks))
            .tickSize(-width + (margin.left * 2) + this.yAxisWidth())
            .tickFormat(() => ''),
          );

        attrs(gridYContainer.selectAll('.tick line'), grid.y.style);

        // Hide the first horizontal grid line to show axis
        gridYContainer.selectAll('.gridY .tick line').filter((d, i) => i === 0)
          .attr('display', 'none');
        attrs(gridYContainer.selectAll('.domain'), { ...axis.x.style, stroke: 'transparent' });
      }
    },

    /**
     * Update chart
     */
    update(newProps: DeepPartial<IJoyPlotProps>) {
      this.mergeProps(newProps);
      const { data, visible } = props;

      dataSets = data.map((d) => {
        const lineData = [] as IGroupData;
        d.counts.forEach((count) => {
          count.data.forEach((value, i) => {
            if (!lineData[i]) {
              lineData[i] = [];
            }
            lineData[i].push({
              groupLabel: count.label,
              joyLabel: d.title,
              label: d.bins[i],
              value: visible[d.bins[i]] !== false && visible[count.label] !== false ? value : 0,
            } as IGroupDataItem);
          });
        });
        return lineData;
      });

      this._drawScales(props.data);
      this._drawGrid();
      this.updateChart(dataSets);
    },

    /**
     * Any necessary clean up
     */
    destroy() {
      svg.selectAll('svg > *').remove();
    },
  };
  return JoyPlotD3;
});
