/// <reference path="../interfaces.d.ts" />
/**
 * Apply style object to a d3 selection
 * @param {Object} selection D3 selection
 * @param {Object} style Css styling
 * @return {Object} selection
 */
export default (selection, style: ISVGLineStyle) => {
  Object.keys(style).forEach((k: string) => {
    selection.attr(k, style[k]);
  });
  return selection;
};
