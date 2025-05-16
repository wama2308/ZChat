export const generateRandomColor = () => {
  // Generate random values for each color component (red, green, and blue)
  const r = Math.floor(Math.random() * 256); // Value between 0 and 255
  const g = Math.floor(Math.random() * 256); // Value between 0 and 255
  const b = Math.floor(Math.random() * 256); // Value between 0 and 255

  // Convert the values to hexadecimal format
  const colorHex = `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;

  return colorHex;
};

function componentToHex(component: number) {
  let hex = component.toString(16); // Convert to hexadecimal base

  // Make sure the component always has two digits
  if (hex.length === 1) {
    hex = `0${hex}`;
  }

  return hex;
}
