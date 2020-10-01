/**
  * Returns random color in RGB or RGBA format.
  * Based on this [random color generator](https://stackoverflow.com/questions/1484506/random-color-generator).
  * @param {Number} pastelIndex - Six levels of pastelIndex from 0 to 5, 0 being the darkest.
  * @param {Number} transparency - Color transparency from 0 to 1.
  */
export function getRandomColor(pastelIndex = 5, transparency?: number): string {
  const rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
  const mix = [pastelIndex * 51, pastelIndex * 51, pastelIndex * 51]; // 51 => 255/5
  const mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(x => Math.round(x / 2.0));
  return `rgb(${transparency ? `${mixedrgb.join(', ')}, ${transparency}` : mixedrgb.join(', ')})`;
}
