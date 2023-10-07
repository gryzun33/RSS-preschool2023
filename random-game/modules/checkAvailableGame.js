export function checkAvailableGame(matrix, state) {
  let numbOfEpmtyBoxes = matrix.flat().filter((el) => !el.isBall).length;
  if(numbOfEpmtyBoxes === 0) {
    return true;
  }
  if(numbOfEpmtyBoxes < 3) {
    state.emptyBoxes = numbOfEpmtyBoxes;
  }
  return false;
}