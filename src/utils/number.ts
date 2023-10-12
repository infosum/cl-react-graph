export const round = (num: number, precision: number) =>
  Number(Math.round((num + "e+" + precision) as any) + "e-" + precision);
