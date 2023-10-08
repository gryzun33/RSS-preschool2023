export function findWay(a, b, c, d, state, copyOfMatrix, numbOfCells) {
  if (!state.isWay) {
    copyOfMatrix[a][b] = 1;

    if (a + 1 == c && b == d) {
      state.isWay = true;
    }
    if (a + 1 < numbOfCells && copyOfMatrix[a+1][b] == -1) {
      findWay(a+1,b,c,d, state, copyOfMatrix, numbOfCells);
    }

    if (a - 1 == c && b == d) {
      state.isWay = true;
    }
    if (a - 1 >= 0 && copyOfMatrix[a-1][b] == -1) {
      findWay(a-1,b,c,d, state, copyOfMatrix, numbOfCells);
    }

    if (a == c && b+1 == d) {
      state.isWay = true;
    }
    if (b + 1 < numbOfCells && copyOfMatrix[a][b+1] == -1) {
      findWay(a,b+1,c,d, state, copyOfMatrix, numbOfCells);
    }

    if (a == c && b-1 == d) {
      state.isWay = true;
    }
    if (b - 1 >= 0 && copyOfMatrix[a][b-1] == -1) {
      findWay(a,b-1,c,d, state, copyOfMatrix, numbOfCells);
    }
  }
}