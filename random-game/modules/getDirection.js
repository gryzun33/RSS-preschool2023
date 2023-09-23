export function getDirection(startPosition, endPosition) {
  let direction;
  let difX = endPosition[0] - startPosition[0];
  let difY = endPosition[1] - startPosition[1];
  if (difX < 0 && difY <= 0) {
    direction = 'toLeftTop';
  } else if (difX >= 0 && difY < 0) {
    direction = 'toTopRight';
  } else if (difX > 0 && difY >= 0) {
    direction = 'toRightBottom';
  } else if (difX <= 0 && difY >= 0) {
    direction = 'toBottomLeft';
  }
  return direction;
}