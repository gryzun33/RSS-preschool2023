import { getLinesToRemove } from "./getLinesToRemove.js";
import { removeLines } from "./removeLines.js";

export function renderBall(color, position, matrix, state, sounds, blockField) {
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

  addHandlersToBall(ballElem, state, sounds);

  const lines = getLinesToRemove(+position[0], +position[1], color, matrix);
  if (lines.some((line) => line.length >= 5)) {
    removeLines(lines, state, matrix, sounds.removeLines, blockField);
  } else {
    setTimeout (() => {
      blockField.classList.add('hidden');
    }, 300);
  }           
}

function addHandlersToBall(ballElem, state, sounds) {
  ballElem.addEventListener('click', () => {

    if(state.isVolume) {
      sounds.clickOnBall.currentTime = 0;
      sounds.clickOnBall.play();
    }
    state.startPosition = null;
    state.endPosition = null;  
    if(state.activeBall) {    
      state.activeBall.classList.remove('active');
    }
    state.activeBall = ballElem;
    state.activeBall.classList.add('active');
    state.startPosition = ballElem.getAttribute('data-position');
  })
  
  ballElem.onanimationend = function (e) {
    if(e.animationName === 'showFirst') {
      ballElem.classList.remove('show-first');
      ballElem.onanimationend = null;
    } 
  }
}

