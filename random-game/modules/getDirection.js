export function getDirection(startPosition, endPosition) {
  let direction;
  let difX = endPosition[0] - startPosition[0];
  let difY = endPosition[1] - startPosition[1];

  if (difX < 0 && difY < 0) {
    direction = 'toTopLeft';
  } else if (difX === 0 && difY < 0) {
    direction = 'toTop';
  } else if (difX > 0 && difY < 0) {
    direction = 'toTopRight';
  } else if (difX > 0 && difY === 0) {
    direction = 'toRight';
  } else if (difX > 0 && difY > 0) {
    direction = 'toBottomRight';
  } else if (difX === 0 && difY > 0) {
    direction = 'toBottom';
  } else if (difX < 0 && difY > 0) {
    direction = 'toBottomLeft';
  } else if (difX < 0 && difY === 0) {
    direction = 'toLeft';
  }

  return direction;
}