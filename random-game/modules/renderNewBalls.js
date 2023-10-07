import { getNumbsNewBoxes } from "./getNumbsNewBoxes.js";
import { renderBall } from "./renderBall.js";

export function renderNewBalls (numbOfCells, matrix, state, sounds) {
  const newColors = state.nextColors;
  const numbsNewBoxes = getNumbsNewBoxes(numbOfCells, matrix, state.emptyBoxes);
  for(let i = 0; i < state.emptyBoxes; i++) {
    renderBall(newColors[i], numbsNewBoxes[i], matrix, state, sounds);
  }
}