export declare type TOutputType = 'png' | 'blob';
export interface IWatermark {
    svg: string;
    width: number;
    height: number;
}
export declare const outputSvg: (svgId: string, width: number, height: number, callback: (outpuData: string | Blob | null) => void, watermark: IWatermark, type?: TOutputType) => void;
