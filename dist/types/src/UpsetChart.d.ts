import { TLabelComponent } from './components/Label';
import { ColorScheme } from './utils/colorScheme';
export type TUpsetData = {
    keys: string[];
    value: number;
}[];
export type Props = {
    colorScheme?: ColorScheme;
    data: TUpsetData;
    height: number;
    hoverColorScheme?: ColorScheme;
    showLabels?: boolean[];
    visible?: Record<string, boolean>;
    width: number;
    xAxisHeight?: number;
    yAxisWidth?: number;
    textFill?: string;
    distribution?: {
        colorScheme: ColorScheme;
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
        colorScheme: ColorScheme;
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
