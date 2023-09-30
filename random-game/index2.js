import { renderBox } from "./modules/renderBox.js";
import { renderBall } from "./modules/renderBall.js";
import { getNewColors } from "./modules/getNewColors.js";
import { getNumbsNewBoxes } from "./modules/getNumbsNewBoxes.js";
import { getDirection } from "./modules/getDirection.js";
import { renderNewBalls } from "./modules/renderNewBalls.js";
import { getLinesToRemove } from "./modules/getLinesToRemove.js";

const ballColors = ['red', 'green', 'yellow', 'blue', 'indigo', 'aqua', 'maroon'];
const numbOfCells = 9;
let isWay = false;



const state = {
  startPosition: null,
  endPosition: null,
  activeBall: null,
  count: 0
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
  const container = document.createElement('div');
  container.classList.add('container');
  document.body.append(container);
  for(let i = 0; i < numbOfCells; i++) {
    for (let j = 0; j < numbOfCells; j++) {
      const idBox = `${i}` + `${j}`;
      const box = renderBox(container, idBox, matrix, i, j);
      matrix[i][j].box = box;
      matrix[i][j].smallBall = box.firstChild;
      box.addEventListener('click', () => {
        clickOnEmptyBox(i, j);
      })
    }
  }
  renderNewBalls(ballColors, numbOfCells, matrix, state);
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
      startMoving(state.activeBall);
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



const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  let endOfGame = checkAvailableGame();
  if (endOfGame) {
     return;
  } else {
    const newBalls = renderNewBalls(ballColors, numbOfCells, matrix, state); 

    
  }  
});

function checkAvailableGame() {

  let numbOfEpmtyBoxes = matrix.flat().filter((el) => !el.isBall);
  console.log('emptys',numbOfEpmtyBoxes);
  if(numbOfEpmtyBoxes < 2) {
    return true;
  }
  return false;
}


function startMoving(ball) {
  ball.classList.remove('active');
  ball.classList.add('hide');
  ball.addEventListener('animationend', doAfterMoving);
  

  function doAfterMoving() {
    console.log('startPosition=',state.startPosition );
    matrix[+state.endPosition[0]][+state.endPosition[1]].box.append(ball);
    matrix[+state.endPosition[0]][+state.endPosition[1]].isBall = true;
    matrix[+state.endPosition[0]][+state.endPosition[1]].color = matrix[+state.startPosition[0]][+state.startPosition[1]].color;
    matrix[+state.endPosition[0]][+state.endPosition[1]].ball = ball;
    matrix[+state.startPosition[0]][+state.startPosition[1]].isBall = false;
    // matrix[+state.startPosition[0]][+state.startPosition[1]].color = null;
    ball.classList.remove('hide');
    ball.classList.add('show');
    // console.log('color', matrix[+state.endPosition[0]][+state.endPosition[1]].color);
    const lines = getLinesToRemove(+state.endPosition[0],+state.endPosition[1],
      matrix[+state.endPosition[0]][+state.endPosition[1]].color, matrix);
    console.log('lines', lines);  
    removeLines(lines, state.endPosition);   
    ball.removeEventListener('animationend', doAfterMoving);
    console.log('matrix', matrix);
  }
}

function removeLines(lines, endPosition) {
  let countActiveBall = 0;
  // console.log('lines', lines);
  lines.forEach((arr) => {
    if (arr.length >= 5) {
      state.count = state.count + arr.length;
      arr.forEach((obj, i) => {
        let k = i;
        if(obj.x === +endPosition[0] && obj.y === +endPosition[1]) {
          countActiveBall += 1;
        }
        let ball = matrix[obj.x][obj.y].ball;
        console.log('ball', ball);
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