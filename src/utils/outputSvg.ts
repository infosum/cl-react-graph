import { select } from 'd3-selection';

export type TOutputType = 'png' | 'blob';

// Method to combine an svg specified by id with the InfoSum watermark and 
// produce a blob or png output that can be used for download
export const outputSvg = (
  svgId: string,
  width: number,
  height: number,
  callback: (outpuData: string | Blob | null) => void,
  type: TOutputType = 'blob',
) => {
  // Select the first svg element
  const svg: any = select(`svg#${svgId}`);
  const serializer = new XMLSerializer();
  // generate IMG in new tab
  const svgStr = serializer.serializeToString(svg.node());
  const watermark = require('../assets/Powered-By-InfoSum_DARK.svg') as string;
  const svgData = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgStr)));
  // create canvas in memory(not in DOM)
  const canvas = document.createElement('canvas');
  // set canvas size
  canvas.width = width + 200;
  canvas.height = height;
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
      context!.clearRect(0, 0, width + 20, height + 20);
      // draw image with SVG data to canvas
      context!.drawImage(image, 0, 0, width, height);
      context!.drawImage(watermarkImage, canvas.width - 200, 0, 200, 62);
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
  watermarkImage.src = watermark;
};
/* Alternate method for downloading image in new tab kept for reference
const downloadImage = (pngData) => {
  let w = window.open('about:blank');
  let image = new Image();
  image.src = pngData;
  setTimeout(function () {
    w!.document.write(image.outerHTML);
  }, 0);
}
*/
