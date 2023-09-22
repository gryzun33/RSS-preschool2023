export function renderBox(container, id) {
  const boxElement = document.createElement('div');
  boxElement.classList.add('box');
  boxElement.id = id;
  boxElement.innerHTML = '<div class="small-ball"></div>';
  container.append(boxElement);
}