import { IGroupDataItem } from "../HistogramD3";
import Color from 'color';
import {
  select,
} from 'd3-selection';
import { EColorManipulations } from "../Histogram";
import { ScaleOrdinal } from "d3";

interface IProps {
  bins: string[],
  hover?: Partial<Record<EColorManipulations, number>>,
  colors: ScaleOrdinal<string, string>,
  tipContentFn: any,
  tipContent: any,
  tip: any,
  tipContainer: any,
};

interface IMouseOutProps {
  colors: ScaleOrdinal<string, string>,
  tip: any,
  tipContainer: any,
}
export const onMouseOver = (props: IProps) => (d: IGroupDataItem | any, i: number, nodes: any) => {
  const {
    bins,
    hover,
    colors,
    tipContentFn,
    tipContent,
    tip,
    tipContainer,
  } = props;
  const ix = bins.findIndex((b) => b === d.label);
  // Initial color
  let color = Color(colors(String(i)));
  if (hover) {
    // Apply hover modifiers
    Object.keys(hover).forEach((key) => {
      if (color[key]) {
        color = color[key](hover![key]);
      }
    })
    select(nodes[i])
      .transition()
      .duration(250)
      .attr('fill', color.hsl().string());
  }
  tipContent.html(() => tipContentFn(bins, ix, d.value || d));
  tip.fx.in(tipContainer);
};

export const onMouseOut = (props: IMouseOutProps) => (d: IGroupDataItem | number, i: number, nodes: any) => {
  const {tip, tipContainer, colors} = props;
  tip.fx.out(tipContainer);
  select(nodes[i])
    .transition()
    .duration(250)
    .attr('fill', colors(String(i)));
}
export const onClick = (onClick?: (v: any) => void) => (d: IGroupDataItem | number) => {
  if (onClick) {
    onClick(d);
  }
}