import { getLinesToRemove } from "./getLinesToRemove.js";
import { removeLines } from "./removeLines.js";
// import { sounds } from "./getSounds.js";

export function renderBall(color, position, matrix, state, sounds) {
  const ballElem = document.createElement('div');
  ballElem.classList.add('ball');
  ballElem.style.backgroundColor = color;
  // ballElem.style.backgroundImage = `radial-gradient(50% 50%, circle, ${color}, #000)`;

  
  ballElem.dataset.position = position;
  ballElem.dataset.color = color;
  ballElem.classList.add('show-first');
  const boxElement = document.getElementById(position); 
  boxElement.append(ballElem);
  matrix[+position[0]][+position[1]].isBall = true;
  matrix[+position[0]][+position[1]].color = color;
  matrix[+position[0]][+position[1]].ball = ballElem;

  addHandlersToBall(ballElem, matrix, state, sounds);

  // checkField
  const lines = getLinesToRemove(+position[0], +position[1], color, matrix);
  // console.log('lines2=', lines);
  if (lines.some((line) => line.length >= 5)) {
    removeLines(lines, state, matrix, sounds.removeLines);
  }          
  // return ballElem;
}

function addHandlersToBall(ballElem, matrix, state, sounds) {
  ballElem.addEventListener('click', () => {
    let numbOfEpmtyBoxes = matrix.flat().filter((el) => !el.isBall);
    console.log('emptys32',numbOfEpmtyBoxes);

    if(state.isVolume) {
      sounds.clickOnBall.currentTime = 0;
      sounds.clickOnBall.play();
    }
    state.startPosition = null;
    state.endPosition = null;
    // matrix[+state.startPosition[0]][+position[1]].isStart = true;
    if(state.activeBall) {
      // state.activeBall.classList.remove('show');
      state.activeBall.classList.remove('active');
    }
    state.activeBall = ballElem;
    state.activeBall.classList.add('active');
    state.startPosition = ballElem.getAttribute('data-position');
    console.log('color1=',matrix[+state.startPosition[0]][+state.startPosition[1]].color);
    console.log('state1=', state);
  })
  

  ballElem.onanimationend = function (e) {
    if(e.animationName === 'showFirst') {
      // console.log('animationShowFirst');
      ballElem.classList.remove('show-first');
      ballElem.onanimationend = null;
    } 
  }
}

