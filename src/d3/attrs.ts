import { ISVGLineStyle } from '../legacy/types';

/**
 * Apply style object to a d3 selection
 * @param {Object} selection D3 selection
 * @param {Object} style Css styling
 * @return {Object} selection
 */
export default (selection: any, style: ISVGLineStyle) => {
  (Object.keys(style) as (keyof ISVGLineStyle)[]).forEach((k) => {
    selection.attr(k, style[k]);
  });
  return selection;
};
