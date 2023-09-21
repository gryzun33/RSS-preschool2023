
let boxArray = [];
// создание контейнера 
function renderField() {
  const container = document.createElement('div');
  container.classList.add('container');
  document.body.append(container);
  for (let i = 0; i <= 8; i++) {
    const lineArray = [];
    for (let j = 0; j <=8; j++) {
      const idBlock = 'i' + 'j';
      const box = {
        isBall: false,
        color: null
      }
      lineArray.push(box);


      // render BoxElement
      const boxElement = document.createElement('div');
      boxElement.classList.add('box');
      boxElement.id = idBlock;
      container.append(boxElement);


    }
    boxArray.push(lineArray);
  }
} 

renderField();

console.log('boxArray', boxArray);












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



// ball.addEventListener('click', () => {
//   ball.classList.add('move-right');

//   ball.addEventListener('animationend', moveToNextBox);
  
//   function moveToNextBox() {
//     box61.append(ball);
//     ball.classList.remove('move-right');
//     ball.removeEventListener('animationend', moveToNextBox);
//   }
// })