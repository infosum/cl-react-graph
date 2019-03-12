import { FeatureCollection } from 'geojson';
import { Component } from 'react';
import { IChartState } from './Histogram';
import { DeepPartial } from './utils/types';
export interface IMapProps {
    className: string;
    data: any;
    geojson: FeatureCollection<any, any>;
    height: number;
    width: number | string;
}
/**
 * Map component
 */
declare class Map extends Component<DeepPartial<IMapProps>, IChartState> {
    private chart;
    private ref;
    /**
     * Constructor
     */
    constructor(props: DeepPartial<IMapProps>);
    /**
     * Handle the page resize
     */
    private handleResize;
    /**
     * Component mounted
     */
    componentDidMount(): void;
    /**
     * Component updated
     */
    componentDidUpdate(): void;
    /**
     * Get the chart state
     */
    getChartState(): DeepPartial<IMapProps>;
    /**
     * Component will un mount, remove the chart and
     * any event listeners
     */
    componentWillUnmount(): void;
    /**
     * Get the chart's dom node
     */
    private getDOMNode;
    /**
     * Render
     */
    render(): JSX.Element;
}
export default Map;
