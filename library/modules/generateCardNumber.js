
// generateCardNumber
export function generateCardNumber() {
  const minDec = parseInt('100000000', 16);
  const maxDec = parseInt('fffffffff', 16);
  const numb = Math.floor(Math.random() * (maxDec - minDec + 1)) + minDec;
  const numbToHex = numb.toString(16).toUpperCase();
  return numbToHex;
}