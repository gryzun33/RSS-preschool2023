import { renderBox } from "./modules/renderBox.js";
import { renderNewBalls } from "./modules/renderNewBalls.js";
import { getLinesToRemove } from "./modules/getLinesToRemove.js";
import { renderNextBalls } from "./modules/renderNextBalls.js";
import { removeLines } from "./modules/removeLines.js";
import { checkAvailableGame } from "./modules/checkAvailableGame.js";
import { getSounds } from "./modules/getSounds.js";
import { createMatrix } from "./modules/createMatrix.js";
import { copyMatrix } from "./modules/copyMatrix.js";

const overlay = document.querySelector('.overlay');
const overlayInners = document.querySelectorAll('.overlay-inner');
const burger = document.querySelector('.burger-menu');
const menu = document.querySelector('.menu');
const rules = document.querySelector('.rules');
const best = document.querySelector('.best');
const bestBtn = document.querySelector('.best-btn');
const rulesBtn = document.querySelector('.rules-btn');
const newGameBtn = document.querySelector('.new-game-btn');
const gameOverBox = document.querySelector('.gameover');
const time = document.querySelector('.time');
const volumeBtn = document.querySelector('.volume-btn');
const volumeNonBtn = document.querySelector('.volume-non-btn');
const score = document.querySelector('.score-count');
const backBtn = document.querySelector('.back-menu');
const startBtn = document.querySelector('.start-btn');

const ballColors = ['#861F1C', '#f0f075', '#152D59', '#149cb8', '#d92626', '#8a0f4d', '#145F35'];
const numbOfCells = 9;
const sounds = getSounds();

let state, timeData, matrix, isWay, copyOfMatrix;

function initGame() {
  let volume = (typeof state === 'object' && state.isVolume) ? true : false;
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
    isPlaying: 'start',
    isVolume: volume,
    emptyBoxes: 3
  }

  isWay = false;

  matrix = createMatrix(numbOfCells);
  renderField(matrix);
  time.innerHTML = '00 : 00';
  score.innerHTML = '000';
}

initGame();

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

startBtn.addEventListener('click', () => {
  if (state.isPlaying === 'gameover') {
    initGame();
    startBtn.innerHTML = 'Pause';
    state.isPlaying = 'play';
    overlay.classList.remove('overlay-show');
    overlayInners.forEach((item) => {
      item.classList.add('hidden');
      item.classList.remove('inner-show');
    });
    runTimer();
    nextStep();
  } else if (state.isPlaying === 'start') {
    overlay.classList.remove('overlay-show');
    rules.classList.add('hidden');
    startBtn.innerHTML = 'Pause';
    state.isPlaying = 'play';
    runTimer();
    nextStep();
  } else if (state.isPlaying === 'play') {
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
    state.isPlaying = 'play';
    overlay.classList.remove('overlay-show');
    runTimer();
  }
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
  if(!state.startPosition) {
    return;
  }
  if(!matrix[i][j].isBall) {
    matrix[i][j].isEnd = true;
    state.endPosition = `${i}` + `${j}`;    
    isWay = false;
    copyOfMatrix = copyMatrix(matrix);
    findWay(+state.startPosition[0], +state.startPosition[1], i, j);
    if(isWay) {
      if(state.isVolume) {
        sounds.clikOnBox.currentTime = 0;
        sounds.clikOnBox.play();
      }
      moveBall(state.activeBall);
    } else if (state.isVolume) { 
        sounds.wrongBox.currentTime = 0;
        sounds.wrongBox.play();      
    }
  } 
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

      matrix[+state.startPosition[0]][+state.startPosition[1]].isBall = false;
      matrix[+state.startPosition[0]][+state.startPosition[1]].color = null;
      state.startPosition = null;
      console.log('color2 =',matrix[+state.endPosition[0]][+state.endPosition[1]].color); 
      const lines = getLinesToRemove(+state.endPosition[0],+state.endPosition[1],
                    matrix[+state.endPosition[0]][+state.endPosition[1]].color, matrix);

      if (lines.every((line) => line.length < 5)) {
        nextStep();        
      } else {
        removeLines(lines, state, matrix, sounds.removeLines);
      }  
      ball.classList.remove('show');
      ball.dataset.position = state.endPosition;
      ball.removeEventListener('animationend', doAfterShowing);
    }
  }
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
  if (state.isVolume) {
    sounds.gameOver.currentTime = 0;
    sounds.gameOver.play();
  }
  clearInterval(timeData.timerId);
  state.isPlaying = 'gameover';
  startBtn.innerHTML = 'Start game';
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
  const fullTime = timeData.min * 60 + timeData.sec;
  let game = {
    timeMin: timeData.min, 
    timeSec: timeData.sec, 
    fullTime: fullTime,
    score: state.count
  }
  let games = JSON.parse(localStorage.getItem('gamesLine98'));
  if (!games) {
    games = [];
  }
  games.push(game);
  localStorage.setItem('gamesLine98', JSON.stringify(games));
}

