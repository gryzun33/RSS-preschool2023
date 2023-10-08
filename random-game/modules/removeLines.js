export function removeLines(lines, state, matrix, removeLinesSound, blockField) {
  let x = 0;
  let countOfBalls = 0;
  lines.forEach((arr) => {
    if (arr.length >= 5) {
      x = x + 1;
      countOfBalls += arr.length;
      state.count = state.count + arr.length - 1;
      setTimeout (() => {
        if (state.isVolume) {
          setTimeout(() => {
            removeLinesSound.currentTime = 0;
            removeLinesSound.play();
          }, 100);
        }
        arr.forEach((obj, i) => {
          let k = i;
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
            })
          }
        })
      }, (x - 1) * 500);
    }
  })
  setTimeout (() => {
    console.log ('countofballs', countOfBalls);
    blockField.classList.add('hidden');
  }, (countOfBalls + 1) * 100 );
  state.count = state.count + 1;
  renderScore(state);
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