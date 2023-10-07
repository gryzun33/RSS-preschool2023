export function getNewColors(arrColors) {
  const newColors = [];
  for (let i = 0; i < 3; i++) {
    let numbColor = Math.floor(Math.random() * arrColors.length);
    newColors.push(arrColors[numbColor]);
  }
  return newColors;
}