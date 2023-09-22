export function getNumbsNewBoxes(l) {
  const numbs = [];
  while (numbs.length < 3) {
    const row = Math.floor(Math.random() * l);
    const column = Math.floor(Math.random() * l);
    const position = `${row}` + `${column}`;
    const box = document.getElementById(position);
    // console.log(box.lastElementChild.matches('.ball'));
    if (box.lastElementChild.matches('.ball') || numbs.some((el) => el === (`${row}` + `${column}`))) {
      continue;
    } else {
      numbs.push(`${row}` + `${column}`);
    }
  }
  return numbs;
}

// boxArray[row][column].isBall