import { shouldShowLabel } from "./barHelper";
import { ExtendedGroupItem } from "./Bars";

const item: ExtendedGroupItem = {
  binIndex: 0,
  datasetIndex: 0,
  label: "test",
  percentage: "3",
  groupLabel: "A",
  value: 3,
};
describe("barHelpers", () => {
  test("it shows by default", () => {
    expect(shouldShowLabel(item, {}, [])).toBe(true);
  });

  test("it hides if item.groupLabel not visible", () => {
    expect(shouldShowLabel(item, { A: false }, [])).toBe(false);
  });

  test("it hides if show labels for datasetIndex 0 is false", () => {
    expect(shouldShowLabel(item, {}, [false, true])).toBe(false);
  });

  test("it shows if show labels for datasetIndex 1 is true", () => {
    expect(
      shouldShowLabel({ ...item, datasetIndex: 1 }, {}, [false, true])
    ).toBe(true);
  });
});
