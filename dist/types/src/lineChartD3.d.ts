import { IChartAdaptor } from './Histogram';
import { IChartPoint, ILineChartProps } from './LineChart';
export declare const lineChartD3: () => IChartAdaptor<ILineChartProps<IChartPoint<string | number | Date, number>>>;
