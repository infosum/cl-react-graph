import { scaleOrdinal } from "d3-scale";
import React from "react";

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
  const start = schemeItem.stops[0].stopColor.replace(/[\W_]+/g, "");
  const end = schemeItem.stops[schemeItem.stops.length - 1].stopColor.replace(
    /[\W_]+/g,
    ""
  );
  return `gradient-${start}-${end}`;
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
  return (
    <linearGradient
      id={getGradientId(gradient)}
      gradientTransform={gradient.gradientTransform ?? ""}
    >
      {gradient.stops.map((stop) => (
        <stop key={stop.offset} {...stop} />
      ))}
    </linearGradient>
  );
};

export const getSchemeItem = (scheme: ColorScheme, index: number) => {
  const i = index < scheme.length ? index : index % scheme.length;
  return scheme[i];
};
