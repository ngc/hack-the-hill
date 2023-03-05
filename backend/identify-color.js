const ColorDiff = require('color-diff');
import { colors } from './rgbColors'; 

// Define the target color
const targetColor = [0, 254, 250];

// Convert the target color to Lab format
const targetColorLab = ColorDiff.rgb_to_lab(targetColor);

// Find the nearest color using color-diff
let nearestColor = null;
let minDelta = Infinity;
for (const colorName in colors) {
  const colorRgb = colors[colorName];
  const colorLab = ColorDiff.rgb_to_lab(colorRgb);
  const deltaE = ColorDiff.diff(targetColorLab, colorLab);
  if (deltaE < minDelta) {
    minDelta = deltaE;
    nearestColor = colorName;
  }
}

console.log(`The nearest color to ${targetColor} is ${nearestColor}`);