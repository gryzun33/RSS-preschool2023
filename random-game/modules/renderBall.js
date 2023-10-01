import { getLinesToRemove } from "./getLinesToRemove.js";
import { removeLines } from "./removeLines.js";

export function renderBall(color, position, matrix, state) {
  const ballElem = document.createElement('div');
  ballElem.classList.add('ball');
  ballElem.style.backgroundColor = color;
  ballElem.dataset.position = position;
  ballElem.dataset.color = color;
  ballElem.classList.add('show-first');
  const boxElement = document.getElementById(position); 
  boxElement.append(ballElem);
  matrix[+position[0]][+position[1]].isBall = true;
  matrix[+position[0]][+position[1]].color = color;
  matrix[+position[0]][+position[1]].ball = ballElem;

  addHandlersToBall(ballElem, matrix, state);

  // checkField
  const lines = getLinesToRemove(+position[0], +position[1], color, matrix);
  console.log('lines2=', lines);
  if (lines.some((line) => line.length >= 5)) {
    removeLines(lines, state, matrix);
  }          
  return ballElem;
}

function addHandlersToBall(ballElem, matrix, state) {
  ballElem.addEventListener('click', () => {
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

