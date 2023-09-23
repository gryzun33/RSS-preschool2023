import { renderBox } from "./modules/renderBox.js";
import { renderBall } from "./modules/renderBall.js";
import { getNewColors } from "./modules/getNewColors.js";
import { getNumbsNewBoxes } from "./modules/getNumbsNewBoxes.js";
import { getDirection } from "./modules/getDirection.js";
import { renderNewBalls } from "./modules/renderNewBalls.js";



const ballColors = ['red', 'green', 'yellow', 'blue', 'indigo', 'aqua', 'maroon'];
const numbOfCells = 9;
let transArray = [];
let boxes = null;
let endPosition = null;
let startPosition = null;
let activeBall = null;

const directions = {
   toLeftTop: [[-1,0],[0,-1],[1,0],[0,1]],
   toTopRight: [[0,-1],[1,0],[0,1],[-1,0]],
   toRightBottom: [[1,0],[0,1],[-1,0],[0,-1]],
   toBottomLeft: [[0,1],[-1,0],[0,-1],[1,0]],
}

function move(direction) {
  let start = startPosition.split('').map((el) => +el);
  let next;
  console.log('start', start);
  for (let i = 0; i < direction.length; i++ ) {
    next = [start[0] + direction[i][0], start[1] + direction[i][1]].join('');
    console.log('next', next);
    const nextBox = document.getElementById(next);
    console.log('nextBox', nextBox);
    if (!nextBox.lastElementChild.matches('.ball')) {
      transArray.push(next);
      break;
    }
  }
  if(next !== endPosition) {
    startPosition = next;
    let direction = getDirection(startPosition, endPosition);
    move(directions[direction]);
    console.log('transArray', transArray);
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
  renderNewBalls(ballColors, numbOfCells);
  addHandlerToContainer(container);
} 



function addHandlerToContainer(container) {
  container.addEventListener('click', (e) => {
    if(e.target.closest('.ball')) {
      activeBall = e.target;
      activeBall.classList.add('active');
      startPosition = activeBall.getAttribute('data-position');
      console.log('startposition=',startPosition);
    }
   
    const endBox = e.target.closest('.box');
    if(!endBox.lastElementChild.matches('.ball')) {
      endPosition = endBox.id;
      console.log('endposition', endPosition);
      if (startPosition && endPosition) {
        let direction = getDirection(startPosition, endPosition);
        console.log('direction', direction);
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
    renderNewBalls(); 
  }  
});


function checkAvailableGame() {
  let arrayBoxes = Array.from(boxes);
  let numbOfEpmtyBoxes = arrayBoxes.filter((box) => !box.lastElementChild.matches('.ball'));
  console.log('emptys',numbOfEpmtyBoxes);
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
    })
    
  }, 40 * (transArray.length - 1));
}





// ballGreen.addEventListener('click', () => {

//   ballGreen.hidden = true;
//   const arrBoxes = [];
//   const lastBox = document.getElementById(transitionArray[transitionArray.length - 1]);
//   const color = ballGreen.getAttribute('data-color');
//   // console.log('color=', color);
//   for (let i = 0; i < transitionArray.length - 1; i++) {
//     let k = i;

//     setTimeout(() => {
      
      
//       const nextBox = document.getElementById(transitionArray[k]);
   
//       nextBox.firstChild.style.backgroundColor = color;
//       arrBoxes.push(nextBox);
      
//     },i*50)
 
//   }

//   setTimeout(() => {
//     arrBoxes.forEach((box) => {
//           box.firstChild.style.backgroundColor = '';
//         });
   
//     lastBox.append(ballGreen);
//     ballGreen.hidden = false;
//     ballGreen.classList.add('endScale');
    
//   }, 50 * (transitionArray.length - 1));


// });

// ballGreen.addEventListener('click', () => {
//   for (let i = 0; i< transitionArray.length; i ++) {
//     let k = i;
//      setTimeout(() => {

//       ballGreen.classList.add(transitionArray[k][0]);
      
      
    
//       ballGreen.onanimationend = function() {
//         const nextBox = document.getElementById(transitionArray[k][1]);
//         nextBox.append(ballGreen);
//         ballGreen.classList.remove(transitionArray[k][0]);
//         ballGreen.onanimationend = null;
//       }

//      }, i * 500); 
//   }

// });


      
      
    



























// const box51 = document.getElementById('51');
// const box61 = document.getElementById('61');
// const box71 = document.getElementById('71');
// const box81 = document.getElementById('81');
// const box91 = document.getElementById('91');

// const ball = document.createElement('div');
// ball.classList.add('ball');
// box51.append(ball);

// ball.style.left = '10px';
// ball.style.bottom = '10px';



