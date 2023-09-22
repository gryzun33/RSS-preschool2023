
let boxArray = [];
const ballColours = ['red', 'green', 'yellow', 'blue', 'indigo', 'aqua', 'maroon'];
// let transitionArray = [['move-right', '01'],  ['move-right','02'],[ 'move-bottom', '12'], ['move-bottom', '22'],['move-right', '23'], ['move-right', '24'] ];
let transitionArray2 = ['84', '64', '68'];
let transitionArray = ['01', '02', '03', '04', '14', '24', '34', '44', '45', '46', '47'];
// создание контейнера 
function renderField() {
  const container = document.createElement('div');
  container.classList.add('container');
  document.body.append(container);
  for (let i = 0; i <= 8; i++) {
    const lineArray = [];
    for (let j = 0; j <=8; j++) {
      const idBlock = `${i}` + `${j}`;
      const box = {
        isBall: false,
        color: null
      }
      lineArray.push(box);

      renderBox(container, idBlock);
    }
    boxArray.push(lineArray);
  }
  
  renderBall('green', '00');
  // renderBall('red', '80');
} 

renderField();
// console.log('boxArray', boxArray);



function renderBox(container, id) {
  const boxElement = document.createElement('div');
  boxElement.classList.add('box');
  boxElement.id = id;
  boxElement.innerHTML = '<div class="small-ball"></div>';
 
  container.append(boxElement);
}


function renderBall(color, position) {
  const ballElem = document.createElement('div');
  ballElem.classList.add('ball');
 
  // ballElem.outerHTML = `<div class="ball" data-color="${color}" data-pos="${position}"></div>`;
  ballElem.style.backgroundColor = color;
  ballElem.dataset.position = position;
  ballElem.dataset.color = color;
  const boxElement = document.getElementById(position); 
  boxElement.append(ballElem);
}

const ballRed = document.querySelector('[data-color="red"]');
const ballGreen = document.querySelector('[data-color="green"]');


ballGreen.addEventListener('click', () => {

  ballGreen.hidden = true;
  const arrBoxes = [];
  const lastBox = document.getElementById(transitionArray[transitionArray.length - 1]);
  const color = ballGreen.getAttribute('data-color');
  console.log('color=', color);
  for (let i = 0; i < transitionArray.length - 1; i++) {
    let k = i;

    setTimeout(() => {
      
      
      const nextBox = document.getElementById(transitionArray[k]);
   
      nextBox.firstChild.style.backgroundColor = color;
      arrBoxes.push(nextBox);
      
    },i*50)
 
  }

  setTimeout(() => {
    arrBoxes.forEach((box) => {
          box.firstChild.style.backgroundColor = '';
        });
   
    lastBox.append(ballGreen);
    ballGreen.hidden = false;
    ballGreen.classList.add('endScale');
    // ballGreen.addEventListener('animationend', () => {
    //  
    // });
    
  }, 50 * (transitionArray.length - 1));


});

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



