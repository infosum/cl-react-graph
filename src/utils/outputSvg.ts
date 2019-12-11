import { select } from 'd3-selection';

export type TOutputType = 'png' | 'blob';
export interface IWatermark {
  svg: string;
  width: number;
  height: number;
}
// Method to combine an svg specified by id with the InfoSum watermark and 
// produce a blob or png output that can be used for download
export const outputSvg = (
  svgId: string,
  width: number,
  height: number,
  callback: (outpuData: string | Blob | null) => void,
  watermark: IWatermark,
  type: TOutputType = 'blob',
) => {
  // Select the first svg element
  const svg: any = select(`svg#${svgId}`);
  const serializer = new XMLSerializer();
  // generate IMG in new tab
  const svgStr = serializer.serializeToString(svg.node());
  const svgData = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgStr)));
  // create canvas in memory(not in DOM)
  const canvas = document.createElement('canvas');
  // set canvas size
  canvas.width = width + 20 + watermark.width;
  canvas.height = height + 20;
  // get canvas context for drawing on canvas
  const context = canvas.getContext('2d');
  // create images in memory(not DOM)
  var image = new Image();
  const watermarkImage = new Image();
  // when watermark loaded create main image
  watermarkImage.onload = () => {
    // later when image loads run this
    image.onload = () => {
      // clear canvas
      context!.clearRect(0, 0, canvas.width, canvas.height);
      // draw image with SVG data to canvas
      context!.drawImage(image, 10, 10, width, height);
      context!.drawImage(watermarkImage, canvas.width - watermark.width - 10, 10, watermark.width, watermark.height);
      // add a background
      context!.globalCompositeOperation = 'destination-over'
      context!.fillStyle = "#FFF";
      context!.fillRect(0, 0, canvas.width, canvas.height);
      // snapshot canvas as png or blob depending on type
      if (type === 'blob') {
        canvas.toBlob(callback);
      } else if (type === 'png') {
        const pngData = canvas.toDataURL('image/png');
        callback(pngData);
      }
    };
    // start loading SVG data into in memory image
    image.src = svgData;
  }
  // start loading watermark SVG data into memory
  watermarkImage.src = watermark.svg;
};
