export function createMatrix(numbOfCells) {
  let arr = [];
  for (let i = 0; i < numbOfCells; i++) {
    let row = []; 
    for (let j = 0; j < numbOfCells; j++) {
      let obj = {
        isBall: false,
        color: null,
        isStart: null,
        isEnd: null,
        id: `${i}` + `${j}`,
        ball: null,
        box: null
      }
      row.push(obj);
    }
    arr.push(row);
  }
  return arr;
}