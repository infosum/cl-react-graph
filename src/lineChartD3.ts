import { extent } from 'd3-array';
import {
  axisBottom,
  axisLeft,
} from 'd3-axis';
import {
  select,
  Selection,
} from 'd3-selection';
import {
  area,
  curveCatmullRom,
  CurveFactory,
  CurveFactoryLineOnly,
  line,
} from 'd3-shape';
import {
  timeFormat,
  timeParse,
} from 'd3-time-format';
import get from 'lodash.get';
import merge from 'lodash.merge';

import attrs from './d3/attrs';
import {
  drawGrid,
  gridWidth,
  xAxisHeight as getXAxisHeight,
  yAxisWidth as getYAxisWidth,
} from './grid';
import { IChartAdaptor } from './Histogram';
import {
  formatTick,
  shouldFormatTick,
} from './HistogramD3';
import {
  ILineChartDataSet,
  ILineChartProps,
  ILineProps,
  ISVGPoint,
} from './LineChart';
import tips, { makeTip } from './tip';
import {
  axis as defaultAxis,
  grid as defaultGrid,
  lineStyle,
} from './utils/defaults';
import {
  AnyScale,
  buildScales,
} from './utils/scales';
import { DeepPartial } from './utils/types';

const ZERO_SUBSITUTE: number = 1e-6;

