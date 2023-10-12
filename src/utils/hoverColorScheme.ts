import { color } from "d3-color";

export const getHoverColorScheme = (colorScheme: readonly string[]) => {
  return colorScheme.map(
    (c) => color(c)?.brighter(0.1).toString(),
  ) as readonly string[];
};
