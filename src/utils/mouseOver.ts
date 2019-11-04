import { ScaleOrdinal } from 'd3';
import { select } from 'd3-selection';

import {
  EColorManipulations,
  TipContentFn,
} from '../Histogram';
import { IGroupDataItem } from '../HistogramD3';

interface IProps {
  bins: string[],
  hover?: Partial<Record<EColorManipulations, number>>,
  colors: ScaleOrdinal<string, string>,
  tipContentFn: TipContentFn<string>,
  tipContent: any,
  tip: any,
  tipContainer: string,
  colourIndex?: string,
};

interface IMouseOutTipProps {
  tip: any,
  tipContainer: any,
}

interface IMouseOutProps extends IMouseOutTipProps {
  colors: ScaleOrdinal<string, string>,
}

export const onMouseOverAxis = (props: IProps) => (d: IGroupDataItem | any, i: number, nodes: any) => {
  const {
    bins,
    tipContentFn,
    tipContent,
    tip,
    tipContainer,
  } = props;
  const ix = bins.findIndex((b) => b === d.label);
  tipContent.html(() => tipContentFn(bins, ix, d.value || d));
  tip.fx.in(tipContainer);
};

export const onMouseOutAxis = (props: IMouseOutTipProps) => (d: IGroupDataItem | number, i: number, nodes: any) => {
  const { tip, tipContainer } = props;
  tip.fx.out(tipContainer);
}

export const onMouseOver = (props: IProps) => (d: IGroupDataItem | any, i: number, nodes: any) => {
  const {
    bins,
    hover,
    tipContentFn,
    tipContent,
    tip,
    tipContainer,
  } = props;
  const ix = bins.findIndex((b) => b === d.label);

  if (hover) {
    select(nodes[i])
      .attr('fill-opacity', 1)
      .transition('easeIn')
      .attr('fill-opacity', 0.7);
  }
  tipContent.html(() => tipContentFn(bins, ix, d.value || d));
  tip.fx.in(tipContainer);
};

export const onMouseOut = (props: IMouseOutProps) => (d: IGroupDataItem | number, i: number, nodes: any) => {
  const { tip, tipContainer, colors } = props;
  tip.fx.out(tipContainer);
  select(nodes[i])
    .attr('fill-opacity', 0.7)
    .transition('easeIn')
    .attr('fill-opacity', 1);
}
export const onClick = (onClick?: (v: any) => void) => (d: IGroupDataItem | number) => {
  if (onClick) {
    onClick(d);
  }
}