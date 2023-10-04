import { renderBox } from "./modules/renderBox.js";
import { renderBall } from "./modules/renderBall.js";
import { getNewColors } from "./modules/getNewColors.js";
import { getNumbsNewBoxes } from "./modules/getNumbsNewBoxes.js";
import { getDirection } from "./modules/getDirection.js";
import { renderNewBalls } from "./modules/renderNewBalls.js";
import { getLinesToRemove } from "./modules/getLinesToRemove.js";
import { renderNextBalls } from "./modules/renderNextBalls.js";
import { removeLines } from "./modules/removeLines.js";
import { checkAvailableGame } from "./modules/checkAvailableGame.js";
import { getSounds } from "./modules/getSounds.js";

const overlay = document.querySelector('.overlay');
const overlayInners = document.querySelectorAll('.overlay-inner');
const burger = document.querySelector('.burger-menu');
const menu = document.querySelector('.menu');
const rules = document.querySelector('.rules');
const bestBtn = document.querySelector('.best-btn');
const rulesBtn = document.querySelector('.rules-btn');
const newGameBtn = document.querySelector('.new-game-btn');
const gameOverBox = document.querySelector('.gameover');
const time = document.querySelector('.time');
const volumeBtn = document.querySelector('.volume-btn');
const volumeNonBtn = document.querySelector('.volume-non-btn');
const score = document.querySelector('.score-count');

const ballColors = ['#861F1C', '#f0f075', '#152D59', '#149cb8', '#d92626', '#8a0f4d', '#145F35'];
const numbOfCells = 9;
const sounds = getSounds();

let state, timeData, matrix, isWay, copyOfMatrix;

function initGame() {
  timeData = {
    timerId: null,
    min: 0,
    sec: 0,
    currMin: 0,
    currSec: 0, 
  }

  state = {
    nextColors: null,
    startPosition: null,
    endPosition: null,
    activeBall: null,
    count: 0,
    isPlaying: 'false',
    isVolume: false,
    emptyBoxes: 3
  }

  isWay = false;

  matrix = createMatrix();
  renderField(matrix);
  time.innerHTML = '00 : 00';
  score.innerHTML = '000';
  

}

initGame();
// overlay.classList.add('overlay-show');
// rules.classList.remove('hidden');


// let isWay = false;
// let copyOfMatrix;

// const timeData = {
//   timerId: null,
//   min: 0,
//   sec: 0,
//   currMin: 0,
//   currSec: 0, 
// }

// const state = {
//   nextColors: null,
//   startPosition: null,
//   endPosition: null,
//   activeBall: null,
//   count: 0,
//   isPlaying: false,
//   isVolume: false,
//   isOverlay: true,
//   duration: 180,
//   emptyBoxes: 3
// }

// const matrix = createMatrix();

// renderField();