export const lineChartD3 = ((): IChartAdaptor<ILineChartProps> => {
  let tipContainer;
  let xParseTime;
  let xFormatTime;
  let tipContent;

  const lineProps: ILineProps = {
    curveType: curveCatmullRom,
    fill: {
      fill: '#eee',
      show: false,
    },
    show: true,
    stroke: '#005870',
    strokeDashArray: '5 5',
    strokeDashOffset: 0,
  };

  const pointProps: ISVGPoint = {
    ...lineStyle,
    fill: 'rgba(255, 255, 255, 0)',
    radius: 4,
    show: true,
    stroke: '#005870',
  };

  const props: ILineChartProps = {
    axis: defaultAxis,
    className: 'line-chart-d3',
    data: [],
    grid: defaultGrid,
    height: 250,
    margin: {
      bottom: 0,
      left: 5,
      right: 0,
      top: 5,
    },
    tip: tips,
    tipContainer: 'body',
    tipContentFn: (info, i, d) => {
      switch (typeof info[i].x) {
        case 'object': // date
          return xFormatTime(info[i].x) + ', ' + info[i].y;
        default:
          return Number(info[i].x).toFixed(3) + ', ' + info[i].y;
      }
    },
    visible: {},
    width: 200,
  };

  const datumProps = {
    line: lineProps,
    point: pointProps,
  };

  const curve = (
    curveType: CurveFactory | CurveFactoryLineOnly,
    yAxisWidth: number,
    x,
    y,
  ) => line()
    .curve(curveType)
    .x((d: any) => x(d.x) + yAxisWidth)
    .y((d: any) => y(d.y));

  // let props: ILineChartProps;
  let svg: Selection<any, any, any, any>;
  let container: Selection<SVGElement, any, any, any>;
  let lineContainer: Selection<any, any, any, any>;
  let gridX: Selection<any, any, any, any>;
  let gridY: Selection<any, any, any, any>;
  let xScale: any; // AnyScale;
  let yScale: any; // AnyScale;
  let xAxisContainer: Selection<any, any, any, any>;
  let yAxisContainer: Selection<any, any, any, any>;

  const LineChartD3 = {
    /**
     * Initialization
     */
    create(el: Element, newProps: DeepPartial<ILineChartProps> = {}) {
      merge(props, newProps);
      this._makeSvg(el);
      this.makeScales();
      [xScale, yScale] = buildScales(props.axis);
      this.makeGrid();
      container = svg
        .append<SVGElement>('g')
        .attr('class', 'linechart-container');

      lineContainer = container
        .append<SVGElement>('g')
        .attr('class', 'line-container');
      this._createLines(props.data);
      this.update(el, props);
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
      // Reference to svg element containing chart
      svg = select(el).append('svg')
      this.sizeSVG();

      const r = makeTip(props.tipContainer, tipContainer);
      tipContent = r.tipContent;
      tipContainer = r.tipContainer;
    },

    sizeSVG() {
      const { margin, width, height, className } = props;
      const scale = {
        x: 1 - (margin.left / Number(width)),
        y: 1 - (margin.top / Number(height)),
      };
      svg.attr('class', className)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top}) scale(${scale.x},${scale.y})`);
    },

    /**
     * Iterate over the dataset drawing points for sets marked as
     * requiring points.
     */
    _drawDataPointSet(data: ILineChartProps['data']) {
      const { axis, tip } = props;
      const yAxisWidth = getYAxisWidth(axis);

      const pointContainer = container.selectAll<SVGElement, {}>('g').data(data);

      // Don't ask why but we must reference tipContentFn as props.tipContentFn otherwise
      // it doesn't update with props changes
      const onMouseOver = (d: ILineChartDataSet<any>, i: number) => {
        tipContent.html(() => props.tipContentFn([d as any], 0, 0, ''));
        tip.fx.in(tipContainer);
      };
      const points = pointContainer.enter()
        .append<SVGElement>('g')
        .attr('class', (d, i: number) => 'point-container' + i)
        .merge(pointContainer)
        .selectAll<SVGElement, {}>('circle')
        .data((d) => {
          return d.data.map((dx) => ({
            ...dx,
            point: d.point,
          }));
        });

      // UPDATE - Update old elements as needed.
      points.attr('class', 'update');

      // ENTER + UPDATE
      // After merging the entered elements with the update selection,
      // apply operations to both.
      points.enter().append<SVGElement>('circle')
        .attr('class', 'enter')
        .on('mouseover', (d, i) => {
          tipContent.html(() => props.tipContentFn([d as any], 0, 0, ''));
          tip.fx.in(tipContainer);
        })
        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', () => tip.fx.out(tipContainer))
        .merge(points)
        .attr('class', 'point')
        .attr('cy', (d) => yScale(d.y))
        .attr('r', (d, i: number) => 0)
        .attr('fill', (d) => d.point.fill)
        .attr('stroke', (d) => d.point.stroke)
        .attr('cx', (d) => {
          return xScale(d.x) + yAxisWidth;
        })
        .transition()
        .duration(400)
        .attr('r', (d) => d.point.show ? d.point.radius : 0)
        .delay(650);

      // EXIT - Remove old elements as needed.
      pointContainer.exit().remove();
      points.exit().remove();
    },

    makeScales() {
      xAxisContainer = svg.append('g').attr('class', 'x-axis');
      yAxisContainer = svg.append('g').attr('class', 'y-axis');
    },

    /**
     * Draw the chart scales
     */
    _drawScales(data: ILineChartProps['data']) {
      // @TODO Grid not rendering down to x axis
      const { axis, height } = props;
      const w = gridWidth(props);
      let yDomain;
      let xDomain;
      const ys: any[] = [];
      const xs: any[] = [];
      const yAxis = axisLeft<number>(yScale).ticks(axis.y.ticks);

      const yTickSize = get(axis, 'y.tickSize', undefined);
      if (yTickSize !== undefined) {
        yAxis.tickSize(yTickSize);
      }
      if (shouldFormatTick(axis.y)) {
        yAxis.tickFormat(formatTick(axis.y));
      }

      const xAxis = axisBottom<number | string>(xScale)
        .ticks(axis.x.ticks);;

      if (shouldFormatTick(axis.x)) {
        xAxis.tickFormat(formatTick(axis.x));
      }

      const xAxisHeight = getXAxisHeight(axis);
      const yAxisWidth = getYAxisWidth(axis);

      data.forEach((datum) => {
        datum.data.forEach((d) => {
          let parsedY = d.y;
          let parsedX = d.x;
          if (axis.y.scale === 'LOG' && d.y === 0) {
            parsedY = ZERO_SUBSITUTE;
          }
          if (axis.x.scale === 'LOG' && d.x === 0) {
            parsedX = ZERO_SUBSITUTE;
          }
          ys.push((parsedY));
          xs.push((parsedX));
        });
      });
      yDomain = extent(ys);
      xDomain = extent(xs);
      // domain mustn't be 0 as log(0) gives Infinity. 1 lower domain gives better looking graphs
      if (axis.y.scale === 'LOG' && yDomain[0] === ZERO_SUBSITUTE) {
        yDomain[0] = 1;
      }
      if (axis.x.scale === 'LOG' && xDomain[0] === ZERO_SUBSITUTE) {
        xDomain[0] = 1;
      }
      xScale
        .domain(xDomain)
        .rangeRound([0, w]);

      yScale.domain(yDomain)
        .range([Number(height) - xAxisHeight, 0]);

      yAxisContainer
        .attr('transform', `translate(${yAxisWidth}, 0)`)
        .transition()
        .call(yAxis);

      xAxisContainer
        .attr('transform', `translate(${yAxisWidth},${(Number(height) - xAxisHeight)})`)
        .call(xAxis);

      attrs(svg.selectAll('.y-axis .domain, .y-axis .tick line'), axis.y.style);
      attrs(svg.selectAll('.y-axis .tick text'), axis.y.text.style as any);

      attrs(svg.selectAll('.x-axis .domain, .x-axis .tick line'), axis.x.style);
      attrs(svg.selectAll('.x-axis .tick text'), axis.x.text.style as any);
    },

    _createLines(data: Array<ILineChartDataSet<any>>) {
      data.forEach((d, i) => {
        lineContainer.append('path')
          .attr('class', `line-${i}`);
      });

      // change the line
      data
        .forEach((d, i) => {
          lineContainer.append('path')
            .attr('class', `fill-${i}`);

        });

    },

    /**
     * Iterate over data and update lines
     */
    _drawLines(data: Array<ILineChartDataSet<any>>) {
      const { axis } = props;
      const yAxisWidth = getYAxisWidth(axis);

      // change the line
      data.forEach((d, i) => {
        lineContainer.select(`.line-${i}`)
          .attr('fill', 'none')
          .attr('stroke-dashoffset', d.line.strokeDashOffset)
          .attr('stroke-dasharray', d.line.strokeDashOffset)
          .attr('stroke', d.line.stroke)
          .transition()
          .duration(500)
          .attr('d', curve(d.line.curveType, yAxisWidth, xScale, yScale)(d.data as any) as any)
          .delay(50);
      });
    },

    /**
     * Iterates ove data and updates area fills
     */
    drawAreas(data: Array<ILineChartDataSet<any>>) {
      const { axis, height } = props;
      const yAxisWidth = getYAxisWidth(axis);
      const xAxisHeight = getXAxisHeight(axis);
      const thisArea = (curveType) => area()
        .curve(curveType)
        .x((d: any) => xScale(d.x) + yAxisWidth)
        .y0((d) => Number(height) - xAxisHeight)
        .y1((d: any) => yScale(d.y));

      // change the line
      data
        .forEach((d, i) => {
          lineContainer.select(`.fill-${i}`)
            .attr('fill', d.line.fill.fill)
            .style('opacity', d.line.show && d.line.fill.show ? 1 : 0)
            .transition()
            .duration(500)
            .delay(50)
            .attr('d', thisArea(d.line.curveType)(d.data) as any)

            ;
        });
    },

    /**
     * Get a max count of values in each data set
     */
    valuesCount(data: ILineChartProps['data']): number {
      return data.reduce((a: number, b): number => {
        return b.data.length > a ? b.data.length : a;
      }, 0);
    },

    makeGrid() {
      gridX = svg.append('g')
        .attr('class', 'grid gridX');
      gridY = svg.append('g')
        .attr('class', 'grid gridY');
    },

    /**
     * Update chart
     */
    update(el: Element, newProps: DeepPartial<ILineChartProps>) {
      if (!newProps.data) {
        return;
      }
      merge(props, newProps);
      this.sizeSVG();
      [xScale, yScale] = buildScales(props.axis);
      let data = props.data;

      xParseTime = timeParse(props.axis.x.dateFormat);
      xFormatTime = timeFormat(props.axis.x.dateFormat);
      data = data.map((datum) => {
        if (props.axis.x.scale === 'TIME') {
          datum.data = datum.data.map((d) => {
            const newd = {
              ...d,
              x: typeof d.x === 'object'
                ? d.x
                : xParseTime(d.x.toString()),
            };
            return newd;
          });
        }
        // Assign in default line & point styles
        return Object.assign({}, datumProps, datum);
      });
      this._drawScales(data);
      this._drawLines(data);
      this.drawAreas(data);
      drawGrid(xScale, yScale, gridX, gridY, props, this.valuesCount(data));
      this._drawDataPointSet(data);
    },

    /**
     * Any necessary clean up
     */
    destroy(el: Element) {
      svg.selectAll('svg > *').remove();
    },
  };
  return LineChartD3;
});
