export function checkAvailableGame(matrix) {

  let numbOfEpmtyBoxes = matrix.flat().filter((el) => !el.isBall);
  // console.log('emptys',numbOfEpmtyBoxes);
  if(numbOfEpmtyBoxes < 3) {
    return true;
  }
  return false;
}