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
  public svg: undefined | Selection<any, any, any, any>;
  public tipContainer: any;
  public tipContent: any;
  public abstract y: any;
  public abstract x: any;
  public xAnnotations = scaleBand();
  public innerScaleBand = scaleBand();
  public container: undefined | Selection<SVGElement, any, any, any>;
  public dataSets: IGroupData = [[]];
  public gridX: undefined | TSelection;
  public gridY: undefined | TSelection;
  public yAxisContainer: undefined | TSelection;
  public xAxisContainer: undefined | TSelection;
  public xAnnotationAxisContainer: undefined | TSelection;
  public yAnnotationAxisContainer: undefined | TSelection;
  public xAxisLabel: any;
  public yAxisLabel: undefined | Selection<SVGElement, any, any, any>;
  public percentBarLabel: any;
  public props: IHistogramProps = {
    annotations: [],
    axis: cloneDeep(defaultAxis),
    bar: {
      grouped: {
        paddingInner: 0.1,
        paddingOuter: 0,
      },
      overlayMargin: 5,
      paddingInner: 0,
      paddingOuter: 0,
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

  public create(el: Element, newProps: DeepPartial<IHistogramProps> = {}) {
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

  public mergeProps(newProps: DeepPartial<IHistogramProps>) {
    const { props } = this;

    const customerizer = (objValue: any, srcValue: any, key: any, object: any, source: any, stack: any) => {
      if (['data', 'colorScheme', 'annotations', 'annotationTextSize'].includes(key)) {
        return srcValue;
      }
    };
    mergeWith(props, newProps, customerizer);
  }

  /**
   * Update chart
   */
  public update(newProps: DeepPartial<IHistogramProps>) {
    const { props, svg } = this;
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

  public drawGrid() {
    const { props, x, y, gridX, gridY } = this;
    if (gridX && gridY) {
      drawGrid(x, y, gridX, gridY, props, maxValueCount(props.data.counts));
    }
  }

  public abstract updateChart(
    bins: string[],
    groupData: IGroupData,
  ): void;

  public abstract drawAxes(): void;

  /**
   * Any necessary clean up
   */
  public destroy() {
    this.svg?.selectAll('svg > *').remove();
  }
}
