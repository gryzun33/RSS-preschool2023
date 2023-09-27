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

// const directions = {
//    toTop: [[0,-1],[-1,0],[1,0],[0,1]],
//    toRight: [[1,0],[0,-1],[0,1],[-1,0]],
//    toBottom: [[0,1],[-1,0],[1,0],[0,-1]],
//    toLeft: [[-1,0],[0,-1],[0,1],[1,0]],
//    toTopLeft:  [[-1,0],[0,-1],[1,0],[0,1]],
//    toTopRight: [[0,-1],[1,0],[0,1],[-1,0]],
//    toBottomRight: [[1,0],[0,1],[-1,0],[0,-1]],
//    toBottomLeft: [[0,1],[-1,0],[0,-1],[1,0]],
// }
const directions = [[0,-1],[-1,0],[1,0],[0,1]];


function move(startID) {
  console.log('startID', startID);
  console.log ('transArray', transArray);
  console.log ('array length 2 = ' , transArray.length);
  let startXY = startID.split('').map((el) => +el);
  let endXY = endPosition.split('').map((el) => +el);
  let prevID = (transArray.length === 1) ? null : transArray[transArray.length - 2];
  let prevXY = (prevID === null) ? null : prevID.split('').map((el) => +el);
  let nextID;
  let distanсes = [];
  
  for (let i = 0; i < directions.length; i++ ) {
    let nextXY = [startXY[0] + directions[i][0], startXY[1] + directions[i][1]];
    let next = nextXY.join('');
    console.log('startXY=', startXY);
    console.log('nextXY=', nextXY); 
    console.log('prevXY=', prevXY); 

    const isNextNotOnField = nextXY.some((el) => el < 0 || el >= numbOfCells);
    if(isNextNotOnField) {
      console.log('true1');
      continue;
    }

    const isBallInBox = ((document.getElementById(next).lastElementChild.matches('.ball')) && (next !== prevID));
    console.log('isballinbox',isBallInBox );
    const arrSlice = (transArray.length > 2) ? transArray.slice(0,-2) : null;
    console.log ('arrSlice', arrSlice );
    const isInBadBoxes = badBoxes.includes(next);
    const isInArray = arrSlice ? arrSlice.includes(next) : false;
    console.log('isInBadBoxes',isInBadBoxes );
    if (isBallInBox || isInBadBoxes || isInArray) {
      console.log('true2');
      continue;
    } 

    let dist = Math.abs(nextXY[0] - endXY[0]) + Math.abs(nextXY[1] - endXY[1]); 
    const objDist = {
      nextXY : nextXY,
      dist: dist
    }
    // console.log('dist', dist);
    
    distanсes.push(objDist);
  }
  console.log('distanсes', distanсes);
  // if(distanсes.length === 0) {
  //   console.log('bad');
  //   badBoxes.push(startXY);
  //   move(prevID);
  //   transArray.pop();
  //   return;
  // }

  
  if (distanсes.length === 1 && prevID) {
    console.log('тупик');
    badBoxes.push(startID);
    transArray.pop();
    move(prevID);
    return;
  } else {
    distanсes.sort((a,b) => a.dist - b.dist); 
    console.log ('distancessort',distanсes );
    for(let i = 0; i < distanсes.length; i++) {
      console.log('1= ', distanсes[i].nextXY.join('')) 
      console.log('2= ', prevID); 
      if (+distanсes[i].nextXY.join('') !== +prevID) {
        console.log('1= ', distanсes[i].nextXY.join('')) 
        console.log('2= ', prevID); 
        console.log('1= ', typeof distanсes[i].nextXY.join('')) 
        console.log('2= ', typeof prevID); 
        nextID = distanсes[i].nextXY.join('');
        transArray.push(nextID);

        console.log('nextID=', nextID);
        if(nextID === endPosition) {
          moveAnimation(activeBall);
        } else {
          move(nextID);
        }
        
        break;
      }
    }
  }

  // console.log('nextID=', nextID);

  // if(prevID === nextID) {
  //   badBoxes.push(startXY);
  //   // transArray.pop();
  //   move(prevID);
  //   return;
  // }

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
  boxes = container.querySelectorAll('.box');
  // console.log(boxes);
  // ??????????
  const newBalls = renderNewBalls(ballColors, numbOfCells);
  

  
  addHandlerToContainer(container);
} 



function addHandlerToContainer(container) {
  container.addEventListener('click', (e) => {
    if(e.target.matches('.ball')) {
      if(activeBall) {
        activeBall.classList.remove('active');
      }
      activeBall = e.target;
      activeBall.classList.add('active');
      startPosition = activeBall.getAttribute('data-position');
      console.log('startposition=',startPosition);
    }
   
    const endBox = e.target.closest('.box');
    console.log ('endbox=', endBox);
    if(!endBox.lastElementChild.matches('.ball') && activeBall) {
      endPosition = endBox.id;
      console.log('endposition', endPosition);
      if (startPosition && endPosition) {
        // let direction = getDirection(startPosition, endPosition);
        // console.log('direction2=', direction);
        // console.log('direction1=', direction);
        transArray.push(startPosition);
        move(startPosition);
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
  console.log('lastbox=', lastBox);
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
    ball.addEventListener('animationend',updateAfterAnimation) 
    
  }, 40 * (transArray.length - 1));

  function updateAfterAnimation() {
    ball.classList.remove('endScale');
    ball.dataset.position = endPosition;
    const lines = getLinesToRemove(ball, numbOfCells);
    removeLines(lines); 
    activeBall = null;
    transArray = [];
    console.log ('array length' , transArray.length);
    ball.removeEventListener('animationend',updateAfterAnimation);   
  }
}


function removeLines(lines, endPosition) {
  let countActiveBall = 0;
  // console.log('lines', lines);
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



      
      
    
























