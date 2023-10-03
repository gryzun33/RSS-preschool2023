import { getNewColors } from "./getNewColors.js";
import { getNumbsNewBoxes } from "./getNumbsNewBoxes.js";
import { renderBall } from "./renderBall.js";
import { checkAvailableGame } from "./checkAvailableGame.js";

export function renderNewBalls (numbOfCells, matrix, state, sounds) {
  // const newColors = getNewColors(ballColors);

  // console.log('state1', state);
  const newColors = state.nextColors;
  const numbsNewBoxes = getNumbsNewBoxes(numbOfCells, matrix, state.emptyBoxes);
  // const newBalls = [];
  for(let i = 0; i < state.emptyBoxes; i++) {
    renderBall(newColors[i], numbsNewBoxes[i], matrix, state, sounds);
  //  newBalls.push(ball);
  }
  


}

