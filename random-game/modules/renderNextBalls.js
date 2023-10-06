import { getNewColors } from "./getNewColors.js";

export function renderNextBalls(state, ballColors) {
  const nextBalls = document.querySelector('.next-balls');
  nextBalls.innerHTML = '';
  state.nextColors = getNewColors(ballColors);
  for (let i = 0; i < state.nextColors.length; i++) {
    const nextBall = document.createElement('div');
    nextBall.classList.add('next-ball');
    nextBall.style.backgroundColor = state.nextColors[i];
    nextBalls.append(nextBall);
  }
}