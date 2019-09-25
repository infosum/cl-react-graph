import { ScaleBand } from 'd3-scale';
import get from 'lodash.get';

import {
  EGroupedBarLayout,
  IHistogramBar,
} from '../Histogram';

export interface IGroupedProps {
    groupLayout: EGroupedBarLayout,
    stacked?: boolean;
}
export const groupedBarsUseSameXAxisValue = ({ groupLayout, stacked }: IGroupedProps): boolean => {
    return stacked || groupLayout === EGroupedBarLayout.STACKED || groupLayout === EGroupedBarLayout.OVERLAID;
};

export const barMargin = (bar: IHistogramBar): number => {
    const m = get(bar, 'margin', 0);
    return m >= 0 && m <= 1
        ? m
        : 0.1;
};

export const getBarWidth = (
    i: number,
    groupLayout: EGroupedBarLayout,
    bar: IHistogramBar,
    innerScaleBand: ScaleBand<string>,
) => {
    const overlay = (groupLayout === EGroupedBarLayout.OVERLAID)
        ? i * bar.overlayMargin * 2
        : 0;
    return innerScaleBand.bandwidth() - overlay;
};

export const groupedMargin = (bar: IHistogramBar): number => {
    const m = get(bar, 'groupMargin', 0.1);
    return m >= 0 && m <= 1
        ? m
        : 0.1;
}