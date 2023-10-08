console.log(`
1. Вёрстка +10
  - реализован интерфейс игры +5
  - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам +10
3. Реализовано завершение игры при достижении игровой цели +10
4. По окончанию игры выводится её результат, например, количество ходов, время игры, набранные баллы, выигрыш или поражение и т.д +10
5. Есть таблица результатов, в которой сохраняются результаты 10 игр с наибольшим счетом (лучшим временем и т.п.) или просто 10 последних игр (хранится в local storage) +10
6. Анимации и звуки +10
7. Высокое качество оформления приложения +10
`);

import { renderBox } from "./modules/renderBox.js";
import { renderNewBalls } from "./modules/renderNewBalls.js";
import { getLinesToRemove } from "./modules/getLinesToRemove.js";
import { renderNextBalls } from "./modules/renderNextBalls.js";
import { removeLines } from "./modules/removeLines.js";
import { checkAvailableGame } from "./modules/checkAvailableGame.js";
import { getSounds } from "./modules/getSounds.js";
import { createMatrix } from "./modules/createMatrix.js";
import { copyMatrix } from "./modules/copyMatrix.js";
import { runTimer } from "./modules/runTimer.js";
import { renderBestScores } from "./modules/renderBestScores.js";
import { onGameOver } from "./modules/onGameOver.js";
import { findWay } from "./modules/findWay.js";

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
const blockField = document.querySelector('.block-field');

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
    emptyBoxes: 3,
    isWay: false,
  }

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

function nextStep() {
  const gameOver = checkAvailableGame(matrix, state);
  if(!gameOver) {
    renderNewBalls(numbOfCells, matrix, state, sounds, blockField);
    renderNextBalls(state, ballColors);
    setTimeout(() => {
      const gameOverX = checkAvailableGame(matrix, state);
      if (gameOverX) {
        onGameOver(state, timeData, sounds, time, overlay, startBtn, gameOverBox);
      }
    },500);
  } else {
    onGameOver(state, timeData, sounds, time, overlay, startBtn, gameOverBox);
  }  
}

function clickOnEmptyBox(i, j) {
  if(!state.startPosition) {
    return;
  }
  if(!matrix[i][j].isBall) {
    matrix[i][j].isEnd = true;
    state.endPosition = `${i}` + `${j}`;    
    state.isWay = false;
    copyOfMatrix = copyMatrix(matrix);
    findWay(+state.startPosition[0], +state.startPosition[1], i, j, state, copyOfMatrix, numbOfCells);
    if(state.isWay) {
      if(state.isVolume) {
        sounds.clikOnBox.currentTime = 0;
        sounds.clikOnBox.play();
      }
      moveBall(state.activeBall);
      return;
    } else if (state.isVolume) { 
      sounds.wrongBox.currentTime = 0;
      sounds.wrongBox.play();      
    }
  } 
}

function moveBall(ball) {
  blockField.classList.remove('hidden');
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
      const lines = getLinesToRemove(+state.endPosition[0],+state.endPosition[1],
                    matrix[+state.endPosition[0]][+state.endPosition[1]].color, matrix);

      if (lines.every((line) => line.length < 5)) {
        nextStep();        
      } else {
        removeLines(lines, state, matrix, sounds.removeLines, blockField);
      }  
      ball.classList.remove('show');
      ball.dataset.position = state.endPosition;
      ball.removeEventListener('animationend', doAfterShowing);
    }
  }
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
    runTimer(timeData, time);
    nextStep();
  } else if (state.isPlaying === 'start') {
    overlay.classList.remove('overlay-show');
    rules.classList.add('hidden');
    startBtn.innerHTML = 'Pause';
    state.isPlaying = 'play';
    runTimer(timeData, time);
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
    runTimer(timeData, time);
  }
})

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
      runTimer(timeData, time); 
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
  menu.classList.add('hidden');
  best.classList.remove('hidden');
  renderBestScores();
  backBtn.classList.remove('hidden');
})

backBtn.addEventListener('click', () => {
  overlayInners.forEach((item) => {
    item.classList.add('hidden');
  });
  menu.classList.remove('hidden');
}); 