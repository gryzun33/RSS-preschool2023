export function checkAvailableGame(matrix, state) {
  console.log('checkmatrix', matrix);
  let numbOfEpmtyBoxes = matrix.flat().filter((el) => !el.isBall).length;
  console.log('emptys',numbOfEpmtyBoxes);
  if(numbOfEpmtyBoxes === 0) {
    return true;
  }
  if(numbOfEpmtyBoxes < 3) {
    state.emptyBoxes = numbOfEpmtyBoxes;
  }
  return false;
}