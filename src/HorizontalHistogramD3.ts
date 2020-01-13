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
import cloneDeep from 'lodash/cloneDeep';
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
  IAxis,
  IChartAdaptor,
  IHistogramProps,
} from './Histogram';
import {
  IGroupData,
  IGroupDataItem,
} from './HistogramD3';
import tips, { makeTip } from './tip';
import {
  getBarWidth,
  groupedBarsUseSameXAxisValue,
  groupedPaddingInner,
  groupedPaddingOuter,
  paddingInner,
  paddingOuter,
} from './utils/bars';
import {
  annotationAxisDefaults,
  axis as defaultAxis,
  grid as defaultGrid,
} from './utils/defaults';
import {
  appendDomainRange,
  formatTick,
  isStacked,
  maxValueCount,
  shouldFormatTick,
  ticks,
} from './utils/domain';
import {
  onClick,
  onMouseOut,
  onMouseOver,
  onMouseOverAxis,
} from './utils/mouseOver';
import {
  makeGrid,
  makeScales,
  makeSvg,
  sizeSVG,
  TSelection,
} from './utils/svg';
import { DeepPartial } from './utils/types';

export const horizontalHistogramD3 = ((): IChartAdaptor<IHistogramProps> => {
  let svg: Selection<any, any, any, any>;;
  let tipContainer;
  let tipContent;
  const x = scaleLinear();
  const y = scaleBand();
  const yAnnotations = scaleBand();
  const innerScaleBand = scaleBand();
  let container: Selection<SVGElement, any, any, any>;
  let dataSets: IGroupData;
  let gridX: TSelection;
  let gridY: TSelection;
  let yAxisContainer: TSelection;
  let xAxisContainer: TSelection;
  let xAxisLabel: TSelection;
  let yAxisLabel: TSelection;
  let xAnnotationAxisContainer: TSelection;
  let yAnnotationAxisContainer: TSelection;
  const props: IHistogramProps = {
    axis: cloneDeep(defaultAxis),
    bar: {
      grouped: {
        paddingInner: 0.1,
        paddingOuter: 0,
      },
      paddingInner: 0.1,
      paddingOuter: 1,
      overlayMargin: 5,
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
      const { id, margin, width, height, className } = props;
      svg = makeSvg(el, svg, id);
      sizeSVG(svg, { margin, width, height, className });
      const r = makeTip(props.tipContainer, tipContainer);
      tipContent = r.tipContent;
      tipContainer = r.tipContainer;
      [gridX, gridY] = makeGrid(svg);
      [xAxisContainer, yAxisContainer, xAxisLabel, yAxisLabel, xAnnotationAxisContainer, yAnnotationAxisContainer] = makeScales(svg);
      container = svg
        .append<SVGElement>('g')
        .attr('class', 'histogram-container');

      this.update(el, newProps);
    },

    /**
    * Draw Axes
    */
    drawAxes() {
      const { annotations, annotationTextSize, bar, data, domain, groupLayout, stacked, margin, width, height, axis, tip } = props;
      const valuesCount = maxValueCount(data.counts);
      const w = gridWidth(props);
      const h = gridHeight(props);
      const dataLabels = data.counts.map((c) => c.label);
      const annotationsEnabled = annotations && annotations.length === data.bins.length;

      y.domain(data.bins)
        .rangeRound([0, h])
        .paddingInner(paddingInner(bar))
        .paddingOuter(paddingOuter(bar));

      innerScaleBand
        .domain(groupedBarsUseSameXAxisValue({ groupLayout, stacked }) ? ['main'] : dataLabels)
        .rangeRound([0, y.bandwidth()])
        .paddingInner(groupedPaddingInner(bar))
        .paddingOuter(groupedPaddingOuter(bar));

      const xAxis = axisBottom<number>(x);
      const yAxis = axisLeft<string>(y);

      /** Y-Axis (label axis) set up */
      const axisYAnnotationAllowance: IAxis = {
        ...axis.y,
        tickSize: 30,
        style: {
          fill: 'none',
          stroke: 'none',
          opacity: 0,
          "shape-rendering": 'none',
          "stroke-opacity": 0,
          "stroke-width": 0,
          visible: false,
        },
        visible: false,
      }

      ticks({
        axis: yAxis,
        valuesCount,
        axisLength: h,
        axisConfig: annotationsEnabled ? axisYAnnotationAllowance : axis.y,
        scaleBand: y,
        limitByValues: true,
      });
      yAxisContainer
        .attr('transform', 'translate(' + yAxisWidth(axis) + ', ' + margin.top + ' )')
        .call(yAxis);

      // Add a tooltip to the y axis if a custom method has been sent
      const colors = scaleOrdinal(props.colorScheme);
      if (props.axisLabelTipContentFn) {
        yAxisContainer
          .selectAll('g.tick')
          .select('text')
          .on('mouseover', (onMouseOverAxis({ ...props.data, colors, tipContentFn: props.axisLabelTipContentFn, tipContent, tip, tipContainer })))
          .on('mousemove', () => tip.fx.move(tipContainer))
          .on('mouseout', () => tip.fx.out(tipContainer))
      }


      /** Y-Axis 2 (bottom axis) for annotations if annotations data sent (and match bin length) */
      if (annotations && annotations.length === data.bins.length) {

        yAxisContainer
          .selectAll('line')
          .style('opacity', 0)

        yAnnotations.domain(data.bins)
          .rangeRound([0, h])
          .paddingInner(paddingInner(bar))
          .paddingOuter(paddingOuter(bar));

        const annotationAxis = axisLeft<string>(yAnnotations);

        ticks({
          axis: annotationAxis,
          valuesCount: annotations.length,
          axisLength: h,
          axisConfig: annotationAxisDefaults,
          scaleBand: yAnnotations,
          limitByValues: true,
        });
        // Override the default axis bin labels with the custom annotations
        annotationAxis.tickFormat((d, i) => annotations[i].value);
        yAnnotationAxisContainer
          .attr('transform', 'translate(' + Number(yAxisWidth(axis)) + ', ' + margin.top + ' )')
          .call(annotationAxis);

        // Style the annotations with their specific color
        yAnnotationAxisContainer
          .selectAll('g.tick')
          .select('text')
          .style('font-size', annotationTextSize ? annotationTextSize : '0.475rem')
          .style('fill', (d, i) => annotations[i].color);

        // Hide the line for the annotations axis
        yAnnotationAxisContainer.call(g => g.select(".domain").remove());

      }

      /** X-Axis (value axis) set up */
      appendDomainRange({
        data: dataSets,
        domain,
        range: [0, Number(width) - (margin.top * 2) - axis.y.width],
        scale: x,
        stacked: isStacked({ groupLayout, stacked })
      })

      const xAxisY = height - xAxisHeight(props.axis) - margin.top;
      // Format number axis if format prop provided
      if (shouldFormatTick(axis.x)) {
        xAxis.tickFormat((v) => {
          const n = v.toString().replace('-', '');
          return String(formatTick(axis.x)(n));
        });
      }
      xAxisContainer
        .attr('transform', 'translate(' + yAxisWidth(axis) + ',' +
          xAxisY + ')')
        .call(xAxis);

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
      const { axis, height, margin, delay, duration, tip, groupLayout, showBinPercentages, stacked } = props;

      const stackedOffset = (d: IGroupDataItem, stackIndex: number) => {
        const thisGroupData = groupData.find((gData) => {
          return gData.find((dx) => dx.label === d.label) !== undefined;
        });
        const oSet = (thisGroupData || [])
          .filter((_, i) => i < stackIndex)
          .reduce((prev, next) => prev + next.value, 0);
        const isItStacked = isStacked({ groupLayout, stacked });
        const offset = isItStacked && stackIndex > 0
          ? oSet
          : 0;
        return isItStacked ? x(offset) : 0;
      }

      const calculateYPosition = (d: IGroupDataItem, stackIndex: number, offset: number, counts: number): number => {
        const totalWidth = innerScaleBand.bandwidth();
        const barWidth = getBarWidth(stackIndex, props.groupLayout, props.bar, innerScaleBand);
        const overlaidYPos = (totalWidth / 2) - (barWidth / 3) + (stackIndex === 1 ? 1 : 0)
        const finalYPos = (props.groupLayout === EGroupedBarLayout.OVERLAID || counts === 1)
          ? overlaidYPos
          : Number(innerScaleBand(String(d.groupLabel)));
        return offset ? finalYPos + offset : finalYPos;
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
        .attr('class', 'bar')
        .on('click', onClick(props.onClick))
        .on('mouseover', onMouseOver({ bins, hover: props.bar.hover, colors, tipContentFn: props.tipContentFn, tipContent, tip, tipContainer }))
        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', onMouseOut({ tip, tipContainer, colors }))
        .merge(bars)
        .attr('y', (d: IGroupDataItem, i: number) => calculateYPosition(d, i, 0, props.data.counts.length))
        .attr('height', (d, i) => getBarWidth(i, props.groupLayout, props.bar, innerScaleBand))
        .attr('fill', (d, i) => colors(String(i)))
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
        .attr('width', (d: IGroupDataItem): number => x(d.value));

      // We need to show the bar percentage splits if flag enabled
      if (showBinPercentages) {

        const percents = g.enter()
          .append<SVGElement>('g')
          .merge(g)
          .attr('transform', (d: any[], index: number) => {
            let yd = y(d[0].label);
            if (yd === undefined) {
              yd = 0;
            }
            const x = yAxisWidth(axis) + axis.x.style['stroke-width'];
            return `translate(${x}, ${(margin.top + yd)})`;
          })

          .selectAll<SVGElement, {}>('text')
          .data((d) => d);

        percents
          .enter()
          .append<SVGElement>('text')
          .attr('width', 0)
          .attr('x', 0)
          .attr('y', 0)
          .attr('dy', 0)
          .attr('dx', 0)
          .attr('class', 'percentage-label')
          .attr('x', stackedOffset)
          .text((d, i) => {
            // To show the correct percentage split we need to total all the other values in this count set
            const total = groupData.reduce((prev, group) => prev + group[i].value, 0);
            const percentage = d.value === 0 ? 0 : Math.round((d.value / total) * 100);
            return showBinPercentages[i] ? `${percentage}%` : '';
          })
          .data((d) => d)
          .style('text-anchor', 'middle')
          .style('font-size', '0.675rem')
          .attr('fill', (d, i) => colors(String(i)))
          .merge(percents)
          .attr('x', (d: IGroupDataItem): number => x(d.value) + 12) // 12 added to space the label away from the bar
          .attr('y', (d: IGroupDataItem, i: number) => {
            const barWidth = getBarWidth(i, props.groupLayout, props.bar, innerScaleBand);
            const overlaidOffset = props.bar.overlayMargin;
            return calculateYPosition(d, i, ((barWidth + overlaidOffset) / 2), props.data.counts.length);
          });
        percents.exit().remove();
      };

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

    mergeProps(newProps: DeepPartial<IHistogramProps>) {
      merge(props, newProps);
      if (newProps.data) {
        props.data = newProps.data as IHistogramProps['data'];
      }
      if (newProps.colorScheme) {
        props.colorScheme = newProps.colorScheme;
      }
      if (newProps.annotations) {
        props.annotations = newProps.annotations as IHistogramProps['annotations'];
      }
      if (newProps.annotationTextSize) {
        props.annotationTextSize = newProps.annotationTextSize as IHistogramProps['annotationTextSize'];
      }
    },
    /**
     * Update chart
     */
    update(el: Element, newProps: DeepPartial<IHistogramProps>) {
      if (!props.data) {
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
      drawHorizontalGrid({ x, y, gridX, gridY, props, ticks: maxValueCount(data.counts) });
      this.updateChart(data.bins, dataSets);
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
