
import { Axes } from './utils/types';

export const gridHeight = (props: any): number => {
  const { height, margin, axis } = props;
  return height - (margin.top * 2) - xAxisHeight(axis);
};

export const yAxisWidth = (axis: Axes) => {
  return axis.y.label === ''
    ? axis.y.width
    : axis.y.width + 30;
};

export const xAxisHeight = (axis: Axes) => {
  return axis.x.label === ''
    ? axis.x.height
    : axis.x.height + 30 + (axis?.x?.margin ?? 0);
};

export const gridWidth = (props: any): number => {
  const { axis, width, margin } = props;
  return width - (margin.left * 2) - yAxisWidth(axis);
};