function createMatrix() {
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

function renderField(matrix) {
  let field = document.querySelector('.field');
  field.innerHTML = '';
  for(let i = 0; i < numbOfCells; i++) {
    for (let j = 0; j < numbOfCells; j++) {
      const idBox = `${i}` + `${j}`;
      const box = renderBox(field, idBox, matrix, i, j);
      matrix[i][j].box = box;
      matrix[i][j].smallBall = box.firstChild;
      box.addEventListener('click', () => {
        clickOnEmptyBox(i, j);
      })
    }
  }
  renderNextBalls(state, ballColors);
}

const startBtn = document.querySelector('.start-btn');
startBtn.addEventListener('click', () => {
  // if(state.isVolume) {
  //   sounds.clickOnBall.play();
  // }'
  if(state.isPlaying === 'false') {
    console.log('clickstart');
    overlay.classList.remove('overlay-show');
    rules.classList.add('hidden');
    startBtn.innerHTML = 'Pause';
    state.isPlaying = 'true';
    // state.isOverlay = false;
    runTimer();
    nextStep();
  } else if (state.isPlaying === 'true') {
    console.log('pause149');
    state.isPlaying = 'pause';
    startBtn.innerHTML = 'Continue';
    overlay.classList.add('overlay-show');
    if (state.activeBall) {
      state.activeBall.classList.remove('active');
      state.startPosition = null;
    }
    clearInterval(timeData.timerId);
  } else if (state.isPlaying === 'pause') {
    startBtn.innerHTML = 'Pause';
    state.isPlaying = 'true';
    overlay.classList.remove('overlay-show');
    runTimer();
  }
  console.log('matrix1=', matrix);
})


function nextStep() {
  const gameOver = checkAvailableGame(matrix, state);
  console.log('gameover', gameOver);
  if(!gameOver) {
    renderNewBalls(numbOfCells, matrix, state, sounds);
    renderNextBalls(state, ballColors);
    setTimeout(() => {
      const gameOverX = checkAvailableGame(matrix, state);
      if (gameOverX) {
        onGameOver();
      }
    },500);
  } else {
    onGameOver();
  }  
}




function clickOnEmptyBox(i, j) {
  // console.log('start=', state.startPosition);
  // console.log('end=', state.endPosition);
  if(!state.startPosition) {
    // alert('нельзя');
    return;
  }
  if(!matrix[i][j].isBall) {
 
    matrix[i][j].isEnd = true;
    state.endPosition = `${i}` + `${j}`;
    
    isWay = false;
    copyOfMatrix = copyMatrix();
    findWay(+state.startPosition[0], +state.startPosition[1], i, j);
    if(isWay) {
      if(state.isVolume) {
        sounds.clikOnBox.play();
      }
      console.log('путь есть');
      moveBall(state.activeBall);
    } else {
      if(state.isVolume) {
        sounds.wrongBox.play();
      }
      console.log('пути нет');
    }
  } 
}

function copyMatrix() {
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

function findWay(a, b, c, d) {
  if (!isWay) {
    copyOfMatrix[a][b] = 1;

    if (a + 1 == c && b == d) {
      isWay = true;
    }
    if (a + 1 < numbOfCells && copyOfMatrix[a+1][b] == -1) {
      findWay(a+1,b,c,d);
    }

    if (a - 1 == c && b == d) {
      isWay = true;
    }
    if (a - 1 >= 0 && copyOfMatrix[a-1][b] == -1) {
      findWay(a-1,b,c,d);
    }

    if (a == c && b+1 == d) {
      isWay = true;
    }
    if (b + 1 < numbOfCells && copyOfMatrix[a][b+1] == -1) {
      findWay(a,b+1,c,d);
    }

    if (a == c && b-1 == d) {
      isWay = true;
    }
    if (b - 1 >= 0 && copyOfMatrix[a][b-1] == -1) {
      findWay(a,b-1,c,d);
    }
  }
}


function moveBall(ball) {
  ball.classList.remove('active');
  ball.classList.add('hide');
  ball.addEventListener('animationend', doAfterHiding);
  ball.addEventListener('animationend', doAfterShowing);

  function doAfterHiding(e) {
    if (e.animationName === 'hideBall') {
      // console.log('animationHide');
      ball.classList.remove('hide');
      ball.classList.add('show');
      matrix[+state.endPosition[0]][+state.endPosition[1]].box.append(ball);
      matrix[+state.endPosition[0]][+state.endPosition[1]].isBall = true;
      matrix[+state.endPosition[0]][+state.endPosition[1]].color = matrix[+state.startPosition[0]][+state.startPosition[1]].color;
      matrix[+state.endPosition[0]][+state.endPosition[1]].ball = ball;
    }
    ball.removeEventListener('animationend', doAfterHiding);  
  }

  function doAfterShowing(e) {
    if (e.animationName === 'showBall') {
      // console.log('animationShow');

      matrix[+state.startPosition[0]][+state.startPosition[1]].isBall = false;
      matrix[+state.startPosition[0]][+state.startPosition[1]].color = null;
      state.startPosition = null;
      console.log('color2 =',matrix[+state.endPosition[0]][+state.endPosition[1]].color); 
      const lines = getLinesToRemove(+state.endPosition[0],+state.endPosition[1],
                    matrix[+state.endPosition[0]][+state.endPosition[1]].color, matrix);
      // console.log( 'lines', lines);  

      if (lines.every((line) => line.length < 5)) {
        console.log('next step239');
        nextStep();        
      } else {
        removeLines(lines, state, matrix, sounds.removeLines);
      }  
      ball.classList.remove('show');
      ball.dataset.position = state.endPosition;
      ball.removeEventListener('animationend', doAfterShowing);
    }
  }
  console.log('matrix', matrix);
}


function runTimer() {
  timeData.timerId = setInterval(() => {
    if (timeData.sec === 59) {
      timeData.min += 1;
      timeData.sec = 0;
    } else {
      timeData.sec += 1;
    }
    
    timeData.currMin = (parseInt(timeData.min, 10) < 10 ? '0' : '') + timeData.min;
    timeData.currSec = (parseInt(timeData.sec, 10) < 10 ? '0' : '') + timeData.sec;
    time.innerHTML = `${timeData.currMin} : ${timeData.currSec}`;
    // if(timeData.min === 1) {
    //   gameOver();
    //   return;
    // }
  }, 1000);
}

volumeBtn.addEventListener('click', () => {
  volumeNonBtn.classList.remove('hidden');
  volumeBtn.classList.add('hidden');
  state.isVolume = !state.isVolume;
})

volumeNonBtn.addEventListener('click', () => {
  volumeBtn.classList.remove('hidden');
  volumeNonBtn.classList.add('hidden');
  state.isVolume = !state.isVolume;
})


function onGameOver() {
  clearInterval(timeData.timerId);
  overlay.classList.add('overlay-show');
  gameOverBox.classList.remove('hidden');
  gameOverBox.innerHTML = `
    <p class="gameover__title">GAME OVER!</p>
    <p class="gameover__time">Your time is ${time.innerHTML}</p>
    <p class="gameover__score">Your score is ${+state.count}</p>  
  `;
  
  overlay.addEventListener('transitionend', showGameOver);

  function showGameOver() {
    gameOverBox.classList.add('inner-show');
    overlay.removeEventListener('transitionend', showGameOver);
  }
  
  saveGame(); 
}

function saveGame() {
  let game = {
    timeMin: timeData.min, 
    timeSec: timeData.sec, 
    score: state.count
  }
  let games = JSON.parse(localStorage.getItem('gamesLine98'));
  // let games = localStorage.setItem('gamesLine98', JSON.stringify(games));
  if (!games) {
    games = [];
  }
  games.push(game);
  if(games.length > 10) {
    games.shift();
  }
  localStorage.setItem('gamesLine98', JSON.stringify(games));
}

burger.addEventListener('click', () => {
  startBtn.disabled = !startBtn.disabled;
  if(burger.classList.contains('open')) {
    burger.classList.remove('open');
    overlayInners.forEach((item) => {
      item.classList.add('hidden');
      item.classList.remove('inner-show');
    });
    if (state.isPlaying === 'true') { 
      runTimer(); 
    } 
    if (state.isPlaying === 'false' || state.isPlaying === 'true') {
      overlay.classList.remove('overlay-show');
    }
  } else {
    console.log('isplaying400', state.isPlaying);
    burger.classList.add('open');
    overlay.classList.add('overlay-show');
    menu.classList.remove('hidden');

    
    if(state.isPlaying === 'false') {
      rules.classList.add('hidden');
      setTimeout(() => {
        menu.classList.add('inner-show');
      },0)
    }
    if(state.isPlaying === 'true') {
      clearInterval(timeData.timerId);
      if (state.activeBall) {
        state.activeBall.classList.remove('active');
        state.startPosition = null;
        
      }
    }
    if(state.isPlaying === 'true' || state.isPlaying === 'pause') {
      console.log('isplaying417', state.isPlaying);
      setTimeout(() => {
        menu.classList.add('inner-show');
      },300)
    }
  }
})




  
  // startBtn.disabled = !startBtn.disabled;
  // if(state.isPlaying === false) {
  //   rules.classList.toggle('hidden');
  //   menu.classList.add('hidden');
  // }

  
  // 
  // rules.classList.toggle('hidden');
  
  
  // if (state.isPlaying === false && state.isOverlay === true) {
  //   overlayInners.forEach((item) => {
  //     item.classList.add('hidden');
  //   });
  //   menu.classList.remove('hidden');


  // } else if (state.isPlaying === true && state.isOverlay === false) {
  //   state.isPlaying = 'pause';
  //   state.isOverlay = true;
  //   startBtn.innerHTML = 'Continue';
  //   overlay.classList.add('overlay-show');
  //   state.activeBall.classList.remove('active');
  //   state.startPosition = null;
  //   clearInterval(timeData.timerId);

  // } else if (state.isPlaying === 'pause' && state.isOverlay === true) {
  //   menu.classList.toggle('hidden');
  // } 
 


newGameBtn.addEventListener('click', () => {
  console.log('newGameclick');
  clearInterval(timeData.timerId);
  initGame();
  burger.classList.remove('open');
  menu.classList.add('hidden');
  menu.classList.remove('inner-show');
  overlay.classList.remove('overlay-show');
  startBtn.disabled = false;
  startBtn.innerHTML = 'Start game';

})

