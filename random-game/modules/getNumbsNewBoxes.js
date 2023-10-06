// export function getNumbsNewBoxes(l) {
//   const numbs = [];
//   while (numbs.length < 3) {
//     const row = Math.floor(Math.random() * l);
//     const column = Math.floor(Math.random() * l);
//     const position = `${row}` + `${column}`;
//     const box = document.getElementById(position);
//     if (box.lastElementChild.matches('.ball') || numbs.some((el) => el === (`${row}` + `${column}`))) {
//       continue;
//     } else {
//       numbs.push(`${row}` + `${column}`);
//     }
//   }
//   return numbs;
// }

export function getNumbsNewBoxes(l, matrix, emptyBoxesCount) {
  const numbs = [];
  while (numbs.length < emptyBoxesCount) {
    const row = Math.floor(Math.random() * l);
    const column = Math.floor(Math.random() * l);
    const position = `${row}` + `${column}`;
    // console.log('newposition', position);
    // console.log('is in matrix', matrix[row][column].isBall);
    if(matrix[row][column].isBall || numbs.some((el) => el === position)) {
      continue;
    } else {
      numbs.push(position);
    }
  }
  // console.log('numbs', numbs);
  return numbs;
}

