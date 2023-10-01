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

const time = document.querySelector('.time');


const ballColors = ['#861F1C', '#f0f075', '#152D59', '#149cb8', '#d92626', '#8a0f4d', '#145F35'];
const numbOfCells = 9;
let isWay = false;

let timeData = {
  timerId: null,
  min: 0,
  sec: 0,
  currMin: 0,
  currSec: 0, 
}



const state = {
  nextColors: null,
  startPosition: null,
  endPosition: null,
  activeBall: null,
  count: 0,
  isPlaying: false,
}

let matrix = createMatrix();
let copyOfMatrix;
renderField();

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

function renderField() {
  let field = document.querySelector('.field');
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
  if(state.isPlaying === false) {
    startBtn.innerHTML = 'Pause';
    state.isPlaying = true;
    runTimer();
    nextStep();
  } else if (state.isPlaying === true) {
    state.isPlaying = 'pause';
    startBtn.innerHTML = 'Continue';
    clearInterval(timeData.timerId);
  } else if (state.isPlaying === 'pause') {
    startBtn.innerHTML = 'Pause';
    state.isPlaying = true;
    runTimer();
  }
  console.log('matrix1=', matrix);
})


function nextStep() {
  const gameOver = checkAvailableGame(matrix);
  if(!gameOver) {
    // console.log('nextstep');
  renderNewBalls(numbOfCells, matrix, state);
  renderNextBalls(state, ballColors);
  // console.log('state', state);
  } else {
    alert('game over');
  }  
}




function clickOnEmptyBox(i, j) {
  if(!matrix[i][j].isBall) {
    matrix[i][j].isEnd = true;
    state.endPosition = `${i}` + `${j}`;
    
    isWay = false;
    copyOfMatrix = copyMatrix();
    findWay(+state.startPosition[0], +state.startPosition[1], i, j);
    if(isWay) {
      console.log('путь есть');
      moveBall(state.activeBall);
    } else {
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
      console.log('color2 =',matrix[+state.endPosition[0]][+state.endPosition[1]].color); 
      const lines = getLinesToRemove(+state.endPosition[0],+state.endPosition[1],
                    matrix[+state.endPosition[0]][+state.endPosition[1]].color, matrix);
      console.log( 'lines', lines);  

      if (lines.every((line) => line.length < 5)) {
        nextStep();        
      } else {
        removeLines(lines, state, matrix);
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
  }, 1000);
}
