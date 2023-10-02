import { getNewColors } from "./getNewColors.js";
import { getNumbsNewBoxes } from "./getNumbsNewBoxes.js";
import { renderBall } from "./renderBall.js";
import { checkAvailableGame } from "./checkAvailableGame.js";

export function renderNewBalls (numbOfCells, matrix, state, sounds) {
  // const newColors = getNewColors(ballColors);

  console.log('state1', state);
  const newColors = state.nextColors;
  const numbsNewBoxes = getNumbsNewBoxes(numbOfCells, matrix);
  const newBalls = [];
  for(let i = 0; i < 3; i++) {
   const ball = renderBall(newColors[i], numbsNewBoxes[i], matrix, state, sounds);
   newBalls.push(ball);
  }
  
  setTimeout(() => {
    let endOfGame = checkAvailableGame(matrix);
    if (endOfGame) {
      alert('gameover');
    }
  },500);

}

