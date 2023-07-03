type OutputType = 'png' | 'blob';
type Watermark = {
    svg: string;
    width: number;
    height: number;
};
export declare const outputSvg: (svgId: string, width: number, height: number, callback: (outputData: string | Blob | null) => void, watermark?: Watermark, type?: OutputType) => void;
export {};
