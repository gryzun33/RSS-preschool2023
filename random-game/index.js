import { renderBox } from "./modules/renderBox.js";
import { renderBall } from "./modules/renderBall.js";
import { getNewColors } from "./modules/getNewColors.js";
import { getNumbsNewBoxes } from "./modules/getNumbsNewBoxes.js";

const ballColors = ['red', 'green', 'yellow', 'blue', 'indigo', 'aqua', 'maroon'];
let boxes = null;
let numbOfCells = 9;
let transArray = [];
let nextPosition = null;
let ballPosition = null;


// создание контейнера 
function renderField() {
  const container = document.createElement('div');
  container.classList.add('container');
  document.body.append(container);
  for (let i = 0; i < numbOfCells; i++) {
    const lineArray = [];
    for (let j = 0; j < numbOfCells; j++) {
      const idBlock = `${i}` + `${j}`;
      const box = {
        isBall: false,
        color: null,
        // id: idBlock
      }
      lineArray.push(box);
      renderBox(container, idBlock);
    }
    // boxArray.push(lineArray);
  }
  boxes = container.querySelectorAll('.box')
  renderNewBalls();
  addHandlerToContainer(container);
} 

function addHandlerToContainer(container) {
  container.addEventListener('click', (e) => {
    if(e.target.closest('.ball')) {
      const activeBall = e.target;
      activeBall.classList.add('active');
      ballPosition = activeBall.getAttribute('data-position');
      console.log('ballposition=',ballPosition );
    }
   
    const currentBox = e.target.closest('.box');
    if(!currentBox.lastElementChild.matches('.ball')) {
      nextPosition = currentBox.id;
      console.log('nextposition', nextPosition);
    }
  })
}




renderField();



function renderNewBalls () {
   const newColors = getNewColors(ballColors);
   const numbsNewBoxes = getNumbsNewBoxes(numbOfCells);
   for(let i = 0; i < 3; i++) {
    renderBall(newColors[i], numbsNewBoxes[i]);
   }   
}



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




// const ballRed = document.querySelector('[data-color="red"]');
// const ballGreen = document.querySelector('[data-color="green"]');


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

// ballRed.addEventListener('click', () => {
//   for (let i=0;i< transitionArray2.length; i++ ) {
//     let k = i;
//      setTimeout(() => {
      
//       const position = ballRed.getAttribute('data-position');
//       console.log('position', position);
//       const difY = +transitionArray2[k][0] - (+position[0]);
//       const difX = +transitionArray2[k][1] - (+position[1]); 
      
//       if(difY !== 0) {
//         ballRed.style.transform = `translateY(${difY*130}%)`;
//         console.log( 'Y', k);
//       } else
      
//       if(difX !== 0) {
//         ballRed.style.transform = `translateX(${difX*130}%)`;
//         console.log( 'X', k);
//       }
      
      
    
//       ballRed.ontransitionend = function() {
//         const nextBox = document.getElementById(transitionArray2[k]);
//         console.log(nextBox);
//         nextBox.append(ballRed);
//         ballRed.dataset.position = transitionArray2[k];
//         ballRed.style.transform = '';
//         ballRed.ontransitionend = null;
//       }

//      }, i * 600); 
//   }
// })



























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



