export function getLinesToRemove(ball, numbOfCells) {
  
  const posBall = ball.getAttribute('data-position');
  console.log('posBall=', posBall);
  const color = ball.getAttribute('data-color');
  let diagonal1 = [];
  let diagonal2 = [];
  let horizontal = [];
  let vertical = [];

  // diagonal1
  if(posBall[0] >= posBall[1]) {
    let currPos;
    let y = 0;
    let x = (+posBall[0]) - (+posBall[1]);
    while(x < numbOfCells && y < numbOfCells) {
      currPos = `${x}` + `${y}`;
      let box = document.getElementById(currPos);
      console.log('box1=', box);
      if(box.lastElementChild.matches('.ball') && (box.lastElementChild.dataset.color === color)) {
        diagonal1.push(box);
      } else if (diagonal1.length < 5) {
        diagonal1 = [];
      }
      x += 1;
      y += 1;
    } 
  } else {
    let currPos;
    let x = 0;
    let y = (+posBall[1]) - (+posBall[0]);
    while(x < numbOfCells && y < numbOfCells) {
      currPos = `${x}` + `${y}`;
      let box = document.getElementById(currPos);
      console.log('box2=', box);
      if(box.lastElementChild.matches('.ball') && (box.lastElementChild.dataset.color === color)) {
        diagonal1.push(box);
      } else if (diagonal1.length < 5) {
        diagonal1 = [];
      }
      x += 1;
      y += 1;
    } 
  }

  // diagonal2
  if((+posBall[0]) + (+posBall[1]) < numbOfCells) {
    let currPos;
    let y = 0;
    let x = (+posBall[0]) + (+posBall[1]);
    while(x >= 0 && y < numbOfCells) {
      currPos = `${x}` + `${y}`;
      let box = document.getElementById(currPos);
      console.log('box3=', box);
      if(box.lastElementChild.matches('.ball') && (box.lastElementChild.dataset.color === color)) {
        diagonal2.push(box);
      } else if (diagonal2.length < 5) {
        diagonal2 = [];
      }
      x -= 1;
      y += 1;
    } 
  } else {
    let currPos;
    let x = numbOfCells - 1;
    let y = +posBall[1] - (numbOfCells - 1 - (+posBall[0]));
    while(x > 0 && y < numbOfCells) {
      currPos = `${x}` + `${y}`;
      let box = document.getElementById(currPos);
      console.log('box4=', box);
      if(box.lastElementChild.matches('.ball') && (box.lastElementChild.dataset.color === color)) {
        diagonal2.push(box);
      } else if (diagonal2.length < 5) {
        diagonal2 = [];
      }
      x -= 1;
      y += 1;
    } 
  }

  // horizontal
  for (let x = 0; x < numbOfCells; x++) {
    let currPos = x + `${posBall[1]}`;
    let box = document.getElementById(currPos);
    if(box.lastElementChild.matches('.ball') && (box.lastElementChild.dataset.color === color)) {
      horizontal.push(box);
    } else if (horizontal.length < 5) {
      horizontal = [];
    }
  }

  // vertical
  for (let y = 0; y < numbOfCells; y++) {
    let currPos = `${posBall[0]}` + y;
    let box = document.getElementById(currPos);
    if(box.lastElementChild.matches('.ball') && (box.lastElementChild.dataset.color === color)) {
      vertical.push(box);
    } else if (vertical.length < 5) {
      vertical = [];
    }
  }

  const arrOfActiveBoxes = [horizontal, vertical, diagonal1, diagonal2];
  return arrOfActiveBoxes;
}
 