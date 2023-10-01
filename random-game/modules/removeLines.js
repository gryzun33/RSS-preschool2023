export function removeLines(lines, state, matrix) {
  let countActiveBall = 0;
  // console.log('lines', lines);
  lines.forEach((arr) => {
    if (arr.length >= 5) {
      state.count = state.count + arr.length;
      arr.forEach((obj, i) => {
        let k = i;
        if(obj.x === +state.endPosition[0] && obj.y === +state.endPosition[1]) {
          countActiveBall += 1;
        }
        let ball = matrix[obj.x][obj.y].ball;
        // console.log('ball', ball);
         setTimeout(() => {
          ball.classList.add('hide'); 
         }, (k+2) * 100);
         
         ball.addEventListener('animationend', () => {
         ball.remove();
         matrix[obj.x][obj.y].isBall = false;
         matrix[obj.x][obj.y].ball = null;
         matrix[obj.x][obj.y].color = null;
        })
      })
    }
  })
  if(countActiveBall) {
    state.count = state.count - countActiveBall + 1;
  }  

  console.log('count=', state.count);
}