burger.addEventListener('click', () => {
  startBtn.disabled = !startBtn.disabled;
   overlayInners.forEach((item) => {
      item.classList.add('hidden');
      item.classList.remove('inner-show');
    });
  if(burger.classList.contains('open')) {
    burger.classList.remove('open');

    if (state.isPlaying === 'gameover') {
      menu.classList.add('hidden');
    }
    
    if (state.isPlaying === 'play') { 
      runTimer(); 
    }

    if (state.isPlaying === 'start' || state.isPlaying === 'play') {
      overlay.classList.remove('overlay-show');
    }
    
  } else {
    burger.classList.add('open');
    overlay.classList.add('overlay-show');
    menu.classList.remove('hidden');
    
    if(state.isPlaying === 'gameover') {
      gameOverBox.classList.add('hidden');
      gameOverBox.classList.remove('inner-show');
      setTimeout(() => {
        menu.classList.add('inner-show');
      },0)
    }
    
    if(state.isPlaying === 'start') {
      rules.classList.add('hidden');
      setTimeout(() => {
        menu.classList.add('inner-show');
      },100)
    }

    if(state.isPlaying === 'play') {
      clearInterval(timeData.timerId);
      if (state.activeBall) {
        state.activeBall.classList.remove('active');
        state.startPosition = null;        
      }
    }

    if(state.isPlaying === 'play' || state.isPlaying === 'pause') {
      setTimeout(() => {
        menu.classList.add('inner-show');
      },300)
    }
  }
})

newGameBtn.addEventListener('click', () => {
  clearInterval(timeData.timerId);
  initGame();
  burger.classList.remove('open');
  menu.classList.add('hidden');
  menu.classList.remove('inner-show');
  overlay.classList.remove('overlay-show');
  startBtn.disabled = false;
  startBtn.innerHTML = 'Start game';
})

rulesBtn.addEventListener('click', () => {
  menu.classList.add('hidden');
  rules.classList.remove('hidden');
  backBtn.classList.remove('hidden');
});

bestBtn.addEventListener('click', () => {
  console.log('bestclick450');
  menu.classList.add('hidden');
  best.classList.remove('hidden');
  renderLastScores();
  backBtn.classList.remove('hidden');
})

backBtn.addEventListener('click', () => {
  overlayInners.forEach((item) => {
    item.classList.add('hidden');
  });
  menu.classList.remove('hidden');
}); 

function renderLastScores() {
  const lastTable = document.querySelector('.best-list');
  lastTable.innerHTML = `
    <tr>
      <th>N</th>
      <th>Score</th>
      <th>Time</th>
    </tr>
  `;
  let l = 0;
  const scores = JSON.parse(localStorage.getItem('gamesLine98'));
  if (scores) {
    scores.sort((a,b) => {
      if (b.score > a.score) return 1;
      if (a.score > b.score) return -1;
      return a.fullSec > b.fullTime ? 1 : -1;
    });
    l = (scores.length <= 10) ? scores.length : 10;
    for (let i = 0; i < l; i++) {
      const min = (scores[i].timeMin < 10) ? '0' + scores[i].timeMin : scores[i].timeMin;
      const sec = (scores[i].timeSec < 10) ? '0' + scores[i].timeSec : scores[i].timeSec;
      const time = `${min} : ${sec}`;
      const tableRow = document.createElement('tr');
      tableRow.innerHTML = `
        <td>${i+1}</td>
        <td>${scores[i].score}</td>
        <td>${time}</td>
      `;
      lastTable.append(tableRow);
    }
  }
  while (l < 10) {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td>${l+1}</td>
      <td>---</td>
      <td>---</td>
    `;
    lastTable.append(tableRow);
    l++;
  }
}