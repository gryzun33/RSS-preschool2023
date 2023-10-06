export function removeLines(lines, state, matrix, removeLinesSound) {
  // let countActiveBall = 0;
  let x = 0;
  console.log('lines3', lines);
  lines.forEach((arr) => {
    if (arr.length >= 5) {
      x = x + 1;
      state.count = state.count + arr.length - 1;
      setTimeout (() => {


        if (state.isVolume) {
          setTimeout(() => {
            removeLinesSound.currentTime = 0;
            removeLinesSound.play()
          }, 100);
        }
        // state.count = state.count + arr.length;
        arr.forEach((obj, i) => {
          let k = i;
          // if(obj.x === +state.endPosition[0] && obj.y === +state.endPosition[1]) {
          //   countActiveBall += 1;
          // }
          let ball = matrix[obj.x][obj.y].ball;
          if (ball) {
            setTimeout(() => {
              ball.classList.add('hide'); 
             }, (k+1) * 100);
             
             ball.addEventListener('animationend', () => {
             ball.remove();
             matrix[obj.x][obj.y].isBall = false;
             matrix[obj.x][obj.y].ball = null;
             matrix[obj.x][obj.y].color = null;
            //  state.count += 1;

            })
          }
        })





      }, (x - 1) * 500);





      



    }
  })
  // if(countActiveBall) {
    state.count = state.count + 1;
  // }  
  renderScore(state);
  // console.log('count=', state.count);
}

function renderScore(state) {
  const score = document.querySelector('.score-count');
  if (state.count < 10) {
    score.innerHTML = '00' + state.count;
  } else if (state.count >= 10 && state.count < 100) {
    score.innerHTML = '0' + state.count;
  } else {
    score.innerHTML = state.count;
  }
}