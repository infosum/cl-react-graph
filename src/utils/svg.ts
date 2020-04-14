import {
  select,
  Selection,
} from 'd3-selection';

import { IMargin } from '../Histogram';

export type TSelection = Selection<any, any, any, any>;
export type TTextSelection = Selection<SVGTextElement, any, any, any>;

interface ISizeProps {
  margin: IMargin;
  width: number | string;
  height: number | string;
  className: string;
}

export const makeSvg = (el: Element, svg: TSelection | undefined, svgId?: string): TSelection => {
  if (svg) {
    svg.selectAll('svg > *').remove();
    svg.remove();
    const childNodes = el.getElementsByTagName('svg');
    if (childNodes.length > 0) {
      el.removeChild(childNodes[0]);
    }
  }
  // Reference to svg element containing chart
  svg = select(el).append('svg');
  // If svg id passed in (for download target) then assign it
  if (svgId) {
    svg.attr('id', svgId);
  }
  return svg;
}

export const sizeSVG = (svg: TSelection | undefined, props: ISizeProps) => {
  if (!svg) {
    return;
  }
  const { margin, width, height, className } = props;
  svg.attr('class', className)
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
};

export const makeGrid = (svg: TSelection): [TSelection, TSelection] => {
  const gridX = svg.append('g')
    .attr('class', 'grid gridX');
  const gridY = svg.append('g')
    .attr('class', 'grid gridY');
  return [gridX, gridY];
}

export const makeScales = (svg: TSelection): [TSelection, TSelection, TSelection, TSelection, TSelection, TSelection] => {
  return [
    svg.append('g').attr('class', 'x-axis'),
    svg.append('g').attr('class', 'y-axis'),
    svg.append('g'),
    svg.append('g'),
    svg.append('g').attr('class', 'x-axis-bottom'),
    svg.append('g').attr('class', 'y-axis-left'),
  ];
};
