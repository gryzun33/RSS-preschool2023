import { getNewColors } from "./getNewColors.js";
import { getNumbsNewBoxes } from "./getNumbsNewBoxes.js";
import { renderBall } from "./renderBall.js";


export function renderNewBalls (ballColors, numbOfCells, matrix, state) {
  const newColors = getNewColors(ballColors);
  const numbsNewBoxes = getNumbsNewBoxes(numbOfCells, matrix);
  const newBalls = [];
  for(let i = 0; i < 3; i++) {
   const ball = renderBall(newColors[i], numbsNewBoxes[i], matrix, state);
   newBalls.push(ball);
  }
  return newBalls; 
}

