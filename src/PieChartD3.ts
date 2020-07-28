import 'd3-transition';

import { interpolate } from 'd3-interpolate';
import { scaleOrdinal } from 'd3-scale';
import {
  select,
  Selection,
} from 'd3-selection';
import {
  arc,
  Arc,
  pie,
  PieArcDatum,
} from 'd3-shape';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';

import colorScheme from './colors';
import {
  IChartAdaptor,
  IHistogramDataSet,
} from './Histogram';
import {
  IPieChartProps,
  IPieDataItem,
} from './PieChart';
import tips, { makeTip } from './tip';
import { onMouseOut } from './utils/mouseOver';
import { DeepPartial } from './utils/types';

interface IPieDataset {
  count: number;
  groupLabel: string;
  label: string;
}


// Function to calculate pie chart paths from data
const thisPie = pie()
  .sort(null)
  .value((d: any) => d.count);


const outerRadius = (props, setIndex = 0) => {
  const { donutWidth = 0, width, height } = props;

  const radius = Math.min(Number(width), height) / 2;
  return donutWidth === 0
    ? radius - 10
    : radius - 10 - (setIndex * (donutWidth + 10));
};

const innerRadius = (props, setIndex = 0) => {
  const { donutWidth = 0, width, height } = props;
  const radius = Math.min(Number(width), height) / 2;
  return donutWidth === 0
    ? 0
    : radius - 10 - donutWidth - (setIndex * (donutWidth + 10));
};

const getArc = (props, i: number) => {
  return arc()
    .outerRadius(outerRadius(props, i))
    .innerRadius(innerRadius(props, i));
}

