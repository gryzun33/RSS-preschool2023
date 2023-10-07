export function getNumbsNewBoxes(l, matrix, emptyBoxesCount) {
  const numbs = [];
  while (numbs.length < emptyBoxesCount) {
    const row = Math.floor(Math.random() * l);
    const column = Math.floor(Math.random() * l);
    const position = `${row}` + `${column}`;
    if(matrix[row][column].isBall || numbs.some((el) => el === position)) {
      continue;
    } else {
      numbs.push(position);
    }
  }
  return numbs;
}

