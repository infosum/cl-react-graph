import React from 'react';

export type Gradient = {
  gradientTransform?: string;
  stops: { offset: string; stopColor: string; stopOpacity?: number }[];
};

export type ColorSchemeItem = string | Gradient;
export type ColorScheme = readonly ColorSchemeItem[];

export const isGradient = (scheme: string | Gradient): scheme is Gradient =>
  scheme.hasOwnProperty("stops");

export const getFill = (schemeItem: ColorSchemeItem): string => {
  if (isGradient(schemeItem)) {
    return `url(#${getGradientId(schemeItem)})`;
  }
  return schemeItem;
};

export const getGradientId = (schemeItem: Gradient) => {
  // Strip out characters which would make an invalid id (keep alphanumeric & _)
  const parts = schemeItem.stops.map((item) =>
    item.stopColor.replace(/[\W_]+/g, "")
  );
  return `gradient-${parts.join("-")}`;
};

export const ColorSchemeDefs = ({ schemes }: { schemes: ColorScheme[] }) => {
  return (
    <defs>
      {schemes.map((scheme, i) => {
        return scheme.map((item, j) =>
          isGradient(item) ? (
            <GradientFill key={`${i}-${j}`} gradient={item} />
          ) : null
        );
      })}
    </defs>
  );
};

const GradientFill = ({ gradient }: { gradient: Gradient }) => {
  const id = getGradientId(gradient);
  return (
    <linearGradient
      data-testid={id}
      id={id}
      gradientTransform={gradient.gradientTransform ?? ""}
    >
      {gradient.stops.map((stop) => (
        <stop key={stop.offset} {...stop} />
      ))}
    </linearGradient>
  );
};