export const pieChartD3 = ((): IChartAdaptor<IPieChartProps> => {

  let tipContainer;
  let tipContent;

  const props: IPieChartProps = {
    backgroundColor: '#ddd',
    className: 'piechart-d3',
    colorScheme,
    data: {
      bins: [],
      counts: [],
    },
    donutWidth: 0,
    height: 200,
    hover: {
      lighten: 0.1,
    },
    labels: {
      display: true,
      displayFn: (d) => d.value,
    },
    margin: {
      bottom: 0,
      left: 10,
      right: 0,
      top: 10,
    },
    tip: tips,
    tipContainer: 'body',
    tipContentFn: (bins: string[], i: number, d: number, groupLabel): string => {
      return groupLabel + ': ' + bins[i] + '<br />' + d;
    },
    visible: {},
    width: 200,
  };

  let containers: any[];
  let svg: Selection<any, any, any, any>;
  let dataSets: IPieDataset[][];
  let previousData: any;
  let storedWidth: number;
  let storedHeight: number;

  const PieChartD3 = {

    create(el: Element, newProps: DeepPartial<IPieChartProps> = {}) {
      merge(props, newProps);
      previousData = props.data.counts.map((set: IHistogramDataSet, setIndex: number) => {
        return set.data
          .map((count, i) => ({
            count,
            groupLabel: set.label,
            label: props.data.bins[i],
          }));
      });
      this._makeSvg(el);
      containers = [];
      previousData.forEach((dataSet, i) => {
        this.drawChartBg(i);
      });

      this.update(props);
    },

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

    update(newProps: DeepPartial<IPieChartProps>) {
      if (!props.data) {
        return;
      }
      merge(props, newProps);
      if (newProps.data) {
        props.data = cloneDeep(newProps.data) as IPieChartProps['data'];
      }
      if (props.colorScheme) {
        props.colorScheme = props.colorScheme;
      }
      if (!props.data.bins) {
        return;
      }

      this.drawCharts();
    },

    drawCharts() {
      const { data, visible } = props;
      dataSets = data.counts.map((set: IHistogramDataSet) => {
        return set.data
          .map((count, i) => ({
            count: visible[data.bins[i]] !== false ? count : 0,
            groupLabel: set.label,
            label: data.bins[i],
          }));
      });

      dataSets.forEach((dataSet, i) => {
        const theme = data.counts[i]?.colors ?? props.colorScheme;
        this.drawChart(dataSet, i, data.bins, theme);
        this.drawLabels(dataSet, i, data.bins, theme);
      });
      previousData = dataSets;
    },

    drawChartBg(i: number) {
      const { backgroundColor, width, height } = props;
      const tau = 2 * Math.PI; // http://tauday.com/tau-manifesto
      const bgArc = arc()
        .innerRadius(innerRadius(props, i))
        .outerRadius(outerRadius(props, i))
        .startAngle(0)
        .endAngle(tau);
      const container = svg
        .append('g')
        .attr('class', 'pie-bg');
      const background = container.append('path')
        .attr('class', 'pie-background')
        .style('fill', backgroundColor);
      background.enter()
        .attr('transform', 'translate(' + Number(width) / 2 + ',' + height / 2 + ')')
        .attr('d', bgArc);

      background.merge(background);

      if (!containers[i]) {
        svg
          .append('g')
          .attr('class', 'pie-container')

        svg
          .append('g')
          .attr('class', 'pie-labels')
        containers[i] = svg;
      }
    },

    drawChart(data, i: number, bins: string[], theme: string[]) {
      const { width, height, tip, tipContentFn, hover } = props;

      // Formatted pie chart arcs based on previous current data.
      // If data has changed length (i.e. swapping the entire dataset) use the new data.
      const prev = previousData[i].length === data.length
        ? previousData[i]
        : data;
      const arcs = thisPie(prev);
      const colors = scaleOrdinal(theme);
      // Set the domain to get consistent colours
      colors.domain(Array.from(new Array(data.length).keys()).map(s => s.toString()));

      // Stack multiple charts in concentric circles
      const thisArc = getArc(props, i);

      const path = containers[i].select('.pie-container').selectAll('path')
        .data(thisPie(data));

      path.enter()
        .append('path')
        .attr('transform', (d) => {
          return 'translate(' + Number(width) / 2 + ',' + height / 2 + ')';
        })
        .attr('stroke', '#FFF')
        .attr('fill', (_, j) => colors(j))
        .on('mouseover', (d: PieArcDatum<IPieDataItem>, ix: number, nodes: any[]) => {
          if (hover) {
            select(nodes[ix])
              .attr('fill-opacity', 1)
              .transition('easeIn')
              .attr('fill-opacity', 0.7);
          }
          tipContent.html(() => tipContentFn(bins, ix, d.data.count, d.data.groupLabel));
          tip.fx.in(tipContainer);
        })
        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', onMouseOut({ tip, tipContainer, colors }))
        .attr('d', thisArc)
        .style('opacity', 0)
        .transition()
        .duration(500)
        .style('opacity', 1);

      // Fade in when adding (merge)
      path
        .merge(path)
        .on('mouseover', (d: PieArcDatum<IPieDataItem>, ix: number, nodes: any[]) => {
          if (hover) {
            select(nodes[ix])
              .attr('fill-opacity', 1)
              .transition('easeIn')
              .attr('fill-opacity', 0.7);
          }
          tipContent.html(() => tipContentFn(bins, ix, d.data.count, d.data.groupLabel));
          tip.fx.in(tipContainer);
        })
        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', onMouseOut({ tip, tipContainer, colors }))
        .transition()
        .delay(400)
        .duration(500)
        .attrTween('d', arcTween(thisArc));

      path.exit().transition()
        .attrTween('d', arcTween(thisArc))
        .duration(500)
        .style('opacity', 0).remove();
    },

    drawLabels(data, i: number, bins: string[], theme: string[]) {
      const { labels, width, height } = props;
      const thisArc = getArc(props, i);
      const path2 = containers[i].select('.pie-labels').selectAll('text.label')
        .data(thisPie(data));
      path2.enter().append('text')
        .attr('class', 'label')
        .each(() => {
          // Store initial offset incase we change chart heights.
          storedHeight = height;
          storedWidth = Number(width);
        })
        .style('opacity', 0)
        .text((d, ix: number) => d.value === 0 ? '' : labels.displayFn(d, ix))
        .attr('transform', (d) => {
          const centroid = thisArc.centroid(d);
          const x = centroid[0] + (storedWidth / 2);
          const y = centroid[1] + (storedHeight / 2);
          return 'translate(' + x + ',' + y + ')';
        })
        .transition()
        .duration(500)
        .style('opacity', (d) => labels.display === false || d.value === 0 ? 0 : 1);

      path2
        .merge(path2)
        .transition()
        .duration(500)
        .style('opacity', 0)
        .transition()
        .attr('transform', (d) => {
          const centroid = thisArc.centroid(d);
          const x = centroid[0] + (storedWidth / 2);
          const y = centroid[1] + (storedHeight / 2);
          return 'translate(' + x + ',' + y + ')';
        })
        .text((d, ix: number) => d.value === 0 ? '' : labels.displayFn(d, ix))
        .transition()
        .duration(500)
        .style('opacity', (d) => {
          // Only show if the new value is not 0 and labels are set to be displayed
          return labels.display === false || d.value === 0 ? 0 : 1;
        });

      path2.exit().transition()
        .duration(500)
        .style('opacity', 0);
    },

    /**
     * Any necessary clean up
     */
    destroy() {
      svg.selectAll('svg > *').remove();
    },
  };

  return PieChartD3;
});

// Returns a tween for a transition’s "d" attribute, transitioning any selected
// arcs from their current angle to the specified new angle.
function arcTween(this: any, thisArc: Arc<any, any>) {
  return function (this: any, d) {
    const i = interpolate(this._current, d);
    this._current = i(0);
    return function (this: any, t) {
      return thisArc(i(t));
    };
  };
}
