import {
  axisBottom,
  axisLeft,
} from 'd3-axis';
import {
  scaleBand,
  scaleLinear,
  scaleOrdinal,
} from 'd3-scale';
import { Selection } from 'd3-selection';
import merge from 'lodash/merge';

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
  EGroupedBarLayout,
  IChartAdaptor,
  IHistogramProps,
} from './Histogram';
import tips, { makeTip } from './tip';
import {
  barMargin,
  getBarWidth,
  groupedBarsUseSameXAxisValue,
  groupedMargin,
} from './utils/bars';
import {
  annotationAxisDefaults,
  axis as defaultAxis,
  grid,
} from './utils/defaults';
import {
  appendDomainRange,
  isStacked,
  maxValueCount,
  ticks,
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

export interface IGroupDataItem {
  label: string;
  groupLabel?: string;
  colorRef?: string; // String which can be used to return same colour value
  value: number;
  side?: 'left' | 'right'; // For Tornados
}

export type IGroupData = IGroupDataItem[][];

export const histogramD3 = ((): IChartAdaptor<IHistogramProps> => {
  let svg: Selection<any, any, any, any>;
  let tipContainer;
  let tipContent;
  const y = scaleLinear();
  const x = scaleBand();
  const xAnnotations = scaleBand();
  const innerScaleBand = scaleBand();
  let container: Selection<SVGElement, any, any, any>;
  let dataSets: IGroupData;
  let gridX: TSelection;
  let gridY: TSelection;
  let yAxisContainer: TSelection;
  let xAxisContainer: TSelection;
  let AnnotationAxisContainer: TSelection;
  let xAxisLabel: any;
  let yAxisLabel: any;
  let percentBarLabel: any;

  const props: IHistogramProps = {
    axis: defaultAxis,
    bar: {
      groupMargin: 0.1,
      margin: 0,
      overlayMargin: 5,
      width: 50,
    },
    className: 'histogram-d3',
    colorScheme,
    annotations: [],
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
    grid,
    groupLayout: EGroupedBarLayout.GROUPED,
    height: 200,
    margin: {
      bottom: 0,
      left: 5,
      right: 0,
      top: 5,
    },
    showBinPercentages: [],
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

  const HistogramD3 = {
    /**
     * Initialization
     */
    create(el: Element, newProps: DeepPartial<IHistogramProps> = {}) {
      this.mergeProps(newProps);
      svg = makeSvg(el, svg);
      const { margin, width, height, className } = props;
      sizeSVG(svg, { margin, width, height, className });
      const r = makeTip(props.tipContainer, tipContainer);
      tipContent = r.tipContent;
      tipContainer = r.tipContainer;
      [gridX, gridY] = makeGrid(svg);
      [xAxisContainer, yAxisContainer, xAxisLabel, yAxisLabel, AnnotationAxisContainer] = makeScales(svg);
      container = svg
        .append<SVGElement>('g')
        .attr('class', 'histogram-container');

      this.update(el, newProps);
    },

    mergeProps(newProps: DeepPartial<IHistogramProps>) {
      merge(props, newProps);
      if (newProps.data) {
        props.data = newProps.data as IHistogramProps['data'];
      }
      if (newProps.colorScheme) {
        props.colorScheme = newProps.colorScheme;
      }
    },

    /**
     * Draw scales
     */
    drawAxes() {
      const { axis, bar, annotations, domain, groupLayout, stacked, data, margin, height } = props;
      const valuesCount = maxValueCount(data.counts);
      const w = gridWidth(props);
      const h = gridHeight(props);
      const dataLabels = data.counts.map((c) => c.label);

      x
        .domain(data.bins)
        .rangeRound([0, w])
        .paddingInner(groupedMargin(bar));

      innerScaleBand
        .domain(groupedBarsUseSameXAxisValue({ groupLayout, stacked }) ? ['main'] : dataLabels)
        .rangeRound([0, x.bandwidth()])
        .paddingInner(barMargin(props.bar));

      const xAxis = axisBottom<string>(x);
      const yAxis = axisLeft<number>(y);

      /** X-Axis (label axis) set up */
      ticks({
        axis: xAxis,
        valuesCount,
        axisLength: w,
        axisConfig: axis.x,
        scaleBand: x,
        limitByValues: true,
      });

      xAxisContainer
        .attr('transform', 'translate(' + (yAxisWidth(axis) + axis.y.style['stroke-width']) + ',' +
          (height - xAxisHeight(props.axis) - (margin.left * 2)) + ')')
        .call(xAxis);

      /** X-Axis 2 (bottom axis) for annoations if annotations data sent (and match bin length) */
      if (annotations && annotations.length === data.bins.length) {

        xAnnotations
          .domain(data.bins)
          .rangeRound([0, w])
          .paddingInner(groupedMargin(bar));

        const annotationAxis = axisBottom<string>(xAnnotations);

        ticks({
          axis: annotationAxis,
          valuesCount: annotations.length,
          axisLength: w,
          axisConfig: annotationAxisDefaults,
          scaleBand: xAnnotations,
          limitByValues: true,
        });
        // Override the default axis bin labels with the custom annotations 
        annotationAxis.tickFormat((d, i) => annotations[i].value);

        AnnotationAxisContainer
          .attr('transform', 'translate(' + (yAxisWidth(axis) + axis.y.style['stroke-width']) + ',' + (h + 14) + ')')
          .call(annotationAxis);

        // Annotation Axis styling
        attrs(svg.selectAll('.x-axis-top .domain, .x-axis-top .tick line'), axis.x.style);
        attrs(svg.selectAll('.x-axis-top .tick text'), axis.x.text.style as any);

        // Style the annotations with their specific color
        AnnotationAxisContainer
          .selectAll('g.tick')
          .select('text')
          .style('fill', (d, i) => annotations[i].color);
        // Hide the line for the annotations axis
        AnnotationAxisContainer.call(g => g.select(".domain").remove());

      }
      /** Y-Axis (value axis) set up */
      appendDomainRange({
        data: dataSets,
        domain,
        range: [h, 0],
        scale: y,
        stacked: isStacked({ groupLayout, stacked })
      });

      ticks({
        axis: yAxis,
        valuesCount,
        axisLength: w,
        axisConfig: axis.y,
        scaleBand: y,
      });

      yAxisContainer
        .attr('transform', 'translate(' + yAxisWidth(axis) + ', 0)')
        .transition()
        .call(yAxis);

      attrs(svg.selectAll('.y-axis .domain, .y-axis .tick line'), axis.y.style);
      attrs(svg.selectAll('.y-axis .tick text'), axis.y.text.style as any);

      attrs(svg.selectAll('.x-axis .domain, .x-axis .tick line'), axis.x.style);
      attrs(svg.selectAll('.x-axis .tick text'), axis.x.text.style as any);
    },

    /**
     * Draw a single data set into the chart
     */
    updateChart(
      bins: string[],
      groupData: IGroupData,
    ) {
      const { axis, annotations, data, height, width, margin, delay, duration, tip, groupLayout, showBinPercentages, stacked } = props;

      const stackedOffset = (d: IGroupDataItem, stackIndex: number): number => {
        const thisGroupData = groupData.find((gData) => {
          return gData.find((dx) => dx.label === d.label) !== undefined;
        });
        const oSet = thisGroupData ?
          thisGroupData
            .filter((_, i) => i < stackIndex)
            .reduce((prev, next) => prev + next.value, 0)
          : 0;
        const offset = isStacked({ groupLayout, stacked }) && stackIndex > 0
          ? oSet
          : 0;
        return y(d.value + offset);
      }

      const calculateXPosition = (d: IGroupDataItem, stackIndex: number, offset?: number): number => {
        const totalWidth = innerScaleBand.bandwidth();
        const barWidth = getBarWidth(stackIndex, props.groupLayout, props.bar, innerScaleBand);
        const overlaidXPos = (totalWidth / 2) - (barWidth / 2);
        const finalXPos = (props.groupLayout === EGroupedBarLayout.OVERLAID)
          ? overlaidXPos
          : Number(innerScaleBand(String(d.groupLabel)));
        return offset ? finalXPos + offset : finalXPos;
      }

      const colors = scaleOrdinal(props.colorScheme);
      const gHeight = gridHeight(props);

      const g = container
        .selectAll<SVGElement, {}>('g')
        .data(groupData);

      const bars = g.enter()
        .append<SVGElement>('g')
        .merge(g)
        .attr('transform', (d: any[]) => {
          let xd = x(d[0].label);
          if (xd === undefined) {
            xd = 0;
          }
          const xDelta = yAxisWidth(axis)
            + axis.y.style['stroke-width']
            + xd;
          return `translate(${xDelta}, 0)`;
        })

        .selectAll<SVGElement, {}>('rect')
        .data((d) => d);

      bars
        .enter()
        .append<SVGElement>('rect')
        .attr('height', 0)
        .attr('y', stackedOffset)
        .attr('class', 'bar')
        .on('click', onClick(props.onClick))
        .on('mouseover', onMouseOver({ bins, hover: props.bar.hover, colors, tipContentFn: props.tipContentFn, tipContent, tip, tipContainer }))
        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', onMouseOut({ tip, tipContainer, colors }))
        .merge(bars)
        .attr('x', (d: IGroupDataItem, i: number) => calculateXPosition(d, i))
        .attr('width', (d, i) => getBarWidth(i, props.groupLayout, props.bar, innerScaleBand))
        .attr('fill', (d, i) => colors(String(i)))
        .transition()
        .duration(duration)
        .delay(delay)
        .attr('y', stackedOffset)
        // Hide bar's bottom border
        .attr('stroke-dasharray',
          (d: IGroupDataItem, i): string => {
            const currentHeight = gHeight - (y(d.value));
            const barWidth = getBarWidth(i, props.groupLayout, props.bar, innerScaleBand);
            return `${barWidth} 0 ${currentHeight} ${barWidth}`;
          })
        .attr('height', (d: IGroupDataItem): number => gHeight - (y(d.value)));

      // We need to show the bar percentage splits if flag enabled
      if (showBinPercentages) {

        const percents = g.enter()
          .append<SVGElement>('g')
          .merge(g)
          .attr('transform', (d: any[]) => {
            let xd = x(d[0].label);
            if (xd === undefined) {
              xd = 0;
            }
            const xDelta = yAxisWidth(axis)
              + axis.y.style['stroke-width']
              + xd;
            return `translate(${xDelta}, 0)`;
          })

          .selectAll<SVGElement, {}>('text')
          .data((d) => d);

        percents
          .enter()
          .append<SVGElement>('text')
          .attr('class', 'percentage-label')
          .attr('y', stackedOffset)
          .data((d) => d)
          .merge(percents)
          .text((d, i) => {
            let total = 0;
            groupData.forEach((group) => total += group[i].value);
            const percentage = Math.round((d.value / total) * 100);
            return showBinPercentages[i] ? `${percentage}%` : '';
          })
          .style('text-anchor', 'middle')
          .style('font-size', '0.675rem')
          .attr('fill', (d, i) => colors(String(i)))
          .attr('x', (d: IGroupDataItem, i: number) => {
            const barWidthForOffset = getBarWidth(i, props.groupLayout, props.bar, innerScaleBand);
            return calculateXPosition(d, i, barWidthForOffset / 2);
          })
          .attr('dy', -2);
        percents.exit().remove();
      };
      bars.exit().remove();
      g.exit().remove();

      const xText = xAxisLabel
        .selectAll('text')
        .data([axis.x.label]);

      xText.enter().append('text')
        .attr('class', 'x-axis-label')
        .merge(xText)
        .attr('transform',
          'translate(' + (Number(width) / 2) + ' ,' +
          ((height - xAxisHeight(props.axis) - (margin.left * 2)) + axis.x.margin) + ')')
        .style('text-anchor', 'middle')
        .text((d) => d);

      const yText = yAxisLabel
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

    /**
     * Update chart
     */
    update(el: Element, newProps: DeepPartial<IHistogramProps>) {
      if (!newProps.data) {
        return;
      }
      this.mergeProps(newProps);
      if (!props.data.bins) {
        return;
      }
      const { margin, width, height, className, data, visible } = props;
      sizeSVG(svg, { margin, width, height, className });
      dataSets = [];

      data.counts.forEach((count) => {
        count.data.forEach((value, i) => {
          if (!dataSets[i]) {
            dataSets[i] = [];
          }
          dataSets[i].push({
            groupLabel: count.label,
            label: data.bins[i],
            value: visible[data.bins[i]] !== false && visible[count.label] !== false ? value : 0,
          });
        });
      });

      this.drawAxes();
      drawGrid(x, y, gridX, gridY, props, maxValueCount(data.counts));
      this.updateChart(data.bins, dataSets);
    },

    /**
     * Any necessary clean up
     */
    destroy(el: Element) {
      svg.selectAll('svg > *').remove();
    },
  };
  return HistogramD3;
});
