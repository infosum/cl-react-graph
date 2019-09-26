import { ScaleOrdinal } from 'd3';
import { EColorManipulations, TipContentFn } from '../Histogram';
import { IGroupDataItem } from '../HistogramD3';
interface IProps {
    bins: string[];
    hover?: Partial<Record<EColorManipulations, number>>;
    colors: ScaleOrdinal<string, string>;
    tipContentFn: TipContentFn<string>;
    tipContent: any;
    tip: any;
    tipContainer: string;
    colourIndex?: string;
}
interface IMouseOutProps {
    colors: ScaleOrdinal<string, string>;
    tip: any;
    tipContainer: any;
}
export declare const onMouseOver: (props: IProps) => (d: any, i: number, nodes: any) => void;
export declare const onMouseOut: (props: IMouseOutProps) => (d: number | IGroupDataItem, i: number, nodes: any) => void;
export declare const onClick: (onClick?: ((v: any) => void) | undefined) => (d: number | IGroupDataItem) => void;
export {};
