import { renderBox } from "./modules/renderBox.js";
import { renderBall } from "./modules/renderBall.js";
import { getNewColors } from "./modules/getNewColors.js";
import { getNumbsNewBoxes } from "./modules/getNumbsNewBoxes.js";
import { getDirection } from "./modules/getDirection.js";
import { renderNewBalls } from "./modules/renderNewBalls.js";
import { getLinesToRemove } from "./modules/getLinesToRemove.js";



const ballColors = ['red', 'green', 'yellow', 'blue', 'indigo', 'aqua', 'maroon'];
const numbOfCells = 9;
let transArray = [];
let boxes = null;
let endPosition = null;
let startPosition = null;
let activeBall = null;
let badBoxes = [];

let count = 0;

const directions = {
   toTop: [[0,-1],[-1,0],[1,0],[0,1]],
   toRight: [[1,0],[0,-1],[0,1],[-1,0]],
   toBottom: [[0,1],[-1,0],[1,0],[0,-1]],
   toLeft: [[-1,0],[0,-1],[0,1],[1,0]],
   toTopLeft:  [[-1,0],[0,-1],[1,0],[0,1]],
   toTopRight: [[0,-1],[1,0],[0,1],[-1,0]],
   toBottomRight: [[1,0],[0,1],[-1,0],[0,-1]],
   toBottomLeft: [[0,1],[-1,0],[0,-1],[1,0]],
}

function move(direction) {
  let start = startPosition.split('').map((el) => +el);
  let next;
  let prev;
  let startLength = transArray.length;
  // console.log('start', start);
  for (let i = 0; i < direction.length; i++ ) {
    let nextNumb = [start[0] + direction[i][0], start[1] + direction[i][1]];
    next = nextNumb.join('');
    // console.log ('direction=',);
    console.log ('i=', i);
    console.log('next=', next);
     
    const isNextInField = nextNumb.map((el) => +el).some((el) => el < 0 || el >= numbOfCells);
    
    prev = (transArray.length === 1) ? startPosition : transArray[transArray.length - 2];
    console.log('prev=', prev);
    if(next === prev || isNextInField || badBoxes.includes(next)) {
      continue;
    }
    // console.log('next', next);
    const nextBox = document.getElementById(next);
    if (!nextBox.lastElementChild.matches('.ball')) {
      transArray.push(next);
      console.log('transArray', transArray);
      break;
    }
  }

  if (startLength === transArray.length) {
    badBoxes.push(transArray[transArray.length - 1]);
    transArray.pop();
    if (transArray.length > 0) {
      next = transArray[transArray.length - 1];
    }
    
  }
   
  if (transArray.length === 0) {
    console.log ('null');
    return;
  }
  
  
  if(next !== endPosition) {
    startPosition = next;
    let direction = getDirection(startPosition, endPosition);
    console.log('direction2=', direction);
    move(directions[direction]);
    
  } else {
    moveAnimation(activeBall);
  }

}




// создание контейнера 
function renderField() {
  const container = document.createElement('div');
  container.classList.add('container');
  document.body.append(container);
  for (let i = 0; i < numbOfCells; i++) {
    const lineArray = [];
    for (let j = 0; j < numbOfCells; j++) {
      const idBox = `${i}` + `${j}`;
      const box = {
        isBall: false,
        color: null,
      }
      lineArray.push(box);
      renderBox(container, idBox);
    }
  }
  boxes = container.querySelectorAll('.box')
  const newBalls = renderNewBalls(ballColors, numbOfCells);
  


  addHandlerToContainer(container);
} 



function addHandlerToContainer(container) {
  container.addEventListener('click', (e) => {
    if(e.target.closest('.ball')) {
      if(activeBall) {
        activeBall.classList.remove('active');
      }
      activeBall = e.target;
      activeBall.classList.add('active');
      startPosition = activeBall.getAttribute('data-position');
      console.log('startposition=',startPosition);
    }
   
    const endBox = e.target.closest('.box');
    if(!endBox.lastElementChild.matches('.ball') && activeBall) {
      endPosition = endBox.id;
      console.log('endposition', endPosition);
      if (startPosition && endPosition) {
        let direction = getDirection(startPosition, endPosition);
        // console.log('direction2=', direction);
        console.log('direction1=', direction);
        move(directions[direction]);
      }
    }
  })
}




renderField();







const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  let endOfGame = checkAvailableGame();
  if (endOfGame) {
     return;
  } else {
    const newBalls = renderNewBalls(ballColors, numbOfCells); 
    newBalls.forEach((ball) => {
      const lines = getLinesToRemove(ball, numbOfCells);
      removeLines(lines); 
    })
  }  
});


function checkAvailableGame() {
  let arrayBoxes = Array.from(boxes);
  let numbOfEpmtyBoxes = arrayBoxes.filter((box) => !box.lastElementChild.matches('.ball'));
  // console.log('emptys',numbOfEpmtyBoxes);
  if(numbOfEpmtyBoxes < 2) {
    return true;
  }
  return false;
}





function moveAnimation(ball) {
  ball.hidden = true;
  ball.classList.remove('active');
  let arrBoxes = [];
  const lastBox = document.getElementById(transArray[transArray.length - 1]);
  const color = ball.getAttribute('data-color');

  for (let i = 0; i < transArray.length - 1; i++) {
    let k = i;
    setTimeout(() => {
      const nextBox = document.getElementById(transArray[k]);   
      nextBox.firstChild.style.backgroundColor = color;
      arrBoxes.push(nextBox);     
    },i*40)
  }

  setTimeout(() => {
    arrBoxes.forEach((box) => {
      box.firstChild.style.backgroundColor = '';
    });
    lastBox.append(ball);
    ball.hidden = false;
    ball.classList.add('endScale');
    ball.addEventListener('animationend', () => {
      ball.classList.remove('endScale');
      transArray = [];
      ball.dataset.position = endPosition;
      const lines = getLinesToRemove(ball, numbOfCells);
      removeLines(lines); 
      activeBall = null;
    })
    
  }, 40 * (transArray.length - 1));
}


function removeLines(lines, endPosition) {
  let countActiveBall = 0;
  console.log('lines', lines);
  lines.forEach((arr) => {
    if (arr.length >= 5) {
      count = count + arr.length;
      arr.forEach((box) => {
        if(box.id === endPosition ) {
          countActiveBall += 1;
        }
        if (box.lastElementChild.matches('.ball')) {
          let ball = box.lastElementChild;
          ball.classList.add('hide');
          ball.addEventListener('transitionend', () => {
            ball.remove();
          })
        }
      })
    }
  }) 
  count = count - countActiveBall + 1;
}



      
      
    
























