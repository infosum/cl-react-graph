import { FeatureCollection } from 'geojson';
import * as React from 'react';
import { IChartState } from './Histogram';
export interface IMapProps {
    className?: string;
    data: any;
    geojson: FeatureCollection<any, any>;
    height: number;
    width: number | string;
}
declare class Map extends React.Component<IMapProps, IChartState> {
    private chart;
    private ref;
    static defaultProps: Partial<IMapProps>;
    constructor(props: IMapProps);
    private handleResize;
    componentDidMount(): void;
    componentDidUpdate(): void;
    getChartState(): IMapProps;
    componentWillUnmount(): void;
    private getDOMNode;
    render(): JSX.Element;
}
export default Map;
