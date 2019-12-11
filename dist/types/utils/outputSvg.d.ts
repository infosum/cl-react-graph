export declare type TOutputType = 'png' | 'blob';
export declare const outputSvg: (svgId: string, width: number, height: number, callback: (outpuData: string | Blob | null) => void, type?: TOutputType) => void;
