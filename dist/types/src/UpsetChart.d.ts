import { TLabelComponent } from './components/Label';
export type TUpsetData = {
    keys: string[];
    value: number;
}[];
export type Props = {
    colorScheme?: string[];
    data: TUpsetData;
    height: number;
    hoverColorScheme?: string[];
    showLabels?: boolean[];
    visible?: Record<string, boolean>;
    width: number;
    xAxisHeight?: number;
    yAxisWidth?: number;
    textFill?: string;
    distribution?: {
        colorScheme: string[];
        fill: {
            active: string;
            inactive: string;
        };
        label?: string;
    };
    setSize?: {
        dimensions: {
            chartWidth: number;
            axisWidth: number;
            height: number;
        };
        label?: string;
        colorScheme: string[];
        LabelComponent?: TLabelComponent;
    };
    axisSpace?: number;
    radius?: number;
    /** @description accessible title */
    title: string;
    /** @description accessible description */
    description: string;
};
export declare const UpsetChart: ({ data, width, height, setSize, axisSpace, textFill, radius, distribution, title, description, }: Props) => JSX.Element;
