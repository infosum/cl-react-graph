import {
  Axis,
  axisBottom,
} from 'd3';
import {
  scaleBand,
  ScaleBand,
  scaleLinear,
  ScaleLinear,
  scaleOrdinal,
} from 'd3-scale';
import { Selection } from 'd3-selection';
import cloneDeep from 'lodash/cloneDeep';
import mergeWith from 'lodash/mergeWith';

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
  IAxis,
  IChartAdaptor,
  IHistogramProps,
} from './Histogram';
import tips, { makeTip } from './tip';
import {
  groupedBarsUseSameXAxisValue,
  groupedPaddingInner,
  groupedPaddingOuter,
  paddingInner,
  paddingOuter,
} from './utils/bars';
import {
  annotationAxisDefaults,
  axis as defaultAxis,
  grid,
} from './utils/defaults';
import {
  appendDomainRange,
  formatTick,
  isStacked,
  maxValueCount,
  shouldFormatTick,
  ticks,
} from './utils/domain';
import { onMouseOverAxis } from './utils/mouseOver';
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

export abstract class BaseHistogramD3 {
  svg: undefined | Selection<any, any, any, any>;
  tipContainer;
  tipContent;
  abstract y;
  abstract x;
  xAnnotations = scaleBand();
  innerScaleBand = scaleBand();
  container: undefined | Selection<SVGElement, any, any, any>;
  dataSets: IGroupData = [[]];
  gridX: undefined | TSelection;
  gridY: undefined | TSelection;
  yAxisContainer: undefined | TSelection;
  xAxisContainer: undefined | TSelection;
  xAnnotationAxisContainer: undefined | TSelection;
  yAnnotationAxisContainer: undefined | TSelection;
  xAxisLabel: any;
  yAxisLabel: undefined | Selection<SVGElement, any, any, any>;
  percentBarLabel: any;
  props: IHistogramProps = {
    axis: cloneDeep(defaultAxis),
    bar: {
      grouped: {
        paddingInner: 0.1,
        paddingOuter: 0,
      },
      paddingInner: 0,
      paddingOuter: 0,
      overlayMargin: 5,
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

  create(el: Element, newProps: DeepPartial<IHistogramProps> = {}) {
    const { props } = this;
    this.mergeProps(newProps);
    const { id, margin, width, height, className } = props;
    this.svg = makeSvg(el, undefined, id);
    sizeSVG(this.svg, { margin, width, height, className });
    const r = makeTip(this.props.tipContainer, this.tipContainer);
    this.tipContent = r.tipContent;
    this.tipContainer = r.tipContainer;
    [this.gridX, this.gridY] = makeGrid(this.svg);
    [
      this.xAxisContainer,
      this.yAxisContainer,
      this.xAxisLabel,
      this.yAxisLabel,
      this.xAnnotationAxisContainer,
      this.yAnnotationAxisContainer,
    ] = makeScales(this.svg);
    this.container = this.svg
      .append<SVGElement>('g')
      .attr('class', 'histogram-container');

    this.update(newProps);
  }

  mergeProps(newProps: DeepPartial<IHistogramProps>) {
    const { props } = this;

    const customerizer = (objValue, srcValue, key, object, source, stack) => {
      if (['data', 'colorScheme', 'annotations', 'annotationTextSize'].includes(key)) {
        return srcValue;
      }
    }
    mergeWith(props, newProps, customerizer);
  }

  /**
   * Update chart
   */
  update(newProps: DeepPartial<IHistogramProps>) {
    const { props, svg, x, y, gridX, gridY } = this;
    if (!newProps.data) {
      return;
    }
    this.mergeProps(newProps);
    if (!props.data.bins) {
      return;
    }

    const { margin, width, height, className, data, visible } = props;
    sizeSVG(svg, { margin, width, height, className });
    this.dataSets = [];

    data.counts.forEach((count) => {
      count.data.forEach((value, i) => {
        if (!this.dataSets[i]) {
          this.dataSets[i] = [];
        }
        this.dataSets[i].push({
          groupLabel: count.label,
          label: data.bins[i],
          value: visible[data.bins[i]] !== false && visible[count.label] !== false ? value : 0,
        });
      });
    });
    this.drawAxes();
    this.drawGrid();
    this.updateChart(data.bins, this.dataSets);
  }

  drawGrid() {
    const { props, svg, x, y, gridX, gridY } = this;
    drawGrid(x, y, gridX, gridY, props, maxValueCount(props.data.counts))
  }

  abstract updateChart(
    bins: string[],
    groupData: IGroupData,
  ): void;

  abstract drawAxes(): void;

  /**
   * Any necessary clean up
   */
  destroy() {
    this.svg?.selectAll('svg > *').remove();
  }
}
