export function copyMatrix(matrix) {
  let copy = [];
  for(let i=0;i<9;i++){
    let copyRow = [];
    for(let j=0;j<9;j++){
      if(matrix[i][j].isBall) {
        copyRow.push(1);
      } else {
        copyRow.push(-1);
      }
    }
   copy.push(copyRow); 
  }
  return copy;
}