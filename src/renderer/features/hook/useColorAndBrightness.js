import { useState } from 'react';

const useColorAndBrightness = (str) => {
  const generateColorFromString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let j = 0; j < 3; j++) {
      const value = (hash >> (j * 8)) & 0xff;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  };

  const getBrightness = (color) => {
    // Convert color to RGB
    const hex = color.replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => {
        return r + r + g + g + b + b;
      }
    );
    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const r = parseInt(rgb[1], 16);
    const g = parseInt(rgb[2], 16);
    const b = parseInt(rgb[3], 16);

    // Calculate brightness
    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  const [color, setColor] = useState(generateColorFromString(str));
  const [isLightColor, setIsLightColor] = useState(getBrightness(color) > 180);

  return { color, isLightColor };
};

export default useColorAndBrightness

