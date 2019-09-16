import { extent } from 'd3-array';
import {
  axisBottom,
  axisLeft,
} from 'd3-axis';
import { Selection } from 'd3-selection';
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
import mergeWith from 'lodash.mergewith';

import attrs from './d3/attrs';
import {
  drawGrid,
  gridHeight,
  gridWidth,
  yAxisWidth as getYAxisWidth,
} from './grid';
import { IChartAdaptor } from './Histogram';
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
  rangeAffordance,
  ticks,
} from './utils/domain';
import { buildScales } from './utils/scales';
import {
  makeGrid,
  makeScales,
  makeSvg,
  sizeSVG,
  TSelection,
} from './utils/svg';
import { DeepPartial } from './utils/types';

const ZERO_SUBSTITUTE: number = 1e-6;

export const lineChartD3 = ((): IChartAdaptor<ILineChartProps> => {
  let svg: TSelection;
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
    dataset: ILineChartDataSet,
    yAxisWidth: number,
    x,
    y,
  ) => line()
    .curve(dataset.line.curveType)
    .x((d: any) => x(d.x))
    .y((d: any) => y(d.y));

  let container: Selection<SVGElement, any, any, any>;
  let lineContainer: TSelection;
  let gridX: TSelection;
  let gridY: TSelection;
  let xScale: any; // AnyScale;
  let yScale: any; // AnyScale;
  let xAxisContainer: TSelection;
  let yAxisContainer: TSelection;
  let xAxisLabel: TSelection;
  let yAxisLabel: TSelection;

  const xOffset = (d: ILineChartDataSet) => {
    return d.point.show ? d.point.radius / 2 : 0;
  };

  const LineChartD3 = {
    /**
     * Initialization
     */
    create(el: Element, newProps: DeepPartial<ILineChartProps> = {}) {
      this.mergeProps(newProps);
      svg = makeSvg(el, svg);
      const { margin, width, height, className } = props;
      sizeSVG(svg, { margin, width, height, className });
      const r = makeTip(props.tipContainer, tipContainer);
      tipContent = r.tipContent;
      tipContainer = r.tipContainer;
      [xScale, yScale] = buildScales(props.axis);
      [xAxisContainer, yAxisContainer, xAxisLabel, yAxisLabel] = makeScales(svg);
      [gridX, gridY] = makeGrid(svg);
      const yAxisWidth = getYAxisWidth(props.axis);
      container = svg
        .append<SVGElement>('g')
        .attr('class', 'linechart-container')
        .attr('transform', `translate(${yAxisWidth}, 0)`)

      lineContainer = container
        .append<SVGElement>('g')
        .attr('class', 'line-container');
      this.update(el, props);
    },

    mergeProps(newProps: DeepPartial<ILineChartProps>) {
      const customerizer = (objValue, srcValue, key, object, source, stack) => {
        if (key === 'data') {
          return srcValue;
        }
      }
      mergeWith(props, newProps, customerizer);
    },

    /**
     * Iterate over the dataset drawing points for sets marked as
     * requiring points.
     */
    _drawDataPointSet(data: ILineChartProps['data']) {
      const { axis, tip, tipContentFn } = props;

      const pointContainer = container.selectAll<SVGElement, {}>('g').data(data);

      // Don't ask why but we must reference tipContentFn as props.tipContentFn otherwise
      // it doesn't update with props changes
      const onMouseOver = (d: any) => {
        tipContent.html(() => tipContentFn([d as any], 0, 0, ''));
        tip.fx.in(tipContainer);
      };
      const onMouseMove = () => tip.fx.move(tipContainer);
      const onMouseOut = () => tip.fx.out(tipContainer);

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
        .on('mouseover', onMouseOver)
        .on('mousemove', onMouseMove)
        .on('mouseout', onMouseOut)
        .merge(points)
        .attr('class', 'point')
        .attr('cy', (d) => yScale(d.y))
        .attr('r', (d, i: number) => 0)
        .attr('fill', (d) => d.point.fill)
        .attr('stroke', (d) => d.point.stroke)
        .attr('cx', (d) => {
          return xScale(d.x);
        })
        .transition()
        .duration(400)
        .attr('r', (d) => xOffset(d) * 2)
        .delay(650);

      // EXIT - Remove old elements as needed.
      pointContainer.exit().remove();
      points.exit().remove();
    },

    /**
     * Draw the chart axes
     */
    drawAxes() {
      const { axis, data } = props;
      const valuesCount = data.reduce((a: number, b): number => {
        return b.data.length > a ? b.data.length : a;
      }, 0)
      const w = gridWidth(props);
      const h = gridHeight(props);
      const ys: any[] = [];
      const xs: any[] = [];

      const yAxis = axisLeft<number>(yScale);
      const xAxis = axisBottom<number | string>(xScale);

      ticks({
        axis: xAxis,
        valuesCount,
        axisLength: w,
        axisConfig: axis.x,
        scaleBand: xScale,
        limitByValues: true,
      });

      ticks({
        axis: yAxis,
        valuesCount,
        axisLength: h,
        axisConfig: axis.y,
        scaleBand: yScale,
        limitByValues: true,
      });

      const yAxisWidth = getYAxisWidth(axis);

      data.forEach((datum) => {
        datum.data.forEach((d) => {
          let parsedY = d.y;
          let parsedX = d.x;
          if (axis.y.scale === 'LOG' && d.y === 0) {
            parsedY = ZERO_SUBSTITUTE;
          }
          if (axis.x.scale === 'LOG' && d.x === 0) {
            parsedX = ZERO_SUBSTITUTE;
          }
          ys.push(parsedY);
          xs.push(parsedX);
        });
      });
      const yDomain = rangeAffordance(extent(ys), axis.y);
      const xDomain = rangeAffordance(extent(xs), axis.x);

      xScale
        .domain(xDomain)
        .rangeRound([0, w]);
      yScale.domain(yDomain)
        .range([h, 0]);

      yAxisContainer
        .attr('transform', `translate(${yAxisWidth}, 0)`)
        .transition()
        .call(yAxis);

      xAxisContainer
        .attr('transform', `translate(${yAxisWidth + axis.y.style['stroke-width']},${h})`)
        .call(xAxis);

      attrs(svg.selectAll('.y-axis .domain, .y-axis .tick line'), axis.y.style);
      attrs(svg.selectAll('.y-axis .tick text'), axis.y.text.style as any);

      attrs(svg.selectAll('.x-axis .domain, .x-axis .tick line'), axis.x.style);
      attrs(svg.selectAll('.x-axis .tick text'), axis.x.text.style as any);
    },

    /**
     * Iterate over data and update lines
     */
    _drawLines(data: Array<ILineChartDataSet<any>>, oldData: Array<ILineChartDataSet<any>>) {

      // Remove old lines
      oldData.forEach((d, i) => {
        const keep = data.find(((newD) => newD.label === d.label));
        if (keep === undefined) {
          const l = d.label.replace(/[^a-z]/gi, '');
          lineContainer.select(`.line-${l}`)
            .remove();
        }
      })

      // change the line
      data.forEach((d, i) => {
        const selector = `line-${d.label.replace(/[^a-z]/gi, '')}`;
        let selection = lineContainer.select(`.${selector}`)
        if (selection.empty()) {
          lineContainer.append('path')
            .attr('class', selector);
          selection = lineContainer.select(`.${selector}`)
        }
        selection
          .attr('fill', 'none')
          .attr('stroke-dashoffset', d.line.strokeDashOffset)
          .attr('stroke-dasharray', d.line.strokeDashOffset)
          .attr('stroke', d.line.stroke)
          .transition()
          .duration(500)
          .attr('d', curve(d, xOffset(d), xScale, yScale)(d.data as any) as any)
          .delay(50);
      });
    },

    /**
       * Iterates ove data and updates area fills
       */
    drawAreas(data: Array<ILineChartDataSet<any>>, oldData: Array<ILineChartDataSet<any>>) {
      const h = gridHeight(props);
      const thisArea = (dataset: ILineChartDataSet) => area()
        .curve(dataset.line.curveType)
        .x((d: any) => xScale(d.x))
        .y0((d) => h)
        .y1((d: any) => yScale(d.y));

      // Remove old lines
      oldData.forEach((d, i) => {
        const keep = data.find(((newD) => newD.label === d.label));
        if (keep === undefined) {
          const l = d.label.replace(/[^a-z]/gi, '');
          lineContainer.select(`.fill-${l}`).remove();
        }
      })

      // change the line
      data
        .forEach((d, i) => {
          const selector = `fill-${d.label.replace(/[^a-z]/gi, '')}`;
          let selection = lineContainer.select(`.${selector}`);
          if (selection.empty()) {
            lineContainer.append('path')
              .attr('class', selector);
            selection = lineContainer.select(`.${selector}`)

          }
          selection
            .attr('fill', d.line.fill.fill)
            .style('opacity', d.line.show && d.line.fill.show ? 1 : 0)
            .transition()
            .duration(500)
            .delay(50)
            .attr('d', thisArea(d)(d.data) as any);
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

    /**
    * Update chart
     */
    update(el: Element, newProps: DeepPartial<ILineChartProps>) {
      if (!newProps.data) {
        return;
      }
      const oldData = [...props.data];
      this.mergeProps(newProps);
      const { margin, width, height, className } = props;
      sizeSVG(svg, { margin, width, height, className });
      [xScale, yScale] = buildScales(props.axis);
      let data = [...props.data];

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
      this.drawAxes();
      this._drawLines(data, oldData);
      this.drawAreas(data, oldData);
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
