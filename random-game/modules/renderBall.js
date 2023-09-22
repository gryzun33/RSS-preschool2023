
export function renderBall(color, position) {
  const ballElem = document.createElement('div');
  ballElem.classList.add('ball');
  ballElem.style.backgroundColor = color;
  ballElem.dataset.position = position;
  ballElem.dataset.color = color;
  const boxElement = document.getElementById(position); 
  boxElement.append(ballElem);
}

