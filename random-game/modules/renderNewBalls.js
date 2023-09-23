import { getNewColors } from "./getNewColors.js";
import { getNumbsNewBoxes } from "./getNumbsNewBoxes.js";
import { renderBall } from "./renderBall.js";


export function renderNewBalls (ballColors, numbOfCells) {
  const newColors = getNewColors(ballColors);
  const numbsNewBoxes = getNumbsNewBoxes(numbOfCells);
  for(let i = 0; i < 3; i++) {
   renderBall(newColors[i], numbsNewBoxes[i]);
  }   
}