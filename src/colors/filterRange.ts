import Color from 'color';

export default (colors) => {
  return colors.filter((value) => {
    try {
      const c = Color(value);
      const hsl = c.hsl().array();
      if (hsl.length > 3) {
        // remove alpha colours
        return false;
      }
      const luminosity = c.luminosity();
      return ((luminosity < 0.8 && luminosity > 0.1) && (hsl[2] < 200 && hsl[2] > 20)) // not too light
        ; // not too dark
    } catch (e) {
      return false;
    }
  })
    .filter((v, index, self) => self.indexOf(v) === index)
    .sort(() => Math.random() - 0.5);
};
