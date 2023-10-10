export type Gradient = {
  gradientTransform?: string;
  stops: {offset: string, stopColor: string}[];
};

type ColorSchemeItem = string | Gradient;
export type ColorScheme = readonly ColorSchemeItem[]

export const isGradient = (scheme: string | Gradient): scheme is Gradient => scheme.hasOwnProperty('stops');

export const getFill = (schemeItem: ColorSchemeItem): string => {
  if (isGradient(schemeItem)) {
    console.log('get fille',  `url(#${getGradientId(schemeItem)})`)
    return `url(#${getGradientId(schemeItem)})`
  }
  return schemeItem;
}

export const getGradientId = (schemeItem: Gradient) => {
  const start = schemeItem.stops[0].stopColor.replace(/[\W_]+/g, '');
  const end = schemeItem.stops[schemeItem.stops.length -1].stopColor.replace(/[\W_]+/g, '');
return `gradient-${start}-${end}`
}
